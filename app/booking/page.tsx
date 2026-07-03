'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  CalendarDays, Phone, MapPin, Clock, CreditCard,
  ArrowRight, AlertCircle, Mail, Loader2,
  Stethoscope, Check, X, Info, ChevronRight, ShieldCheck,
  HeartPulse, CheckCircle2,
} from 'lucide-react';
import ParallaxBackground from '@/components/ParallaxBackground';
import {
  getBusiness, getServices, getAvailability, initializeBooking, bookWithMedicalAid,
  type PublicBusiness, type PublicService, type TimeSlot,
  type MedicalAidBookingResponse,
} from '@/lib/bookingApi';

/* ── Reusable fade-in-up on scroll ─────────────────────── */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}
function FadeIn({ children, delay = 0, className = '', direction = 'up' }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const offsets: Record<string, { y?: number; x?: number }> = {
    up:    { y: 40 },
    left:  { x: -40 },
    right: { x: 40 },
    none:  {},
  };
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, filter: 'blur(6px)', ...offsets[direction] }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

/** Format an ISO instant as wall-clock time in the business's timezone (analysis #12). */
function formatSlotTime(iso: string, timeZone?: string): string {
  try {
    return new Intl.DateTimeFormat('en-ZA', {
      hour: '2-digit', minute: '2-digit', hour12: true,
      ...(timeZone ? { timeZone } : {}),
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function BookingPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    date: '', serviceId: '', slot: '', message: '',
    medicalAidNumber: '', medicalAidScheme: '',
  });

  // How the visitor settles the appointment: an online card deposit (Yoco,
  // payment-first) or medical aid (no payment — booking confirmed immediately,
  // funding verified by staff afterwards).
  const [payMethod, setPayMethod] = useState<'deposit' | 'medical_aid'>('deposit');

  // A successful medical-aid booking has no payment redirect, so we confirm
  // inline rather than sending the visitor to a return page.
  const [maSuccess, setMaSuccess] = useState<MedicalAidBookingResponse | null>(null);

  // Remote data
  const [business, setBusiness] = useState<PublicBusiness | null>(null);
  const [services, setServices] = useState<PublicService[]>([]);
  const [servicesError, setServicesError] = useState<string | null>(null);

  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // Submission — booking is payment-first, so a successful submit redirects the
  // visitor to Paystack rather than showing an inline confirmation.
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Service picker modal
  const [serviceModalOpen, setServiceModalOpen] = useState(false);

  // Load business + services once.
  useEffect(() => {
    let cancelled = false;
    getServices()
      .then((s) => { if (!cancelled) setServices(s); })
      .catch((err) => { if (!cancelled) setServicesError(err.message); });
    getBusiness()
      .then((b) => { if (!cancelled) setBusiness(b); })
      .catch(() => { /* timezone formatting falls back to visitor-local */ });
    return () => { cancelled = true; };
  }, []);

  // (Re)load availability whenever the chosen service or date changes. State
  // resets happen in handleChange so the effect body issues no synchronous
  // setState (React 19's set-state-in-effect rule); it only fires the request
  // and writes results from async callbacks.
  const { serviceId, date } = formData;
  useEffect(() => {
    if (!serviceId || !date) return;
    const controller = new AbortController();
    getAvailability(Number(serviceId), date, controller.signal)
      .then((res) => { setSlots(res.time_slots.filter((t) => t.available)); })
      .catch((err) => { if (err.name !== 'AbortError') setSlotsError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setSlotsLoading(false); });
    return () => controller.abort();
  }, [serviceId, date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Changing service or date invalidates the previously selected slot and
    // queues a fresh availability lookup.
    if (name === 'serviceId' || name === 'date') {
      const next = { ...formData, [name]: value, slot: '' };
      setSlots([]);
      setSlotsError(null);
      setSlotsLoading(Boolean(next.serviceId && next.date));
      setFormData(next);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Choosing a service from the modal mirrors handleChange's serviceId branch:
  // it clears the previously selected slot and queues a fresh availability look-up.
  const selectService = useCallback((id: string) => {
    setSlots([]);
    setSlotsError(null);
    setFormData((prev) => {
      setSlotsLoading(Boolean(id && prev.date));
      return { ...prev, serviceId: id, slot: '' };
    });
    setServiceModalOpen(false);
  }, []);

  const selectSlot = useCallback((startTime: string) => {
    setFormData((prev) => ({ ...prev, slot: startTime }));
  }, []);

  // Lock body scroll and close the service modal on Escape.
  useEffect(() => {
    if (!serviceModalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setServiceModalOpen(false); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [serviceModalOpen]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chosen = slots.find((s) => s.start_time === formData.slot);
    if (!formData.serviceId || !chosen) {
      setSubmitError('Please choose a service, date, and an available time.');
      return;
    }
    // Shared booking details for whichever path the visitor chose.
    const base = {
      service_id: Number(formData.serviceId),
      start_datetime: chosen.start_time,
      end_datetime: chosen.end_time,
      customer_first_name: formData.firstName.trim(),
      customer_last_name: formData.lastName.trim(),
      customer_email: formData.email.trim(),
      customer_phone: formData.phone.trim() || null,
      notes: formData.message.trim() || null,
    };

    if (payMethod === 'medical_aid') {
      const number = formData.medicalAidNumber.trim();
      const scheme = formData.medicalAidScheme.trim();
      if (!number || !scheme) {
        setSubmitError('Please enter your medical aid scheme and membership number.');
        return;
      }
      setSubmitting(true);
      setSubmitError(null);
      try {
        // No payment redirect: the booking is created and confirmed immediately,
        // then awaits staff authorization of the medical-aid funding.
        const booking = await bookWithMedicalAid({
          ...base,
          medical_aid_number: number,
          medical_aid_scheme: scheme,
        });
        setMaSuccess(booking);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const payment = await initializeBooking(base);
      // Keep the Yoco checkout id so the return page can confirm the payment
      // even if it isn't on the return URL.
      sessionStorage.setItem('yoco_reference', payment.reference);
      // Send the visitor to Yoco's hosted checkout. The booking row is created
      // only once the charge is confirmed (webhook + /verify), so we don't clear
      // the form here — if redirect fails they can retry.
      window.location.href = payment.authorization_url;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us.');
      setSubmitting(false);
    }
  }, [slots, formData, payMethod]);

  const selectedService = services.find((s) => String(s.id) === formData.serviceId);
  const today = new Date().toISOString().split('T')[0];

  // Clients pay only the reservation fee (deposit) online; the balance of the
  // service price is settled at the practice. Deposit is capped at the price.
  const reservationFee = business ? Number(business.reservation_fee) : 0;
  const servicePrice = selectedService ? Number(selectedService.price) : 0;
  const deposit = selectedService ? Math.min(reservationFee, servicePrice) : 0;
  const balanceDue = Math.max(0, servicePrice - deposit);
  // Headline deposit shown in the picker. Falls back to R150 until the business
  // (and its reservation_fee) loads; once a service is picked, show its deposit.
  const depositDisplay = (selectedService ? deposit : reservationFee || 150).toFixed(0);

  const inputClass = 'w-full px-4 py-3.5 rounded-xl bg-ink border border-graphite text-ivory placeholder-ash focus:outline-none focus:border-gold-bright/50 focus:bg-ink transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="bg-white text-ivory overflow-hidden">
      {/* Scan line */}
      <div className="scan-line" />

      {/* ── PAGE PARALLAX BACKGROUND ─────────────────────────── */}
      <ParallaxBackground />
      {/* Scan line */}
      <div className="scan-line" />

      {/* ── PAGE PARALLAX BACKGROUND ─────────────────────────── */}
      <ParallaxBackground />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="ellipse-rings">
          {[300, 500].map((size, i) => (
            <div key={i} className="ellipse-ring" style={{ width: size, height: size, animationDelay: `${i}s` }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-20 text-center">
          <FadeIn>
            <div className="inline-flex mb-8">
              <span className="section-label">
                <CalendarDays className="w-3.5 h-3.5" />
                Easy Booking
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Book Your <span className="text-gradient">Appointment</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-silver text-lg max-w-xl mx-auto">
              Schedule your visit with our expert medical team in just a few clicks.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── BOOKING BODY ─────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden border-t border-graphite">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top info row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Clinic images — genuine photos of the practice */}
            <div className="space-y-5">
              <FadeIn direction="left">
                <div className="relative h-72 rounded-2xl overflow-hidden border border-graphite group">
                  <Image src="/image/practice_inside/IMG-20260612-WA0040.jpg" alt="The lounge-style waiting area at The Venous Lounge" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ivory/85 via-ivory/10 to-transparent" />
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-confirmed/30 bg-white/90 backdrop-blur text-confirmed text-[11px] font-semibold uppercase tracking-wider shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-confirmed animate-pulse" />
                    This is our actual space
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-white font-semibold">A lounge, not a waiting room</div>
                    <div className="text-white/80 text-sm">Soft seating and an unhurried, calm atmosphere</div>
                  </div>
                </div>
              </FadeIn>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { src: '/image/practice_outside/IMG-20260612-WA0035.jpg', label: 'Find the green gate' },
                  { src: '/image/practice_inside/IMG-20260612-WA0037.jpg',  label: 'Walk in & settle' },
                  { src: '/image/practice_inside/IMG-20260612-WA0038.jpg',  label: 'Room to relax' },
                ].map((img, i) => (
                  <FadeIn key={i} delay={i * 0.1} direction="left">
                    <div className="relative h-32 rounded-xl overflow-hidden border border-graphite group">
                      <Image src={img.src} alt={img.label} fill sizes="(max-width: 1024px) 33vw, 16vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ivory/85 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-2">
                        <span className="text-white text-xs font-semibold leading-tight">{img.label}</span>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Why book */}
            <FadeIn direction="right">
              <div className="card-dark p-8">
                <h3 className="text-ivory text-xl font-bold mb-6">Why Book With Us?</h3>
                <ul className="space-y-5">
                  {[
                    { Icon: Clock,      title: 'Quick & Easy',        desc: 'Book in under 2 minutes' },
                    { Icon: CreditCard, title: 'All Medical Aids',    desc: 'We accept all major schemes' },
                    { Icon: CalendarDays, title: 'Flexible Hours',      desc: 'Mon–Fri: 8AM–10PM, Sat–Sun: 8AM–1PM' },
                    { Icon: MapPin,     title: 'Convenient Location', desc: 'Phahameng, Bloemfontein' },
                  ].map((item, i) => (
                    <motion.li key={i} className="flex items-start gap-4 group"
                      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold-bright/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                        <item.Icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <div className="text-ivory font-medium text-sm">{item.title}</div>
                        <div className="text-silver text-sm">{item.desc}</div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Submit error */}
          {submitError && (
            <FadeIn>
              <div className="mb-8 rounded-xl border border-rose/20 bg-rose/10 p-5 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-rose flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-rose font-bold">We couldn&apos;t complete your booking</div>
                  <div className="text-silver text-sm mt-1">{submitError}</div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Medical-aid success — shown in place of the form (no payment redirect) */}
          {maSuccess && (
            <FadeIn>
              <div className="card-dark p-8 md:p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-confirmed/10 border border-confirmed/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-confirmed" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-ivory mb-3">
                  Booking confirmed — pending medical-aid authorization
                </h2>
                <p className="text-silver text-sm md:text-base max-w-md mx-auto">
                  Your appointment is locked in
                  {maSuccess.id != null && (
                    <> — booking <span className="font-semibold text-ivory">#{maSuccess.id}</span></>
                  )}
                  , and we&apos;ve emailed you the details. Our team is now verifying funding
                  with your scheme. If anything&apos;s needed, we&apos;ll be in touch.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/" className="btn-glow px-10 group">
                    <div className="glow-ring" />
                    <span className="relative z-10">Back to home</span>
                    <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Form */}
          {!maSuccess && (
          <FadeIn>
            <div className="card-dark p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Personal info */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-6 h-6 text-gold" />
                    <h2 className="text-2xl font-bold text-ivory">Personal Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { id: 'firstName', label: 'First Name', type: 'text', placeholder: 'John', required: true },
                      { id: 'lastName',  label: 'Last Name',  type: 'text', placeholder: 'Doe',  required: true },
                      { id: 'email',     label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
                      { id: 'phone',     label: 'Phone Number',  type: 'tel',   placeholder: '+27 51 000 0000',  required: true },
                    ].map((f, idx) => (
                      <motion.div key={f.id}
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                      >
                        <label className="block text-silver text-xs uppercase tracking-wider mb-2">{f.label} {f.required && '*'}</label>
                        <input
                          type={f.type} id={f.id} name={f.id} required={f.required}
                          value={formData[f.id as keyof typeof formData]}
                          onChange={handleChange}
                          className={inputClass} placeholder={f.placeholder}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Appointment details */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <CalendarDays className="w-6 h-6 text-gold" />
                    <h2 className="text-2xl font-bold text-ivory">Appointment Details</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-7">
                    {/* ── Service — opens a modal picker ──────────── */}
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
                      <label className="block text-silver text-xs uppercase tracking-wider mb-2">Service *</label>
                      <button
                        type="button"
                        onClick={() => setServiceModalOpen(true)}
                        disabled={!services.length && !servicesError}
                        className="w-full text-left px-4 py-4 rounded-xl bg-ink border border-graphite hover:border-gold-bright/50 focus:outline-none focus:border-gold-bright/60 transition-all duration-200 flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <span className="w-11 h-11 rounded-lg bg-gold/10 border border-gold-bright/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                          <Stethoscope className="w-5 h-5 text-gold" />
                        </span>
                        <span className="min-w-0 flex-1">
                          {selectedService ? (
                            <>
                              <span className="block text-ivory font-semibold text-sm truncate">{selectedService.name}</span>
                              <span className="block text-silver text-xs mt-0.5">
                                R{selectedService.price} · {selectedService.duration} min · R{deposit.toFixed(0)} deposit today
                              </span>
                            </>
                          ) : (
                            <span className="block text-ash text-sm">
                              {servicesError ? 'Unable to load services — tap to retry' : services.length ? 'Tap to choose a service' : 'Loading services…'}
                            </span>
                          )}
                        </span>
                        <ChevronRight className="w-5 h-5 text-ash flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
                      </button>
                      {selectedService?.description && (
                        <p className="text-silver text-xs mt-2">{selectedService.description}</p>
                      )}
                      {servicesError && (
                        <p className="text-rose text-xs mt-2">{servicesError}</p>
                      )}
                    </motion.div>

                    {/* ── Preferred date ──────────────────────────── */}
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                      <label className="block text-silver text-xs uppercase tracking-wider mb-2">Preferred Date *</label>
                      <div className="relative">
                        <CalendarDays className="w-5 h-5 text-gold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="date" name="date" required min={today} value={formData.date} onChange={handleChange}
                          className={`${inputClass} pl-12 [color-scheme:light]`}
                        />
                      </div>
                    </motion.div>

                    {/* ── Available time — selectable chips ───────── */}
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                      <label className="flex items-center gap-2 text-silver text-xs uppercase tracking-wider mb-3">
                        Available Time *
                        {slotsLoading && <Loader2 className="w-3 h-3 animate-spin text-gold" />}
                      </label>

                      {(!formData.serviceId || !formData.date) && (
                        <div className="rounded-xl border border-dashed border-graphite bg-ink/50 px-4 py-5 text-center">
                          <p className="text-ash text-sm">Choose a service &amp; date to see open times.</p>
                        </div>
                      )}

                      {formData.serviceId && formData.date && slotsLoading && (
                        <div className="rounded-xl border border-graphite bg-ink/50 px-4 py-5 flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-gold" />
                          <span className="text-silver text-sm">Checking availability…</span>
                        </div>
                      )}

                      {formData.serviceId && formData.date && !slotsLoading && slotsError && (
                        <p className="text-rose text-sm">{slotsError}</p>
                      )}

                      {formData.serviceId && formData.date && !slotsLoading && !slotsError && slots.length === 0 && (
                        <div className="rounded-xl border border-graphite bg-ink/50 px-4 py-5 text-center">
                          <p className="text-ash text-sm">No open times on this day — try another date.</p>
                        </div>
                      )}

                      {!slotsLoading && slots.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                          {slots.map((s) => {
                            const active = formData.slot === s.start_time;
                            return (
                              <button
                                key={s.start_time}
                                type="button"
                                onClick={() => selectSlot(s.start_time)}
                                className={`px-3 py-3 rounded-xl text-sm font-medium border transition-all duration-200 flex items-center justify-center ${
                                  active
                                    ? 'bg-gold text-white border-gold shadow-md shadow-gold/20'
                                    : 'bg-ink border-graphite text-mist hover:border-gold-bright/40 hover:text-gold'
                                }`}
                              >
                                {formatSlotTime(s.start_time, business?.timezone)}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {business && slots.length > 0 && !slotsLoading && (
                        <p className="text-ash text-xs mt-3">Times shown in {business.timezone}.</p>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-lg">💬</span>
                    <label className="text-silver text-xs uppercase tracking-wider">Additional Notes</label>
                  </div>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className={inputClass} placeholder="Please provide any additional information about your visit..." />
                </div>

                {/* ── Payment method ──────────────────────────────── */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-gold" />
                    <h2 className="text-2xl font-bold text-ivory">How would you like to pay?</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {([
                      {
                        key: 'deposit' as const, Icon: CreditCard,
                        title: 'Card deposit',
                        desc: 'Pay a small deposit online now to lock in your slot. Balance settled at the practice.',
                      },
                      {
                        key: 'medical_aid' as const, Icon: HeartPulse,
                        title: 'Medical aid',
                        desc: 'No payment now — we confirm your slot and verify funding with your scheme.',
                      },
                    ]).map(({ key, Icon, title, desc }) => {
                      const active = payMethod === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => { setPayMethod(key); setSubmitError(null); }}
                          aria-pressed={active}
                          className={`text-left rounded-xl border p-4 flex items-start gap-3 transition-all duration-200 ${
                            active
                              ? 'border-gold bg-gold/5 ring-1 ring-gold/30'
                              : 'border-graphite bg-ink hover:border-gold-bright/40'
                          }`}
                        >
                          <span className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${
                            active ? 'bg-gold/15 border-gold-bright/30' : 'bg-gold/10 border-gold-bright/20'
                          }`}>
                            <Icon className="w-5 h-5 text-gold" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2">
                              <span className="text-ivory font-semibold text-sm">{title}</span>
                              {active && <Check className="w-3.5 h-3.5 text-gold" />}
                            </span>
                            <span className="block text-silver text-xs mt-1 leading-relaxed">{desc}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Medical aid details — only when that path is chosen */}
                  <AnimatePresence initial={false}>
                    {payMethod === 'medical_aid' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
                          <div>
                            <label className="block text-silver text-xs uppercase tracking-wider mb-2">Medical Aid Scheme *</label>
                            <input
                              type="text" name="medicalAidScheme" list="ma-schemes"
                              required={payMethod === 'medical_aid'}
                              value={formData.medicalAidScheme} onChange={handleChange}
                              className={inputClass} placeholder="e.g. Discovery Health"
                              autoComplete="off"
                            />
                            <datalist id="ma-schemes">
                              {['Discovery Health', 'Bonitas', 'Momentum Health', 'Medihelp', 'Bestmed',
                                'Fedhealth', 'GEMS', 'Profmed', 'Sizwe Hosmed', 'Medshield', 'Bankmed',
                                'Polmed', 'Keyhealth'].map((s) => <option key={s} value={s} />)}
                            </datalist>
                          </div>
                          <div>
                            <label className="block text-silver text-xs uppercase tracking-wider mb-2">Membership Number *</label>
                            <input
                              type="text" name="medicalAidNumber"
                              required={payMethod === 'medical_aid'}
                              value={formData.medicalAidNumber} onChange={handleChange}
                              className={inputClass} placeholder="Your medical aid number"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="mt-4 rounded-xl border border-gold-bright/25 bg-gold/5 p-4 flex items-start gap-3">
                          <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          <p className="text-silver text-xs leading-relaxed">
                            Your appointment is confirmed straight away. Our team then verifies
                            funding with your scheme — if it can&apos;t be authorized, we&apos;ll let you
                            know by email and help you find another option.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-3 pt-2">
                  <button type="submit" disabled={submitting} className="btn-glow px-12 group disabled:opacity-60 disabled:cursor-not-allowed">
                    <div className="glow-ring" />
                    {submitting ? (
                      <>
                        <Loader2 className="relative z-10 w-4 h-4 animate-spin" />
                        <span className="relative z-10">
                          {payMethod === 'medical_aid' ? 'Confirming booking…' : 'Redirecting to payment…'}
                        </span>
                      </>
                    ) : payMethod === 'medical_aid' ? (
                      <>
                        <span className="relative z-10">Confirm booking</span>
                        <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">
                          Pay deposit
                          {selectedService && ` · R${deposit.toFixed(2)}`}
                        </span>
                        <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  {payMethod === 'deposit' && selectedService && balanceDue > 0 && (
                    <p className="text-silver text-xs">
                      A non-refundable deposit of R{deposit.toFixed(2)} secures your
                      slot. The remaining R{balanceDue.toFixed(2)} is payable at the
                      practice.
                    </p>
                  )}
                  {payMethod === 'medical_aid' ? (
                    <p className="flex items-center gap-1.5 text-ash text-xs">
                      <HeartPulse className="w-3.5 h-3.5" />
                      No payment now — your slot is confirmed and funding is verified by our team.
                    </p>
                  ) : (
                    <p className="flex items-center gap-1.5 text-ash text-xs">
                      <CreditCard className="w-3.5 h-3.5" />
                      Secure payment via Yoco. Your slot is confirmed once the deposit completes.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </FadeIn>
          )}

          {/* Help card */}
          <FadeIn delay={0.1}>
            <div className="card-dark p-8 mt-8">
              <div className="flex items-center gap-3 mb-5">
                <AlertCircle className="w-6 h-6 text-gold" />
                <h3 className="text-ivory text-xl font-bold">Need Help?</h3>
              </div>
              <p className="text-silver text-sm mb-6">If you have any questions or need assistance with booking, please contact us:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { Icon: Phone, label: 'Phone', value: '+27 51 447 9589', href: 'tel:+27514479589' },
                  { Icon: Mail, label: 'Email', value: 'dr.sesingsurg@gmail.com', href: 'mailto:dr.sesingsurg@gmail.com' },
                ].map((item, i) => (
                  <motion.a key={i} href={item.href} className="card-dark-2 p-4 flex items-center gap-3 hover:border-gold-bright/20 transition-all duration-300 group"
                    whileHover={{ y: -2 }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold-bright/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <item.Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <div className="text-ash text-xs uppercase tracking-wider">{item.label}</div>
                      <div className="text-mist text-sm font-medium">{item.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICE PICKER MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {serviceModalOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            role="dialog" aria-modal="true" aria-label="Choose a service"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-ivory/60 backdrop-blur-sm" onClick={() => setServiceModalOpen(false)} />

            {/* Panel */}
            <motion.div
              className="relative z-10 w-full sm:max-w-lg max-h-[88vh] flex flex-col bg-white border border-graphite rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 px-6 pt-6 pb-4 border-b border-graphite">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gold/10 border border-gold-bright/20 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-gold" />
                  </span>
                  <div>
                    <h3 className="text-ivory font-bold text-lg leading-tight">Choose your service</h3>
                    <p className="text-ash text-xs">Prices shown are the full service fee</p>
                  </div>
                </div>
                <button
                  type="button" onClick={() => setServiceModalOpen(false)} aria-label="Close"
                  className="w-9 h-9 rounded-lg border border-graphite text-silver hover:text-ivory hover:border-gold-bright/30 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Deposit explainer */}
              <div className="px-6 pt-5">
                <div className="rounded-xl border border-gold-bright/25 bg-gold/5 p-4 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="text-ivory font-semibold">Pay only an R{depositDisplay} deposit today</div>
                    <p className="text-silver text-xs mt-1 leading-relaxed">
                      This deposit is <span className="text-mist font-medium">non-refundable</span> and secures your slot.
                      The balance (the difference between the service price and your deposit) is settled at the practice.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service list */}
              <div className="px-6 py-5 overflow-y-auto space-y-3">
                {servicesError && (
                  <p className="text-rose text-sm text-center py-6">{servicesError}</p>
                )}
                {!servicesError && !services.length && (
                  <div className="flex items-center justify-center gap-2 py-8">
                    <Loader2 className="w-4 h-4 animate-spin text-gold" />
                    <span className="text-silver text-sm">Loading services…</span>
                  </div>
                )}
                {services.map((s) => {
                  const price = Number(s.price);
                  const dep = Math.min(reservationFee || price, price);
                  const balance = Math.max(0, price - dep);
                  const active = String(s.id) === formData.serviceId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => selectService(String(s.id))}
                      className={`w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-start gap-3 ${
                        active
                          ? 'border-gold bg-gold/5 ring-1 ring-gold/30'
                          : 'border-graphite bg-white hover:border-gold-bright/40 hover:bg-gold/[0.03]'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-ivory font-semibold text-sm">{s.name}</span>
                          <span className="text-gold font-bold text-sm whitespace-nowrap">R{s.price}</span>
                        </div>
                        {s.description && (
                          <p className="text-silver text-xs mt-1 line-clamp-2">{s.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5">
                          <span className="inline-flex items-center gap-1 text-ash text-xs">
                            <Clock className="w-3 h-3" /> {s.duration} min
                          </span>
                          <span className="inline-flex items-center gap-1 text-confirmed text-xs font-medium">
                            <Check className="w-3 h-3" /> R{dep.toFixed(0)} deposit today
                          </span>
                          {balance > 0 && (
                            <span className="text-ash text-xs">R{balance.toFixed(0)} at the practice</span>
                          )}
                        </div>
                      </div>
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        active ? 'bg-gold border-gold' : 'border-graphite'
                      }`}>
                        {active && <Check className="w-3.5 h-3.5 text-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Footer note */}
              <div className="px-6 py-4 border-t border-graphite bg-ink/40">
                <p className="flex items-center gap-1.5 text-ash text-xs">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  You can change your service any time before paying.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  CalendarDays, Phone, MapPin, Clock, CreditCard,
  ArrowRight, CheckCircle2, AlertCircle, Mail, Loader2,
} from 'lucide-react';
import ParallaxBackground from '@/components/ParallaxBackground';
import {
  getBusiness, getServices, getAvailability, createBooking,
  type PublicBusiness, type PublicService, type TimeSlot, type PublicBookingResponse,
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
  });

  // Remote data
  const [business, setBusiness] = useState<PublicBusiness | null>(null);
  const [services, setServices] = useState<PublicService[]>([]);
  const [servicesError, setServicesError] = useState<string | null>(null);

  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<PublicBookingResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chosen = slots.find((s) => s.start_time === formData.slot);
    if (!formData.serviceId || !chosen) {
      setSubmitError('Please choose a service, date, and an available time.');
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const booking = await createBooking({
        service_id: Number(formData.serviceId),
        start_datetime: chosen.start_time,
        end_datetime: chosen.end_time,
        customer_first_name: formData.firstName.trim(),
        customer_last_name: formData.lastName.trim(),
        customer_email: formData.email.trim(),
        customer_phone: formData.phone.trim() || null,
        notes: formData.message.trim() || null,
      });
      setConfirmation(booking);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', date: '', serviceId: '', slot: '', message: '' });
      setSlots([]);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  }, [slots, formData]);

  const selectedService = services.find((s) => String(s.id) === formData.serviceId);
  const today = new Date().toISOString().split('T')[0];

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
            {/* Clinic images */}
            <div className="space-y-5">
              <FadeIn direction="left">
                <div className="relative h-72 rounded-2xl overflow-hidden border border-graphite group">
                  <Image src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80" alt="Clinic" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <div className="text-white font-semibold">Comfortable Waiting Area</div>
                    <div className="text-white/80 text-sm">Relax in our modern lounge-style facility</div>
                  </div>
                </div>
              </FadeIn>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&q=80', label: 'Expert Consultations', icon: '👨‍⚕️' },
                  { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&q=80', label: 'Private Treatment Rooms', icon: '🏥' },
                ].map((img, i) => (
                  <FadeIn key={i} delay={i * 0.1} direction="left">
                    <div className="relative h-36 rounded-xl overflow-hidden border border-graphite group">
                      <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <span className="text-lg">{img.icon}</span>
                        <span className="text-white text-xs font-semibold">{img.label}</span>
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

          {/* Success */}
          {confirmation && (
            <FadeIn>
              <div className="mb-8 rounded-xl border border-confirmed/20 bg-confirmed/10 p-5 flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-confirmed flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-confirmed font-bold">Appointment request received!</div>
                  <div className="text-silver text-sm mt-1">
                    Booking reference <span className="font-semibold text-ivory">#{confirmation.id}</span>
                    {' · '}status <span className="font-semibold uppercase">{confirmation.status}</span>.
                    Our team will confirm your slot of{' '}
                    <span className="font-semibold text-ivory">
                      {formatSlotTime(confirmation.start_datetime, business?.timezone)}
                    </span>{' '}
                    shortly. A confirmation will be sent to {confirmation.customer_email}.
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

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

          {/* Form */}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
                      <label className="block text-silver text-xs uppercase tracking-wider mb-2">Service *</label>
                      <select name="serviceId" required value={formData.serviceId} onChange={handleChange} disabled={!services.length} className={inputClass}>
                        <option value="" className="bg-white">
                          {servicesError ? 'Unable to load services' : services.length ? 'Select a service' : 'Loading services…'}
                        </option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id} className="bg-white">
                            {s.name} — R{s.price} · {s.duration} min
                          </option>
                        ))}
                      </select>
                      {selectedService?.description && (
                        <p className="text-silver text-xs mt-2">{selectedService.description}</p>
                      )}
                      {servicesError && (
                        <p className="text-rose text-xs mt-2">{servicesError}</p>
                      )}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                      <label className="block text-silver text-xs uppercase tracking-wider mb-2">Preferred Date *</label>
                      <input type="date" name="date" required min={today} value={formData.date} onChange={handleChange} className={inputClass} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                      <label className="flex items-center gap-2 text-silver text-xs uppercase tracking-wider mb-2">
                        Available Time *
                        {slotsLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                      </label>
                      <select name="slot" required value={formData.slot} onChange={handleChange} disabled={!formData.serviceId || !formData.date || slotsLoading || !slots.length} className={inputClass}>
                        <option value="" className="bg-white">
                          {!formData.serviceId || !formData.date
                            ? 'Pick a service & date first'
                            : slotsLoading
                              ? 'Checking availability…'
                              : slots.length
                                ? 'Select a time'
                                : 'No open slots for this date'}
                        </option>
                        {slots.map((s) => (
                          <option key={s.start_time} value={s.start_time} className="bg-white">
                            {formatSlotTime(s.start_time, business?.timezone)}
                          </option>
                        ))}
                      </select>
                      {slotsError && <p className="text-rose text-xs mt-2">{slotsError}</p>}
                      {business && (
                        <p className="text-ash text-xs mt-2">Times shown in {business.timezone}.</p>
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

                {/* Submit */}
                <div className="flex justify-center pt-2">
                  <button type="submit" disabled={submitting} className="btn-glow px-12 group disabled:opacity-60 disabled:cursor-not-allowed">
                    <div className="glow-ring" />
                    {submitting ? (
                      <>
                        <Loader2 className="relative z-10 w-4 h-4 animate-spin" />
                        <span className="relative z-10">Booking…</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Book Appointment</span>
                        <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </FadeIn>

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
    </div>
  );
}

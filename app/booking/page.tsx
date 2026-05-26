'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  CalendarDays, Phone, MapPin, Clock, CreditCard,
  ArrowRight, CheckCircle2, AlertCircle, Mail,
} from 'lucide-react';
import ParallaxBackground from '@/components/ParallaxBackground';

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

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    date: '', time: '', department: '', doctor: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', date: '', time: '', department: '', doctor: '', message: '' });
    }, 3000);
  };

  const departments = ['General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Neurology', 'Gynecology', 'Ophthalmology'];
  const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'];
  const today = new Date().toISOString().split('T')[0];

  const inputClass = 'w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all duration-200 text-sm';

  return (
    <div className="bg-[#26262e] text-white overflow-hidden">
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
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Schedule your visit with our expert medical team in just a few clicks.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── BOOKING BODY ─────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden border-t border-white/[0.06]">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top info row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Clinic images */}
            <div className="space-y-5">
              <FadeIn direction="left">
                <div className="relative h-72 rounded-2xl overflow-hidden border border-white/[0.08] group">
                  <Image src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80" alt="Clinic" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26262e]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <div className="text-white font-semibold">Comfortable Waiting Area</div>
                    <div className="text-white/40 text-sm">Relax in our modern lounge-style facility</div>
                  </div>
                </div>
              </FadeIn>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&q=80', label: 'Expert Consultations', icon: '👨‍⚕️' },
                  { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&q=80', label: 'Private Treatment Rooms', icon: '🏥' },
                ].map((img, i) => (
                  <FadeIn key={i} delay={i * 0.1} direction="left">
                    <div className="relative h-36 rounded-xl overflow-hidden border border-white/[0.08] group">
                      <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#26262e]/80 to-transparent" />
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
                <h3 className="text-white text-xl font-bold mb-6">Why Book With Us?</h3>
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
                      <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600/20 transition-colors">
                        <item.Icon className="w-4 h-4 text-violet-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{item.title}</div>
                        <div className="text-white/40 text-sm">{item.desc}</div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Success */}
          {submitted && (
            <FadeIn>
              <div className="mb-8 rounded-xl border border-green-500/20 bg-green-500/10 p-5 flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-green-400 font-bold">Appointment Booked Successfully!</div>
                  <div className="text-green-400/60 text-sm">We'll send you a confirmation shortly.</div>
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
                    <AlertCircle className="w-6 h-6 text-violet-400" />
                    <h2 className="text-2xl font-bold text-white">Personal Information</h2>
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
                        <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">{f.label} {f.required && '*'}</label>
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
                    <CalendarDays className="w-6 h-6 text-violet-400" />
                    <h2 className="text-2xl font-bold text-white">Appointment Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
                      <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Department *</label>
                      <select name="department" required value={formData.department} onChange={handleChange} className={inputClass}>
                        <option value="" className="bg-[#34343e]">Select Department</option>
                        {departments.map(d => <option key={d} value={d} className="bg-[#34343e]">{d}</option>)}
                      </select>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
                      <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Preferred Doctor</label>
                      <input type="text" name="doctor" value={formData.doctor} onChange={handleChange} className={inputClass} placeholder="Dr. Sesing" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                      <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Preferred Date *</label>
                      <input type="date" name="date" required min={today} value={formData.date} onChange={handleChange} className={inputClass} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                      <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Preferred Time *</label>
                      <select name="time" required value={formData.time} onChange={handleChange} className={inputClass}>
                        <option value="" className="bg-[#34343e]">Select Time</option>
                        {timeSlots.map(t => <option key={t} value={t} className="bg-[#34343e]">{t}</option>)}
                      </select>
                    </motion.div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-lg">💬</span>
                    <label className="text-white/40 text-xs uppercase tracking-wider">Additional Notes</label>
                  </div>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className={inputClass} placeholder="Please provide any additional information about your visit..." />
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-2">
                  <button type="submit" className="btn-glow px-12 group">
                    <div className="glow-ring" />
                    <span className="relative z-10">Book Appointment</span>
                    <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </div>
          </FadeIn>

          {/* Help card */}
          <FadeIn delay={0.1}>
            <div className="card-dark p-8 mt-8">
              <div className="flex items-center gap-3 mb-5">
                <AlertCircle className="w-6 h-6 text-violet-400" />
                <h3 className="text-white text-xl font-bold">Need Help?</h3>
              </div>
              <p className="text-white/40 text-sm mb-6">If you have any questions or need assistance with booking, please contact us:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { Icon: Phone, label: 'Phone', value: '+27 51 447 9589', href: 'tel:+27514479589' },
                  { Icon: Mail, label: 'Email', value: 'dr.sesingsurg@gmail.com', href: 'mailto:dr.sesingsurg@gmail.com' },
                ].map((item, i) => (
                  <motion.a key={i} href={item.href} className="card-dark-2 p-4 flex items-center gap-3 hover:border-violet-500/20 transition-all duration-300 group"
                    whileHover={{ y: -2 }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600/20 transition-colors">
                      <item.Icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-white/30 text-xs uppercase tracking-wider">{item.label}</div>
                      <div className="text-white/70 text-sm font-medium">{item.value}</div>
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

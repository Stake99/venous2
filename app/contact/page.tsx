'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import ParallaxBackground from '@/components/ParallaxBackground';

interface FadeInProps { children: React.ReactNode; delay?: number; className?: string; direction?: 'up'|'left'|'right'|'none'; }
function FadeIn({ children, delay = 0, className = '', direction = 'up' }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const offsets: Record<string, { y?: number; x?: number }> = { up: { y: 40 }, left: { x: -40 }, right: { x: 40 }, none: {} };
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, filter: 'blur(6px)', ...offsets[direction] }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const inputClass = 'w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all duration-200 text-sm';

  return (
    <div className="bg-[#26262e] text-white overflow-hidden">
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
                <MessageSquare className="w-3.5 h-3.5" />
                Get in Touch
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Contact <span className="text-gradient">Us</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Have questions? We're here to help. Reach out and we'll respond as soon as possible.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT BODY ─────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden border-t border-white/[0.06]">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left — info */}
            <FadeIn direction="left">
              {/* Clinic image */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-white/[0.08] mb-10 group">
                <Image src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80" alt="Venous Lounge" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26262e]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <div className="text-white font-semibold">Visit Our Clinic</div>
                  <div className="text-white/40 text-sm">Modern facilities in Phahameng, Bloemfontein</div>
                </div>
              </div>

              <div className="glow-divider justify-start mb-6">
                <span className="section-label">
                  <MapPin className="w-3 h-3" />
                  Our Location
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-8">
                Let's <span className="text-gradient-subtle">Connect</span>
              </h2>

              <div className="space-y-4">
                {[
                  { Icon: MapPin, title: 'Address', content: '6571 Dr Lebona Street, Phahameng, Bloemfontein, South Africa' },
                  { Icon: Phone,   title: 'Phone',   content: '+27 51 447 9589', href: 'tel:+27514479589' },
                  { Icon: Mail,    title: 'Email',   content: 'dr.sesingsurg@gmail.com', href: 'mailto:dr.sesingsurg@gmail.com' },
                  { Icon: Clock,   title: 'Hours',   content: 'Mon–Fri: 08:00–22:00 · Sat–Sun: 08:00–13:00' },
                ].map((item, i) => (
                  <motion.div key={i} className="card-dark p-5 flex items-start gap-4 hover:border-violet-500/20 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600/20 transition-colors">
                      <item.Icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-white/30 text-xs uppercase tracking-wider mb-1">{item.title}</div>
                      {item.href
                        ? <a href={item.href} className="text-white/70 hover:text-white text-sm transition-colors">{item.content}</a>
                        : <div className="text-white/70 text-sm">{item.content}</div>}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-6 card-dark h-48 flex items-center justify-center rounded-2xl">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-violet-400/30 mx-auto mb-3" />
                  <p className="text-white/30 text-sm">Interactive Map Location</p>
                </div>
              </div>
            </FadeIn>

            {/* Right — form */}
            <FadeIn direction="right" delay={0.15}>
              <div className="card-dark p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>

                {submitted && (
                  <motion.div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4 flex items-center gap-3"
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <div className="text-green-400 font-semibold text-sm">Message Sent!</div>
                      <div className="text-green-400/60 text-xs">We'll get back to you soon.</div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
                    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+27 51 000 0000', required: false },
                  ].map((f, idx) => (
                    <motion.div key={f.id}
                      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                    >
                      <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">{f.label} {f.required && '*'}</label>
                      <input type={f.type} name={f.id} required={f.required} value={formData[f.id as keyof typeof formData]} onChange={handleChange} className={inputClass} placeholder={f.placeholder} />
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Subject *</label>
                    <select name="subject" required value={formData.subject} onChange={handleChange} className={inputClass}>
                      <option value="" className="bg-[#34343e]">Select a subject</option>
                      {['General Inquiry', 'Appointment Question', 'Billing Question', 'Medical Records', 'Feedback', 'Other'].map(o => (
                        <option key={o} value={o.toLowerCase()} className="bg-[#34343e]">{o}</option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Message *</label>
                    <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} className={inputClass} placeholder="How can we help you?" />
                  </motion.div>
                  <button type="submit" className="btn-glow w-full justify-center mt-2 group">
                    <div className="glow-ring" />
                    <span className="relative z-10">Send Message</span>
                    <Send className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}

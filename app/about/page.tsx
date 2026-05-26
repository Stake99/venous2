'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  HeartPulse, Shield, CreditCard, Users, Award, Stethoscope,
  ChevronDown, ArrowRight, CalendarDays, UserCheck, CheckCircle2,
} from 'lucide-react';
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

export default function AboutPage() {

  return (
    <div className="bg-[#26262e] text-white overflow-hidden">
      <div className="scan-line" />
      <ParallaxBackground />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>

        {/* Concentric rings */}
        <div className="ellipse-rings">
          {[300, 500, 700].map((size, i) => (
            <div key={i} className="ellipse-ring" style={{ width: size, height: size, animationDelay: `${i}s` }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-20 text-center">
          <FadeIn className="inline-flex mb-8">
            <span className="section-label"><HeartPulse className="w-3.5 h-3.5" />Our Practice</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              About <span className="text-gradient">The Venous Lounge</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
              Dr Sesing Surgery & Aesthetics — specialising in vein and general surgical care
              with a strong emphasis on patient safety, quality, and trust.
            </p>
          </FadeIn>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </section>

      {/* ── CLINIC IMAGES ────────────────────────────────────── */}
      <section className="relative py-20 border-t border-white/[0.06] overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80', label: 'Modern Reception',   sub: 'Welcoming lounge atmosphere' },
              { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80', label: 'Private Rooms',      sub: 'Comfortable consultation spaces' },
              { src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80', label: 'Advanced Equipment', sub: 'Latest medical technology' },
            ].map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative h-64 rounded-2xl overflow-hidden border border-white/[0.08] group">
                  <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26262e]/90 via-[#26262e]/20 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <div className="text-white font-semibold">{img.label}</div>
                    <div className="text-white/40 text-sm">{img.sub}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-white/[0.06]">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="glow-divider mb-6">
              <div className="glow-divider-line" />
              <span className="section-label">Who We Are</span>
              <div className="glow-divider-line right" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              The Venous Lounge —{' '}
              <span className="text-gradient-subtle">Dr Sesing Surgery & Aesthetics</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              A Bloemfontein-based medical-aesthetic practice specialising in vein and general surgical care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {[
              { Icon: HeartPulse, title: 'Your Health, our Priority Always', desc: 'We prioritise medical-care standards over purely cosmetic or lifestyle-focused services. Our practice is built on trust, reliability, and clinical excellence.' },
              { Icon: CreditCard, title: 'All Major Medical Aids Accepted',  desc: 'We work with most South African medical-aid schemes, making quality vein and surgical treatment more accessible to insured patients and their families.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="card-dark p-10 hover:border-violet-500/25 transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:bg-violet-600/20 transition-colors">
                    <item.Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/40 leading-relaxed">{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

            <div className="card-dark p-10">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-white mb-3">Our Expertise</h3>
                <p className="text-white/40 max-w-xl mx-auto">Combining general surgical skills with specialised venous treatments</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { Icon: Stethoscope, title: 'Vein Specialists',   desc: 'Minimally invasive procedures for varicose and spider veins' },
                  { Icon: Award,      title: 'General Surgery',    desc: 'Broader surgical expertise for comprehensive patient care' },
                  { Icon: Users,      title: 'Family-Oriented', desc: 'Reliable services for you and your loved ones' },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <motion.div className="card-dark-2 p-6 text-center hover:border-violet-500/20 transition-all duration-300 group"
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-600/20 transition-colors">
                        <item.Icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-white/[0.06]">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
              <div className="glow-divider justify-start mb-6">
                <span className="section-label">Our Approach</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                A Medically Grounded{' '}
                <span className="text-gradient-subtle">Approach</span>
              </h2>
              <div className="space-y-5 text-white/50 leading-relaxed">
                <p>The Venous Lounge operates as both a clinical and comfort-oriented environment for vein and surgical treatments. Our "lounge" concept combines professional medical care with a welcoming atmosphere.</p>
                <p>We focus on trust, reliability, and general-surgical expertise, rather than heavy marketing language. This medically grounded image reflects our commitment to quality care above all else.</p>
                <p>Our practice is designed for continuity of care — serving whole families and groups, not just individual patients.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { Icon: Shield,     title: 'Clinical Excellence',          desc: 'Professional medical standards in a comfortable lounge setting' },
                { Icon: Stethoscope, title: 'General Surgical Foundation', desc: 'Broader surgical skills supporting specialised vein treatments' },
                { Icon: CreditCard, title: 'Medical Aid Friendly',         desc: 'Working with most South African medical-aid schemes' },
                { Icon: Users,      title: 'Family-Oriented Care',       desc: 'Reliable services for you and your loved ones' },
              ].map((f, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <motion.div className="card-dark p-5 flex items-start gap-4 hover:border-violet-500/20 transition-all duration-300 group"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600/20 transition-colors">
                      <f.Icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{f.title}</div>
                      <div className="text-white/40 text-sm mt-0.5">{f.desc}</div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-white/[0.06]">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="glow-divider mb-6">
              <div className="glow-divider-line" />
              <span className="section-label">Our Values</span>
              <div className="glow-divider-line right" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              The Principles That <span className="text-gradient-subtle">Guide Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: Shield,     title: 'Patient Safety',   desc: 'Medical-care standards prioritised over cosmetic trends' },
              { Icon: UserCheck,  title: 'Trust & Reliability', desc: 'Medically grounded approach, not flashy marketing' },
              { Icon: Award,      title: 'Quality Care',      desc: 'Clinical excellence in a comfortable lounge setting' },
              { Icon: CreditCard, title: 'Accessibility',     desc: 'Medical aid acceptance and family-oriented services' },
            ].map((v, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  className="card-dark p-7 text-center hover:border-violet-500/25 transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-violet-600/20 transition-colors">
                    <v.Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                  <p className="text-white/40 text-sm">{v.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-white/[0.06]">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[300px] bg-violet-600/8 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="glow-divider mb-6">
              <div className="glow-divider-line" />
              <span className="section-label">Our Team</span>
              <div className="glow-divider-line right" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Meet Our <span className="text-gradient-subtle">Dedicated Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {[
              {
                name: 'Dr Mpho Sesing', role: 'General Practitioner', image: '/image/general_practitioner.jpg',
                desc: 'Expert in general medicine and primary care. Dedicated to providing comprehensive healthcare services with a focus on patient wellness.',
                specs: ['General Medicine', 'Primary Care', 'Preventive Healthcare', 'Patient Wellness'],
              },
              {
                name: 'Mrs Rebaone Kgware', role: 'Practice Manager', image: '/image/Practice_manager.jpg',
                desc: 'Ensures smooth operations and exceptional patient experience. Coordinates all aspects of practice management to deliver quality care.',
                specs: ['Practice Operations', 'Patient Coordination', 'Medical Aid Liaison', 'Quality Assurance'],
              },
            ].map((member, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.div
                  className="group card-dark overflow-hidden hover:border-violet-500/25 transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <Link href="/booking" className="block">
                    <div className="relative h-72 overflow-hidden">
                      <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent" />
                    </div>
                    <div className="p-8">
                      <h3 className="text-white text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-violet-400 text-sm font-medium mb-4">{member.role}</p>
                      <p className="text-white/40 text-sm leading-relaxed mb-5">{member.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.specs.map((s, j) => (
                          <span key={j} className="text-xs px-3 py-1 rounded-full border border-white/[0.08] text-white/40">{s}</span>
                        ))}
                      </div>
                      <div className="mt-6 text-violet-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                        Book Consultation
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { Icon: Award,      title: 'Qualified Professionals', desc: 'Extensive training and expertise' },
              { Icon: HeartPulse, title: '15+ Years Experience',    desc: 'Proven track record of success' },
              { Icon: UserCheck,  title: 'Patient-Centred',         desc: 'Your health is our priority' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div className="card-dark p-6 text-center hover:border-violet-500/20 transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-600/20 transition-colors">
                    <item.Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-white/[0.06]">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="ellipse-rings">
          {[200, 400, 600].map((size, i) => (
            <div key={i} className="ellipse-ring" style={{ width: size, height: size, animationDelay: `${i * 1.2}s` }} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-violet-600/10 rounded-full filter blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-gradient-subtle">The Venous Lounge</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: Award,      number: '15+',  label: 'Years Experience' },
              { Icon: CheckCircle2, number: '1000+',label: 'Successful Procedures' },
              { Icon: CalendarDays, number: '6',    label: 'Days Open Weekly' },
              { Icon: CreditCard, number: 'All',  label: 'Major Medical Aids' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  className="card-dark p-8 text-center hover:border-violet-500/25 transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-600/20 transition-colors">
                    <s.Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{s.number}</div>
                  <div className="text-white/40 text-sm">{s.label}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

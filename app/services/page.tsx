'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Droplet, Brain, Briefcase, TestTube, Pill, CalendarCheck, HeartPulse, Stethoscope, TrendingUp, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import ParallaxBackground from '@/components/ParallaxBackground';

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

export default function ServicesPage() {
  const services = [
    { slug: 'general-medical',     title: 'General Medical Services',  desc: 'Comprehensive GP and family medicine — from everyday illness to long-term condition management.',        Icon: Stethoscope, href: '/booking', features: ['GP consultations & medical examinations', 'Acute & chronic disease management', 'Health screenings & preventative care', 'Women’s, men’s, adolescent & elderly care', 'Minor procedures, wound care & dressings'] },
    { slug: 'iv-therapy',          title: 'Nutritional IV Therapy Lounge', desc: 'Custom vitamin and hydration drips delivered in our relaxed lounge — energy, immunity, recovery and wellness.', Icon: Droplet,    href: '/booking', features: ['Custom nutritional IV drips', 'Vitamin C, B-complex & B12 infusions', 'Immune boost & energy IV therapy', 'Hydration, recovery & detox drips', 'Build-your-own IV concoctions'] },
    { slug: 'mental-health',       title: 'Mental Health Services',    desc: 'Confidential screening and support for stress, anxiety and mood, with referral coordination when needed.',  Icon: Brain,       href: '/booking', features: ['Mental health screening', 'Stress & anxiety assessments', 'Depression screening', 'Psychological support', 'Workplace stress evaluations'] },
    { slug: 'occupational-health', title: 'Occupational Health Services', desc: 'Workplace medicals and fitness assessments for employers and employees.',                                Icon: Briefcase,   href: '/booking', features: ['Pre-employment medicals', 'Return-to-work & fitness-for-duty', 'Sick leave assessments', 'Injury-on-duty assessments', 'Medical motivation & accommodation reports'] },
    { slug: 'diagnostics',         title: 'Diagnostic & Screening Services', desc: 'On-site testing and vital monitoring for fast, informed clinical decisions.',                          Icon: TestTube,    href: '/booking', features: ['Blood glucose & cholesterol testing', 'Urine & pregnancy testing', 'ECG interpretation', 'Vital signs monitoring', 'Comprehensive health risk assessments'] },
    { slug: 'pharmacy',            title: 'Pharmacy & Medication Support', desc: 'Prescription renewals, medication reviews and patient education to keep treatment on track.',           Icon: Pill,        href: '/booking', features: ['Chronic prescription renewals', 'Medication reviews', 'Treatment monitoring', 'Patient medication education', 'Dispensing services (where applicable)'] },
    { slug: 'convenience',         title: 'Patient Convenience Services', desc: 'Care that fits your life — easy booking, telehealth and continuity from clinic to hospital and back.',   Icon: CalendarCheck, href: '/booking', features: ['Online appointment booking', 'Telephonic consultations', 'Follow-up & hospital referral coordination', 'Patient transport assistance', 'Continuity of care, clinic to hospital'] },
  ];

  return (
    <div className="bg-white text-ivory overflow-hidden">
      {/* Scan line */}
      <div className="scan-line" />

      {/* ── PAGE PARALLAX BACKGROUND ─────────────────────────── */}
      <ParallaxBackground />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="ellipse-rings">
          {[300, 500, 700].map((size, i) => (
            <div key={i} className="ellipse-ring" style={{ width: size, height: size, animationDelay: `${i}s` }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-20 text-center">
          <FadeIn>
            <div className="inline-flex mb-8">
              <span className="section-label">
                <Activity className="w-3.5 h-3.5" />
                Our Services
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Complete Care,{' '}
              <span className="text-gradient">One Practice</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              From everyday GP visits to IV wellness drips, mental health and occupational health — comprehensive care delivered with medical excellence.
            </p>
          </FadeIn>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5 text-ash" />
        </motion.div>
      </section>

      {/* ── FEATURED IMAGES ──────────────────────────────────── */}
      <section className="relative py-16 border-t border-graphite overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { src: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80', title: 'Primary Care',       sub: 'GP consultations & everyday medicine' },
              { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', title: 'IV Wellness Lounge', sub: 'Custom nutritional drips & hydration' },
            ].map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative h-80 rounded-2xl overflow-hidden border border-graphite group">
                  <Image src={img.src} alt={img.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ivory/90 via-ivory/20 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white text-2xl font-bold mb-1">{img.title}</h3>
                    <p className="text-white/80 text-sm">{img.sub}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-graphite">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="glow-divider mb-6">
              <div className="glow-divider-line" />
              <span className="section-label">
                <Stethoscope className="w-3 h-3" />
                All Services
              </span>
              <div className="glow-divider-line right" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory mb-4">
              What We <span className="text-gradient-subtle">Offer</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <Link
                  id={s.slug}
                  href={s.href}
                  className="group relative card-dark p-7 hover:border-gold-bright/30 transition-all duration-300 hover:-translate-y-1 block h-full scroll-mt-24"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-gold/5 transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="relative w-12 h-12 mb-5">
                      <div className="absolute inset-0 rounded-xl bg-gold/10 border border-gold-bright/20 group-hover:bg-gold/20 transition-colors" />
                      <div className="pulse-ring rounded-xl opacity-0 group-hover:opacity-100" />
                      <s.Icon className="absolute inset-0 m-auto w-5 h-5 text-gold group-hover:icon-glow transition-all" />
                    </div>
                    <h3 className="text-ivory font-semibold text-lg mb-2">{s.title}</h3>
                    <p className="text-silver text-sm leading-relaxed mb-5">{s.desc}</p>
                    <ul className="space-y-1.5 mb-5">
                      {s.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-silver text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                      Book this
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DR SESING ────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-graphite">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative rounded-3xl overflow-hidden border border-graphite">
                <div className="relative h-[520px] bg-[#f0ece6]">
                  <Image src="/image/venous.png" alt="Dr Sesing" fill className="object-contain p-12" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent" />
                </div>
                <motion.div
                  className="absolute top-6 right-6 glass rounded-2xl px-4 py-3 text-center"
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.4, type: 'spring' }}
                >
                  <div className="text-2xl font-bold text-ivory">15+</div>
                  <div className="text-silver text-xs">Years Exp.</div>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white">Dr Sesing</h3>
                  <p className="text-white/80 text-sm mt-1">General Practitioner</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="glow-divider justify-start mb-6">
                <span className="section-label">
                  <Stethoscope className="w-3 h-3" />
                  Meet Your Specialist
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-ivory mb-6">
                Expert Care from <span className="text-gradient-subtle">Dr Sesing</span>
              </h2>
              <p className="text-silver leading-relaxed mb-10">
                With over 15 years of experience in general medicine and primary care, Dr Sesing brings expertise, compassion, and a whole-person approach to every patient consultation.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { Icon: Stethoscope, title: 'Primary-Care Expertise', desc: 'GP consultations, chronic care and screenings' },
                  { Icon: HeartPulse,  title: 'Patient-Centred Approach', desc: 'Your comfort and wellbeing come first' },
                  { Icon: TrendingUp,  title: 'Whole-Family Care',       desc: 'Continuity of care for you and your loved ones' },
                ].map(({ Icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    className="card-dark p-4 flex items-start gap-4 hover:border-gold-bright/20 transition-all duration-300 group"
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold-bright/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <div className="text-ivory font-medium text-sm">{title}</div>
                      <div className="text-silver text-sm mt-0.5">{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/booking" className="btn-glow group">
                <div className="glow-ring" />
                <span className="relative z-10">Book Consultation with Dr Sesing</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-graphite">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="ellipse-rings">
          {[200, 400, 600].map((size, i) => (
            <div key={i} className="ellipse-ring" style={{ width: size, height: size, animationDelay: `${i * 1.2}s` }} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-gold/12 rounded-full filter blur-[100px]" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <div className="glow-divider mb-8">
              <div className="glow-divider-line" />
              <span className="section-label">
                <Activity className="w-3 h-3" />
                Book Now
              </span>
              <div className="glow-divider-line right" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-ivory mb-6">
              Ready to Schedule Your <span className="text-gradient">Appointment?</span>
            </h2>
            <p className="text-silver text-lg mb-12">Our team is here to provide you with the best medical care.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-glow group">
                <div className="glow-ring" />
                <span className="relative z-10">Book an Appointment</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn-glow-border group">
                <div className="glow-ring" />
                <span className="relative z-10">Contact Us</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

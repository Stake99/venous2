'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Sparkles, HeartPulse, Scissors, Stethoscope, Award, Users, TrendingUp, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
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
    { title: 'Varicose Veins',     desc: 'Advanced minimally invasive treatment using walk-in, walk-out procedures with proven results.',          Icon: Activity,    href: '/services/varicose-veins', features: ['Endovenous laser ablation', 'Sclerotherapy injections', 'Ambulatory phlebectomy', 'Comprehensive vein evaluation'] },
    { title: 'Spider Veins',       desc: 'Effective removal of spider and thread veins for clearer, healthier-looking skin.',                       Icon: Sparkles,    href: '/services/spider-veins',   features: ['Sclerotherapy treatment', 'Laser vein removal', 'Cosmetic vein therapy', 'Quick recovery time'] },
    { title: 'Aesthetic Services', desc: 'Professional cosmetic and aesthetic procedures to help you look and feel your best.',                     Icon: HeartPulse,  href: '/services/aesthetics',     features: ['Cosmetic consultations', 'Non-surgical treatments', 'Skin rejuvenation', 'Professional aesthetic care'] },
    { title: 'Venous Ulcers',      desc: 'Specialised treatment for chronic venous ulcers and leg swelling with comprehensive wound care.',         Icon: Scissors,    href: '/booking',                 features: ['Ulcer assessment', 'Compression therapy', 'Wound care management', 'Preventive care planning'] },
    { title: 'General Surgery',    desc: 'Minor surgical procedures and consultations backed by general surgical expertise.',                       Icon: Stethoscope, href: '/booking',                 features: ['Minor surgical procedures', 'Surgical consultations', 'Pre-operative assessments', 'Post-operative care'] },
    { title: 'Vein Evaluations',   desc: 'Comprehensive vein health assessments using advanced diagnostic techniques.',                             Icon: Award,       href: '/booking',                 features: ['Doppler ultrasound scanning', 'Venous insufficiency testing', 'Treatment planning', 'Follow-up assessments'] },
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
              Vein & Aesthetic{' '}
              <span className="text-gradient">Specialists</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              Expert vein treatment and aesthetic services delivered with medical excellence and patient care.
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
              { src: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80', title: 'Vein Treatments',    sub: 'Advanced minimally invasive procedures' },
              { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', title: 'Aesthetic Services', sub: 'Professional cosmetic treatments' },
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
                  href={s.href}
                  className="group relative card-dark p-7 hover:border-gold-bright/30 transition-all duration-300 hover:-translate-y-1 block h-full"
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
                      Learn more
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
                  <p className="text-white/80 text-sm mt-1">Vein & Aesthetic Specialist</p>
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
                With over 15 years of experience in vein treatment and aesthetic procedures, Dr Sesing brings expertise, compassion, and cutting-edge techniques to every patient consultation.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { Icon: Stethoscope, title: 'Minimally Invasive Specialist', desc: 'Expert in walk-in, walk-out vein procedures' },
                  { Icon: HeartPulse,  title: 'Patient-Centred Approach',      desc: 'Your comfort and results are our priority' },
                  { Icon: TrendingUp,  title: 'Proven Track Record',           desc: '1000+ successful treatments performed' },
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

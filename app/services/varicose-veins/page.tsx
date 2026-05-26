'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
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

export default function VaricoseVeinsPage() {
  return (
    <div className="bg-[#26262e] text-white overflow-hidden">
      {/* Scan line */}
      <div className="scan-line" />

      {/* ── PAGE PARALLAX BACKGROUND ─────────────────────────── */}
      <ParallaxBackground />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80" alt="Varicose veins" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#26262e]/95 to-[#26262e]/70" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full filter blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-20">
          <FadeIn>
            <Link href="/services" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 group transition-colors">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1 rotate-180" />
              Back to Services
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">🦵</span>
              </div>
              <div>
                <div className="section-label mb-3">Vein Treatment</div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white">Varicose Veins Treatment</h1>
                <p className="text-white/50 mt-2 text-lg">Advanced Minimally Invasive Solutions</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <section className="relative py-20 border-t border-white/[0.06] overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80', label: 'Expert Consultation' },
              { src: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80', label: 'Advanced Procedures' },
              { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80', label: 'Modern Facilities' },
            ].map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative h-56 rounded-2xl overflow-hidden border border-white/[0.08] group">
                  <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26262e]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">{img.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <div className="card-dark p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">About Varicose Veins</h2>
                  <p className="text-white/50 leading-relaxed mb-3">Varicose veins are enlarged, twisted veins that commonly appear in the legs. At The Venous Lounge, we specialise in modern, minimally invasive treatments that allow you to walk in and walk out the same day.</p>
                  <p className="text-white/50 leading-relaxed">Our procedures are performed by Dr Sesing, an experienced vein specialist, using the latest techniques to ensure minimal discomfort and maximum results.</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="card-dark p-8">
                  <h2 className="text-2xl font-bold text-white mb-5">Treatment Options</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Endovenous Laser Ablation (EVLA)', 'Radiofrequency Ablation', 'Sclerotherapy', 'Ambulatory Phlebectomy', 'Ultrasound-Guided Treatment', 'Compression Therapy', 'Medical Consultations', 'Follow-up Care'].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/60 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-violet-500 flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="card-dark p-8">
                  <h2 className="text-2xl font-bold text-white mb-5">Symptoms We Treat</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {['Visible twisted veins', 'Leg pain and aching', 'Swelling in legs', 'Heavy feeling in legs', 'Skin discoloration', 'Itching around veins', 'Leg cramps', 'Restless legs'].map((s, i) => (
                      <div key={i} className="card-dark-2 px-4 py-2.5 text-white/50 text-sm rounded-xl">{s}</div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="card-dark p-8">
                  <h2 className="text-2xl font-bold text-white mb-5">Why Choose Us?</h2>
                  <ul className="space-y-3">
                    {['Walk-in, walk-out procedures — no hospital stay required', 'All major medical aids accepted', 'Experienced vein specialist — Dr Sesing', 'Latest minimally invasive techniques', 'Flexible appointment times (Mon–Fri: 08:00–22:00, Sat: 08:00–13:00)', 'Comfortable lounge-style environment', 'Comprehensive follow-up care'].map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/50 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <FadeIn direction="right">
                <div className="card-dark p-7">
                  <h3 className="text-white font-bold text-lg mb-3">Book a Consultation</h3>
                  <p className="text-white/40 text-sm mb-5">Schedule your varicose vein assessment today.</p>
                  <Link href="/booking" className="btn-glow w-full justify-center group">
                    <div className="glow-ring" />
                    <span className="relative z-10">Book Now</span>
                    <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.1}>
                <div className="card-dark p-7">
                  <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
                  <div className="space-y-3">
                    {[
                      { Icon: MapPin, text: '6571 Dr Lebona Street, Phahameng, Bloemfontein' },
                      { Icon: Phone, text: '+27 51 447 9589', href: 'tel:+27514479589' },
                      { Icon: Mail, text: 'dr.sesingsurg@gmail.com', href: 'mailto:dr.sesingsurg@gmail.com' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <item.Icon className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        {item.href
                          ? <a href={item.href} className="text-white/40 hover:text-white text-sm transition-colors">{item.text}</a>
                          : <span className="text-white/40 text-sm">{item.text}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <div className="card-dark p-7">
                  <h3 className="text-white font-bold text-lg mb-4">Operating Hours</h3>
                  <div className="space-y-2 text-sm">
                    {[['Monday – Friday', '08:00 – 22:00'], ['Saturday', '08:00 – 13:00'], ['Sunday', 'Closed']].map(([day, hrs], i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-white/40">{day}</span>
                        <span className="text-white/70">{hrs}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.3}>
                <div className="card-dark p-7">
                  <h3 className="text-white font-bold text-lg mb-3">Medical Aid</h3>
                  <p className="text-white/40 text-sm mb-3">We accept all major medical aid schemes.</p>
                  <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm">
                    <span>💳</span> All Major Schemes
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

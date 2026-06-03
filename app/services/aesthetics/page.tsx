'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
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

export default function AestheticsPage() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="bg-white text-ivory overflow-hidden">
      {/* Scan line */}
      <div className="scan-line" />

      {/* ── PAGE PARALLAX BACKGROUND ─────────────────────────── */}
      <ParallaxBackground />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute inset-0 parallax-slow" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <Image src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80" alt="Aesthetics" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 to-ivory/70" />
        </div>
        <div className="absolute inset-0 pointer-events-none parallax-slow" style={{ transform: `translateY(${scrollY * 0.4}px)` }}>
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full filter blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-20">
          <Link href="/services" className="inline-flex items-center gap-2 text-silver hover:text-ivory text-sm mb-8 group transition-colors">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          <div className="flex items-center gap-5 parallax-medium" style={{ animation: 'fadeInUp 0.8s ease-out both', transform: `translateY(${scrollY * 0.18}px)` }}>
            <span className="text-6xl">✨</span>
            <div>
              <div className="section-label mb-3">Aesthetic Services</div>
              <h1 className="text-4xl lg:text-6xl font-bold text-ivory">Aesthetic Services</h1>
              <p className="text-silver mt-2 text-lg">Enhance Your Natural Beauty</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <section className="relative py-20 border-t border-graphite overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', label: 'Professional Consultations', offset: scrollY * 0.03 },
              { src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',    label: 'Advanced Treatments',       offset: 0 },
              { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80', label: 'Luxury Environment',         offset: -scrollY * 0.03 },
            ].map((img, i) => (
              <div key={i} className="relative h-56 rounded-2xl overflow-hidden border border-graphite group parallax-slow" style={{ transform: `translateY(${img.offset}px)` }}>
                <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white text-sm font-semibold">{img.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-dark p-8">
                <h2 className="text-2xl font-bold text-ivory mb-4">About Our Aesthetic Services</h2>
                <p className="text-silver leading-relaxed mb-3">At The Venous Lounge, we offer a comprehensive range of aesthetic and cosmetic procedures designed to help you look and feel your best. Our treatments are performed by Dr Sesing in a comfortable, lounge-style environment.</p>
                <p className="text-silver leading-relaxed">We combine medical expertise with aesthetic artistry to deliver natural-looking results that enhance your confidence and well-being.</p>
              </div>

              <div className="card-dark p-8">
                <h2 className="text-2xl font-bold text-ivory mb-5">Our Aesthetic Treatments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: '💉', title: 'Anti-Wrinkle Injections', desc: 'Reduce fine lines and wrinkles for a smoother, more youthful appearance' },
                    { icon: '💧', title: 'Dermal Fillers',          desc: 'Restore volume and contour to enhance facial features naturally' },
                    { icon: '✨', title: 'Skin Rejuvenation',       desc: 'Advanced treatments for clearer, brighter, more radiant skin' },
                    { icon: '🧴', title: 'Chemical Peels',          desc: 'Exfoliate and refresh skin for improved texture and tone' },
                    { icon: '⚡', title: 'Laser Treatments',        desc: 'Target pigmentation, scars, and skin imperfections' },
                    { icon: '🎯', title: 'Skin Tightening',         desc: 'Non-surgical procedures to firm and lift sagging skin' },
                  ].map((t, i) => (
                    <div key={i} className="card-dark-2 p-5 hover:border-gold-bright/20 transition-all duration-300">
                      <div className="text-3xl mb-3">{t.icon}</div>
                      <h3 className="text-ivory font-semibold text-sm mb-1">{t.title}</h3>
                      <p className="text-silver text-xs leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-dark p-8">
                <h2 className="text-2xl font-bold text-ivory mb-5">Popular Procedures</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Botox® & Dysport®',        areas: "Forehead, frown lines, crow's feet", duration: '15–20 min', results: '3–6 months' },
                    { name: 'Hyaluronic Acid Fillers',  areas: 'Lips, cheeks, nasolabial folds',     duration: '30–45 min', results: '6–18 months' },
                    { name: 'Microneedling',            areas: 'Face, neck, décolletage',            duration: '45–60 min', results: 'Progressive' },
                    { name: 'IPL Photofacial',          areas: 'Sun damage, pigmentation, redness',  duration: '30–45 min', results: 'Multiple sessions' },
                  ].map((p, i) => (
                    <div key={i} className="card-dark-2 p-5 rounded-xl">
                      <div className="text-ivory font-semibold text-sm mb-3">{p.name}</div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        {[['Areas', p.areas], ['Duration', p.duration], ['Results', p.results]].map(([label, val], j) => (
                          <div key={j}>
                            <div className="text-ash uppercase tracking-wider mb-1">{label}</div>
                            <div className="text-silver">{val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-dark p-8">
                <h2 className="text-2xl font-bold text-ivory mb-5">Your Treatment Journey</h2>
                <div className="space-y-5">
                  {[
                    { step: '1', icon: '👥', title: 'Consultation', desc: "Discuss your goals with Dr Sesing. We'll create a personalised treatment plan." },
                    { step: '2', icon: '📋', title: 'Preparation',  desc: 'Receive pre-treatment instructions and answer any questions you may have.' },
                    { step: '3', icon: '✨', title: 'Treatment',    desc: 'Relax in our comfortable lounge while we perform your procedure with precision.' },
                    { step: '4', icon: '💙', title: 'Aftercare',    desc: 'Follow simple post-treatment guidelines and schedule follow-up appointments.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold-bright/30 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                      <div>
                        <div className="text-ivory font-semibold text-sm mb-1">{item.title}</div>
                        <div className="text-silver text-sm">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="card-dark p-7">
                <h3 className="text-ivory font-bold text-lg mb-3">Book Your Consultation</h3>
                <p className="text-silver text-sm mb-5">Discover how aesthetic treatments can enhance your natural beauty.</p>
                <Link href="/booking" className="btn-glow w-full justify-center">
                  <div className="glow-ring" />
                  <span className="relative z-10">Book Now</span>
                </Link>
              </div>

              <div className="card-dark p-7">
                <h3 className="text-ivory font-bold text-lg mb-4">Treatment Benefits</h3>
                <div className="space-y-4">
                  {[
                    { icon: '⚡', label: 'Quick Procedures', value: 'Most treatments under 1 hour' },
                    { icon: '🚶', label: 'Minimal Downtime', value: 'Resume activities quickly' },
                    { icon: '✨', label: 'Natural Results',  value: 'Subtle, beautiful enhancements' },
                    { icon: '💰', label: 'Affordable',       value: 'Competitive pricing' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-ash text-xs uppercase tracking-wider">{item.label}</div>
                        <div className="text-silver text-sm">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-dark p-7">
                <h3 className="text-ivory font-bold text-lg mb-4">Contact</h3>
                <div className="space-y-3">
                  {[
                    { icon: '📍', text: '6571 Dr Lebona Street, Phahameng, Bloemfontein' },
                    { icon: '📞', text: '+27 51 447 9589', href: 'tel:+27514479589' },
                    { icon: '✉️', text: 'dr.sesingsurg@gmail.com', href: 'mailto:dr.sesingsurg@gmail.com' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg">{item.icon}</span>
                      {item.href
                        ? <a href={item.href} className="text-silver hover:text-ivory text-sm transition-colors">{item.text}</a>
                        : <span className="text-silver text-sm">{item.text}</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-dark p-6 border-gold-bright/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <div className="text-ivory font-semibold text-sm mb-1">First Time?</div>
                    <p className="text-silver text-xs leading-relaxed">Book a complimentary consultation to discuss your aesthetic goals and learn about the best treatments for you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

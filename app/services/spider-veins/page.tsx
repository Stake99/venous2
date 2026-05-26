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

export default function SpiderVeinsPage() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="bg-[#26262e] text-white overflow-hidden">
      {/* Scan line */}
      <div className="scan-line" />

      {/* ── PAGE PARALLAX BACKGROUND ─────────────────────────── */}
      <ParallaxBackground />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute inset-0 parallax-slow" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <Image src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1600&q=80" alt="Spider veins" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#26262e]/95 to-[#26262e]/70" />
        </div>
        <div className="absolute inset-0 pointer-events-none parallax-slow" style={{ transform: `translateY(${scrollY * 0.4}px)` }}>
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full filter blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-20">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 group transition-colors">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          <div className="flex items-center gap-5 parallax-medium" style={{ animation: 'fadeInUp 0.8s ease-out both', transform: `translateY(${scrollY * 0.18}px)` }}>
            <span className="text-6xl">💉</span>
            <div>
              <div className="section-label mb-3">Vein Treatment</div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white">Spider Veins Treatment</h1>
              <p className="text-white/50 mt-2 text-lg">Clear, Beautiful Skin</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <section className="relative py-20 border-t border-white/[0.06] overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {[
              { src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80', title: 'Sclerotherapy Treatment', sub: 'Effective spider vein removal', offset: scrollY * 0.04 },
              { src: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80',    title: 'Beautiful Results',       sub: 'Clear, healthy-looking skin',  offset: -scrollY * 0.04 },
            ].map((img, i) => (
              <div key={i} className="relative h-72 rounded-2xl overflow-hidden border border-white/[0.08] group parallax-slow" style={{ transform: `translateY(${img.offset}px)` }}>
                <Image src={img.src} alt={img.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26262e]/80 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <div className="text-white font-semibold">{img.title}</div>
                  <div className="text-white/40 text-sm">{img.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-dark p-8">
                <h2 className="text-2xl font-bold text-white mb-4">About Spider Veins</h2>
                <p className="text-white/50 leading-relaxed mb-3">Spider veins (also called thread veins or telangiectasia) are small, damaged veins that appear on the surface of the legs or face. They are usually red, purple, or blue and can look like spider webs or tree branches.</p>
                <p className="text-white/50 leading-relaxed">At The Venous Lounge, we offer effective, minimally invasive treatments to remove spider veins and restore clear, beautiful skin. Our procedures are quick, virtually painless, and require no downtime.</p>
              </div>

              <div className="card-dark p-8">
                <h2 className="text-2xl font-bold text-white mb-5">Treatment Options</h2>
                <div className="space-y-5">
                  {[
                    { title: 'Sclerotherapy',      desc: 'The gold standard treatment where a solution is injected directly into the vein, causing it to collapse and fade.', benefits: ['Highly effective', 'Minimal discomfort', 'Quick procedure', 'No downtime'] },
                    { title: 'Laser Therapy',      desc: 'Non-invasive treatment using focused light to target and eliminate spider veins.',                                   benefits: ['No needles', 'Precise targeting', 'Suitable for facial veins', 'Fast recovery'] },
                    { title: 'Combination Therapy',desc: 'Using both sclerotherapy and laser for optimal results on stubborn veins.',                                         benefits: ['Maximum effectiveness', 'Customised approach', 'Better outcomes', 'Comprehensive care'] },
                  ].map((t, i) => (
                    <div key={i} className="border-l-2 border-violet-500/40 pl-5 py-1">
                      <h3 className="text-white font-semibold mb-2">{t.title}</h3>
                      <p className="text-white/40 text-sm mb-3">{t.desc}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {t.benefits.map((b, j) => (
                          <div key={j} className="flex items-center gap-2 text-white/35 text-xs">
                            <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {b}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-dark p-8">
                <h2 className="text-2xl font-bold text-white mb-5">What to Expect</h2>
                <div className="space-y-5">
                  {[
                    { step: '1', title: 'Consultation', desc: 'Dr Sesing will examine your veins and recommend the best treatment approach.' },
                    { step: '2', title: 'Treatment',    desc: 'The procedure typically takes 15–30 minutes. You can walk in and walk out the same day.' },
                    { step: '3', title: 'Recovery',     desc: 'Resume normal activities immediately. Veins will gradually fade over 3–6 weeks.' },
                    { step: '4', title: 'Follow-up',    desc: 'We monitor your progress and provide additional treatments if needed.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-sm flex-shrink-0">{item.step}</div>
                      <div>
                        <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                        <div className="text-white/40 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="card-dark p-7">
                <h3 className="text-white font-bold text-lg mb-3">Book Your Treatment</h3>
                <p className="text-white/40 text-sm mb-5">Get clear, beautiful skin with our spider vein treatments.</p>
                <Link href="/booking" className="btn-glow w-full justify-center">
                  <div className="glow-ring" />
                  <span className="relative z-10">Book Now</span>
                </Link>
              </div>

              <div className="card-dark p-7">
                <h3 className="text-white font-bold text-lg mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  {[
                    { icon: '⏱️', label: 'Procedure Time', value: '15–30 minutes' },
                    { icon: '🚶', label: 'Recovery',       value: 'Immediate return to activities' },
                    { icon: '📅', label: 'Results',        value: 'Visible in 3–6 weeks' },
                    { icon: '💳', label: 'Medical Aid',    value: 'Most schemes accepted' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-white/30 text-xs uppercase tracking-wider">{item.label}</div>
                        <div className="text-white/70 text-sm">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-dark p-7">
                <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
                <div className="space-y-3">
                  {[
                    { icon: '📍', text: '6571 Dr Lebona Street, Phahameng, Bloemfontein' },
                    { icon: '📞', text: '+27 51 447 9589', href: 'tel:+27514479589' },
                    { icon: '✉️', text: 'dr.sesingsurg@gmail.com', href: 'mailto:dr.sesingsurg@gmail.com' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg">{item.icon}</span>
                      {item.href
                        ? <a href={item.href} className="text-white/40 hover:text-white text-sm transition-colors">{item.text}</a>
                        : <span className="text-white/40 text-sm">{item.text}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

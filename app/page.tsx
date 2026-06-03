'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Activity, Shield, Clock, CreditCard, MapPin, Phone,
  ArrowRight, ChevronDown, Star, Stethoscope, Sparkles,
  HeartPulse, Scissors, UserCheck, CheckCircle2,
  CalendarDays, Award, Users, TrendingUp,
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

/* ── Animated counter ───────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const services = [
    { title: 'Varicose Veins',     desc: 'Advanced minimally invasive walk-in, walk-out treatment.',       Icon: Activity,    href: '/services/varicose-veins' },
    { title: 'Spider Veins',       desc: 'Effective removal for clearer, healthier-looking skin.',          Icon: Sparkles,    href: '/services/spider-veins' },
    { title: 'Venous Ulcers',      desc: 'Specialised treatment for chronic venous ulcers.',                Icon: HeartPulse,  href: '/services' },
    { title: 'Aesthetic Services', desc: 'Professional cosmetic procedures in a clinical setting.',         Icon: Star,        href: '/services/aesthetics' },
    { title: 'General Surgery',    desc: 'Minor surgical procedures backed by surgical expertise.',         Icon: Scissors,    href: '/services' },
    { title: 'Consultations',      desc: 'Expert medical consultations and personalised planning.',         Icon: Stethoscope, href: '/booking' },
  ];

  const whyUs = [
    { Icon: UserCheck,    title: 'Expert Specialist',  desc: 'Dr Sesing — experienced vein and aesthetic specialist' },
    { Icon: CreditCard,   title: 'Medical Aid',        desc: 'All major medical aids accepted' },
    { Icon: Clock,        title: 'Flexible Hours',     desc: 'Extended hours for working patients' },
    { Icon: CheckCircle2, title: 'Walk-in / Walk-out', desc: 'Minimally invasive procedures' },
  ];

  const testimonials = [
    { name: 'Sarah M.',  treatment: 'Varicose Vein Treatment', quote: 'The team made me feel comfortable throughout. My legs feel so much better now!', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80' },
    { name: 'John D.',   treatment: 'Spider Vein Removal',     quote: 'Professional, efficient, and caring. The results exceeded my expectations.',       img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
    { name: 'Linda K.',  treatment: 'Aesthetic Services',      quote: 'Dr Sesing is amazing! I felt like I was in a luxury spa, not a medical facility.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
  ];

  return (
    <div className="bg-white text-ivory overflow-hidden">
      {/* Scan line */}
      <div className="scan-line" />

      {/* ── PAGE PARALLAX BACKGROUND ─────────────────────────── */}
      <ParallaxBackground />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden dot-grid">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>

        {/* Parallax glow orbs */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroY }}>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/15 rounded-full filter blur-[140px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/2 w-[300px] h-[300px] bg-gold-bright/8 rounded-full filter blur-[80px]" />
        </motion.div>

        {/* Concentric rings */}
        <div className="ellipse-rings">
          {[300, 500, 700, 900].map((size, i) => (
            <div key={i} className="ellipse-ring" style={{ width: size, height: size, animationDelay: `${i}s` }} />
          ))}
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-32"
          style={{ opacity: heroOpacity }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} className="inline-flex mb-8"
            >
              <span className="section-label">
                <HeartPulse className="w-3.5 h-3.5" />
                Now Open · Venous Lounge Medical Center
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] mb-8"
            >
              Your Health,{' '}
              <span className="text-shimmer">our Priority</span>
              <br />Always
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-silver text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
            >
              Expert vein treatment and aesthetic services at Venous Lounge Medical Center
              in Phahameng, Bloemfontein. All major medical aids accepted.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/booking" className="btn-glow group">
                <div className="glow-ring" />
                <CalendarDays className="relative z-10 w-4 h-4" />
                <span className="relative z-10">Book Appointment</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/services" className="btn-glow-border">
                <div className="glow-ring" />
                <Stethoscope className="relative z-10 w-4 h-4" />
                <span className="relative z-10">Our Services</span>
              </Link>
            </motion.div>

            {/* Animated stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto"
            >
              {[
                { to: 15, suffix: '+', label: 'Years Experience', Icon: Award },
                { to: 1000, suffix: '+', label: 'Happy Patients', Icon: Users },
                { to: 100, suffix: '%', label: 'Medical Aid',     Icon: Shield },
              ].map((s, i) => (
                <div key={i} className="text-center group">
                  <s.Icon className="w-5 h-5 text-gold/60 mx-auto mb-2 group-hover:text-gold transition-colors" />
                  <div className="text-3xl font-bold text-ivory">
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="text-silver text-xs mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5 text-ash" />
        </motion.div>
      </section>

      {/* ── INFO BAR ─────────────────────────────────────────── */}
      <section className="relative border-y border-graphite py-6 overflow-hidden">
        <div className="absolute inset-0 bg-ink" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Clock,   label: 'Mon–Fri',     value: '08:00 AM – 10:00 PM' },
              { Icon: CalendarDays, label: 'Sat–Sun', value: '08:00 AM – 01:00 PM' },
              { Icon: CreditCard,   label: 'Medical Aid', value: 'All Schemes Accepted' },
              { Icon: MapPin,  label: 'Location',    value: 'Phahameng, Bloemfontein' },
            ].map(({ Icon, label, value }, i) => (
              <FadeIn key={i} delay={i * 0.08} direction="up">
                <div className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold-bright/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-ash text-xs uppercase tracking-wider">{label}</div>
                    <div className="text-mist text-sm font-medium">{value}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="glow-divider mb-6">
              <div className="glow-divider-line" />
              <span className="section-label"><Activity className="w-3 h-3" />Our Services</span>
              <div className="glow-divider-line right" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory mb-4">
              Comprehensive Vein &{' '}
              <span className="text-gradient-subtle">Aesthetic Care</span>
            </h2>
            <p className="text-silver max-w-xl mx-auto">Minimally invasive procedures with expert care</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ title, desc, Icon, href }, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <Link href={href} className="group relative card-dark p-7 hover:border-gold-bright/30 transition-all duration-300 hover:-translate-y-1 block h-full">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-gold/5 transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="relative w-12 h-12 mb-5">
                      <div className="absolute inset-0 rounded-xl bg-gold/10 border border-gold-bright/20 group-hover:bg-gold/20 transition-colors" />
                      <div className="pulse-ring rounded-xl opacity-0 group-hover:opacity-100" />
                      <Icon className="absolute inset-0 m-auto w-5 h-5 text-gold group-hover:icon-glow transition-all" />
                    </div>
                    <h3 className="text-ivory font-semibold text-lg mb-2">{title}</h3>
                    <p className="text-silver text-sm leading-relaxed mb-5">{desc}</p>
                    <div className="flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <Link href="/services" className="btn-glow-border">
              <div className="glow-ring" />
              <span className="relative z-10">View All Services</span>
              <ArrowRight className="relative z-10 w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── DOCTOR FEATURE ───────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-graphite">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/8 rounded-full filter blur-[120px] pointer-events-none" />

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
                  <div className="text-2xl font-bold text-ivory"><Counter to={15} suffix="+" /></div>
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
                <span className="section-label"><UserCheck className="w-3 h-3" />Meet Your Specialist</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-ivory mb-6">
                Expert Care from{' '}
                <span className="text-gradient-subtle">Dr Sesing</span>
              </h2>
              <p className="text-silver leading-relaxed mb-10">
                With over 15 years of experience in vein treatment and aesthetic procedures,
                Dr Sesing brings expertise, compassion, and cutting-edge techniques to every
                patient consultation at The Venous Lounge.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { Icon: Stethoscope, title: 'Minimally Invasive Specialist', desc: 'Expert in walk-in, walk-out vein procedures' },
                  { Icon: HeartPulse,  title: 'Patient-Centred Approach',      desc: 'Your comfort and results are our priority' },
                  { Icon: TrendingUp,  title: 'Proven Track Record',           desc: '1000+ successful treatments performed' },
                ].map(({ Icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 card-dark p-4 hover:border-gold-bright/20 transition-all duration-300 group"
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
                <CalendarDays className="relative z-10 w-4 h-4" />
                <span className="relative z-10">Book a Consultation</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-graphite">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[300px] bg-gold/8 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="glow-divider mb-6">
              <div className="glow-divider-line" />
              <span className="section-label"><Shield className="w-3 h-3" />Why Choose Us</span>
              <div className="glow-divider-line right" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory mb-4">
              Excellence in <span className="text-gradient-subtle">Vein Care</span>
            </h2>
            <p className="text-silver max-w-xl mx-auto">Patient-centred care with a lounge-style medical environment</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map(({ Icon, title, desc }, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="card-dark p-7 text-center hover:border-gold-bright/25 transition-all duration-300 group h-full"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative w-14 h-14 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-gold/10 border border-gold-bright/20 group-hover:bg-gold/20 transition-colors" />
                    <div className="pulse-ring rounded-2xl opacity-0 group-hover:opacity-100" />
                    <Icon className="absolute inset-0 m-auto w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-ivory font-semibold mb-2">{title}</h3>
                  <p className="text-silver text-sm">{desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-graphite">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <div className="glow-divider mb-6">
              <div className="glow-divider-line" />
              <span className="section-label"><Star className="w-3 h-3" />Patient Stories</span>
              <div className="glow-divider-line right" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-ivory mb-4">
              What Our <span className="text-gradient-subtle">Patients Say</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="card-dark overflow-hidden hover:border-gold-bright/20 transition-all duration-300 h-full"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative h-52">
                    <Image src={t.img} alt={t.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/40 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <div className="text-white font-semibold">{t.name}</div>
                      <div className="text-white/70 text-xs">{t.treatment}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-gold fill-gold" />)}
                    </div>
                    <p className="text-silver text-sm leading-relaxed italic">"{t.quote}"</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
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
              <span className="section-label"><CalendarDays className="w-3 h-3" />Get Started</span>
              <div className="glow-divider-line right" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-ivory mb-6">
              Ready for Expert{' '}
              <span className="text-gradient">Vein Care?</span>
            </h2>
            <p className="text-silver text-lg mb-12 max-w-xl mx-auto">
              Book your consultation today. All major medical aids accepted. Flexible hours to suit your schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-glow group">
                <div className="glow-ring" />
                <CalendarDays className="relative z-10 w-4 h-4" />
                <span className="relative z-10">Book Your Appointment</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn-glow-border group">
                <div className="glow-ring" />
                <Phone className="relative z-10 w-4 h-4" />
                <span className="relative z-10">Contact Us</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

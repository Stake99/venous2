'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight, ArrowRight, Check, ShieldCheck, Heart, MapPin, Phone, Clock,
} from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import Eyebrow from '@/components/Eyebrow';
import FaqAccordion from '@/components/FaqAccordion';
import Counter from '@/components/Counter';
import Marquee from '@/components/Marquee';
import { services } from '@/lib/services';

/* ───────────────── Content ───────────────── */
const values = [
  { n: '01', title: 'Your Health, Our Priority',     desc: 'Medical-care standards prioritised over cosmetic trends — trust, reliability, and clinical excellence first.' },
  { n: '02', title: 'Family-Oriented Care',          desc: 'Designed for continuity of care — serving whole families and groups, not just individual patients.' },
  { n: '03', title: 'Medical Aid Friendly',          desc: 'All major South African medical-aid schemes accepted, making expert vein and surgical care accessible.' },
];

const process = [
  { n: '01', title: 'Initial Consultation', desc: 'We review your medical history, symptoms, and concerns to understand your full picture.' },
  { n: '02', title: 'Diagnostic Evaluation', desc: 'Doppler ultrasound and detailed vein-health assessment to guide treatment.' },
  { n: '03', title: 'Personalised Plan',    desc: 'A bespoke treatment plan aligned with your case, lifestyle, and medical aid.' },
  { n: '04', title: 'Treatment',            desc: 'Minimally invasive, walk-in walk-out procedures in our comfortable lounge setting.' },
  { n: '05', title: 'Follow-up & Care',     desc: 'Recovery monitoring and continued support to ensure lasting results.' },
];

type Stat = { num: number; suffix?: string; label: string } | { text: string; label: string };
const stats: Stat[] = [
  { num: 15,   suffix: '+', label: 'Years of Experience' },
  { num: 1000, suffix: '+', label: 'Successful Procedures' },
  { num: 6,                 label: 'Days Open Weekly' },
  { text: 'All',            label: 'Major Medical Aids' },
];

const team = [
  { name: 'Dr Mpho Sesing',       role: 'General Practitioner', image: '/image/general_practitioner.jpg', tags: ['General Medicine', 'Vein Treatment', 'Preventive Care'] },
  { name: 'Mrs Rebaone Kgware',   role: 'Practice Manager',     image: '/image/Practice_manager.jpg',     tags: ['Operations', 'Medical Aid Liaison', 'Patient Coordination'] },
];

const faqs = [
  { q: 'Which medical aids do you accept?',           a: 'We accept all major South African medical-aid schemes. If you have a specific provider in mind, please call us on +27 51 447 9589 and we will confirm before your appointment.' },
  { q: 'How long does a typical procedure take?',     a: 'Most of our vein procedures are walk-in, walk-out — typically 30 to 60 minutes — and you can usually return to light activity the same day.' },
  { q: 'Do I need a referral to book?',               a: 'No referral is required. You can book directly with us. If your medical aid requires a referral letter, we will guide you through the process.' },
  { q: 'Are vein treatments painful?',                a: 'Modern techniques like endovenous laser ablation and sclerotherapy are minimally invasive. Most patients describe only mild discomfort, managed with local anaesthetic where needed.' },
  { q: 'How quickly can I get an appointment?',       a: 'We are open six days a week with extended weekday hours. New consultations are usually available within a week — sooner for urgent cases.' },
];

/* ───────────────── Page ───────────────── */
export default function Page() {
  // Hero parallax — each element drifts at its own rate as you scroll
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  // px-based so movement is uniform regardless of element height
  const glowY     = useTransform(heroProgress, [0, 1], [0,   300]);
  const glowScale = useTransform(heroProgress, [0, 1], [1,   1.4]);
  const eyebrowY  = useTransform(heroProgress, [0, 1], [0, -260]);
  const headingY  = useTransform(heroProgress, [0, 1], [0, -180]);
  const subY      = useTransform(heroProgress, [0, 1], [0, -120]);
  const ctaY      = useTransform(heroProgress, [0, 1], [0,  -80]);
  const cardY     = useTransform(heroProgress, [0, 1], [0,  200]);
  const cardScale = useTransform(heroProgress, [0, 1], [1,  0.92]);
  const heroBlur  = useTransform(heroProgress, [0.4, 1], ['blur(0px)', 'blur(6px)']);
  const heroFade  = useTransform(heroProgress, [0, 0.85], [1, 0]);

  // Process timeline — gradient line fills as you scroll through, and a glowing head leads it
  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ['start 70%', 'end 30%'],
  });
  const headTop = useTransform(processProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* ════════════ HERO ════════════ */}
      <section ref={heroRef} className="relative pt-12 lg:pt-20 pb-24 overflow-hidden">
        {/* Holographic glow */}
        <motion.div
          style={{ y: glowY, scale: glowScale }}
          className="pointer-events-none absolute top-0 left-1/2 w-[64rem] h-[40rem] holo-soft-bg blur-3xl opacity-70 rounded-full -translate-x-1/2"
        />

        <motion.div
          style={{ opacity: heroFade, filter: heroBlur }}
          className="relative max-w-7xl mx-auto px-5 lg:px-8"
        >
          <motion.div style={{ y: eyebrowY }}>
            <FadeIn className="flex justify-center">
              <Eyebrow>Trusted vein & surgical care · Bloemfontein</Eyebrow>
            </FadeIn>
          </motion.div>

          <motion.div style={{ y: headingY }}>
            <FadeIn delay={0.05} className="mt-7 text-center">
              <h1 className="heading-display max-w-5xl mx-auto">
                Your Health, <span className="holo-text">Restored.</span>
              </h1>
            </FadeIn>
          </motion.div>

          <motion.div style={{ y: subY }}>
            <FadeIn delay={0.1} className="mt-6 text-center">
              <p className="text-lg lg:text-xl text-grey-04 max-w-2xl mx-auto leading-relaxed">
                Specialised vein and general surgical care for families across South Africa — backed by 15+ years of experience and all major medical aids.
              </p>
            </FadeIn>
          </motion.div>

          <motion.div style={{ y: ctaY }}>
            <FadeIn delay={0.15} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/#contact" className="btn-primary">
                <span className="holo-bg w-7 h-7 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-grey-01" />
                </span>
                Book a Consultation
              </Link>
              <Link href="#services" className="btn-outline">
                Explore services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </motion.div>

          {/* Doctor card — drifts down slower than the text rises */}
          <motion.div style={{ y: cardY, scale: cardScale }}>
            <FadeIn delay={0.2} className="mt-16 lg:mt-24">
              <div className="relative max-w-5xl mx-auto card-elevated overflow-hidden">
                <div className="relative aspect-[16/9] bg-grey-08">
                  <Image
                    src="/image/general_practitioner.jpg"
                    alt="Dr Mpho Sesing"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 flex flex-wrap items-end justify-between gap-4">
                    <div className="text-white">
                      <p className="text-xs uppercase tracking-widest text-white/70 mb-1.5">Lead practitioner</p>
                      <p className="text-2xl lg:text-3xl font-medium tracking-tight">Dr Mpho Sesing</p>
                      <p className="text-white/70 text-sm">General Practitioner · 15+ years</p>
                    </div>
                    <div className="flex gap-2.5">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="avatar-ring w-9 h-9 rounded-full overflow-hidden bg-grey-07" />
                      ))}
                      <div className="avatar-ring w-9 h-9 rounded-full holo-bg flex items-center justify-center text-xs font-medium text-grey-01">
                        1k+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════ ABOUT STRIP ════════════ */}
      <section id="about" className="py-20 lg:py-28 border-t border-grey-07">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <FadeIn>
            <p className="text-2xl lg:text-4xl leading-tight tracking-tight font-medium text-grey-01 max-w-3xl mx-auto">
              The Venous Lounge combines clinical excellence with a comfortable lounge atmosphere —
              <span className="text-grey-05"> serving families with vein and general surgical care since 2010.</span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════ VALUES ════════════ */}
      <section id="values" className="py-24 lg:py-32 border-t border-grey-07 bg-grey-08">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-14">
            <FadeIn className="lg:col-span-7">
              <Eyebrow>Why Choose Us</Eyebrow>
              <h2 className="heading-section mt-5 max-w-2xl">
                Trusted vein and surgical care, <span className="holo-text">delivered with care.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-5">
              <p className="text-grey-04 leading-relaxed lg:max-w-md">
                We focus on trust, reliability, and general-surgical expertise — not flashy marketing.
                Every patient is treated with the standards we would want for our own family.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <FadeIn key={v.n} delay={i * 0.08}>
                <div className="card-base p-8 h-full flex flex-col gap-12">
                  <div className="flex items-start justify-between">
                    <span className="text-grey-05 text-sm">{v.n}</span>
                    <div className="w-10 h-10 rounded-full holo-soft-bg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-grey-02" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight mb-3">{v.title}</h3>
                    <p className="text-grey-04 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ MARQUEE STRIP ════════════ */}
      <Marquee
        items={[
          'Your Health',
          'Restored',
          'Always',
          'Trusted Care',
          'Bloemfontein',
          'Walk-in · Walk-out',
        ]}
        speedSec={45}
      />

      {/* ════════════ SERVICES ════════════ */}
      <section id="services" className="py-24 lg:py-32 border-t border-grey-07">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="heading-section mt-5 max-w-3xl mx-auto">
              Comprehensive care, <span className="holo-text">tailored to you.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${s.slug}`}
                  className="card-base p-7 h-full hover:border-grey-04 transition-colors group block"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-11 h-11 rounded-xl holo-soft-bg flex items-center justify-center">
                      <s.Icon className="w-5 h-5 text-grey-01" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-grey-05 group-hover:text-grey-01 group-hover:rotate-45 transition-all" />
                  </div>
                  <h3 className="text-xl font-medium tracking-tight mb-2">{s.title}</h3>
                  <p className="text-grey-04 text-sm leading-relaxed mb-6">{s.short}</p>
                  <ul className="space-y-2.5 border-t border-grey-07 pt-5">
                    {s.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-grey-03">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-grey-01" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* CTA card under services */}
          <FadeIn className="mt-8">
            <div className="card-elevated bg-grey-01 text-white p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] holo-bg opacity-20 blur-3xl rounded-full pointer-events-none" />
              <div className="relative flex-1">
                <h3 className="text-2xl lg:text-3xl font-medium tracking-tight max-w-xl">
                  Not sure where to start? Book a free 30-minute consultation.
                </h3>
                <p className="text-white/60 mt-3 max-w-lg text-sm lg:text-base">
                  We'll review your symptoms, recommend next steps, and confirm what your medical aid covers.
                </p>
              </div>
              <Link href="#contact" className="relative btn-primary !bg-white !text-grey-01 hover:!bg-grey-08">
                <span className="holo-bg w-7 h-7 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-grey-01" />
                </span>
                Book consultation
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════ PROCESS ════════════ */}
      <section ref={processRef} id="process" className="py-24 lg:py-32 border-t border-grey-07 bg-grey-08">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-20">
            <Eyebrow>How We Work</Eyebrow>
            <h2 className="heading-section mt-5 max-w-3xl mx-auto">
              A clear path from consultation to <span className="holo-text">recovery.</span>
            </h2>
          </FadeIn>

          <div className="relative max-w-4xl mx-auto">
            {/* Track */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-grey-07 -translate-x-1/2" />
            {/* Soft outer glow that fills with scroll */}
            <motion.div
              style={{ scaleY: processProgress, transformOrigin: 'top' }}
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[14px] holo-bg blur-md opacity-60 -translate-x-1/2"
              aria-hidden
            />
            {/* Crisp inner line that fills with scroll */}
            <motion.div
              style={{ scaleY: processProgress, transformOrigin: 'top' }}
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] holo-bg -translate-x-1/2 rounded-full"
              aria-hidden
            />
            {/* Scanning head — travels down the line as you scroll */}
            <motion.div
              style={{ top: headTop }}
              className="hidden md:block absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              aria-hidden
            >
              <motion.div
                className="relative w-5 h-5"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute -inset-4 holo-bg rounded-full blur-xl opacity-70" />
                <div className="absolute -inset-1.5 holo-bg rounded-full blur-sm opacity-90" />
                <div className="absolute inset-0 holo-bg rounded-full border border-white" />
              </motion.div>
            </motion.div>

            <div className="space-y-12 md:space-y-16">
              {process.map((p, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <FadeIn key={p.n} delay={i * 0.05}>
                    <div className={`md:grid md:grid-cols-2 md:gap-12 items-center ${isLeft ? '' : 'md:[&>div:first-child]:order-2'}`}>
                      <div className={`flex ${isLeft ? 'md:justify-end md:text-right' : 'md:justify-start md:text-left'}`}>
                        <div className="card-base p-7 max-w-md w-full">
                          <p className="text-sm text-grey-05 mb-3">{p.n}</p>
                          <h3 className="text-xl font-medium tracking-tight mb-2">{p.title}</h3>
                          <p className="text-grey-04 text-sm leading-relaxed">{p.desc}</p>
                        </div>
                      </div>

                      {/* Dot in center */}
                      <div className="hidden md:flex relative justify-center">
                        <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full holo-bg ring-8 ring-grey-08" />
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section className="py-20 lg:py-24 border-t border-grey-07">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.05}>
              <div className="card-grey p-8 text-center">
                <div className="text-5xl lg:text-6xl font-medium tracking-tighter holo-text">
                  {'num' in s ? <Counter to={s.num} suffix={s.suffix} /> : s.text}
                </div>
                <div className="mt-3 text-sm text-grey-04">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ════════════ TEAM ════════════ */}
      <section id="team" className="py-24 lg:py-32 border-t border-grey-07 bg-grey-08">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Eyebrow>Our Team</Eyebrow>
            <h2 className="heading-section mt-5 max-w-3xl mx-auto">
              Meet the people <span className="holo-text">behind your care.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {team.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.08}>
                <div className="card-base overflow-hidden group">
                  <div className="relative aspect-[4/5] bg-grey-07 overflow-hidden">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-medium tracking-tight">{m.name}</h3>
                        <p className="text-grey-04 text-sm mt-0.5">{m.role}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-grey-05 group-hover:text-grey-01 group-hover:rotate-45 transition-all" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {m.tags.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-grey-07 text-grey-03">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section id="faqs" className="py-24 lg:py-32 border-t border-grey-07">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="heading-section mt-5">
              Common <span className="holo-text">questions.</span>
            </h2>
          </FadeIn>

          <FaqAccordion items={faqs} />

          <FadeIn className="mt-12">
            <div className="card-base p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full holo-soft-bg flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-grey-02" />
                </div>
                <p className="text-grey-03 text-sm">Still have questions? We're happy to help.</p>
              </div>
              <Link href="#contact" className="btn-outline">
                Contact us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════ LOCATION / CONTACT BAR ════════════ */}
      <section className="py-20 border-t border-grey-07 bg-grey-08">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { Icon: MapPin, label: 'Visit',  v: '6571 Dr Lebona Street, Phahameng, Bloemfontein' },
            { Icon: Phone,  label: 'Call',   v: '+27 51 447 9589', href: 'tel:+27514479589' },
            { Icon: Clock,  label: 'Hours',  v: 'Mon–Fri 08:00–22:00 · Sat–Sun 08:00–13:00' },
          ].map((it, i) => (
            <FadeIn key={it.label} delay={i * 0.05}>
              <div className="card-base p-7 h-full">
                <div className="w-10 h-10 rounded-full holo-soft-bg flex items-center justify-center mb-5">
                  <it.Icon className="w-4 h-4 text-grey-02" />
                </div>
                <p className="text-xs uppercase tracking-widest text-grey-05 mb-2">{it.label}</p>
                {it.href ? (
                  <a href={it.href} className="text-grey-01 hover:underline">{it.v}</a>
                ) : (
                  <p className="text-grey-01">{it.v}</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}


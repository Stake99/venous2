import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import Eyebrow from '@/components/Eyebrow';
import FaqAccordion from '@/components/FaqAccordion';
import { services, getService, relatedServices } from '@/lib/services';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} — The Venous Lounge`,
    description: service.short,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { Icon, title, tagline, overview, treats, features, process, faq } = service;
  const related = relatedServices(slug, 2);

  return (
    <>
      {/* ════════════ HERO ════════════ */}
      <section className="relative pt-12 lg:pt-20 pb-20 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[64rem] h-[36rem] holo-soft-bg blur-3xl opacity-50 rounded-full" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <FadeIn className="flex flex-col items-center text-center">
            <Link
              href="/#services"
              className="text-grey-04 hover:text-grey-01 text-sm flex items-center gap-1.5 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All services
            </Link>
            <Eyebrow>Service · The Venous Lounge</Eyebrow>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-7 flex justify-center">
            <div className="w-16 h-16 rounded-2xl holo-soft-bg flex items-center justify-center">
              <Icon className="w-7 h-7 text-grey-01" />
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-6 text-center">
            <h1 className="heading-display max-w-4xl mx-auto">
              {title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.12} className="mt-5 text-center">
            <p className="text-lg lg:text-xl text-grey-04 max-w-2xl mx-auto leading-relaxed">
              {tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.18} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/#contact" className="btn-primary">
              <span className="holo-bg w-7 h-7 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-grey-01" />
              </span>
              Book a Consultation
            </Link>
            <Link href="/#services" className="btn-outline">
              Compare services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ════════════ OVERVIEW + TREATS ════════════ */}
      <section className="py-20 lg:py-24 border-t border-grey-07">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <FadeIn className="lg:col-span-7">
              <Eyebrow>Overview</Eyebrow>
              <p className="mt-5 text-2xl lg:text-3xl leading-snug tracking-tight font-medium text-grey-01">
                {overview}
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-5">
              <div className="card-base p-7">
                <p className="text-xs uppercase tracking-widest text-grey-05 mb-4">What this treats</p>
                <ul className="space-y-3">
                  {treats.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-grey-02">
                      <Check className="w-4 h-4 mt-1 flex-shrink-0 text-grey-01" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section className="py-20 lg:py-28 border-t border-grey-07 bg-grey-08">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-12">
            <Eyebrow>Treatment Options</Eyebrow>
            <h2 className="heading-section mt-5 max-w-3xl mx-auto">
              How we treat <span className="holo-text">{title.toLowerCase()}.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <FadeIn key={f} delay={i * 0.05}>
                <div className="card-base p-6 h-full">
                  <div className="w-10 h-10 rounded-full holo-soft-bg flex items-center justify-center mb-5">
                    <Check className="w-4 h-4 text-grey-01" />
                  </div>
                  <h3 className="text-base font-medium tracking-tight text-grey-01">{f}</h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ PROCESS ════════════ */}
      <section className="py-24 lg:py-32 border-t border-grey-07">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Eyebrow>The Process</Eyebrow>
            <h2 className="heading-section mt-5 max-w-3xl mx-auto">
              From first visit to <span className="holo-text">recovery.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, i) => (
              <FadeIn key={p.n} delay={i * 0.05}>
                <div className="card-base p-7 h-full">
                  <p className="text-sm text-grey-05 mb-6">{p.n}</p>
                  <h3 className="text-lg font-medium tracking-tight mb-2">{p.title}</h3>
                  <p className="text-grey-04 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section className="py-24 lg:py-32 border-t border-grey-07 bg-grey-08">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-12">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="heading-section mt-5">
              Common <span className="holo-text">questions.</span>
            </h2>
          </FadeIn>

          <FaqAccordion items={faq} />
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="py-24 lg:py-28 border-t border-grey-07">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <FadeIn>
            <div className="card-elevated bg-grey-01 text-white p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute -top-32 -right-20 w-[28rem] h-[28rem] holo-bg opacity-20 blur-3xl rounded-full pointer-events-none" />
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                <div>
                  <h2 className="heading-section text-white">
                    Ready when <span className="holo-text">you are.</span>
                  </h2>
                  <p className="text-white/60 mt-5 max-w-md leading-relaxed">
                    Book a consultation to find out if {title.toLowerCase()} treatment is right for you. Most major medical aids accepted.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Link href="/#contact" className="btn-primary !bg-white !text-grey-01 hover:!bg-grey-08">
                    <span className="holo-bg w-7 h-7 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-3.5 h-3.5 text-grey-01" />
                    </span>
                    Book consultation
                  </Link>
                  <a href="tel:+27514479589" className="btn-outline !bg-transparent !text-white !border-white/20 hover:!bg-white/[0.06]">
                    Call +27 51 447 9589
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════ RELATED ════════════ */}
      {related.length > 0 && (
        <section className="py-20 lg:py-24 border-t border-grey-07 bg-grey-08">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <FadeIn className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <Eyebrow>Related Services</Eyebrow>
                <h2 className="mt-5 text-3xl lg:text-4xl font-medium tracking-tight">
                  Other ways we <span className="holo-text">can help.</span>
                </h2>
              </div>
              <Link href="/#services" className="btn-outline">
                All services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((s, i) => {
                const RelatedIcon = s.Icon;
                return (
                  <FadeIn key={s.slug} delay={i * 0.05}>
                    <Link href={`/services/${s.slug}`} className="card-base p-7 block group hover:border-grey-04 transition-colors">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-11 h-11 rounded-xl holo-soft-bg flex items-center justify-center">
                          <RelatedIcon className="w-5 h-5 text-grey-01" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-grey-05 group-hover:text-grey-01 group-hover:rotate-45 transition-all" />
                      </div>
                      <h3 className="text-xl font-medium tracking-tight mb-2">{s.title}</h3>
                      <p className="text-grey-04 text-sm leading-relaxed">{s.short}</p>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle2, AlertCircle, Loader2, RefreshCw, ArrowRight,
  Phone, Mail, CalendarDays,
} from 'lucide-react';
import ParallaxBackground from '@/components/ParallaxBackground';
import { verifyPayment, type VerifyResponse } from '@/lib/bookingApi';

/* ── Reusable fade-in-up on scroll ─────────────────────── */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}
function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, filter: 'blur(6px)', y: 40 }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

/**
 * Paystack return page (PAYSTACK_CALLBACK_URL → /booking/complete?reference=...).
 *
 * `verify` is the source of truth from the browser's side: it's safe to call
 * repeatedly and finalizes the booking itself, so it works even if the webhook
 * is delayed. We poll a few times while the status is still `pending`.
 */
type View =
  | { kind: 'verifying' }
  | { kind: 'missing' } // no reference in URL or sessionStorage
  | { kind: 'error'; message: string }
  | { kind: 'result'; data: VerifyResponse };

const MAX_PENDING_POLLS = 5;
const POLL_DELAY_MS = 3000;

export default function BookingCompletePage() {
  const [view, setView] = useState<View>({ kind: 'verifying' });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let polls = 0;

    // Poll `verify` until it returns a terminal status, retrying a few times
    // while `pending` (the webhook may still be in flight). All state writes
    // live inside this function, not the effect body, so none fire
    // synchronously during the effect.
    async function poll(query: { reference?: string; paymentId?: string }) {
      try {
        const data = await verifyPayment(query, signal);
        if (signal.aborted) return;

        if (data.payment_status === 'pending' && polls < MAX_PENDING_POLLS) {
          polls += 1;
          setView({ kind: 'result', data }); // show "still processing" while we wait
          timer = setTimeout(() => poll(query), POLL_DELAY_MS);
          return;
        }
        setView({ kind: 'result', data });
      } catch (err) {
        if (signal.aborted) return;
        setView({
          kind: 'error',
          message: err instanceof Error ? err.message : 'Could not confirm your payment.',
        });
      }
    }

    function start() {
      const params = new URLSearchParams(window.location.search);
      // Yoco returns to the success URL with our internal payment_id appended;
      // the checkout id (reference) is also kept in sessionStorage as a fallback.
      const reference =
        params.get('reference') || sessionStorage.getItem('yoco_reference');
      const paymentId = params.get('payment_id');
      if (reference) poll({ reference });
      else if (paymentId) poll({ paymentId });
      else setView({ kind: 'missing' });
    }
    start();

    return () => {
      controller.abort();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-white text-ivory overflow-hidden min-h-screen">
      <ParallaxBackground />

      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/8 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 pb-20">
          <FadeIn>
            <div className="card-dark p-8 md:p-12 text-center">
              <Content view={view} />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

function Content({ view }: { view: View }) {
  if (view.kind === 'verifying') {
    return (
      <Panel
        icon={<Loader2 className="w-8 h-8 text-gold animate-spin" />}
        title="Confirming your payment…"
        body="Hang tight — we're verifying your payment with Yoco. This only takes a moment."
      />
    );
  }

  if (view.kind === 'missing') {
    return (
      <Panel
        icon={<AlertCircle className="w-8 h-8 text-ash" />}
        title="Nothing to confirm here"
        body="We couldn't find a payment reference. If you just tried to book, please start again."
        action="rebook"
      />
    );
  }

  if (view.kind === 'error') {
    return (
      <Panel
        icon={<AlertCircle className="w-8 h-8 text-rose" />}
        title="We couldn't confirm your payment"
        body={view.message}
        action="rebook"
        helpline
      />
    );
  }

  const { data } = view;
  const ref = (
    <span className="block mt-4 text-ash text-xs">
      Reference <span className="font-mono text-silver">{data.reference}</span>
    </span>
  );

  // Success — paid and booking confirmed.
  if (data.payment_status === 'completed' && data.booking_status === 'confirmed') {
    return (
      <Panel
        icon={<CheckCircle2 className="w-8 h-8 text-confirmed" />}
        title="Booking confirmed!"
        body={
          <>
            Your payment went through and your appointment is locked in
            {data.booking_id != null && (
              <> — booking <span className="font-semibold text-ivory">#{data.booking_id}</span></>
            )}
            . A confirmation has been sent to your email.
            {ref}
          </>
        }
        action="home"
      />
    );
  }

  // Slot was taken between checkout and payment — auto-refunded.
  if (data.payment_status === 'refunded') {
    return (
      <Panel
        icon={<RefreshCw className="w-8 h-8 text-gold" />}
        title="That slot was taken — you've been refunded"
        body={
          <>
            Someone grabbed that time just before your payment cleared, so we&apos;ve
            automatically refunded you. Please pick another time to rebook.
            {ref}
          </>
        }
        action="rebook"
        helpline
      />
    );
  }

  // Webhook may still be in flight after our polls ran out.
  if (data.payment_status === 'pending') {
    return (
      <Panel
        icon={<Loader2 className="w-8 h-8 text-gold animate-spin" />}
        title="Still processing…"
        body={
          <>
            Your payment is going through. This can take a moment — you can refresh
            this page shortly, and we&apos;ll email you once it&apos;s confirmed.
            {ref}
          </>
        }
        action="refresh"
        helpline
      />
    );
  }

  // failed — payment didn't go through.
  return (
    <Panel
      icon={<AlertCircle className="w-8 h-8 text-rose" />}
      title="Payment didn't go through"
      body={
        <>
          Your payment wasn&apos;t completed, so no booking was made and you haven&apos;t
          been charged. Please try booking again.
          {ref}
        </>
      }
      action="rebook"
      helpline
    />
  );
}

function Panel({
  icon, title, body, action, helpline,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  action?: 'rebook' | 'home' | 'refresh';
  helpline?: boolean;
}) {
  return (
    <>
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 border border-gold-bright/20 flex items-center justify-center">
        {icon}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-ivory mb-3">{title}</h1>
      <p className="text-silver text-sm md:text-base max-w-md mx-auto">{body}</p>

      {action && (
        <div className="mt-8 flex justify-center">
          {action === 'refresh' ? (
            <button onClick={() => window.location.reload()} className="btn-glow px-10 group">
              <div className="glow-ring" />
              <RefreshCw className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Check again</span>
            </button>
          ) : (
            <Link href={action === 'rebook' ? '/booking' : '/'} className="btn-glow px-10 group">
              <div className="glow-ring" />
              <span className="relative z-10">{action === 'rebook' ? 'Book again' : 'Back to home'}</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      )}

      {helpline && (
        <div className="mt-8 pt-6 border-t border-graphite">
          <p className="text-ash text-xs uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
            <CalendarDays className="w-3.5 h-3.5" /> Need a hand?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+27514479589" className="card-dark-2 px-4 py-2.5 flex items-center gap-2 hover:border-gold-bright/20 transition-all">
              <Phone className="w-4 h-4 text-gold" />
              <span className="text-mist text-sm">+27 51 447 9589</span>
            </a>
            <a href="mailto:dr.sesingsurg@gmail.com" className="card-dark-2 px-4 py-2.5 flex items-center gap-2 hover:border-gold-bright/20 transition-all">
              <Mail className="w-4 h-4 text-gold" />
              <span className="text-mist text-sm">dr.sesingsurg@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

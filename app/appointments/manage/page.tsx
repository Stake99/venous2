'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CalendarDays, Clock, Phone, Mail, Loader2, AlertCircle,
  CheckCircle2, CalendarClock, XCircle, ArrowRight, ChevronLeft,
  Building2, Stethoscope, ShieldAlert,
} from 'lucide-react';
import ParallaxBackground from '@/components/ParallaxBackground';
import {
  getManagedAppointment, cancelManagedAppointment,
  rescheduleManagedAppointment, getManageAvailability,
  ApiError,
  type ManagedAppointment, type AppointmentStatus, type TimeSlot,
} from '@/lib/bookingApi';

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
 * Format an ISO instant with a UTC offset (e.g. "2026-06-25T09:00:00+02:00") at
 * its own wall-clock — i.e. the practice's local time — regardless of the
 * visitor's timezone. We rebuild the literal Y/M/D/H/M as a UTC Date so weekday
 * and month names come out right while the displayed clock matches the offset.
 */
function offsetParts(iso: string): Date | null {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;
  const [, y, mo, d, h, mi] = m;
  return new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi));
}
function formatApptDate(iso: string): string {
  const dt = offsetParts(iso);
  if (!dt) return iso;
  return new Intl.DateTimeFormat('en-ZA', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(dt);
}
function formatApptTime(iso: string): string {
  const dt = offsetParts(iso);
  if (!dt) return iso;
  return new Intl.DateTimeFormat('en-ZA', {
    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC',
  }).format(dt);
}

/* ── Status presentation ─────────────────────────────────── */
const STATUS_META: Record<AppointmentStatus, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  confirmed: { label: 'Confirmed', cls: 'text-confirmed border-confirmed/30 bg-confirmed/10', Icon: CheckCircle2 },
  pending:   { label: 'Pending',   cls: 'text-gold border-gold-bright/30 bg-gold/10',          Icon: Clock },
  cancelled: { label: 'Cancelled', cls: 'text-rose border-rose/30 bg-rose/10',                 Icon: XCircle },
  completed: { label: 'Completed', cls: 'text-silver border-graphite bg-ink',                  Icon: CheckCircle2 },
};

const PHONE = '+27 51 447 9589';
const PHONE_HREF = 'tel:+27514479589';
const EMAIL = 'dr.sesingsurg@gmail.com';

type Load =
  | { kind: 'loading' }
  | { kind: 'no-token' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; appt: ManagedAppointment };

export default function ManageAppointmentPage() {
  const [load, setLoad] = useState<Load>({ kind: 'loading' });

  // Load the appointment from the token in the query string. We read from
  // window.location rather than useSearchParams to avoid the Suspense boundary
  // requirement, matching /booking/complete.
  useEffect(() => {
    const controller = new AbortController();

    // All state writes live inside start(), not the effect body, so none fire
    // synchronously during the effect (React 19's set-state-in-effect rule).
    function start() {
      const token = new URLSearchParams(window.location.search).get('token');
      if (!token) {
        setLoad({ kind: 'no-token' });
        return;
      }
      getManagedAppointment(token, controller.signal)
        .then((appt) => setLoad({ kind: 'ready', appt }))
        .catch((err) => {
          if (controller.signal.aborted) return;
          const message =
            err instanceof ApiError && err.status === 401
              ? 'This link is no longer valid — it may have expired. Please call the practice and we’ll gladly help.'
              : err instanceof Error
                ? err.message
                : 'We couldn’t load this appointment. Please call the practice.';
          setLoad({ kind: 'error', message });
        });
    }
    start();

    return () => controller.abort();
  }, []);

  return (
    <div className="bg-white text-ivory overflow-hidden min-h-screen">
      <div className="scan-line" />
      <ParallaxBackground />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="grid-lines">{[...Array(7)].map((_, i) => <div key={i} className="grid-line-v" />)}</div>
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-gold/8 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex mb-6">
              <span className="section-label">
                <CalendarClock className="w-3.5 h-3.5" />
                Manage Appointment
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Your <span className="text-gradient">Appointment</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-silver text-base max-w-md mx-auto">
              Reschedule or cancel your visit — no login needed.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <section className="relative pb-24 overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {load.kind === 'loading' && (
            <FadeIn>
              <StatePanel
                icon={<Loader2 className="w-8 h-8 text-gold animate-spin" />}
                title="Loading your appointment…"
                body="One moment while we fetch the details for this link."
              />
            </FadeIn>
          )}

          {load.kind === 'no-token' && (
            <FadeIn>
              <StatePanel
                icon={<AlertCircle className="w-8 h-8 text-ash" />}
                title="Nothing to manage here"
                body="This page needs the secure link from your appointment email. Please open it from there, or call us and we’ll help."
                helpline
              />
            </FadeIn>
          )}

          {load.kind === 'error' && (
            <FadeIn>
              <StatePanel
                icon={<ShieldAlert className="w-8 h-8 text-rose" />}
                title="This link can’t be opened"
                body={load.message}
                helpline
              />
            </FadeIn>
          )}

          {load.kind === 'ready' && (
            <AppointmentCard
              appt={load.appt}
              onUpdated={(appt) => setLoad({ kind: 'ready', appt })}
            />
          )}
        </div>
      </section>
    </div>
  );
}

/* ── The live appointment card with reschedule / cancel controls ────────── */
function AppointmentCard({
  appt, onUpdated,
}: {
  appt: ManagedAppointment;
  onUpdated: (appt: ManagedAppointment) => void;
}) {
  const [actionError, setActionError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Cancel flow
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  // Reschedule flow
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [submittingSlot, setSubmittingSlot] = useState<string | null>(null);

  const token = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('token') ?? ''
    : '';

  const meta = STATUS_META[appt.status];
  const isClosed = appt.status === 'cancelled' || appt.status === 'completed';
  const canChange = appt.can_modify && !isClosed;

  // Load availability whenever a reschedule date is picked.
  useEffect(() => {
    if (!rescheduleOpen || !date) return;
    const controller = new AbortController();
    getManageAvailability(appt.business_id, appt.service_id, date, controller.signal)
      .then((res) => setSlots(res.time_slots.filter((s) => s.available)))
      .catch((err) => { if (err.name !== 'AbortError') setSlotsError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setSlotsLoading(false); });
    return () => controller.abort();
  }, [rescheduleOpen, date, appt.business_id, appt.service_id]);

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlots([]);
    setSlotsError(null);
    setSlotsLoading(Boolean(e.target.value));
    setDate(e.target.value);
  };

  const doCancel = useCallback(async () => {
    setCancelling(true);
    setActionError(null);
    try {
      const updated = await cancelManagedAppointment(token);
      onUpdated(updated);
      setConfirmingCancel(false);
      setRescheduleOpen(false);
      setNotice('Your appointment has been cancelled. A confirmation email is on its way.');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'We couldn’t cancel this appointment.');
    } finally {
      setCancelling(false);
    }
  }, [token, onUpdated]);

  const doReschedule = useCallback(async (startTime: string) => {
    setSubmittingSlot(startTime);
    setActionError(null);
    try {
      const updated = await rescheduleManagedAppointment(token, startTime);
      onUpdated(updated);
      setRescheduleOpen(false);
      setSlots([]);
      setDate('');
      setNotice('Your appointment has been moved. A confirmation email is on its way.');
    } catch (err) {
      // 400 = slot just taken / in the past: refresh the list so they can retry.
      setActionError(err instanceof Error ? err.message : 'We couldn’t move this appointment.');
      if (date) {
        setSlotsLoading(true);
        getManageAvailability(appt.business_id, appt.service_id, date)
          .then((res) => setSlots(res.time_slots.filter((s) => s.available)))
          .catch(() => { /* keep the existing error visible */ })
          .finally(() => setSlotsLoading(false));
      }
    } finally {
      setSubmittingSlot(null);
    }
  }, [token, onUpdated, date, appt.business_id, appt.service_id]);

  const today = new Date().toISOString().split('T')[0];
  const inputClass = 'w-full px-4 py-3.5 rounded-xl bg-ink border border-graphite text-ivory placeholder-ash focus:outline-none focus:border-gold-bright/50 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <FadeIn>
      <div className="card-dark p-8 md:p-10">
        {/* Status badge */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${meta.cls}`}>
            <meta.Icon className="w-3.5 h-3.5" />
            {meta.label}
          </span>
          <span className="text-ash text-xs">Booking #{appt.id}</span>
        </div>

        {/* Notice (success after an action) */}
        {notice && (
          <div className="mb-6 rounded-xl border border-confirmed/25 bg-confirmed/10 p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-confirmed flex-shrink-0 mt-0.5" />
            <div className="text-mist text-sm">{notice}</div>
          </div>
        )}

        {/* Action error */}
        {actionError && (
          <div className="mb-6 rounded-xl border border-rose/25 bg-rose/10 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-rose font-semibold text-sm">Something went wrong</div>
              <div className="text-silver text-sm mt-0.5">{actionError}</div>
            </div>
          </div>
        )}

        {/* Appointment details */}
        <div className="space-y-1">
          <DetailRow Icon={Stethoscope} label="Service" value={appt.service_name} />
          <DetailRow Icon={Building2} label="Practice" value={appt.business_name} />
          <DetailRow Icon={CalendarDays} label="Date" value={formatApptDate(appt.start_datetime)} />
          <DetailRow
            Icon={Clock}
            label="Time"
            value={`${formatApptTime(appt.start_datetime)} – ${formatApptTime(appt.end_datetime)} · ${appt.duration} min`}
          />
        </div>

        {/* ── Read-only states ─────────────────────────────── */}
        {isClosed && (
          <div className="mt-8 pt-6 border-t border-graphite">
            <p className="text-silver text-sm">
              {appt.status === 'cancelled'
                ? 'This appointment has been cancelled. To book again, head to our booking page or call us.'
                : 'This appointment is complete. We hope to see you again — thank you for visiting us.'}
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link href="/booking" className="btn-glow px-8 group justify-center">
                <div className="glow-ring" />
                <span className="relative z-10">Book a new appointment</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}

        {!isClosed && !appt.can_modify && (
          <div className="mt-8 pt-6 border-t border-graphite">
            <div className="rounded-xl border border-gold-bright/20 bg-gold/5 p-5 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div className="text-silver text-sm">
                Changes within {appt.cutoff_hours} hours of your appointment need to be made by phone.
                Please call us on{' '}
                <a href={PHONE_HREF} className="text-gold font-semibold whitespace-nowrap">{PHONE}</a>{' '}
                and we’ll sort it out right away.
              </div>
            </div>
          </div>
        )}

        {/* ── Modifiable: reschedule + cancel ──────────────── */}
        {canChange && (
          <div className="mt-8 pt-8 border-t border-graphite">
            {!rescheduleOpen && !confirmingCancel && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { setRescheduleOpen(true); setNotice(null); setActionError(null); }}
                  className="btn-glow px-8 group justify-center flex-1"
                >
                  <div className="glow-ring" />
                  <CalendarClock className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">Reschedule</span>
                </button>
                <button
                  onClick={() => { setConfirmingCancel(true); setNotice(null); setActionError(null); }}
                  className="px-8 py-3.5 rounded-full border border-rose/30 text-rose text-sm font-semibold hover:bg-rose/10 transition-colors flex-1 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel appointment
                </button>
              </div>
            )}

            {/* Cancel confirmation */}
            {confirmingCancel && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-rose/25 bg-rose/5 p-6"
              >
                <h3 className="text-ivory font-bold mb-1.5">Cancel this appointment?</h3>
                <p className="text-silver text-sm mb-5">
                  This frees up your slot and can’t be undone — you’d need to book again. We’ll email you a confirmation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={doCancel}
                    disabled={cancelling}
                    className="px-7 py-3 rounded-full bg-rose text-white text-sm font-semibold hover:bg-rose/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                    {cancelling ? 'Cancelling…' : 'Yes, cancel it'}
                  </button>
                  <button
                    onClick={() => setConfirmingCancel(false)}
                    disabled={cancelling}
                    className="px-7 py-3 rounded-full border border-graphite text-mist text-sm font-semibold hover:border-gold-bright/30 transition-colors disabled:opacity-60"
                  >
                    Keep my appointment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Reschedule picker */}
            {rescheduleOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={() => { setRescheduleOpen(false); setSlots([]); setDate(''); setSlotsError(null); }}
                  className="inline-flex items-center gap-1.5 text-ash text-xs hover:text-gold transition-colors mb-5"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Back
                </button>

                <h3 className="text-ivory font-bold mb-1.5">Pick a new time</h3>
                <p className="text-silver text-sm mb-5">
                  Your visit stays {appt.duration} minutes. Choose a day to see what’s open.
                </p>

                <label className="block text-silver text-xs uppercase tracking-wider mb-2">New date</label>
                <input
                  type="date" min={today} value={date} onChange={onDateChange}
                  className={inputClass}
                />

                <div className="mt-5">
                  <label className="flex items-center gap-2 text-silver text-xs uppercase tracking-wider mb-3">
                    Available times
                    {slotsLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                  </label>

                  {!date && <p className="text-ash text-sm">Pick a date to see open times.</p>}
                  {date && !slotsLoading && slotsError && (
                    <p className="text-rose text-sm">{slotsError}</p>
                  )}
                  {date && !slotsLoading && !slotsError && slots.length === 0 && (
                    <p className="text-ash text-sm">No open times on this day — try another date.</p>
                  )}

                  {slots.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {slots.map((s) => {
                        const busy = submittingSlot === s.start_time;
                        return (
                          <button
                            key={s.start_time}
                            onClick={() => doReschedule(s.start_time)}
                            disabled={submittingSlot !== null}
                            className="card-dark-2 px-3 py-3 rounded-xl text-sm text-mist font-medium hover:border-gold-bright/40 hover:text-gold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                          >
                            {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            {formatApptTime(s.start_time)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Helpline */}
        <div className="mt-8 pt-6 border-t border-graphite">
          <p className="text-ash text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" /> Need a hand?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={PHONE_HREF} className="card-dark-2 px-4 py-2.5 flex items-center gap-2 hover:border-gold-bright/20 transition-all">
              <Phone className="w-4 h-4 text-gold" />
              <span className="text-mist text-sm">{PHONE}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="card-dark-2 px-4 py-2.5 flex items-center gap-2 hover:border-gold-bright/20 transition-all">
              <Mail className="w-4 h-4 text-gold" />
              <span className="text-mist text-sm">{EMAIL}</span>
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function DetailRow({
  Icon, label, value,
}: {
  Icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-graphite/60 last:border-b-0">
      <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold-bright/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gold" />
      </div>
      <div className="min-w-0">
        <div className="text-ash text-xs uppercase tracking-wider">{label}</div>
        <div className="text-ivory text-sm font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

function StatePanel({
  icon, title, body, helpline,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  helpline?: boolean;
}) {
  return (
    <div className="card-dark p-8 md:p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 border border-gold-bright/20 flex items-center justify-center">
        {icon}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-ivory mb-3">{title}</h1>
      <p className="text-silver text-sm md:text-base max-w-md mx-auto">{body}</p>

      {helpline && (
        <div className="mt-8 pt-6 border-t border-graphite">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_HREF} className="card-dark-2 px-4 py-2.5 flex items-center gap-2 hover:border-gold-bright/20 transition-all">
              <Phone className="w-4 h-4 text-gold" />
              <span className="text-mist text-sm">{PHONE}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="card-dark-2 px-4 py-2.5 flex items-center gap-2 hover:border-gold-bright/20 transition-all">
              <Mail className="w-4 h-4 text-gold" />
              <span className="text-mist text-sm">{EMAIL}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

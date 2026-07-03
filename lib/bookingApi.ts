/**
 * Client for the multi-tenant booking backend's PUBLIC endpoints.
 *
 * Config (override in .env.local — both are NEXT_PUBLIC_ so they reach the browser):
 *   NEXT_PUBLIC_BOOKING_API_URL  base incl. version prefix, e.g. http://localhost:8000/api/v1
 *   NEXT_PUBLIC_BUSINESS_ID      tenant id used in the {business_id} path segment
 *
 * Public routes live under `${API_BASE}/public/businesses/${BUSINESS_ID}/...`.
 *
 * Booking is PAYMENT-FIRST: no booking row exists until Paystack confirms the
 * charge. `initializeBooking` starts a Paystack transaction and returns a hosted
 * checkout URL; the visitor pays, Paystack redirects back, and `verifyPayment`
 * reports the final payment + booking status. See PUBLIC_BOOKING_INTEGRATION.md.
 */

export const API_BASE =
  process.env.NEXT_PUBLIC_BOOKING_API_URL ?? 'http://localhost:8000/api/v1';
export const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID ?? '6';

const publicBase = `${API_BASE}/public/businesses/${BUSINESS_ID}`;

/* ── Response/request types (mirror the OpenAPI schemas) ─────────── */
export interface PublicBusiness {
  id: number;
  name: string;
  business_type: string;
  timezone: string;
  reservation_fee: string; // deposit charged online; balance paid at the practice
}

export interface PublicService {
  id: number;
  name: string;
  description: string | null;
  duration: number; // minutes
  price: string; // decimal as string
  requires_approval: boolean;
}

export interface TimeSlot {
  start_time: string; // ISO 8601 with offset
  end_time: string;
  available: boolean;
  staff_id: number | null;
}

export interface AvailabilityResponse {
  date: string;
  service_id: number;
  staff_id: number | null;
  time_slots: TimeSlot[];
}

export interface BookingPayload {
  service_id: number;
  start_datetime: string;
  end_datetime: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone?: string | null;
  notes?: string | null;
}

/**
 * Medical-aid booking — skips online payment. The patient supplies a scheme +
 * membership number and the booking is created and confirmed immediately, then
 * sits in an *awaiting authorization* state until staff verify funding.
 */
export interface MedicalAidBookingPayload extends BookingPayload {
  medical_aid_number: string; // required
  medical_aid_scheme: string; // required, e.g. "Discovery Health"
}

/** Where staff verification sits after a medical-aid booking is created. */
export type MedicalAidStatus = 'pending' | 'authorized' | 'declined';

/** Returned by /bookings/medical-aid — booking is already confirmed; funding is pending. */
export interface MedicalAidBookingResponse {
  id: number;
  status: string; // "confirmed"
  medical_aid_status: MedicalAidStatus; // "pending" right after booking
  start_datetime: string;
  end_datetime?: string;
}

/** Returned by /bookings/initialize — the Paystack transaction to send the visitor to. */
export interface InitializeResponse {
  authorization_url: string; // Paystack hosted checkout — redirect here
  access_code: string; // for the optional Paystack inline popup
  reference: string; // keep this to confirm on the return page
  payment_id: number;
  amount: string; // decimal as string
  currency: string;
}

/** Lifecycle of an appointment as returned by the public manage endpoints. */
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

/**
 * The appointment behind a self-service "manage" link. Returned by every
 * /appointments/manage endpoint (load, cancel, reschedule). The page never
 * decodes the token — it forwards it on each request. See
 * MANAGE_APPOINTMENT_INTEGRATION.md.
 */
export interface ManagedAppointment {
  id: number;
  status: AppointmentStatus;
  start_datetime: string; // ISO 8601 with offset
  end_datetime: string;
  duration: number; // minutes — preserved on reschedule
  business_id: number;
  business_name: string;
  service_id: number;
  service_name: string;
  can_modify: boolean; // false => outside policy, show read-only + "call us"
  cutoff_hours: number;
}

/** Returned by /payments/paystack/verify — the final payment + booking outcome. */
export type PaymentStatus = 'completed' | 'refunded' | 'pending' | 'failed';

export interface VerifyResponse {
  reference: string;
  payment_status: PaymentStatus;
  amount: string;
  currency: string;
  booking_id: number | null;
  booking_status: string | null;
}

/* ── Error handling ──────────────────────────────────────────────── */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function extractDetail(data: unknown, fallback: string): string {
  if (data && typeof data === 'object' && 'detail' in data) {
    const detail = (data as { detail: unknown }).detail;
    if (typeof detail === 'string') return detail;
    // FastAPI validation errors: [{ loc, msg, ... }]
    if (Array.isArray(detail) && detail.length) {
      const first = detail[0] as { msg?: string };
      if (first?.msg) return first.msg;
    }
  }
  return fallback;
}

/**
 * `rawErrors: true` skips the booking-specific friendly rewrites for 409/503 and
 * surfaces the backend's `detail` verbatim — the manage endpoints reuse those
 * status codes with different meanings (409 = already cancelled/completed).
 */
async function request<T>(
  url: string,
  init?: RequestInit & { rawErrors?: boolean },
): Promise<T> {
  const { rawErrors, ...fetchInit } = init ?? {};
  let res: Response;
  try {
    res = await fetch(url, {
      ...fetchInit,
      headers: { 'Content-Type': 'application/json', ...(fetchInit.headers ?? {}) },
    });
  } catch {
    throw new ApiError(
      'Could not reach the booking service. Please check your connection or call us.',
      0,
    );
  }

  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON body */
  }

  if (!res.ok) {
    if (!rawErrors && res.status === 409) {
      throw new ApiError(
        'That time slot was just taken. Please pick another time.',
        409,
      );
    }
    if (!rawErrors && res.status === 503) {
      throw new ApiError(
        "Online payment isn't available right now. Please try again later or call us.",
        503,
      );
    }
    throw new ApiError(extractDetail(data, `Request failed (${res.status})`), res.status);
  }
  return data as T;
}

/* ── Endpoint wrappers ───────────────────────────────────────────── */
export const getBusiness = () => request<PublicBusiness>(publicBase);

export const getServices = () =>
  request<PublicService[]>(`${publicBase}/services`);

export const getAvailability = (serviceId: number, date: string, signal?: AbortSignal) =>
  request<AvailabilityResponse>(
    `${publicBase}/services/${serviceId}/availability?date=${encodeURIComponent(date)}`,
    { signal },
  );

/**
 * Start a payment-first booking. Returns a Paystack checkout URL — no booking
 * row exists yet; it's created only once the charge is confirmed. Redirect the
 * visitor to `authorization_url` (or open the inline popup with `access_code`).
 */
export const initializeBooking = (payload: BookingPayload) =>
  request<InitializeResponse>(`${publicBase}/bookings/initialize`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

/**
 * Book with medical aid — no payment redirect, no /verify step. The booking is
 * created and confirmed immediately (the patient gets a confirmation email) and
 * enters an *awaiting authorization* state; staff later authorize or decline the
 * funding. Returns the confirmed booking. See PUBLIC_BOOKING_INTEGRATION.md.
 */
export const bookWithMedicalAid = (payload: MedicalAidBookingPayload) =>
  request<MedicalAidBookingResponse>(`${publicBase}/bookings/medical-aid`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

/**
 * Confirm a payment on the return page, by either the Yoco checkout id
 * (`reference`) or our internal `paymentId` (appended to the success URL by the
 * backend). Safe to call repeatedly — it finalizes the booking itself, so it
 * works even if the webhook is delayed. Poll again while
 * `payment_status === 'pending'`.
 */
export const verifyPayment = (
  query: { reference?: string; paymentId?: string | number },
  signal?: AbortSignal,
) => {
  const qs = query.reference
    ? `reference=${encodeURIComponent(query.reference)}`
    : `payment_id=${encodeURIComponent(String(query.paymentId))}`;
  return request<VerifyResponse>(
    `${API_BASE}/public/payments/yoco/verify?${qs}`,
    { signal },
  );
};

/* ── Patient self-service "manage appointment" (token-based, no login) ────── */
const manageBase = `${API_BASE}/public/appointments/manage`;
const tokenQuery = (token: string) => `token=${encodeURIComponent(token)}`;

/** Load the appointment behind a manage link. 401 => expired/invalid token. */
export const getManagedAppointment = (token: string, signal?: AbortSignal) =>
  request<ManagedAppointment>(`${manageBase}?${tokenQuery(token)}`, {
    signal,
    rawErrors: true,
  });

/** Cancel the appointment. Fires the cancellation email; returns it cancelled. */
export const cancelManagedAppointment = (token: string) =>
  request<ManagedAppointment>(`${manageBase}/cancel?${tokenQuery(token)}`, {
    method: 'POST',
    rawErrors: true,
  });

/**
 * Move the appointment to a new start time. Send the exact `start_time` from the
 * availability endpoint (timezone-aware ISO 8601) — duration is preserved
 * server-side, so no end time is sent. Fires the reschedule email.
 */
export const rescheduleManagedAppointment = (token: string, startDatetime: string) =>
  request<ManagedAppointment>(`${manageBase}/reschedule?${tokenQuery(token)}`, {
    method: 'POST',
    body: JSON.stringify({ start_datetime: startDatetime }),
    rawErrors: true,
  });

/**
 * Open slots for the reschedule picker. Unlike {@link getAvailability} this takes
 * an explicit `business_id` (from the loaded appointment) rather than the
 * configured tenant, since the manage flow isn't scoped to BUSINESS_ID.
 */
export const getManageAvailability = (
  businessId: number,
  serviceId: number,
  date: string,
  signal?: AbortSignal,
) =>
  request<AvailabilityResponse>(
    `${API_BASE}/public/businesses/${businessId}/services/${serviceId}/availability?date=${encodeURIComponent(date)}`,
    { signal },
  );

/**
 * Client for the multi-tenant booking backend's PUBLIC endpoints.
 *
 * Config (override in .env.local — both are NEXT_PUBLIC_ so they reach the browser):
 *   NEXT_PUBLIC_BOOKING_API_URL  base incl. version prefix, e.g. http://localhost:8000/api/v1
 *   NEXT_PUBLIC_BUSINESS_ID      tenant id used in the {business_id} path segment
 *
 * Public routes live under `${API_BASE}/public/businesses/${BUSINESS_ID}/...`.
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

export interface PublicBookingResponse {
  id: number;
  service_id: number;
  booking_type: string;
  status: string;
  start_datetime: string;
  end_datetime: string;
  duration: number;
  customer_name: string;
  customer_email: string;
  final_price: string;
  created_at: string;
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

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
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
    if (res.status === 409) {
      throw new ApiError(
        'That time slot was just taken. Please pick another time.',
        409,
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

export const createBooking = (payload: BookingPayload) =>
  request<PublicBookingResponse>(`${publicBase}/bookings`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

# Patient "Manage Appointment" page — integration guide

Implements the patient self-service flow: a patient clicks **Manage your
appointment** in an email and can reschedule or cancel **without logging in**.

- **Where it runs:** the public booking site on `http://localhost:3002`.
- **The page route you must build:** `/appointments/manage` (matches
  `MANAGE_APPOINTMENT_URL` in `backend/.env`).
- **How the patient arrives:** the email button links to
  `http://localhost:3002/appointments/manage?token=<JWT>`. Read `token` from the
  query string — it is the only credential the page has.

The backend already exposes everything you need; you only build the page.

---

## The token

- Signed JWT, `type: "manage"`, scoped to **one** `booking_id`, expires ~1 day
  after the appointment. The page never decodes it — it just forwards it on every
  request as `?token=...`.
- If the token is missing/expired/invalid, the backend returns **401**. Show a
  "This link has expired — please call the practice" message.

---

## Backend endpoints (base `http://localhost:8000/api/v1/public`)

All are **unauthenticated** — no `Authorization` / `X-Business-ID` headers.

### 1. Load the appointment
```
GET /appointments/manage?token=<token>
```
Response (`200`):
```jsonc
{
  "id": 42,
  "status": "confirmed",              // pending | confirmed | cancelled | completed
  "start_datetime": "2026-06-25T09:00:00+02:00",
  "end_datetime":   "2026-06-25T09:30:00+02:00",
  "duration": 30,                     // minutes — preserved on reschedule
  "business_id": 6,
  "business_name": "The Venous Lounge — Dr Sesing Surgery & Aesthetics",
  "service_id": 7,
  "service_name": "Vein Evaluation",
  "can_modify": true,                 // false => outside policy, show read-only + "call us"
  "cutoff_hours": 24
}
```
Use `can_modify` to decide whether to show the Reschedule/Cancel buttons.

### 2. Cancel
```
POST /appointments/manage/cancel?token=<token>
```
Returns the same shape with `status: "cancelled"`. Fires the cancellation email.

### 3. Reschedule
```
POST /appointments/manage/reschedule?token=<token>
Content-Type: application/json

{ "start_datetime": "2026-06-27T11:00:00+02:00" }
```
- Send a **timezone-aware ISO 8601** string (include the `+02:00` offset — use the
  exact `start_time` you got from the availability endpoint below).
- **Duration is preserved server-side** — do NOT send an end time.
- Returns the updated appointment. Fires the reschedule email (with the new time).

### 4. Available slots (for the reschedule picker) — existing endpoint
```
GET /businesses/{business_id}/services/{service_id}/availability?date=YYYY-MM-DD
```
Use the `business_id` / `service_id` from step 1. Response:
```jsonc
{
  "date": "2026-06-27T00:00:00+02:00",
  "service_id": 7,
  "time_slots": [
    { "start_time": "2026-06-27T09:00:00+02:00", "end_time": "...", "available": true },
    { "start_time": "2026-06-27T09:30:00+02:00", "end_time": "...", "available": false }
  ]
}
```
Render the slots where `available === true`; on click, POST that slot's
`start_time` to the reschedule endpoint.

---

## Error handling

| Status | Meaning | Suggested UI |
| ------ | ------- | ------------ |
| `401`  | Token missing / expired / wrong type | "This link is no longer valid — please call the practice." |
| `403`  | Within the 24-hour cutoff (`MANAGE_CUTOFF_HOURS`) | "Changes within 24 hours must be made by phone: +27 51 447 9589." |
| `409`  | Already cancelled/completed — nothing to change | Show current status read-only. |
| `400`  | Slot no longer available, or new time in the past | "That time was just taken — please pick another." |

The `detail` field of every error carries a human-readable message you can show
directly.

---

## Minimal React / Next.js example

`app/appointments/manage/page.tsx` (client component):

```tsx
"use client";
import { useEffect, useState } from "react";

const API = "http://localhost:8000/api/v1/public";

export default function ManageAppointment() {
  const token =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token")
      : null;

  const [appt, setAppt] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 1. Load the appointment
  useEffect(() => {
    if (!token) return setError("Missing link token.");
    fetch(`${API}/appointments/manage?token=${token}`)
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json()).detail);
        return r.json();
      })
      .then(setAppt)
      .catch((e) => setError(e.message));
  }, [token]);

  // Load slots for a chosen date (reschedule)
  const loadSlots = async (date: string) => {
    const r = await fetch(
      `${API}/businesses/${appt.business_id}/services/${appt.service_id}/availability?date=${date}`
    );
    const data = await r.json();
    setSlots(data.time_slots.filter((s: any) => s.available));
  };

  const reschedule = async (startTime: string) => {
    const r = await fetch(`${API}/appointments/manage/reschedule?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start_datetime: startTime }),
    });
    if (!r.ok) return setError((await r.json()).detail);
    setAppt(await r.json());
    setSlots([]);
  };

  const cancel = async () => {
    if (!confirm("Cancel this appointment?")) return;
    const r = await fetch(`${API}/appointments/manage/cancel?token=${token}`, {
      method: "POST",
    });
    if (!r.ok) return setError((await r.json()).detail);
    setAppt(await r.json());
  };

  if (error) return <p>{error}</p>;
  if (!appt) return <p>Loading…</p>;

  return (
    <main>
      <h1>{appt.service_name}</h1>
      <p>{new Date(appt.start_datetime).toLocaleString()}</p>
      <p>Status: {appt.status}</p>

      {appt.can_modify ? (
        <>
          <button onClick={cancel}>Cancel appointment</button>
          <input type="date" onChange={(e) => loadSlots(e.target.value)} />
          <ul>
            {slots.map((s) => (
              <li key={s.start_time}>
                <button onClick={() => reschedule(s.start_time)}>
                  {new Date(s.start_time).toLocaleTimeString()}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          To change this appointment, please call the practice on +27 51 447 9589.
        </p>
      )}
    </main>
  );
}
```

---

## Config checklist

- `backend/.env` → `MANAGE_APPOINTMENT_URL=http://localhost:3002/appointments/manage` ✅ (set)
- `backend/.env` → `MANAGE_CUTOFF_HOURS=24` ✅ (set)
- `ALLOWED_HOSTS` already includes `http://localhost:3002` ✅ (CORS OK)
- Restart the backend after changing `.env` (uvicorn `--reload` watches `.py`, not `.env`).
- **Production:** change `MANAGE_APPOINTMENT_URL` to the real site origin and add
  it to `ALLOWED_HOSTS`. Put a rate limit in front of `/api/v1/public/*`
  (PROGRESS.md item 15) before exposing this publicly.

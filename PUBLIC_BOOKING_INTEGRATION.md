# Embedding the booking flow on a public website

How a tenant's marketing site lets a visitor book an appointment and pay with
Paystack. These endpoints are **unauthenticated** — no login, no token, no
`X-Business-ID` header. The `business_id` is part of the URL path, and the
backend validates that the `service_id` belongs to that business.

> Booking is **payment-first**: no booking row exists until Paystack confirms the
> charge. The visitor always goes through Paystack; the free "just create a
> booking" endpoint has been removed.

## The four steps

```
1. GET  /api/v1/public/businesses/{businessId}/services
2. GET  /api/v1/public/businesses/{businessId}/services/{serviceId}/availability?date=YYYY-MM-DD
3. POST /api/v1/public/businesses/{businessId}/bookings/initialize   -> { authorization_url, reference, ... }
       → redirect the visitor to authorization_url (Paystack checkout)
4. GET  /api/v1/public/payments/paystack/verify?reference=...        -> final payment + booking status
```

A server-to-server **webhook** (`POST /api/v1/public/payments/paystack/webhook`)
is the source of truth and finalizes the booking even if the visitor closes the
tab. Step 4 is the browser's "did it work?" check when Paystack redirects back.

---

## 0. Config

```js
const API = "http://localhost:8000";   // your backend origin
const BUSINESS_ID = 6;                  // this tenant's id
```

**CORS:** the browser will block these calls unless your site's origin is in the
backend's `ALLOWED_HOSTS` (`backend/app/core/config.py` + `.env`). Add the public
site's origin (e.g. `https://venouslounge.co.za`) there.

---

## 1. List bookable services

```js
async function getServices() {
  const res = await fetch(`${API}/api/v1/public/businesses/${BUSINESS_ID}/services`);
  if (!res.ok) throw new Error("Could not load services");
  return res.json();
  // -> [{ id, name, description, duration, price, ... }]   (only active + online services)
}
```

## 2. Show available slots for a date

```js
async function getAvailability(serviceId, isoDate /* "2026-07-01" */) {
  const url = `${API}/api/v1/public/businesses/${BUSINESS_ID}/services/${serviceId}/availability?date=${isoDate}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Could not load availability");
  return res.json();
  // -> { date, service_id, time_slots: [{ start_time, end_time, available, staff_id }] }
}
```

Render the slots where `available === true`. Each slot's `start_time` / `end_time`
are full ISO datetimes you pass straight back in step 3.

## 3. Start the booking → redirect to Paystack

```js
async function startBooking({ serviceId, slot, customer }) {
  const res = await fetch(
    `${API}/api/v1/public/businesses/${BUSINESS_ID}/bookings/initialize`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        start_datetime: slot.start_time,   // from the chosen TimeSlot
        end_datetime: slot.end_time,
        customer_first_name: customer.firstName,
        customer_last_name: customer.lastName,
        customer_email: customer.email,
        customer_phone: customer.phone || null,
        notes: customer.notes || null,
      }),
    },
  );

  if (res.status === 409) throw new Error("That slot was just taken — pick another.");
  if (res.status === 503) throw new Error("Online payment isn't available right now.");
  if (!res.ok) throw new Error((await res.json()).detail || "Could not start payment");

  const data = await res.json();
  // { authorization_url, access_code, reference, payment_id, amount, currency }

  // Keep the reference so the return page can confirm it.
  sessionStorage.setItem("paystack_reference", data.reference);

  // Send the visitor to Paystack's hosted checkout.
  window.location.href = data.authorization_url;
}
```

After payment, Paystack redirects the visitor to `PAYSTACK_CALLBACK_URL`
(set in `backend/.env`, currently `http://localhost:3000/booking/complete`),
appending `?reference=...&trxref=...`.

## 4. Confirm on the return page

On whatever page `PAYSTACK_CALLBACK_URL` points to:

```js
async function confirmBooking() {
  const params = new URLSearchParams(window.location.search);
  const reference = params.get("reference") || sessionStorage.getItem("paystack_reference");
  if (!reference) return;

  const res = await fetch(
    `${API}/api/v1/public/payments/paystack/verify?reference=${encodeURIComponent(reference)}`,
  );
  const data = await res.json();
  // { reference, payment_status, amount, currency, booking_id, booking_status }

  if (data.payment_status === "completed" && data.booking_status === "confirmed") {
    // Success — show "Booking confirmed!" with booking_id.
  } else if (data.payment_status === "refunded") {
    // Slot was taken between checkout and payment — auto-refunded. Ask them to rebook.
  } else if (data.payment_status === "pending") {
    // Webhook may still be in flight — poll verify again in a few seconds.
  } else {
    // failed — payment didn't go through.
  }
}
```

`verify` is safe to call repeatedly and finalizes the booking itself, so it works
even if the webhook is delayed or (in local dev) can't reach your machine.

---

## Alternative: Paystack inline popup (no full-page redirect)

`initialize` also returns an `access_code`, so you can open Paystack in a modal
with their inline script instead of redirecting:

```html
<script src="https://js.paystack.co/v2/inline.js"></script>
<script>
  // after calling /initialize and getting { access_code, reference }:
  const popup = new PaystackPop();
  popup.resumeTransaction(access_code, {
    onSuccess: () => location.assign(`/booking/complete?reference=${reference}`),
    onCancel: () => alert("Payment cancelled"),
  });
</script>
```

The redirect flow (steps 3–4) is simpler and is what `PAYSTACK_CALLBACK_URL` is
wired for; use the popup only if you want to keep the visitor on your page.

---

## Alternative: book with medical aid (no online payment)

For patients funded by **medical aid**, offer a second path that skips payment
entirely. The patient supplies a medical aid number + scheme; the booking is
created and **confirmed immediately** (they get a confirmation email), then
enters an *awaiting authorization* state. Staff verify funding in the dashboard
and either authorize it (stays confirmed) or decline it (the booking is cancelled
and the patient is emailed that their medical aid couldn't fund the service).

Steps 1 and 2 (list services, show availability) are identical. Replace step 3
with a single call — there is **no payment redirect and no step 4**:

```js
async function bookWithMedicalAid({ serviceId, slot, customer }) {
  const res = await fetch(
    `${API}/api/v1/public/businesses/${BUSINESS_ID}/bookings/medical-aid`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        start_datetime: slot.start_time,
        end_datetime: slot.end_time,
        customer_first_name: customer.firstName,
        customer_last_name: customer.lastName,
        customer_email: customer.email,
        customer_phone: customer.phone || null,
        notes: customer.notes || null,
        medical_aid_number: customer.medicalAidNumber,   // required
        medical_aid_scheme: customer.medicalAidScheme,   // required, e.g. "Discovery Health"
      }),
    },
  );

  if (res.status === 409) throw new Error("That slot was just taken — pick another.");
  if (!res.ok) throw new Error((await res.json()).detail || "Could not book");

  return res.json();
  // -> { id, status: "confirmed", medical_aid_status: "pending", start_datetime, ... }
}
```

Show the patient a "Booking confirmed — pending medical-aid authorization" message.
The practice is alerted (in-app queue + email) to authorize or decline. If declined,
the patient receives a cancellation email explaining the medical aid couldn't fund
the service.

---

## Going live (production)

1. **Webhook URL** — in the Paystack dashboard (Settings → API Keys & Webhooks),
   set the webhook to `https://<your-backend>/api/v1/public/payments/paystack/webhook`.
   Locally, expose the backend with a tunnel (e.g. `ngrok http 8000`) and use that
   https URL. The webhook is signed with your **secret key**; the server verifies
   the `x-paystack-signature` header automatically.
2. **Switch to live keys** — replace `sk_test_…` / `pk_test_…` in `backend/.env`
   with the live keys, and restart the backend.
3. **CORS** — add the production site origin to `ALLOWED_HOSTS`.
4. **Abandoned checkouts** — a payment that never completes stays `pending` with no
   booking, so it holds nothing. (Optional cleanup of stale `pending` payments can
   be added later.)

## Test card (test mode)

`4084 0840 8408 4081`, CVV `408`, any future expiry, PIN `0000`, OTP `123456`.

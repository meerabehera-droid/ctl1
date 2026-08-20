import type { FormData, SelectedSlot } from '../types';

export type BookingPayload = FormData & { selectedSlots: SelectedSlot[] };

export type StatusCode =
  | 'PENDING_SUPERVISOR'
  | 'PENDING_INCHARGE'
  | 'PENDING_HOD'
  | 'APPROVED'
  | 'REJECTED';

export interface BookingResult {
  ok: boolean;
  id?: string;
  status?: string;
  code?: StatusCode;
  error?: string;
  simulated?: boolean;
}

// ---------------------------------------------------------------------------
// PASTE YOUR APPS SCRIPT URL HERE — the one ending in /exec.
// Leave it as the placeholder text to keep the app in simulation mode.
// ---------------------------------------------------------------------------
const BOOKING_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzcOdTaO5fm9yC8ECf8Z3VdWfH9jQOfbFTHKkLro0N5MtR0ybLdW52NURTxrGE8U50GZQ/exec';

// Uses .env.local if it works in your environment, otherwise the line above.
const envEndpoint = import.meta.env?.VITE_BOOKING_ENDPOINT as string | undefined;
const ENDPOINT = envEndpoint || (BOOKING_ENDPOINT.startsWith('https://') ? BOOKING_ENDPOINT : undefined);

/** False when no backend is configured, so the app falls back to simulation. */
export const isLive = Boolean(ENDPOINT);

/** Sends the booking and triggers the real approval email to the supervisor. */
export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  if (!ENDPOINT) {
    await new Promise((r) => setTimeout(r, 900));
    return {
      ok: true,
      simulated: true,
      id: 'SIM-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      status: 'Pending — Supervisor (simulated)',
      code: 'PENDING_SUPERVISOR',
    };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      // text/plain keeps this a "simple" CORS request. Apps Script cannot answer
      // a preflight, so application/json would be blocked by the browser.
      // The backend runs JSON.parse on the body regardless of this header.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    if (!res.ok) return { ok: false, error: `Server returned ${res.status}` };
    return (await res.json()) as BookingResult;
  } catch {
    return { ok: false, error: 'Could not reach the booking server. Check your connection and try again.' };
  }
}

/** Polls where a submitted request has reached in the approval chain. */
export async function getBookingStatus(id: string): Promise<BookingResult> {
  if (!ENDPOINT) return { ok: false, error: 'No backend configured' };
  try {
    const res = await fetch(`${ENDPOINT}?action=status&id=${encodeURIComponent(id)}`);
    return (await res.json()) as BookingResult;
  } catch {
    return { ok: false, error: 'Network error' };
  }
}

/** Slot keys already taken by any non-rejected booking, for the calendar. */
export async function fetchBookedSlotKeys(): Promise<string[]> {
  if (!ENDPOINT) return [];
  try {
    const res = await fetch(`${ENDPOINT}?action=slots`);
    const data = await res.json();
    return data.ok ? (data.slotKeys as string[]) : [];
  } catch {
    return [];
  }
}
/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR THE COUNTDOWN
 * ─────────────────────────────────────────────────────────────
 *  Change this one constant to point the countdown at another
 *  celebration. Use an ISO-8601 string WITH a UTC offset so it
 *  is identical for every visitor.
 *
 *  Diwali (Lakshmi Puja) 2026 → Sunday, 8 November 2026,
 *  counting down to 6 PM India Standard Time (UTC+05:30).
 *
 *  Next ones for reference:
 *    2027 → 2027-10-29T18:00:00+05:30
 *    2028 → 2028-10-17T18:00:00+05:30
 */
export const DIWALI_DATE = '2026-11-08T18:00:00+05:30'

export const DIWALI_YEAR = new Date(DIWALI_DATE).getFullYear()

export const DIWALI_DATE_LABEL = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
}).format(new Date(DIWALI_DATE))

export const NAV_LINKS = [
  { href: '#lights', label: 'The Light' },
  { href: '#for-you', label: 'Together' },
  { href: '#days', label: 'Five Days' },
  { href: '#diyas', label: 'Diyas' },
  { href: '#rangoli', label: 'Rangoli' },
  { href: '#fireworks', label: 'Fireworks' },
  { href: '#envelope', label: 'Surprise' },
  { href: '#wishes', label: 'Wishes' },
]

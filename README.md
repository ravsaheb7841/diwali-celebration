# ✦ Diwali — The Festival of Lights

A premium, immersive Diwali celebration website. React + Vite, Tailwind CSS v4, Framer Motion and Lucide icons — nothing else. No backend, no database, no paid APIs.

## Features

| Section | What it does |
| --- | --- |
| **Hero** | Staggered letter-reveal headline, parallax mandala, string lights, two living diyas, ambient canvas fireworks, floating golden embers |
| **Countdown** | Live days / hours / minutes / seconds with animated rings. Shows a festive message once the date has passed |
| **Festival of Lights** | Scroll-linked “darkness recedes” visual with the meaning of Diwali |
| **Five Days** | Interactive timeline (hover / tap / focus) — Dhanteras, Naraka Chaturdashi, Lakshmi Puja, Govardhan Puja, Bhai Dooj |
| **Diya Experience** | Nine clickable SVG diyas, each with its own blessing, sparks and a room that brightens as you light them |
| **Fireworks** | Click/tap anywhere in the sky for bursts, pick a colour palette, or hit **Celebrate Diwali** for a finale |
| **Wishes** | Personalised greeting card with an animated golden border, random wish generator, copy-to-clipboard |
| **Footer** | Back-to-top with smooth scroll |

Also: scroll progress bar, mobile menu, film-grain overlay, `prefers-reduced-motion` support, and fireworks/embers canvases that pause when off-screen.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

Requires Node.js 18+.

## Change the countdown date

Edit **one constant** in [`src/config.js`](src/config.js):

```js
export const DIWALI_DATE = '2026-11-08T18:00:00+05:30'
```

Use an ISO-8601 string **with a UTC offset** so every visitor sees the same moment. Once the date passes, the section automatically switches to a festive “The Lamps Are Lit” message — never a negative countdown.

Festival-day copy (names, dates, rituals) lives in [`src/data/festival.js`](src/data/festival.js), along with the diya blessings and the greeting-card wishes.

## Deploy to Vercel

**Option A — Git integration (recommended)**

1. Push this folder to GitHub / GitLab / Bitbucket.
2. In Vercel choose **Add New → Project** and import the repo.
3. Vercel detects Vite automatically (`vercel.json` is already included). Click **Deploy**.

**Option B — CLI**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

No environment variables are needed.

## Project structure

```
diwali-celebration/
├── index.html                  # fonts, meta tags
├── vite.config.js              # React + Tailwind v4 plugins, vendor chunking
├── vercel.json                 # SPA rewrite + immutable asset caching
├── public/favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx                 # page composition, MotionConfig (reduced motion)
    ├── index.css               # Tailwind theme tokens, keyframes, glass / glow utilities
    ├── config.js               # ★ countdown date + nav links
    ├── data/festival.js        # five days, diya blessings, wishes
    ├── lib/
    │   ├── fireworks.js        # canvas fireworks engine (rockets, bursts, finale)
    │   └── useFireworks.js     # hook: lifecycle + pauses when off-screen
    └── components/
        ├── Navbar.jsx          # nav + scroll progress bar
        ├── Hero.jsx
        ├── Countdown.jsx
        ├── FestivalOfLights.jsx
        ├── FiveDays.jsx
        ├── DiyaExperience.jsx
        ├── FireworksStage.jsx
        ├── Wishes.jsx
        ├── Footer.jsx
        ├── Diya.jsx            # SVG clay lamp with flickering flame
        ├── Mandala.jsx         # SVG rangoli line-art
        ├── LightString.jsx     # twinkling garland
        ├── Embers.jsx          # floating golden particles (canvas, sprite-based)
        └── Reveal.jsx          # Reveal / TextReveal / SectionHeading helpers
```

## Performance & accessibility notes

- All illustrations (diyas, mandalas, skyline, lights) are inline SVG / CSS — no image downloads.
- Canvases cap device-pixel-ratio, reuse pre-rendered glow sprites, compact particle arrays in place, and stop their animation loops when idle or off-screen.
- `prefers-reduced-motion`: Framer Motion transforms are disabled, CSS animations are neutralised, embers render as a still frame and ambient fireworks are switched off (user-triggered bursts still work).
- Interactive elements are real `<button>`s with labels, focus rings and `aria-*` state; the five-day timeline is a proper tablist.

## Notes on dates

Diwali dates are determined by the lunar calendar. For 2026, Lakshmi Puja falls on **Sunday, 8 November**. Naraka Chaturdashi, Govardhan Puja and Bhai Dooj can differ by a day depending on region and panchang, so the Five Days section shows ranges where sources disagree.

Happy Diwali! 🪔

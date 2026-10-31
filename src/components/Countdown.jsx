import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { DIWALI_DATE, DIWALI_DATE_LABEL, DIWALI_YEAR } from '../config.js'
import { Reveal, SectionHeading } from './Reveal.jsx'
import Diya from './Diya.jsx'

const TARGET = new Date(DIWALI_DATE).getTime()

function compute() {
  const diff = TARGET - Date.now()
  if (Number.isNaN(TARGET) || diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  const s = Math.floor(diff / 1000)
  return {
    done: false,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

function useCountdown() {
  const [t, setT] = useState(compute)
  useEffect(() => {
    const id = setInterval(() => setT(compute()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

const R = 46
const C = 2 * Math.PI * R

function Unit({ value, max, label, tick }) {
  const frac = Math.min(1, value / max)
  const wrapped = value === max - 1
  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-[clamp(132px,38vw,210px)] sm:w-[clamp(150px,19vw,210px)]">
        <div className="absolute inset-[7%] rounded-full glass" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
          <defs>
            <linearGradient id={`cd-${label}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff4cf" />
              <stop offset="0.5" stopColor="#ffd566" />
              <stop offset="1" stopColor="#ff8112" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,213,102,0.12)" strokeWidth="1.2" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={`url(#cd-${label})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - frac)}
            style={{ transition: wrapped ? 'none' : 'stroke-dashoffset 0.95s linear', filter: 'drop-shadow(0 0 3px rgba(255,170,50,0.8))' }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-[1.1em] w-full overflow-hidden text-center font-display text-[clamp(2.8rem,9vw,5rem)] font-medium leading-none tabular-nums text-gold-100">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={tick ? value : 'static'}
                initial={{ y: '70%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-70%', opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid place-items-center"
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <span className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.35em] text-gold-300/90">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const t = useCountdown()

  return (
    <section id="countdown" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The Wait Is Almost Over"
          title={t.done ? 'The Lamps Are Lit' : `Counting Down to Diwali ${DIWALI_YEAR}`}
        />

        {t.done ? (
          <Reveal delay={0.2} className="mx-auto mt-16 flex max-w-2xl flex-col items-center text-center">
            <Diya lit className="w-44 sm:w-56" />
            <h3 className="mt-14 font-display text-4xl italic text-gold-gradient sm:text-5xl">Shubh Deepavali!</h3>
            <p className="mt-5 text-balance text-lg leading-relaxed text-cream/75">
              The festival of lights has arrived. May every lamp you light today bring warmth to your home and may this glow
              stay with you all year long.
            </p>
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.2} className="mt-16">
              <div role="timer" aria-label="Time remaining until Diwali" className="grid grid-cols-2 place-items-center gap-x-4 gap-y-10 md:grid-cols-4">
                <Unit value={t.days} max={30} label="Days" tick />
                <Unit value={t.hours} max={24} label="Hours" tick />
                <Unit value={t.minutes} max={60} label="Minutes" tick />
                <Unit value={t.seconds} max={60} label="Seconds" tick />
              </div>
            </Reveal>
            <Reveal delay={0.35} className="mt-14 flex justify-center">
              <p className="inline-flex items-center gap-3 rounded-full border border-gold-300/20 bg-night-900/50 px-6 py-3 text-sm tracking-wide text-cream/80 backdrop-blur">
                <CalendarDays size={16} className="text-gold-300" />
                {DIWALI_DATE_LABEL} · Lakshmi Puja
              </p>
            </Reveal>
          </>
        )}
      </div>
    </section>
  )
}

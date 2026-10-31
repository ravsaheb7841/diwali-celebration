import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FIVE_DAYS } from '../data/festival.js'
import { Reveal, SectionHeading } from './Reveal.jsx'

const EASE = [0.22, 1, 0.36, 1]

export default function FiveDays() {
  const [active, setActive] = useState(2) // start on the main night
  const day = FIVE_DAYS[active]
  const Icon = day.icon
  const progress = (active / (FIVE_DAYS.length - 1)) * 100

  return (
    <section id="days" className="relative px-5 py-24 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Five Days of Light"
          title="One festival, five luminous chapters"
          subtitle="Tap or hover a day to follow the story of Diwali from the first lamp to the last embrace."
        />

        {/* Timeline */}
        <Reveal delay={0.15} className="mt-16 sm:mt-20">
          <div className="relative mx-auto max-w-4xl" role="tablist" aria-label="The five days of Diwali">
            {/* rail */}
            <div className="absolute left-[10%] right-[10%] top-[34px] h-px bg-gold-300/15 sm:top-[40px]" aria-hidden="true">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-500 via-gold-200 to-saffron-500 shadow-[0_0_14px_2px_rgba(255,190,70,0.7)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </div>

            <div className="grid grid-cols-5">
              {FIVE_DAYS.map((d, i) => {
                const I = d.icon
                const isActive = i === active
                const passed = i <= active
                return (
                  <button
                    key={d.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="day-panel"
                    id={`tab-${d.id}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative flex flex-col items-center gap-3 outline-offset-8"
                  >
                    <motion.span
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.94 }}
                      className="relative grid h-[68px] w-[68px] place-items-center rounded-full sm:h-20 sm:w-20"
                      style={{
                        background: isActive
                          ? `radial-gradient(circle at 35% 30%, ${d.accent}, #8a3a08)`
                          : 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                        border: `1px solid ${passed ? d.accent + 'aa' : 'rgba(255,213,102,0.2)'}`,
                        boxShadow: isActive ? `0 0 38px 6px ${d.accent}66` : 'none',
                        transition: 'box-shadow 0.5s, background 0.5s, border-color 0.5s',
                      }}
                    >
                      {isActive && <span className="animate-ring absolute inset-0 rounded-full border border-gold-200/60" aria-hidden="true" />}
                      <motion.span
                        animate={{ rotate: isActive ? [0, -8, 8, 0] : 0, scale: isActive ? 1.1 : 1 }}
                        transition={{ duration: 0.7 }}
                        className={isActive ? 'text-night-950' : 'text-gold-200 transition-colors group-hover:text-gold-100'}
                      >
                        <I size={26} strokeWidth={1.7} />
                      </motion.span>
                    </motion.span>
                    <span className={`text-[0.65rem] font-medium uppercase tracking-[0.28em] transition-colors ${isActive ? 'text-gold-200' : 'text-cream/45 group-hover:text-cream/80'}`}>
                      Day {d.day}
                    </span>
                    <span className={`hidden text-center font-display text-lg leading-tight transition-colors sm:block ${isActive ? 'text-cream' : 'text-cream/55 group-hover:text-cream/90'}`}>
                      {d.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Detail panel */}
        <div id="day-panel" role="tabpanel" aria-labelledby={`tab-${day.id}`} className="relative mx-auto mt-14 min-h-[420px] max-w-5xl sm:mt-20 sm:min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] border border-gold-300/15 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-7 backdrop-blur-md sm:p-12 md:grid-cols-[1.3fr_1fr]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[12rem] font-semibold italic leading-none opacity-[0.07] sm:text-[17rem]"
                style={{ color: day.accent }}
              >
                0{day.day}
              </span>

              <div className="relative">
                <p className="font-deva text-xl" style={{ color: day.accent }}>
                  {day.sanskrit}
                </p>
                <h3 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-none text-cream">{day.name}</h3>
                <p className="mt-4 inline-flex rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.25em]" style={{ borderColor: day.accent + '66', color: day.accent }}>
                  {day.date} · 2026
                </p>
                <p className="mt-6 font-display text-xl italic text-gold-100/90">{day.summary}</p>
                <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-cream/65">{day.description}</p>
                <ul className="mt-7 flex flex-wrap gap-2.5">
                  {day.rituals.map((r) => (
                    <li key={r} className="rounded-full border border-gold-300/20 bg-night-900/50 px-4 py-2 text-[0.82rem] text-cream/80">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mx-auto hidden aspect-square w-full max-w-[260px] place-items-center md:grid" aria-hidden="true">
                <div className="absolute inset-0 rounded-full opacity-60 blur-2xl" style={{ background: `radial-gradient(circle, ${day.accent}88, transparent 68%)` }} />
                <div className="animate-spin-slow absolute inset-3 rounded-full border border-dashed" style={{ borderColor: day.accent + '66' }} />
                <div className="animate-spin-slower absolute inset-10 rounded-full border" style={{ borderColor: day.accent + '33' }} />
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ color: day.accent, filter: `drop-shadow(0 0 22px ${day.accent}aa)` }}>
                  <Icon size={92} strokeWidth={1.1} />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-xs tracking-wide text-cream/40">
          Dates shown for 2026 — Naraka Chaturdashi, Govardhan Puja and Bhai Dooj can differ by a day depending on region and panchang.
        </p>
      </div>
    </section>
  )
}

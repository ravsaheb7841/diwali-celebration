import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Flame, RotateCcw } from 'lucide-react'
import Diya from './Diya.jsx'
import { DIYA_WISHES } from '../data/festival.js'
import { Reveal, SectionHeading } from './Reveal.jsx'

const EASE = [0.22, 1, 0.36, 1]
const TOTAL = DIYA_WISHES.length

/** A little burst of golden sparks when a diya is lit. */
function Sparks() {
  const bits = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 + Math.random() * 0.4
        const d = 34 + Math.random() * 46
        return { x: Math.cos(a) * d, y: Math.sin(a) * d - 18, s: 2 + Math.random() * 3 }
      }),
    [],
  )
  return (
    <div className="pointer-events-none absolute left-1/2 top-[18%]" aria-hidden="true">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-full bg-gold-200"
          style={{ width: b.s, height: b.s, boxShadow: '0 0 8px 2px rgba(255,200,80,0.9)' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: b.x, y: b.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.95, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export default function DiyaExperience() {
  const [lit, setLit] = useState(() => new Set())
  const [current, setCurrent] = useState(null)
  const [sparks, setSparks] = useState({})

  const count = lit.size
  const allLit = count === TOTAL

  const light = (i) => {
    setLit((prev) => {
      if (prev.has(i)) return prev
      const next = new Set(prev)
      next.add(i)
      return next
    })
    if (!lit.has(i)) setSparks((s) => ({ ...s, [i]: (s[i] || 0) + 1 }))
    setCurrent(i)
  }

  const lightNext = () => {
    if (allLit) {
      setLit(new Set())
      setCurrent(null)
      setSparks({})
      return
    }
    const unlit = DIYA_WISHES.map((_, i) => i).filter((i) => !lit.has(i))
    light(unlit[Math.floor(Math.random() * unlit.length)])
  }

  const reset = () => {
    setLit(new Set())
    setCurrent(null)
    setSparks({})
  }

  return (
    <section id="diyas" className="relative overflow-hidden px-5 py-24 sm:py-36">
      {/* the room brightens as lamps are lit */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_55%,rgba(255,140,30,0.3),transparent_70%)]"
        animate={{ opacity: count / TOTAL }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Interactive Ritual"
          title="Light a diya, make a wish"
          subtitle="Each lamp carries a blessing. Tap a diya — or press the button — and watch the darkness step back."
        />

        {/* Diya row */}
        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-3 gap-x-2 gap-y-10 sm:gap-x-6 lg:grid-cols-9 lg:gap-x-1 lg:gap-y-0">
          {DIYA_WISHES.map((w, i) => {
            const isLit = lit.has(i)
            const arc = Math.pow(Math.abs(i - (TOTAL - 1) / 2), 2) * 5
            return (
              <Reveal key={w.name} delay={i * 0.05} y={24}>
                <div style={{ '--arc': `${arc}px` }} className="lg:[transform:translateY(var(--arc))]">
                  <button
                    type="button"
                    onClick={() => light(i)}
                    aria-pressed={isLit}
                    aria-label={`${isLit ? 'Diya of' : 'Light the diya of'} ${w.name}`}
                    className="group relative mx-auto flex w-full max-w-[120px] flex-col items-center rounded-2xl px-1 pb-2 pt-10 outline-offset-4"
                  >
                    <motion.div whileHover={{ y: -6, scale: 1.06 }} whileTap={{ scale: 0.94 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="relative w-full">
                      {!isLit && (
                        <span aria-hidden="true" className="animate-ring pointer-events-none absolute left-1/2 top-[16%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-300/50" style={{ animationDelay: `${i * 0.25}s` }} />
                      )}
                      <Diya lit={isLit} halo />
                      {sparks[i] ? <Sparks key={sparks[i]} /> : null}
                    </motion.div>
                    <span className={`mt-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] transition-colors duration-700 ${isLit ? 'text-gold-200' : 'text-cream/35 group-hover:text-cream/65'}`}>
                      {w.name}
                    </span>
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Message */}
        <div className="mx-auto mt-16 flex min-h-[170px] max-w-2xl flex-col items-center text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            {allLit ? (
              <motion.div key="all" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: EASE }}>
                <p className="font-display text-4xl italic text-gold-gradient sm:text-5xl">Every lamp is lit.</p>
                <p className="mt-4 text-lg leading-relaxed text-cream/75">
                  Prosperity, health, love, wisdom, peace — may all nine blessings find you this Diwali. Shubh Deepavali!
                </p>
              </motion.div>
            ) : current !== null ? (
              <motion.div key={current} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: EASE }}>
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.35em] text-gold-300">Blessing of {DIYA_WISHES[current].name}</p>
                <p className="mt-4 font-display text-3xl italic leading-snug text-cream sm:text-4xl">{DIYA_WISHES[current].line}</p>
              </motion.div>
            ) : (
              <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 font-display text-2xl italic text-cream/50">
                The lamps are waiting for you…
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button type="button" onClick={lightNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="btn-glow inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.95rem] font-semibold tracking-wide">
              <Flame size={18} />
              {allLit ? 'Light Them Again' : 'Light a Diya'}
            </motion.button>
            {count > 0 && !allLit && (
              <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} type="button" onClick={reset} className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm">
                <RotateCcw size={15} />
                Reset
              </motion.button>
            )}
          </div>

          <div className="flex items-center gap-3" aria-label={`${count} of ${TOTAL} diyas lit`}>
            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-saffron-400" animate={{ width: `${(count / TOTAL) * 100}%` }} transition={{ duration: 0.6, ease: EASE }} />
            </div>
            <span className="text-xs tabular-nums tracking-widest text-cream/50">
              {count} / {TOTAL}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

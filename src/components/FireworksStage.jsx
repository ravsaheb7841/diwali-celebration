import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PartyPopper, MousePointerClick } from 'lucide-react'
import { useFireworks } from '../lib/useFireworks.js'
import { Reveal, SectionHeading } from './Reveal.jsx'

const PALETTE_OPTIONS = [
  { id: 'gold', label: 'Royal Gold', swatch: 'linear-gradient(135deg,#fff1b8,#f7b733)' },
  { id: 'saffron', label: 'Saffron', swatch: 'linear-gradient(135deg,#ffb347,#ff5a1f)' },
  { id: 'jewel', label: 'Jewel', swatch: 'conic-gradient(#ff4d6d,#ffd166,#06d6a0,#4cc9f0,#b388ff,#ff4d6d)' },
]

// [x, width, height, kind] — a stylised skyline of temple domes and rooftops
const SKYLINE = [
  [0, 70, 46, 'box'], [70, 54, 78, 'dome'], [124, 40, 56, 'box'], [164, 86, 108, 'temple'], [250, 46, 62, 'box'],
  [296, 60, 84, 'dome'], [356, 40, 50, 'box'], [396, 70, 70, 'box'], [466, 94, 124, 'temple'], [560, 44, 58, 'box'],
  [604, 66, 92, 'dome'], [670, 48, 64, 'box'], [718, 80, 100, 'temple'], [798, 50, 52, 'box'], [848, 62, 80, 'dome'],
  [910, 44, 60, 'box'], [954, 90, 116, 'temple'], [1044, 46, 54, 'box'], [1090, 62, 84, 'dome'], [1152, 48, 58, 'box'],
]

function Skyline() {
  const base = 160
  return (
    <svg viewBox="0 0 1200 160" preserveAspectRatio="xMidYMax slice" className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] min-h-[90px] w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sky-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0b3d" />
          <stop offset="1" stopColor="#07030f" />
        </linearGradient>
      </defs>
      {SKYLINE.map(([x, w, h, kind], i) => {
        const y = base - h
        return (
          <g key={i} fill="url(#sky-fade)">
            <rect x={x} y={y} width={w} height={h} />
            {kind === 'dome' && <path d={`M${x + 4} ${y} A${w / 2 - 4} ${w / 2 - 4} 0 0 1 ${x + w - 4} ${y} Z`} />}
            {kind === 'dome' && <rect x={x + w / 2 - 1} y={y - w / 2 - 8} width="2" height="10" />}
            {kind === 'temple' && (
              <>
                <path d={`M${x + 6} ${y} Q${x + w / 2} ${y - 78} ${x + w - 6} ${y} Z`} />
                <rect x={x + w / 2 - 1} y={y - 66} width="2" height="14" />
              </>
            )}
            {Array.from({ length: Math.floor(h / 24) }).map((_, r) =>
              Array.from({ length: Math.max(1, Math.floor(w / 24)) }).map((__, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={x + 8 + c * 20}
                  y={y + 12 + r * 22}
                  width="5"
                  height="7"
                  rx="1"
                  fill="#ffc857"
                  className="animate-twinkle"
                  style={{ animationDelay: `${((i * 7 + r * 3 + c * 5) % 17) * 0.23}s`, animationDuration: `${3 + ((i + r + c) % 4)}s` }}
                />
              )),
            )}
          </g>
        )
      })}
      <rect x="0" y="150" width="1200" height="10" fill="#07030f" />
    </svg>
  )
}

export default function FireworksStage() {
  const canvasRef = useRef(null)
  const [palette, setPalette] = useState('gold')
  const [celebrating, setCelebrating] = useState(false)
  const [touched, setTouched] = useState(false)
  const timer = useRef(0)
  const engine = useFireworks(canvasRef, { palette, power: 1.1 })

  useEffect(() => () => clearTimeout(timer.current), [])

  const onPointer = (e) => {
    const r = canvasRef.current.getBoundingClientRect()
    engine.current?.burst(e.clientX - r.left, e.clientY - r.top)
    setTouched(true)
  }

  const celebrate = () => {
    if (celebrating || !engine.current) return
    setCelebrating(true)
    setTouched(true)
    const ms = engine.current.finale()
    timer.current = setTimeout(() => setCelebrating(false), ms)
  }

  return (
    <section id="fireworks" className="relative px-5 py-24 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Night Sky"
          title="Paint the sky with fireworks"
          subtitle="Tap anywhere in the sky to set off a burst — or let the whole city celebrate at once."
        />

        <Reveal delay={0.15} className="mt-14">
          <div className="relative h-[68svh] min-h-[420px] overflow-hidden rounded-[2rem] border border-gold-300/20 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,#3a1670_0%,#140b38_45%,#07030f_100%)] shadow-[0_30px_90px_-30px_rgba(255,140,30,0.35)] sm:h-[72svh]">
            {/* twinkling stars */}
            <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
              {Array.from({ length: 36 }).map((_, i) => (
                <span
                  key={i}
                  className="animate-twinkle absolute block rounded-full bg-cream"
                  style={{
                    left: `${(i * 53) % 100}%`,
                    top: `${(i * 37) % 62}%`,
                    width: i % 5 === 0 ? 3 : 2,
                    height: i % 5 === 0 ? 3 : 2,
                    animationDelay: `${(i % 9) * 0.45}s`,
                    animationDuration: `${2.5 + (i % 5) * 0.6}s`,
                  }}
                />
              ))}
            </div>

            <canvas
              ref={canvasRef}
              onPointerDown={onPointer}
              role="img"
              aria-label="Fireworks sky. Tap or click anywhere to launch fireworks."
              className="absolute inset-0 z-10 h-full w-full cursor-crosshair touch-manipulation"
            />
            <Skyline />

            <AnimatePresence>
              {!touched && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6 }}
                  className="pointer-events-none absolute left-1/2 top-[38%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center"
                >
                  <span className="relative grid h-14 w-14 place-items-center rounded-full border border-gold-300/50 text-gold-200">
                    <span className="animate-ring absolute inset-0 rounded-full border border-gold-300/60" />
                    <MousePointerClick size={22} />
                  </span>
                  <span className="font-display text-2xl italic text-cream/85">Tap the sky</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3" role="radiogroup" aria-label="Firework colours">
            {PALETTE_OPTIONS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={palette === p.id}
                onClick={() => setPalette(p.id)}
                className={`flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                  palette === p.id ? 'border-gold-300/80 bg-gold-300/10 text-gold-100' : 'border-white/10 text-cream/60 hover:border-gold-300/40'
                }`}
              >
                <span className="block h-4 w-4 rounded-full" style={{ background: p.swatch }} />
                <span className="hidden sm:inline">{p.label}</span>
                <span className="sr-only sm:hidden">{p.label}</span>
              </button>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={celebrate}
            disabled={celebrating}
            whileHover={{ scale: celebrating ? 1 : 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="btn-glow inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.95rem] font-semibold tracking-wide disabled:cursor-wait disabled:opacity-80"
          >
            <PartyPopper size={18} />
            {celebrating ? 'Celebrating…' : 'Celebrate Diwali'}
          </motion.button>
        </Reveal>
      </div>
    </section>
  )
}

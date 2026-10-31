import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Brush, RotateCcw } from 'lucide-react'
import { Reveal, SectionHeading } from './Reveal.jsx'

const COLORS = [
  { name: 'Gold', value: '#ffd566' },
  { name: 'Saffron', value: '#ff9d2e' },
  { name: 'Rose', value: '#ff7b8f' },
  { name: 'Jewel', value: '#8ee7d2' },
]

const DESIGNS = [
  { id: 'lotus', label: 'Lotus', petals: 8 },
  { id: 'sun', label: 'Sun', petals: 12 },
  { id: 'star', label: 'Star', petals: 6 },
]

function petalPath(index, total, radius, length) {
  const angle = (index / total) * Math.PI * 2
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  return `M ${x} ${y} C ${x + Math.cos(angle + 0.55) * length} ${y + Math.sin(angle + 0.55) * length} ${x + Math.cos(angle - 0.55) * length} ${y + Math.sin(angle - 0.55) * length} ${x} ${y}`
}

export default function RangoliStudio() {
  const [color, setColor] = useState(COLORS[0].value)
  const [design, setDesign] = useState(DESIGNS[0])
  const [marks, setMarks] = useState([])

  const dots = useMemo(() => Array.from({ length: design.petals }, (_, i) => i), [design])

  const addMark = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 280 - 140
    const y = ((event.clientY - rect.top) / rect.height) * 280 - 140
    setMarks((current) => [...current.slice(-29), { x, y, color }])
  }

  return (
    <section id="rangoli" className="relative overflow-hidden px-5 py-24 sm:py-36">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Create Something Beautiful"
          title="Make your own rangoli"
          subtitle="Choose a design and colours, then tap the canvas to add your own glowing pattern."
        />

        <Reveal delay={0.15} className="mx-auto mt-14 grid max-w-5xl items-center gap-10 rounded-[2rem] border border-gold-300/20 bg-white/[0.035] p-6 backdrop-blur-md sm:p-10 lg:grid-cols-[1fr_0.85fr]">
          <div className="relative mx-auto aspect-square w-full max-w-[330px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-gold-300/20"
            />
            <svg
              viewBox="0 0 280 280"
              onPointerDown={addMark}
              role="img"
              aria-label="Interactive rangoli canvas"
              className="relative h-full w-full cursor-crosshair touch-none overflow-visible"
            >
              <defs>
                <radialGradient id="rangoli-core">
                  <stop offset="0" stopColor="#fff4cf" />
                  <stop offset="0.5" stopColor="#ffd566" />
                  <stop offset="1" stopColor="#ff9d2e" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="140" cy="140" r="112" fill="none" stroke="rgba(255,213,102,0.16)" strokeWidth="1" />
              <circle cx="140" cy="140" r="78" fill="none" stroke="rgba(255,213,102,0.2)" strokeWidth="1" strokeDasharray="2 7" />
              <g transform="translate(140 140)" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9">
                {dots.map((i) => (
                  <path key={i} d={petalPath(i, design.petals, design.id === 'star' ? 45 : 58, design.id === 'sun' ? 35 : 28)} />
                ))}
              </g>
              <circle cx="140" cy="140" r="24" fill="url(#rangoli-core)" opacity="0.85" />
              {marks.map((mark, i) => (
                <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ transformOrigin: `${mark.x + 140}px ${mark.y + 140}px` }}>
                  <circle cx={mark.x + 140} cy={mark.y + 140} r="7" fill={mark.color} opacity="0.3" />
                  <circle cx={mark.x + 140} cy={mark.y + 140} r="2.8" fill={mark.color} />
                </motion.g>
              ))}
            </svg>
          </div>

          <div className="text-center lg:text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-300">Choose a design</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                {DESIGNS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDesign(option)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${design.id === option.id ? 'border-gold-300/80 bg-gold-300/15 text-gold-100' : 'border-white/10 text-cream/60 hover:border-gold-300/40'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-300">Choose a colour</p>
              <div className="mt-4 flex justify-center gap-3 lg:justify-start">
                {COLORS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-label={option.name}
                    aria-pressed={color === option.value}
                    onClick={() => setColor(option.value)}
                    className={`h-9 w-9 rounded-full border-2 transition ${color === option.value ? 'scale-110 border-gold-100 shadow-[0_0_18px_4px_rgba(255,213,102,0.45)]' : 'border-white/20'}`}
                    style={{ backgroundColor: option.value }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <motion.button type="button" onClick={() => setMarks([])} whileTap={{ scale: 0.96 }} className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm">
                <RotateCcw size={15} />
                Clear pattern
              </motion.button>
              <span className="inline-flex items-center gap-2 py-3 text-xs uppercase tracking-[0.2em] text-cream/45">
                <Brush size={15} />
                Tap to draw
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

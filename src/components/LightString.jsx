const SWAGS = 5
const PER_SWAG = 4
const COLORS = ['#ffd566', '#ff9d2e', '#ff5a1f', '#ffe69a', '#ff7a8a']

// y-position (0-100, % of container height) of the wire at x (0-1)
const wireY = (x) => {
  const t = (x * SWAGS) % 1
  return 8 + 4 * t * (1 - t) * 62
}

const WIRE = Array.from({ length: 161 }, (_, i) => {
  const x = i / 160
  return `${i === 0 ? 'M' : 'L'}${(x * 100).toFixed(2)},${wireY(x).toFixed(2)}`
}).join(' ')

const BULBS = Array.from({ length: SWAGS * PER_SWAG }, (_, i) => {
  const swag = Math.floor(i / PER_SWAG)
  const k = (i % PER_SWAG) + 0.5
  const x = (swag + k / PER_SWAG) / SWAGS
  return { x, y: wireY(x), color: COLORS[i % COLORS.length], delay: (i * 0.37) % 3 }
})

/** A garland of twinkling festive lights hung across the top of the hero. */
export default function LightString({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 h-24 sm:h-28 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d={WIRE} fill="none" stroke="rgba(255,213,102,0.45)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      {BULBS.map((b, i) => (
        <span
          key={i}
          className="animate-twinkle absolute block -translate-x-1/2"
          style={{ left: `${b.x * 100}%`, top: `${b.y}%`, animationDelay: `${b.delay}s`, animationDuration: `${2.4 + (i % 4) * 0.5}s` }}
        >
          <span className="mx-auto block h-1.5 w-1.5 rounded-sm bg-gold-600" />
          <span
            className="block h-3 w-2 rounded-b-full rounded-t-[40%] sm:h-4 sm:w-2.5"
            style={{ background: b.color, boxShadow: `0 0 12px 3px ${b.color}88, 0 0 28px 8px ${b.color}33` }}
          />
        </span>
      ))}
    </div>
  )
}

import { useId } from 'react'

/**
 * A hand-drawn SVG clay diya with a living flame.
 * `lit` toggles the flame, the oil glow and the soft halo around the lamp.
 */
export default function Diya({ lit = true, className = '', halo = true }) {
  const uid = useId().replace(/:/g, '')
  const id = (n) => `${uid}-${n}`

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: '220 / 170' }}>
      {halo && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[16%] aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000"
          style={{ opacity: lit ? 1 : 0 }}
        >
          <div
            className="diya-glow h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,184,70,0.5) 0%, rgba(255,128,32,0.2) 30%, rgba(255,90,20,0.06) 52%, transparent 68%)',
            }}
          />
        </div>
      )}

      <svg viewBox="0 0 220 170" className="relative block h-full w-full overflow-visible" role="img" aria-label={lit ? 'A lit diya' : 'An unlit diya'}>
        <defs>
          <linearGradient id={id('clay')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0954a" />
            <stop offset="0.5" stopColor="#c0541b" />
            <stop offset="1" stopColor="#5e1f0d" />
          </linearGradient>
          <linearGradient id={id('rim')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b87408" />
            <stop offset="0.3" stopColor="#ffe69a" />
            <stop offset="0.6" stopColor="#f7b733" />
            <stop offset="1" stopColor="#a8650a" />
          </linearGradient>
          <radialGradient id={id('flame')} cx="50%" cy="78%" r="70%">
            <stop offset="0" stopColor="#fff6c8" />
            <stop offset="0.35" stopColor="#ffc640" />
            <stop offset="0.75" stopColor="#ff7a1a" />
            <stop offset="1" stopColor="#e03a10" />
          </radialGradient>
          <radialGradient id={id('core')} cx="50%" cy="80%" r="70%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#fff2b0" />
            <stop offset="1" stopColor="#ffd05a" />
          </radialGradient>
          <radialGradient id={id('oil')} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffb347" />
            <stop offset="1" stopColor="#7a2c0a" />
          </radialGradient>
        </defs>

        {/* ground shadow */}
        <ellipse cx="110" cy="160" rx="72" ry="7" fill="#000" opacity="0.38" />

        {/* bowl */}
        <path
          d="M12 74 C 26 74 30 82 36 84 C 62 94 84 94 110 94 C 136 94 158 94 184 84 C 190 82 194 74 208 74 C 204 124 168 152 110 152 C 52 152 16 124 12 74 Z"
          fill={`url(#${id('clay')})`}
        />
        {/* sheen */}
        <path d="M34 100 C 44 124 66 138 92 143" fill="none" stroke="#ffd9a0" strokeOpacity="0.28" strokeWidth="5" strokeLinecap="round" />

        {/* gold ornament band */}
        <path d="M30 104 C 56 120 164 120 190 104" fill="none" stroke={`url(#${id('rim')})`} strokeWidth="2.4" strokeLinecap="round" />
        {[40, 58, 76, 94, 110, 126, 144, 162, 180].map((x, i) => {
          const t = (x - 30) / 160
          const y = 104 + Math.sin(Math.PI * t) * 12.5
          return <circle key={x} cx={x} cy={y + 6} r={i % 2 ? 2.1 : 3} fill="#ffd566" opacity="0.9" />
        })}

        {/* rim + oil */}
        <ellipse cx="110" cy="80" rx="96" ry="15" fill={`url(#${id('rim')})`} />
        <ellipse cx="110" cy="82" rx="82" ry="10.5" fill="#4a1706" />
        <ellipse cx="110" cy="82" rx="76" ry="8.5" fill={`url(#${id('oil')})`} className={`oil-glow ${lit ? 'oil-glow-on' : ''}`} />

        {/* wick */}
        <rect x="107" y="62" width="6" height="22" rx="3" fill="#2a1208" />
        <circle cx="110" cy="62" r="3" fill={lit ? '#ff7a1a' : '#3a1b0d'} style={{ transition: 'fill 0.6s' }} />

        {/* flame */}
        <g className={`flame ${lit ? 'flame-on' : ''}`} style={{ transformOrigin: '110px 70px' }}>
          <path
            d="M110 2 C 124 24 140 42 131 60 C 127 69 119 73 110 73 C 101 73 93 69 89 60 C 80 42 96 24 110 2 Z"
            fill={`url(#${id('flame')})`}
          />
          <g className="flame-inner">
            <path
              d="M110 32 C 119 45 125 54 121 63 C 119 68 115 70 110 70 C 105 70 101 68 99 63 C 95 54 101 45 110 32 Z"
              fill={`url(#${id('core')})`}
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

const ring = (n, fn) => Array.from({ length: n }, (_, i) => fn((i * 360) / n, i))

/** Decorative line-art rangoli / mandala. Pure SVG, no raster assets. */
export default function Mandala({ className = '', stroke = '#ffd566', opacity = 1 }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" stroke={stroke} strokeWidth="0.8" aria-hidden="true" style={{ opacity }}>
      <circle cx="200" cy="200" r="196" strokeOpacity="0.35" />
      <circle cx="200" cy="200" r="188" strokeOpacity="0.5" strokeDasharray="2 6" />
      {ring(24, (a, i) => (
        <circle key={`d${i}`} cx="200" cy="14" r="2.2" fill={stroke} stroke="none" opacity="0.7" transform={`rotate(${a} 200 200)`} />
      ))}
      {ring(16, (a, i) => (
        <ellipse key={`p${i}`} cx="200" cy="96" rx="17" ry="52" strokeOpacity="0.55" transform={`rotate(${a} 200 200)`} />
      ))}
      {ring(16, (a, i) => (
        <path key={`s${i}`} d="M200 40 Q 214 62 200 84 Q 186 62 200 40Z" strokeOpacity="0.5" transform={`rotate(${a + 11.25} 200 200)`} />
      ))}
      <circle cx="200" cy="200" r="118" strokeOpacity="0.4" />
      {ring(12, (a, i) => (
        <ellipse key={`q${i}`} cx="200" cy="148" rx="11" ry="30" strokeOpacity="0.6" transform={`rotate(${a} 200 200)`} />
      ))}
      <circle cx="200" cy="200" r="86" strokeOpacity="0.3" strokeDasharray="1 5" />
      {ring(8, (a, i) => (
        <ellipse key={`r${i}`} cx="200" cy="170" rx="7" ry="20" strokeOpacity="0.7" transform={`rotate(${a} 200 200)`} />
      ))}
      <circle cx="200" cy="200" r="40" strokeOpacity="0.45" />
      <circle cx="200" cy="200" r="6" fill={stroke} stroke="none" opacity="0.8" />
    </svg>
  )
}

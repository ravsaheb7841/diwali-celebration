import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const MAX_SPARKLES = 18

export default function MagicalCursor() {
  const [sparkles, setSparkles] = useState([])
  const reduce = useReducedMotion()
  const nextId = useRef(0)

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return undefined

    let last = 0
    const onMove = (event) => {
      const now = performance.now()
      if (now - last < 42) return
      last = now
      const id = nextId.current++
      setSparkles((current) => [...current.slice(-(MAX_SPARKLES - 1)), { id, x: event.clientX, y: event.clientY }])
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce])

  return (
    <div className="pointer-events-none fixed inset-0 z-[65] hidden overflow-hidden sm:block" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span key={sparkle.id} className="cursor-sparkle" style={{ left: sparkle.x, top: sparkle.y }} />
      ))}
    </div>
  )
}

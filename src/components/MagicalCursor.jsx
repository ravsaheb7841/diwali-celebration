import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const MAX_SPARKLES = 18

export default function MagicalCursor() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return undefined

    let last = 0
    const onMove = (event) => {
      const now = performance.now()
      if (now - last < 42) return
      last = now
      const container = ref.current
      if (!container) return
      while (container.childElementCount >= MAX_SPARKLES) container.firstElementChild.remove()
      const sparkle = document.createElement('span')
      sparkle.className = 'cursor-sparkle'
      sparkle.style.left = `${event.clientX}px`
      sparkle.style.top = `${event.clientY}px`
      sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true })
      container.appendChild(sparkle)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce])

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-[65] hidden overflow-hidden sm:block" aria-hidden="true" />
}

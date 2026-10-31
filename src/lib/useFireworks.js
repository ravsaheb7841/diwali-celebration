import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Fireworks } from './fireworks.js'

/**
 * Binds a Fireworks engine to a canvas ref.
 * The engine only animates while the canvas is on screen.
 */
export function useFireworks(canvasRef, { auto = false, palette = 'gold', power = 1 } = {}) {
  const engine = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const fw = new Fireworks(canvas, { auto: auto && !reduce, palette, power })
    engine.current = fw
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? fw.start() : fw.stop()),
      { threshold: 0.05 },
    )
    io.observe(canvas)
    return () => {
      io.disconnect()
      fw.destroy()
      engine.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  useEffect(() => {
    engine.current?.setPalette(palette)
  }, [palette])

  return engine
}

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { getDeviceProfile } from '../lib/device.js'

const TAU = Math.PI * 2

function makeSprite(inner, outer) {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const x = c.getContext('2d')
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.18, inner)
  g.addColorStop(0.5, outer)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  x.fillStyle = g
  x.fillRect(0, 0, 64, 64)
  return c
}

/**
 * Fixed full-page layer of softly twinkling golden embers drifting upward.
 * Uses pre-rendered glow sprites + a single canvas for 60fps on mobile.
 * Depth-based parallax reacts to scroll.
 */
export default function Embers() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const sprites = [
      makeSprite('rgba(255,222,140,0.95)', 'rgba(255,160,40,0.35)'),
      makeSprite('rgba(255,170,90,0.9)', 'rgba(255,90,30,0.28)'),
    ]
    let w = 0
    let h = 0
    let raf = 0
    let parts = []
    let last = performance.now()
    let t = 0
    let lastPaint = 0
    const { mobile, lowPower, frameInterval } = getDeviceProfile()

    const spawn = (init) => {
      const z = 0.3 + Math.random() * 0.7
      return {
        x: Math.random() * w,
        y: init ? Math.random() * h : h + 30,
        z,
        s: 6 + Math.random() * 18 * z,
        vy: -(8 + Math.random() * 26) * z,
        ph: Math.random() * TAU,
        sway: 8 + Math.random() * 22,
        tw: 0.6 + Math.random() * 1.6,
        sp: Math.random() < 0.72 ? 0 : 1,
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.25)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const max = lowPower ? 28 : mobile ? 38 : 52
      const min = lowPower ? 14 : mobile ? 18 : 20
      const n = Math.round(Math.min(max, Math.max(min, w / (lowPower ? 42 : 28))))
      parts = Array.from({ length: n }, () => spawn(true))
      if (reduce) draw(0)
    }

    const draw = (dt) => {
      t += dt
      ctx.clearRect(0, 0, w, h)
      const sy = window.scrollY
      const span = h + 60
      for (const p of parts) {
        p.y += p.vy * dt
        if (p.y < -30) Object.assign(p, spawn(false))
        const x = p.x + Math.sin(p.ph + t * 0.6) * p.sway
        let y = p.y - sy * 0.07 * p.z
        y = ((((y + 30) % span) + span) % span) - 30
        const a = (0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * p.tw + p.ph))) * (0.35 + 0.65 * p.z)
        ctx.globalAlpha = a
        ctx.drawImage(sprites[p.sp], x - p.s, y - p.s, p.s * 2, p.s * 2)
      }
      ctx.globalAlpha = 1
    }

    const loop = (now) => {
      if (document.hidden) {
        raf = 0
        return
      }
      if (frameInterval && now - lastPaint < frameInterval) {
        raf = requestAnimationFrame(loop)
        return
      }
      lastPaint = now
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      draw(dt)
      raf = requestAnimationFrame(loop)
    }

    resize()
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!reduce && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    if (!reduce) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [reduce])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}

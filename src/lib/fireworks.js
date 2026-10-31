/**
 * Lightweight canvas fireworks engine.
 * - Rockets rise and explode into spark bursts (sphere / ring / double colour)
 * - No per-frame allocations beyond new bursts; sparks are compacted in-place
 * - The loop sleeps by itself when nothing is on screen (unless `auto` is on)
 */
const TAU = Math.PI * 2
const MAX_SPARKS = 1100
const rand = (a, b) => a + Math.random() * (b - a)

export const PALETTES = {
  gold: ['#fff1b8', '#ffd566', '#f7b733', '#ff9d2e', '#ffe69a'],
  saffron: ['#ffb347', '#ff8112', '#ff5a1f', '#ffd166', '#ff3d3d'],
  jewel: ['#ff4d6d', '#ffd166', '#06d6a0', '#4cc9f0', '#b388ff', '#ff9f1c'],
}

export class Fireworks {
  constructor(canvas, { palette = 'gold', auto = false, power = 1 } = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.palette = PALETTES[palette] || PALETTES.gold
    this.auto = auto
    this.power = power
    this.rockets = []
    this.sparks = []
    this.flashes = []
    this.timers = []
    this.running = false
    this.paused = false
    this.raf = 0
    this.last = 0
    this.nextAuto = 0
    this.w = 0
    this.h = 0
    this.dpr = 1
    this.loop = this.loop.bind(this)
    this.resize = this.resize.bind(this)
    this.resize()
    this.ro = new ResizeObserver(this.resize)
    this.ro.observe(canvas)
  }

  setPalette(name) {
    this.palette = PALETTES[name] || PALETTES.gold
  }

  resize() {
    const r = this.canvas.getBoundingClientRect()
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    this.w = r.width
    this.h = r.height
    this.canvas.width = Math.max(1, Math.round(r.width * this.dpr))
    this.canvas.height = Math.max(1, Math.round(r.height * this.dpr))
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
  }

  start() {
    this.paused = false
    this.kick()
  }

  stop() {
    this.paused = true
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  kick() {
    if (this.running || this.paused) return
    this.running = true
    this.last = performance.now()
    if (this.auto) this.nextAuto = this.last + 700
    this.raf = requestAnimationFrame(this.loop)
  }

  /** Fire a rocket that climbs from the ground and bursts at (tx, ty). */
  launch(tx, ty) {
    const sx = tx + rand(-0.08, 0.08) * this.w
    this.rockets.push({
      sx,
      tx,
      ty,
      x: sx,
      y: this.h,
      px: sx,
      py: this.h,
      t: 0,
      dur: rand(0.7, 1.05),
    })
    this.kick()
  }

  /** Instant explosion at (x, y). */
  burst(x, y, colors = this.palette) {
    if (this.sparks.length > MAX_SPARKS) return
    const small = this.w < 640
    const count = Math.round(rand(70, 110) * this.power * (small ? 0.72 : 1))
    const speedMax = (small ? 200 : 270) * Math.sqrt(this.power)
    const base = colors[(Math.random() * colors.length) | 0]
    const alt = colors[(Math.random() * colors.length) | 0]
    const kind = Math.random()
    const ring = kind < 0.3
    const dual = kind > 0.55

    for (let i = 0; i < count; i++) {
      const a = ring ? (i / count) * TAU : Math.random() * TAU
      const sp = ring ? speedMax * rand(0.88, 1) : speedMax * Math.sqrt(Math.random()) * rand(0.35, 1)
      this.sparks.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        life: 1,
        decay: rand(0.55, 1.0),
        size: rand(1.2, 2.4),
        color: dual && i % 3 === 0 ? alt : base,
        tw: Math.random() < 0.25,
      })
    }
    this.flashes.push({ x, y, life: 1, color: base })
    this.kick()
  }

  /** A choreographed multi-rocket finale. Returns its approximate duration in ms. */
  finale() {
    const n = 16
    for (let i = 0; i < n; i++) {
      const id = setTimeout(() => {
        this.launch(rand(0.1, 0.9) * this.w, rand(0.12, 0.5) * this.h)
        if (i % 4 === 3) this.launch(rand(0.1, 0.9) * this.w, rand(0.15, 0.45) * this.h)
      }, i * 360 + rand(0, 140))
      this.timers.push(id)
    }
    return n * 360 + 1600
  }

  loop(now) {
    if (this.paused) return
    const dt = Math.min((now - this.last) / 1000, 0.05)
    this.last = now
    const { ctx, w, h } = this

    // Ambient launches
    if (this.auto && now >= this.nextAuto) {
      this.nextAuto = now + rand(1800, 3800)
      this.launch(rand(0.15, 0.85) * w, rand(0.1, 0.42) * h)
    }

    // Rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i]
      r.t += dt / r.dur
      const p = Math.min(1, r.t)
      const e = 1 - (1 - p) * (1 - p)
      r.px = r.x
      r.py = r.y
      r.x = r.sx + (r.tx - r.sx) * e
      r.y = h + (r.ty - h) * e
      if (this.sparks.length < MAX_SPARKS) {
        this.sparks.push({
          x: r.x,
          y: r.y,
          vx: rand(-14, 14),
          vy: rand(10, 45),
          life: 0.7,
          decay: 2.2,
          size: 1.2,
          color: '#ffd9a0',
          tw: false,
        })
      }
      if (r.t >= 1) {
        this.rockets.splice(i, 1)
        this.burst(r.tx, r.ty)
      }
    }

    // Physics (in-place compaction)
    const drag = Math.pow(0.32, dt)
    let n = 0
    for (let i = 0; i < this.sparks.length; i++) {
      const s = this.sparks[i]
      s.vx *= drag
      s.vy = s.vy * drag + 90 * dt
      s.x += s.vx * dt
      s.y += s.vy * dt
      s.life -= s.decay * dt
      if (s.life > 0) this.sparks[n++] = s
    }
    this.sparks.length = n

    // Draw
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'
    ctx.lineCap = 'round'

    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i]
      f.life -= dt * 3.2
      if (f.life <= 0) {
        this.flashes.splice(i, 1)
        continue
      }
      const rad = 70 + (1 - f.life) * 90
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, rad)
      g.addColorStop(0, f.color)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.globalAlpha = f.life * 0.28
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(f.x, f.y, rad, 0, TAU)
      ctx.fill()
    }

    ctx.strokeStyle = '#fff2c9'
    ctx.lineWidth = 2
    for (const r of this.rockets) {
      ctx.globalAlpha = 0.95
      ctx.beginPath()
      ctx.moveTo(r.px, r.py)
      ctx.lineTo(r.x, r.y)
      ctx.stroke()
    }

    for (const s of this.sparks) {
      const a = s.tw ? s.life * (0.55 + 0.45 * Math.sin(now * 0.04 + s.x)) : s.life
      if (a <= 0) continue
      ctx.globalAlpha = Math.min(1, a)
      ctx.strokeStyle = s.color
      ctx.lineWidth = s.size
      ctx.beginPath()
      ctx.moveTo(s.x - s.vx * 0.035, s.y - s.vy * 0.035)
      ctx.lineTo(s.x, s.y)
      ctx.stroke()
      ctx.globalAlpha = Math.min(1, a) * 0.22
      ctx.fillStyle = s.color
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size * 2.6, 0, TAU)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'

    const busy = this.rockets.length || this.sparks.length || this.flashes.length
    if (this.auto || busy) {
      this.raf = requestAnimationFrame(this.loop)
    } else {
      this.running = false
      ctx.clearRect(0, 0, w, h)
    }
  }

  destroy() {
    this.stop()
    this.timers.forEach(clearTimeout)
    this.timers = []
    this.ro.disconnect()
  }
}

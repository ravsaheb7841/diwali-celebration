import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import Diya from './Diya.jsx'
import Mandala from './Mandala.jsx'
import LightString from './LightString.jsx'
import { useFireworks } from '../lib/useFireworks.js'
import { DIWALI_YEAR } from '../config.js'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } },
}
const charVariant = {
  hidden: { y: '112%', rotate: 6, opacity: 0 },
  show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 1.1, ease: EASE } },
}

/** Each letter shows its own slice of one continuous gold gradient. */
function GoldChars({ text }) {
  const chars = [...text]
  return chars.map((c, i) => (
    <span key={i} aria-hidden="true" className="inline-block overflow-hidden px-[0.02em] pb-[0.12em] -mb-[0.12em] align-bottom">
      <motion.span
        variants={charVariant}
        className="text-gold-gradient inline-block"
        style={{
          backgroundSize: `${chars.length * 100}% 100%`,
          backgroundImage:
            'linear-gradient(100deg, #f7b733 0%, #fff4cf 22%, #ffd566 45%, #ff9d2e 75%, #ffcf5a 100%)',
          backgroundPositionX: `${(i / (chars.length - 1)) * 100}%`,
        }}
      >
        {c}
      </motion.span>
    </span>
  ))
}

export default function Hero() {
  const ref = useRef(null)
  const canvasRef = useRef(null)
  const engine = useFireworks(canvasRef, { auto: true, palette: 'gold', power: 0.8 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '-110px'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const diyaY = useTransform(scrollYProgress, [0, 1], ['0px', '90px'])
  const mandalaScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])

  const onCta = (e) => {
    e.preventDefault()
    const r = canvasRef.current?.getBoundingClientRect()
    if (r && engine.current) {
      engine.current.burst(r.width / 2, r.height * 0.32)
      engine.current.launch(r.width * 0.28, r.height * 0.25)
      engine.current.launch(r.width * 0.72, r.height * 0.22)
    }
    setTimeout(() => document.getElementById('lights')?.scrollIntoView({ behavior: 'smooth' }), 650)
  }

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Atmosphere */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,rgba(255,130,30,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(200,16,46,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(90,40,160,0.45),transparent_75%)]" />
        <div className="hero-light-beams" />
        <motion.div style={{ scale: mandalaScale }} className="absolute left-1/2 top-[46%] w-[150vmin] max-w-[1500px] -translate-x-1/2 -translate-y-1/2">
          <Mandala className="animate-spin-slow h-full w-full" opacity={0.22} />
        </motion.div>
        <div className="absolute left-1/2 top-[46%] w-[96vmin] max-w-[960px] -translate-x-1/2 -translate-y-1/2">
          <Mandala className="animate-spin-slower h-full w-full" stroke="#ff9d2e" opacity={0.18} />
        </div>
      </motion.div>

      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[5] h-full w-full" />
      <LightString className="top-14" />

      {/* Content */}
      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pb-40 pt-36 text-center sm:pb-44">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold-300/25 bg-night-900/40 px-5 py-2 text-[0.7rem] uppercase tracking-[0.32em] text-gold-200 backdrop-blur-md"
        >
          <Sparkles size={13} className="text-gold-300" />
          Deepavali · {DIWALI_YEAR}
        </motion.div>

        <motion.h1 variants={container} initial="hidden" animate="show" aria-label="Happy Diwali" className="font-display">
          <span className="block overflow-hidden pb-[0.1em] text-[clamp(2rem,6.5vw,4.5rem)] font-medium italic leading-none text-gold-100/95">
            <motion.span variants={charVariant} className="inline-block">
              Happy
            </motion.span>
          </span>
          <span className="block text-[clamp(4.6rem,19vw,13.5rem)] font-semibold leading-[0.88] tracking-[-0.01em] [filter:drop-shadow(0_0_26px_rgba(255,160,40,0.4))]">
            <GoldChars text="Diwali" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.5, ease: EASE }}
          className="mt-8 max-w-2xl text-balance font-display text-[clamp(1.2rem,2.6vw,1.75rem)] italic leading-snug text-cream/85"
        >
          A little Diwali celebration for everyone who makes the world feel warmer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.85, ease: EASE }}
          className="mt-10"
        >
          <motion.a
            href="#lights"
            onClick={onCta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="btn-glow inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.95rem] font-semibold tracking-wide"
          >
            <Sparkles size={18} />
            Experience the Magic
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.15, ease: EASE }}
          className="mt-12 flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.32em] text-gold-200/55 sm:gap-6"
        >
          <span>Light</span>
          <span className="h-px w-8 bg-gold-300/30 sm:w-12" />
          <span>Love</span>
          <span className="h-px w-8 bg-gold-300/30 sm:w-12" />
          <span>Prosperity</span>
        </motion.div>
      </motion.div>

      {/* Diyas */}
      <motion.div style={{ y: diyaY }} className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.0, ease: EASE }}
          className="absolute bottom-5 left-[3%] w-[27vw] min-w-[96px] max-w-[300px]"
        >
          <div className="animate-float">
            <Diya lit />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.2, ease: EASE }}
          className="absolute bottom-5 right-[3%] w-[27vw] min-w-[96px] max-w-[300px]"
        >
          <div className="animate-float" style={{ animationDelay: '-3s' }}>
            <Diya lit />
          </div>
        </motion.div>
      </motion.div>

      <div className="animate-cue absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold-300/80" aria-hidden="true">
        <ChevronDown size={26} />
      </div>
    </section>
  )
}

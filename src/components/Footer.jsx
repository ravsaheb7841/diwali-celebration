import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Diya from './Diya.jsx'
import { Reveal } from './Reveal.jsx'
import { DIWALI_YEAR } from '../config.js'

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const particles = Array.from({ length: 12 }, (_, index) => ({
    left: `${8 + ((index * 29) % 84)}%`,
    top: `${18 + ((index * 41) % 65)}%`,
    delay: `${(index % 5) * -0.8}s`,
  }))

  return (
    <footer className="footer-shell relative z-10 overflow-hidden px-5 pb-10 pt-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(255,110,20,0.22),rgba(200,16,46,0.08)_50%,transparent_75%)]" aria-hidden="true" />
      <div className="footer-particles pointer-events-none absolute inset-0" aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="footer-particle"
            style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
          />
        ))}
      </div>
      <div className="gold-rule mx-auto mb-16 max-w-3xl" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal className="flex items-end justify-center gap-5 sm:gap-8" amount={0.4}>
          <Diya lit className="w-16 opacity-90 sm:w-20" halo={false} />
          <Diya lit className="w-24 sm:w-32" />
          <Diya lit className="w-16 opacity-90 sm:w-20" halo={false} />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <h2 className="font-display text-[clamp(2.4rem,7vw,4.5rem)] font-medium italic leading-none text-gold-gradient">Shubh Deepavali</h2>
          <p className="mx-auto mt-5 max-w-md text-balance text-[1.02rem] leading-relaxed text-cream/70">
            Wishing you a Diwali filled with the warmth of good company, the glow of shared laughter, and brighter days ahead.
          </p>
        </Reveal>

        <motion.button
          type="button"
          onClick={toTop}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.94 }}
          className="btn-ghost group mt-12 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm tracking-wide"
          aria-label="Back to top"
        >
          <ArrowUp size={17} className="transition-transform duration-300 group-hover:-translate-y-1" />
          Back to top
        </motion.button>

        <div className="gold-rule mt-14 w-full max-w-md opacity-60" />
        <p className="mt-8 text-sm tracking-wide text-cream/60">
          Made with <span className="animate-heart mx-0.5" role="img" aria-label="love">❤️</span> for the Festival of Lights
        </p>
        <p className="mt-2 text-xs tracking-widest text-cream/30">© {DIWALI_YEAR} · Deepavali</p>

        <p className="creator-credit mt-7 text-sm tracking-[0.08em] text-gold-200">
          Designed &amp; Developed by Ravsaheb Bansode
        </p>
      </div>
    </footer>
  )
}

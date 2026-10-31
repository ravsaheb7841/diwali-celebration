import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import Diya from './Diya.jsx'
import Mandala from './Mandala.jsx'
import { Reveal, SectionHeading } from './Reveal.jsx'

const EASE = [0.22, 1, 0.36, 1]

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        left: `${8 + ((i * 37) % 84)}%`,
        top: `${12 + ((i * 47) % 70)}%`,
        size: i % 3 === 0 ? 15 : 10,
        delay: i * 0.55,
        duration: 5.5 + (i % 4) * 0.8,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart, i) => (
        <motion.span
          key={i}
          className="romantic-heart absolute text-saffron-400/70"
          style={{ left: heart.left, top: heart.top, fontSize: heart.size }}
          animate={{ y: [12, -20, 12], x: [0, i % 2 ? 8 : -8, 0], opacity: [0.15, 0.8, 0.15], scale: [0.8, 1, 0.8] }}
          transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart fill="currentColor" strokeWidth={1.2} />
        </motion.span>
      ))}
    </div>
  )
}

export default function PersonalLight() {
  const [lit, setLit] = useState(false)
  const [surprise, setSurprise] = useState(false)

  return (
    <section id="for-you" className="relative overflow-hidden px-5 py-24 sm:py-36">
      <FloatingHearts />
      <div className="romantic-glow absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="A Little Warmth to Share"
          title="A Little Light for Everyone"
          subtitle="For friends, family, neighbours, and every kind soul who makes the world brighter — this little corner of Diwali is for you."
        />

        <div className="relative mx-auto mt-14 grid max-w-5xl items-center gap-10 overflow-hidden rounded-[2rem] border border-gold-300/20 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-orange-400/[0.04] p-7 shadow-[0_30px_100px_-40px_rgba(255,154,48,0.55)] backdrop-blur-md sm:mt-20 sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:p-16">
          <Mandala className="pointer-events-none absolute -right-32 -top-32 w-[28rem] opacity-[0.12]" stroke="#ffd566" aria-hidden="true" />
          <div className="relative flex justify-center">
            <motion.div
              animate={lit ? { scale: [1, 1.04, 1], y: [0, -6, 0] } : { y: [0, -3, 0] }}
              transition={{ duration: lit ? 3.2 : 5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-56 sm:w-64"
            >
              <Diya lit={lit} halo />
            </motion.div>
            {lit && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="pointer-events-none absolute left-1/2 top-[9%] -translate-x-1/2 text-gold-200"
              >
                <Heart fill="currentColor" size={26} strokeWidth={1.2} />
              </motion.div>
            )}
          </div>

          <div className="relative text-center lg:text-left">
            <p className="font-deva text-xl text-gold-300">सबके लिए</p>
            <h3 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] italic leading-tight text-gold-gradient">
              Some lights make the festival beautiful,
              <span className="block text-cream/90">and kind people make life beautiful.</span>
            </h3>

            <AnimatePresence mode="wait">
              {lit ? (
                <motion.p
                  key="lit"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-cream/75 lg:mx-0"
                >
                  May this little flame bring you a moment of calm, a reason to smile, and a little extra brightness to carry forward.
                </motion.p>
              ) : (
                <motion.p
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-[1.02rem] leading-relaxed text-cream/60"
                >
                  There is a little warmth waiting here for everyone.
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <motion.button
                type="button"
                onClick={() => setLit((value) => !value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-glow inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[0.92rem] font-semibold tracking-wide"
              >
                <Sparkles size={17} />
                {lit ? 'Keep the Light Glowing' : 'Light a Diya'}
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setSurprise((value) => !value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-ghost inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[0.92rem]"
              >
                <Heart size={16} />
                A Little Surprise
              </motion.button>
            </div>

            <AnimatePresence>
              {surprise && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="mt-7 overflow-hidden"
                >
                  <p className="border-t border-gold-300/20 pt-6 font-display text-2xl italic leading-snug text-gold-100/90">
                    May the light you share return to you as happiness, peace, and beautiful moments with the people who matter.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

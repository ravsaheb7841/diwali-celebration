import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Diya from './Diya.jsx'
import Mandala from './Mandala.jsx'
import { Reveal, TextReveal } from './Reveal.jsx'

const PILLARS = [
  {
    n: '01',
    title: 'Light over darkness',
    text: 'A single flame is enough to change a room. Diwali asks us to be that flame for someone else.',
  },
  {
    n: '02',
    title: 'Good over evil',
    text: 'Rooted in Lord Rama’s return to Ayodhya after his exile, welcomed home by rows of earthen lamps.',
  },
  {
    n: '03',
    title: 'Knowledge over ignorance',
    text: 'The inner lamp of understanding is the one that matters most — and the one that never runs out of oil.',
  },
]

const ORBITERS = Array.from({ length: 10 }, (_, i) => i)

export default function FestivalOfLights() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.35'] })
  const darkness = useTransform(scrollYProgress, [0.05, 0.65], [0.94, 0])
  const orbScale = useTransform(scrollYProgress, [0, 1], [0.72, 1.12])
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 40])

  return (
    <section id="lights" ref={ref} className="relative overflow-hidden px-5 py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-8">
        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[560px] lg:sticky lg:top-24">
          <div className="relative aspect-square w-full">
            <motion.div style={{ rotate }} className="absolute inset-0">
              <Mandala className="h-full w-full" opacity={0.5} />
            </motion.div>

            <motion.div
              style={{ scale: orbScale }}
              className="absolute inset-[10%] rounded-full"
              aria-hidden="true"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,190,80,0.75)_0%,rgba(255,120,30,0.38)_38%,rgba(255,80,20,0.1)_62%,transparent_72%)] blur-[2px]" />
            </motion.div>

            {/* the darkness that recedes as you scroll */}
            <motion.div
              style={{ opacity: darkness }}
              className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle,#0b0724_0%,#0b0724_55%,#060416_100%)]"
              aria-hidden="true"
            />

            {/* orbiting sparks */}
            <div className="animate-orbit absolute inset-[6%]" aria-hidden="true">
              {ORBITERS.map((i) => (
                <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 36}deg)` }}>
                  <span
                    className="animate-twinkle absolute left-1/2 top-0 block h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold-200 shadow-[0_0_10px_3px_rgba(255,200,80,0.8)]"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                </div>
              ))}
            </div>

            <div className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-[44%]">
              <Diya lit />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="lg:pl-8">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.35em] text-gold-300">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-300" />
              The Meaning
            </span>
          </Reveal>
          <TextReveal
            text="Light is the oldest answer to darkness."
            className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4.4rem)] font-medium leading-[1.02] text-cream"
          />
          <Reveal delay={0.2} className="mt-7 max-w-xl space-y-4 text-[1.02rem] leading-relaxed text-cream/70">
            <p>
              <em className="font-display text-xl not-italic text-gold-200">Deepavali</em> means “a row of lamps”. Each autumn, millions of homes
              across the world are lit from doorstep to rooftop, as families clean, decorate, share sweets and welcome prosperity.
            </p>
            <p>
              Celebrated by Hindus, Jains, Sikhs and some Buddhists, Diwali carries different stories in different homes — yet the
              promise at its centre is the same: no darkness is so deep that a small light cannot begin to undo it.
            </p>
          </Reveal>

          <ol className="mt-12 max-w-xl">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 0.1} className="group flex gap-6 border-t border-gold-300/15 py-7 last:border-b">
                <span className="font-display text-4xl italic text-gold-gradient transition-transform duration-500 group-hover:translate-x-1">{p.n}</span>
                <div>
                  <h3 className="font-display text-2xl text-cream transition-colors duration-300 group-hover:text-gold-200">{p.title}</h3>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-cream/60">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

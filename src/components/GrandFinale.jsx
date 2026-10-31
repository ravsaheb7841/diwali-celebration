import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PartyPopper, X } from 'lucide-react'
import { useFireworks } from '../lib/useFireworks.js'

export default function GrandFinale() {
  const canvasRef = useRef(null)
  const timer = useRef(0)
  const [open, setOpen] = useState(false)
  const engine = useFireworks(canvasRef, { palette: 'gold', power: 1.2 })

  useEffect(() => () => clearTimeout(timer.current), [])

  const start = () => {
    setOpen(true)
    timer.current = setTimeout(() => engine.current?.finale(), 180)
  }

  return (
    <>
      <section id="finale" className="relative overflow-hidden px-5 py-24 sm:py-36">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] border border-gold-300/20 bg-gradient-to-br from-gold-300/[0.08] to-purple-500/[0.04] px-6 py-16 text-center shadow-[0_30px_100px_-40px_rgba(255,160,40,0.55)] backdrop-blur-md sm:px-12">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-300">One last spark</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,7vw,5.5rem)] italic leading-none text-gold-gradient">Let the night glow</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">A little celebration for every light, every wish, and every person who makes this festival brighter.</p>
          <motion.button type="button" onClick={start} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="btn-glow mt-9 inline-flex items-center gap-3 rounded-full px-9 py-4 font-semibold">
            <PartyPopper size={18} />
            Begin the Grand Finale
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050313]/95 px-5 backdrop-blur-md">
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close grand finale" className="btn-ghost absolute right-5 top-20 z-20 grid h-11 w-11 place-items-center rounded-full sm:top-5">
              <X size={20} />
            </button>
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4, duration: 1 }} className="relative z-10 max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-gold-300">Shubh Deepavali</p>
              <h2 className="mt-5 font-display text-[clamp(3.5rem,12vw,9rem)] italic leading-[0.85] text-gold-gradient">Light wins.</h2>
              <p className="mx-auto mt-8 max-w-xl text-lg text-cream/80 sm:text-xl">May your days be luminous, your home be joyful, and your year be full of beautiful beginnings.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MailOpen, Sparkles } from 'lucide-react'
import { Reveal, SectionHeading } from './Reveal.jsx'

export default function SurpriseEnvelope() {
  const [open, setOpen] = useState(false)

  return (
    <section id="envelope" className="relative overflow-hidden px-5 py-24 sm:py-36">
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="A Message for the Journey"
          title="Open a little Diwali surprise"
          subtitle="Some messages are best opened slowly, with a little light around them."
        />
        <Reveal delay={0.15} className="mt-14 flex flex-col items-center">
          <motion.button
            type="button"
            onClick={() => setOpen((value) => !value)}
            whileHover={{ y: -7, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            aria-expanded={open}
            className={`envelope relative h-52 w-[min(88vw,25rem)] rounded-2xl border border-gold-300/40 text-left shadow-[0_25px_70px_-20px_rgba(255,150,40,0.55)] ${open ? 'envelope-open' : ''}`}
          >
            <span className="envelope-flap absolute inset-x-0 top-0 z-20 h-28 origin-top border-b border-gold-200/30 bg-gradient-to-br from-gold-500 to-saffron-500 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
            <span className="absolute inset-0 bg-gradient-to-br from-[#4d260d] via-[#8a3a08] to-[#2a1204]" />
            <span className="absolute inset-x-0 bottom-0 z-10 h-32 border-t border-gold-200/20 bg-gradient-to-br from-[#7d3008] to-[#3a1605] [clip-path:polygon(0_0,50%_55%,100%_0,100%_100%,0_100%)]" />
            <span className="relative z-30 flex h-full flex-col items-center justify-center gap-3 text-center">
              <MailOpen className="text-gold-100" size={28} />
              <span className="font-display text-2xl italic text-gold-100">{open ? 'A light shared is a light multiplied.' : 'Tap to open'}</span>
            </span>
          </motion.button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, y: 18, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -12, height: 0 }} className="mt-8 max-w-xl overflow-hidden text-center">
                <Sparkles className="mx-auto text-gold-300" size={22} />
                <p className="mt-3 font-display text-3xl italic leading-snug text-gold-gradient">May every lamp you light lead you to more laughter, more peace, and more moments worth remembering.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}

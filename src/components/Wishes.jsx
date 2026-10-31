import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Download, MessageCircle, RefreshCw, Share2, Sparkles } from 'lucide-react'
import { WISHES } from '../data/festival.js'
import { DIWALI_YEAR } from '../config.js'
import Mandala from './Mandala.jsx'
import { Reveal, SectionHeading } from './Reveal.jsx'

const EASE = [0.22, 1, 0.36, 1]

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

export default function Wishes() {
  const [index, setIndex] = useState(0)
  const [spin, setSpin] = useState(0)
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [customWish, setCustomWish] = useState('')
  const [revealedWish, setRevealedWish] = useState('')
  const [copied, setCopied] = useState(null) // null | 'ok' | 'fail'
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const recipient = to.trim() || 'Dear Friend'
  const greeting = to.trim() ? `Dear ${to.trim()},` : 'Dear Friend,'
  const signoff = from.trim() ? `With warm wishes, ${from.trim()}` : 'With warmth & light'
  const wish = WISHES[index]
  const displayedWish = revealedWish || wish

  const next = () => {
    setSpin((s) => s + 1)
    setIndex((cur) => {
      let n = cur
      while (n === cur) n = Math.floor(Math.random() * WISHES.length)
      return n
    })
  }

  const copy = async () => {
    const text = `✨ Happy Diwali ${DIWALI_YEAR} ✨\n\n${greeting}\n${displayedWish}\n\n— ${signoff}`
    const ok = await copyText(text)
    setCopied(ok ? 'ok' : 'fail')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 2200)
  }

  const shareWhatsApp = () => {
    const text = `✨ Happy Diwali ${DIWALI_YEAR} ✨\n\n${greeting}\n${displayedWish}\n\n— ${signoff}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  const revealWish = () => setRevealedWish(customWish.trim())

  const cardText = `Happy Diwali ${DIWALI_YEAR}\n${greeting}\n${displayedWish}\n— ${signoff}`

  const downloadCard = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 800
    const context = canvas.getContext('2d')
    if (!context) return
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#24104d')
    gradient.addColorStop(0.55, '#0b0724')
    gradient.addColorStop(1, '#3a160b')
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.strokeStyle = '#ffd566'
    context.lineWidth = 4
    context.strokeRect(35, 35, canvas.width - 70, canvas.height - 70)
    context.textAlign = 'center'
    context.fillStyle = '#ffd566'
    context.font = '32px Georgia'
    context.fillText('शुभ दीपावली', canvas.width / 2, 145)
    context.fillStyle = '#fff4cf'
    context.font = 'italic 62px Georgia'
    context.fillText(`Happy Diwali ${DIWALI_YEAR}`, canvas.width / 2, 225)
    context.fillStyle = '#ffe69a'
    context.font = '32px Georgia'
    context.fillText(greeting, canvas.width / 2, 325)
    context.fillStyle = '#f8eddc'
    context.font = 'italic 34px Georgia'
    const words = displayedWish.split(' ')
    const lines = []
    let line = ''
    words.forEach((word) => {
      const next = `${line} ${word}`.trim()
      if (context.measureText(next).width > 900) {
        lines.push(line)
        line = word
      } else {
        line = next
      }
    })
    lines.push(line)
    lines.forEach((value, i) => context.fillText(value, canvas.width / 2, 410 + i * 48))
    context.fillStyle = '#ffd566'
    context.font = 'italic 30px Georgia'
    context.fillText(`— ${signoff}`, canvas.width / 2, 650)
    const link = document.createElement('a')
    link.download = `diwali-wish-${DIWALI_YEAR}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `Happy Diwali ${DIWALI_YEAR}`, text: cardText })
      } catch (error) {
        if (error?.name !== 'AbortError') shareWhatsApp()
      }
    } else {
      shareWhatsApp()
    }
  }

  const inputCls =
    'w-full rounded-xl border border-gold-300/20 bg-night-900/60 px-4 py-3.5 text-[0.95rem] text-cream placeholder:text-cream/30 outline-none transition focus:border-gold-300/70 focus:bg-night-900/90 focus:shadow-[0_0_0_4px_rgba(255,213,102,0.08)]'

  return (
    <section id="wishes" className="relative overflow-hidden px-5 py-24 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="A Greeting to Share"
          title="Create your own Diwali wish"
          subtitle="Add a name, choose a beautiful message, and share a little festival warmth with friends, family, or anyone who could use a brighter moment."
        />

        <Reveal delay={0.1} className="mx-auto mt-14 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="sr-only">Recipient name</span>
            <input value={to} onChange={(e) => setTo(e.target.value.slice(0, 32))} placeholder="Wish this to someone…" className={inputCls} maxLength={32} autoComplete="off" />
          </label>
          <label className="block">
            <span className="sr-only">Your name</span>
            <input value={from} onChange={(e) => setFrom(e.target.value.slice(0, 32))} placeholder="Your name (optional)" className={inputCls} maxLength={32} autoComplete="off" />
          </label>
          <label className="block sm:col-span-2">
            <span className="sr-only">Write your own Diwali wish</span>
            <textarea value={customWish} onChange={(e) => setCustomWish(e.target.value.slice(0, 180))} placeholder="Or write your own wish…" rows={3} className={`${inputCls} resize-none`} />
          </label>
          <motion.button type="button" onClick={revealWish} whileTap={{ scale: 0.97 }} className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm sm:col-span-2">
            <Sparkles size={15} />
            Reveal My Wish
          </motion.button>
        </Reveal>

        {/* Card with animated golden border */}
        <Reveal delay={0.2} y={44} className="mt-10">
          <div className="relative overflow-hidden rounded-[2rem] p-[2px] shadow-[0_30px_100px_-30px_rgba(255,150,40,0.45)]">
            <div className="animate-border-spin absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true" style={{ background: 'conic-gradient(from 0deg, transparent 0 18%, #ffd566 30%, #fff4cf 38%, #ff9d2e 48%, transparent 62% 100%)' }} />
            <div className="absolute inset-0 rounded-[2rem] border border-gold-300/25" aria-hidden="true" />

            <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-[linear-gradient(160deg,#1d0e44_0%,#0b0724_55%,#1a0820_100%)] px-6 py-14 text-center sm:px-16 sm:py-20">
              <Mandala className="animate-spin-slower pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-[900px] -translate-x-1/2 -translate-y-1/2" opacity={0.1} />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,150,40,0.18),transparent_70%)]" aria-hidden="true" />

              {/* corner ornaments */}
              {['left-4 top-4', 'right-4 top-4 rotate-90', 'bottom-4 right-4 rotate-180', 'bottom-4 left-4 -rotate-90'].map((pos) => (
                <svg key={pos} viewBox="0 0 40 40" className={`absolute h-9 w-9 text-gold-300/70 ${pos}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                  <path d="M2 38V14C2 7 7 2 14 2h24" />
                  <path d="M8 38V16c0-5 3-8 8-8h22" strokeOpacity="0.5" />
                  <circle cx="14" cy="14" r="2" fill="currentColor" stroke="none" />
                </svg>
              ))}

              <div className="relative">
                <p className="font-deva text-2xl text-gold-300">शुभ दीपावली</p>
                <h3 className="mt-2 font-display text-[clamp(2.2rem,6vw,3.6rem)] font-medium italic leading-none text-gold-gradient">Happy Diwali {DIWALI_YEAR}</h3>
                <div className="gold-rule mx-auto my-8 w-40" />

                <div className="mx-auto min-h-[190px] max-w-xl sm:min-h-[170px]" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.div key={`${index}-${recipient}-${displayedWish}`} initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -14, filter: 'blur(5px)' }} transition={{ duration: 0.5, ease: EASE }}>
                      <p className="font-display text-2xl text-gold-200">{greeting}</p>
                      <p className="mt-4 text-balance font-display text-[clamp(1.35rem,3.2vw,1.9rem)] italic leading-snug text-cream">{displayedWish}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="mt-6 font-display text-xl text-gold-300/90">— {signoff}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.button type="button" onClick={next} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="btn-glow inline-flex items-center gap-3 rounded-full px-8 py-4 text-[0.95rem] font-semibold tracking-wide">
            <motion.span animate={{ rotate: spin * 360 }} transition={{ duration: 0.7, ease: EASE }} className="inline-flex">
              <RefreshCw size={18} />
            </motion.span>
            Generate a Wish
          </motion.button>

          <motion.button type="button" onClick={copy} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="btn-ghost inline-flex min-w-[10.5rem] items-center justify-center gap-3 rounded-full px-8 py-4 text-[0.95rem] font-medium">
            {copied === 'ok' ? <Check size={18} className="text-emerald-300" /> : <Copy size={18} />}
            <span role="status">{copied === 'ok' ? 'Copied!' : copied === 'fail' ? 'Copy failed' : 'Copy Wish'}</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={shareWhatsApp}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 rounded-full border border-emerald-300/35 bg-emerald-400/10 px-8 py-4 text-[0.95rem] font-medium text-emerald-200 transition hover:border-emerald-300/70 hover:bg-emerald-400/15"
          >
            <MessageCircle size={18} />
            Send via WhatsApp
          </motion.button>
          <motion.button type="button" onClick={downloadCard} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="btn-ghost inline-flex items-center gap-3 rounded-full px-7 py-4 text-[0.95rem]">
            <Download size={18} />
            Download Card
          </motion.button>
          <motion.button type="button" onClick={shareCard} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="btn-ghost inline-flex items-center gap-3 rounded-full px-7 py-4 text-[0.95rem]">
            <Share2 size={18} />
            Share Card
          </motion.button>
        </Reveal>
      </div>
    </section>
  )
}

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1]

/** Fade + rise on scroll into view. */
export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div', amount = 0.2 }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

/** Word-by-word masked text reveal for headings. */
export function TextReveal({ text, as: Tag = 'h2', className = '', delay = 0, stagger = 0.07 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: '0px 0px -10% 0px' })
  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '115%', rotate: 3 }}
            animate={isInView ? { y: '0%', rotate: 0 } : { y: '115%', rotate: 3 }}
            transition={{ duration: 0.95, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  const a = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <header className={`flex max-w-3xl flex-col ${a} ${className}`}>
      <Reveal>
        <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.35em] text-gold-300">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-300" />
          {eyebrow}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-300" />
        </span>
      </Reveal>
      <TextReveal
        text={title}
        className="mt-5 font-display text-[clamp(2.4rem,6.5vw,4.75rem)] font-medium leading-[1.02] text-cream"
      />
      {subtitle && (
        <Reveal delay={0.25} className="mt-6">
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-cream/70">{subtitle}</p>
        </Reveal>
      )}
    </header>
  )
}

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export const EASE = [0.16, 1, 0.3, 1]

/** Fades + lifts its children into view once. */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Splits a line into words that slide up from a mask. */
export function SplitWords({ text, className, delay = 0, stagger = 0.06, animate }) {
  const words = text.split(' ')
  const control = animate === undefined ? {} : { animate: animate ? 'show' : 'hidden' }
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...(animate === undefined ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } } : control)}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 1, ease: EASE } } }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Gently pulls its content toward the pointer (desktop only). */
export function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  )
}

export function SectionHeading({ index, label, title, aside }) {
  return (
    <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <Reveal className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-lime">({index})</span>
          <span className="h-px w-10 bg-line" />
          {label}
        </Reveal>
        <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
          {title}
        </h2>
      </div>
      {aside && (
        <Reveal delay={0.15} className="max-w-sm text-base leading-relaxed text-muted md:text-right">
          {aside}
        </Reveal>
      )}
    </div>
  )
}

export function Chip({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted backdrop-blur ${className}`}
    >
      {children}
    </span>
  )
}

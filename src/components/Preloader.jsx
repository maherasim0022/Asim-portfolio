import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { EASE } from './ui'

const DURATION = 1300

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
      else setTimeout(onDone, 180)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-5 sm:p-10"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted">
        <span>Muhammad Asim</span>
        <span>Portfolio</span>
      </div>

      <div className="overflow-hidden">
        <motion.p
          className="font-display text-[clamp(2.2rem,7vw,5.5rem)] font-semibold leading-none tracking-tight"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          UI/UX <span className="accent-serif text-lime">Designer</span>
        </motion.p>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10">
          <div className="h-full origin-left bg-lime" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <span className="font-display text-6xl font-semibold tabular-nums leading-none sm:text-8xl">
          {count}
          <span className="text-lime">%</span>
        </span>
      </div>
    </motion.div>
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { Download, ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import { scrollToTarget, lockScroll } from '../lib/scroll'
import { EASE } from './ui'
import { LinkedinIcon, WhatsappIcon } from './icons'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ ready }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 400 && !open)
  })

  // highlight the section currently in view
  useEffect(() => {
    const els = ['home', ...LINKS.map((l) => l.id)].map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'home' ? null : e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const onTop = () => window.scrollY < 300 && setActive(null)
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [])

  useEffect(() => {
    lockScroll(open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => {
    setOpen(false)
    // wait for the menu to start closing so the scroll is not blocked
    setTimeout(() => scrollToTarget(`#${id}`, id === 'home' ? 0 : -20), open ? 350 : 0)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[70]"
        initial={{ y: -100 }}
        animate={{ y: ready ? (hidden ? -110 : 0) : -110 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="container-x pt-3 sm:pt-4">
          <nav
            className={`flex items-center justify-between rounded-full border px-2 py-2 pl-5 transition-[background-color,border-color,backdrop-filter] duration-500 ${
              scrolled || open ? 'border-line bg-ink/70 backdrop-blur-xl' : 'border-transparent bg-transparent'
            }`}
            aria-label="Main"
          >
            <button onClick={() => go('home')} className="group flex items-center gap-2" aria-label="Back to top">
              <span className="font-display text-xl font-bold tracking-tight">
                asim<span className="text-lime">.</span>
              </span>
              <span className="hidden text-xs text-dim transition-colors group-hover:text-muted sm:inline">
                / {site.role}
              </span>
            </button>

            <ul className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.03] p-1 md:flex">
              {LINKS.map((l) => (
                <li key={l.id} className="relative">
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <button
                    onClick={() => go(l.id)}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                      active === l.id ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={site.resumePdf}
                download
                className="group hidden items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
              >
                Resume
                <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <button
                onClick={() => setOpen((v) => !v)}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.04] md:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                <span
                  className={`absolute h-[1.5px] w-5 bg-fg transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[4px]'}`}
                />
                <span
                  className={`absolute h-[1.5px] w-5 bg-fg transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[4px]'}`}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col bg-ink px-5 pb-8 pt-28 md:hidden"
            initial={{ clipPath: 'circle(0% at 92% 40px)' }}
            animate={{ clipPath: 'circle(150% at 92% 40px)' }}
            exit={{ clipPath: 'circle(0% at 92% 40px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-lime/20 blur-[100px]" />
            <ul className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.button
                    onClick={() => go(l.id)}
                    className="flex w-full items-baseline gap-4 py-2 text-left font-display text-5xl font-semibold tracking-tight"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <span className="font-sans text-sm font-normal text-lime">0{i + 1}</span>
                    {l.label}
                  </motion.button>
                </li>
              ))}
            </ul>

            <motion.div
              className="mt-auto space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <a
                href={site.resumePdf}
                download
                className="flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-4 font-semibold text-ink"
              >
                Download Resume <Download size={18} />
              </a>
              <div className="flex items-center justify-between text-sm text-muted">
                <a href={`mailto:${site.email}`} className="flex items-center gap-1 hover:text-fg">
                  {site.email} <ArrowUpRight size={14} />
                </a>
                <div className="flex gap-2">
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
                  >
                    <WhatsappIcon size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

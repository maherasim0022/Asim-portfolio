import { motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { site } from '../data/site'
import { scrollToTarget } from '../lib/scroll'
import { EASE } from './ui'
import { LinkedinIcon, WhatsappIcon } from './icons'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold tracking-tight">
              asim<span className="text-lime">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              UI/UX designer crafting user-centered mobile apps, websites and dashboards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:text-fg">
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-lime hover:bg-lime hover:text-ink"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-lime hover:bg-lime hover:text-ink"
            >
              <WhatsappIcon size={16} />
            </a>
            <button
              onClick={() => scrollToTarget('#home', 0)}
              aria-label="Back to top"
              className="group flex h-11 w-11 items-center justify-center rounded-full bg-lime text-ink"
            >
              <ArrowUp size={18} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      <motion.p
        aria-hidden
        className="mt-14 select-none whitespace-nowrap text-center font-display text-[10.6vw] font-bold leading-[0.85] tracking-[-0.05em]"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.16) 10%, rgba(255,255,255,0.01) 95%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
        initial={{ y: '40%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        MUHAMMAD ASIM
      </motion.p>

      <div className="container-x flex flex-col items-center justify-between gap-2 border-t border-line py-6 text-xs text-dim sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>Designed & built with care.</p>
      </div>
    </footer>
  )
}

import { motion } from 'motion/react'
import { ArrowDownRight, Download, MapPin } from 'lucide-react'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { scrollToTarget } from '../lib/scroll'
import { EASE, Magnetic, SplitWords } from './ui'

const covers = projects.map((p) => ({ src: p.images[0].srcMd, title: p.title }))
const colA = [...covers.slice(0, 4), ...covers.slice(0, 4)]
const colB = [...covers.slice(3), ...covers.slice(0, 1), ...covers.slice(3), ...covers.slice(0, 1)]

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  transition: { duration: 0.9, ease: EASE, delay },
})

export default function Hero({ ready, onOpenProject }) {
  const show = (delay) => ({ ...fadeUp(delay), animate: ready ? { opacity: 1, y: 0 } : undefined })

  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:min-h-[100svh]">
      {/* backdrop */}
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_30%_20%,#000_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-lime/[0.13] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[34rem] w-[34rem] rounded-full bg-violet/[0.18] blur-[140px]" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
        <div className="relative z-10 pb-6 lg:pb-24">
          <motion.div {...show(0.1)} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
              {site.role}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-dim">
              <MapPin size={13} /> {site.location}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,9vw,4.75rem)] lg:text-[clamp(3rem,5.9vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            <SplitWords text="Designing digital" animate={ready} delay={0.15} />
            <br />
            <SplitWords text="products people" animate={ready} delay={0.3} />
            <br />
            <span className="inline-flex flex-wrap items-baseline gap-x-[0.2em]">
              <span className="overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span
                  className="accent-serif inline-block pr-[0.06em] text-lime"
                  initial={{ y: '110%' }}
                  animate={ready ? { y: 0 } : undefined}
                  transition={{ duration: 1, ease: EASE, delay: 0.5 }}
                >
                  love
                </motion.span>
              </span>
              <SplitWords text="to use." animate={ready} delay={0.58} />
            </span>
          </h1>

          <motion.p {...show(0.75)} className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Hi, I’m <span className="font-medium text-fg">{site.name}</span> — a UI/UX designer crafting user-centered
            mobile apps, websites and dashboards in Figma. From user flows and wireframes to polished, dev-ready
            interfaces and interactive prototypes.
          </motion.p>

          <motion.div {...show(0.9)} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnetic>
              <button
                onClick={() => scrollToTarget('#work', -20)}
                className="group inline-flex items-center gap-3 rounded-full bg-lime py-2 pl-6 pr-2 text-[15px] font-semibold text-ink"
              >
                View my work
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-lime transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <ArrowDownRight size={18} />
                </span>
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={site.resumePdf}
                download
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.04] px-6 py-4 text-[15px] font-medium backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.08]"
              >
                <Download size={17} className="transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl {...show(1.05)} className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7">
            {[
              [String(projects.length).padStart(2, '0'), 'Featured projects'],
              ['3', 'Platforms: mobile, web & admin'],
              ['Figma', 'Wireframes → prototypes'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{v}</dt>
                <dd className="mt-1 text-xs leading-snug text-dim sm:text-sm">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* desktop: two vertical marquees of project covers */}
        <motion.div
          className="relative hidden h-[100svh] max-h-[920px] grid-cols-2 gap-4 lg:grid"
          initial={{ opacity: 0, x: 60 }}
          animate={ready ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
        >
          <div className="mask-fade-y -mt-28 overflow-hidden">
            <div className="flex animate-scroll-up flex-col hover:[animation-play-state:paused]">
              {colA.map((c, i) => (
                <div key={i} className="pb-4">
                  <CoverTile {...c} onClick={() => onOpenProject(projects.findIndex((p) => p.title === c.title))} />
                </div>
              ))}
            </div>
          </div>
          <div className="mask-fade-y -mt-28 overflow-hidden">
            <div className="flex animate-scroll-down flex-col hover:[animation-play-state:paused]">
              {colB.map((c, i) => (
                <div key={i} className="pb-4">
                  <CoverTile {...c} onClick={() => onOpenProject(projects.findIndex((p) => p.title === c.title))} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* mobile / tablet: horizontal marquee */}
      <motion.div
        className="mask-fade-x mt-6 overflow-hidden pb-16 lg:hidden"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <div className="flex w-max animate-marquee">
          {[...covers, ...covers].map((c, i) => (
            <div key={i} className="w-[276px] shrink-0 pr-4 sm:w-[356px]">
              <CoverTile {...c} onClick={() => onOpenProject(i % covers.length)} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function CoverTile({ src, title, onClick }) {
  return (
    <button
      onClick={onClick}
      data-cursor="Open"
      className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-ink-2"
      aria-label={`Open ${title}`}
    >
      <img
        src={src}
        alt=""
        width={1200}
        height={750}
        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        decoding="async"
      />
      <span className="absolute bottom-2.5 left-2.5 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-medium text-fg backdrop-blur">
        {title}
      </span>
    </button>
  )
}

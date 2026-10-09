import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowUpRight, ArrowLeft, ArrowRight, Maximize2, Clock, Check } from 'lucide-react'
import { projects } from '../data/projects'
import { lockScroll } from '../lib/scroll'
import { EASE, Chip } from './ui'
import { FigmaIcon } from './icons'

export default function ProjectModal({ index, onClose, onNavigate }) {
  const p = projects[index]
  const total = projects.length
  const next = (index + 1) % total
  const prev = (index - 1 + total) % total
  const scroller = useRef(null)
  const [zoom, setZoom] = useState(null)

  useEffect(() => {
    lockScroll(true)
    return () => lockScroll(false)
  }, [])

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    setZoom(null)
  }, [index])

  useEffect(() => {
    const onKey = (e) => {
      if (zoom !== null) {
        if (e.key === 'Escape') setZoom(null)
        if (e.key === 'ArrowRight') setZoom((z) => (z + 1) % p.images.length)
        if (e.key === 'ArrowLeft') setZoom((z) => (z - 1 + p.images.length) % p.images.length)
        return
      }
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(next)
      if (e.key === 'ArrowLeft') onNavigate(prev)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom, p, next, prev, onClose, onNavigate])

  return (
    <motion.div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={`${p.title} case study`}>
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      />

      <motion.div
        ref={scroller}
        data-lenis-prevent
        className="no-scrollbar absolute inset-x-0 bottom-0 top-2 overflow-y-auto overscroll-contain rounded-t-[28px] border-t border-line bg-ink-2 sm:top-5 sm:rounded-t-[36px] lg:inset-x-5"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* top bar */}
        <div className="sticky top-0 z-20 border-b border-line bg-ink-2/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
            <div className="flex min-w-0 items-center gap-3 text-sm">
              <span className="font-mono text-lime">
                {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
              </span>
              <span className="truncate font-medium">{p.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <IconBtn label="Previous project" onClick={() => onNavigate(prev)}>
                <ArrowLeft size={18} />
              </IconBtn>
              <IconBtn label="Next project" onClick={() => onNavigate(next)}>
                <ArrowRight size={18} />
              </IconBtn>
              <IconBtn label="Close" onClick={onClose} accent>
                <X size={18} />
              </IconBtn>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="mx-auto max-w-[1240px] px-4 pb-16 pt-10 sm:px-8 sm:pt-14"
          >
            {/* header */}
            <div className="relative">
              <div
                className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full blur-[110px]"
                style={{ background: `${p.accent}40` }}
              />
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-dim">{p.category}</p>
              <h2 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                {p.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{p.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <LiveButton url={p.liveUrl} />
                {p.figmaUrl && (
                  <a
                    href={p.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-5 py-3.5 text-sm font-medium transition-colors hover:bg-white/[0.08]"
                  >
                    <FigmaIcon size={16} /> View in Figma
                  </a>
                )}
              </div>
            </div>

            {/* meta */}
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              {[
                ['Role', 'UI/UX Designer'],
                ['Tools', 'Figma'],
                ['Platforms', p.platforms.join(', ')],
                ['Category', p.category],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink-2 p-5">
                  <dt className="text-xs uppercase tracking-[0.18em] text-dim">{k}</dt>
                  <dd className="mt-2 text-[15px] font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            {/* cover */}
            <GalleryImage img={p.images[0]} title={p.title} onZoom={() => setZoom(0)} className="mt-10" eager />

            {/* overview */}
            <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
              <div>
                <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-lime">Overview</h3>
                <p className="text-lg leading-relaxed text-fg/90">{p.overview}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-lime">Highlights</h3>
                <ul className="divide-y divide-line border-y border-line">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-4 py-4 text-[15px] leading-relaxed text-muted">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                        <Check size={14} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* gallery */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
              {p.images.slice(1).map((img, i) => (
                <GalleryImage
                  key={img.src}
                  img={img}
                  title={p.title}
                  onZoom={() => setZoom(i + 1)}
                  className={i === 0 ? 'md:col-span-2' : ''}
                />
              ))}
            </div>

            {/* next project */}
            <button
              onClick={() => onNavigate(next)}
              data-cursor="Next"
              className="group mt-20 flex w-full flex-col items-start gap-6 overflow-hidden rounded-3xl border border-line bg-ink p-6 text-left transition-colors hover:border-white/20 sm:flex-row sm:items-center sm:p-8"
            >
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-dim">Next project</p>
                <p className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  {projects[next].title}
                </p>
                <p className="mt-2 text-muted">{projects[next].tagline}</p>
              </div>
              <div className="relative w-full overflow-hidden rounded-2xl sm:w-72">
                <img
                  src={projects[next].images[0].srcMd}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {zoom !== null && (
          <Lightbox
            images={p.images}
            index={zoom}
            onClose={() => setZoom(null)}
            onChange={setZoom}
            title={p.title}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function LiveButton({ url }) {
  if (!url) {
    return (
      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-white/20 px-5 py-3.5 text-sm font-medium text-muted">
        <Clock size={16} /> Live link coming soon
      </span>
    )
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
    >
      Visit live project
      <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:rotate-45" />
    </a>
  )
}

function GalleryImage({ img, title, onZoom, className = '', eager }) {
  return (
    <motion.figure
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <button
        onClick={onZoom}
        data-cursor="Zoom"
        className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-ink sm:rounded-3xl"
        aria-label={`Enlarge: ${img.caption}`}
      >
        <img
          src={img.srcMd}
          srcSet={`${img.srcMd} 1200w, ${img.src} 2000w`}
          sizes="(min-width: 1240px) 1200px, 100vw"
          alt={`${title} — ${img.caption}`}
          width={2000}
          height={1250}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-fg opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 max-md:opacity-100">
          <Maximize2 size={16} />
        </span>
      </button>
      <figcaption className="mt-3 text-sm text-dim">{img.caption}</figcaption>
    </motion.figure>
  )
}

function Lightbox({ images, index, onClose, onChange, title }) {
  const img = images[index]
  const go = (d) => onChange((index + d + images.length) % images.length)
  return (
    <motion.div
      className="fixed inset-0 z-[95] flex flex-col bg-ink/[0.97] backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4 text-sm text-muted sm:p-6">
        <span>
          {index + 1} / {images.length} — {img.caption}
        </span>
        <IconBtn label="Close image" onClick={onClose} accent>
          <X size={18} />
        </IconBtn>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-20">
        <AnimatePresence mode="wait">
          <motion.img
            key={img.src}
            src={img.src}
            alt={`${title} — ${img.caption}`}
            className="max-h-full max-w-full rounded-xl object-contain"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>
        <div className="absolute inset-x-4 bottom-8 flex justify-center gap-3 sm:inset-x-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:justify-between">
          <IconBtn label="Previous image" onClick={(e) => (e.stopPropagation(), go(-1))}>
            <ArrowLeft size={18} />
          </IconBtn>
          <IconBtn label="Next image" onClick={(e) => (e.stopPropagation(), go(1))}>
            <ArrowRight size={18} />
          </IconBtn>
        </div>
      </div>
    </motion.div>
  )
}

function IconBtn({ children, label, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
        accent
          ? 'border-lime bg-lime text-ink hover:bg-lime-soft'
          : 'border-line bg-ink/60 text-fg backdrop-blur hover:border-white/25 hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  )
}

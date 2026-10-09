import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { EASE, SectionHeading, Chip } from './ui'

export default function Work({ onOpen }) {
  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="Selected work"
          title={
            <>
              Featured <span className="accent-serif text-lime">projects</span>
            </>
          }
          aside={
            <>
              A selection of mobile apps, websites and dashboards I’ve designed in Figma — tap any project to see
              the full case study.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24 md:pb-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={() => onOpen(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p, index, onOpen }) {
  const offset = index % 2 === 1 ? 'md:translate-y-32' : ''
  return (
    <div className={offset}>
      <motion.article
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: EASE }}
        className="group"
      >
        <button onClick={onOpen} data-cursor="View" className="block w-full text-left" aria-label={`Open ${p.title} case study`}>
          <div className="relative overflow-hidden rounded-[22px] border border-line bg-ink-2 sm:rounded-[28px]">
            <motion.div
              initial={{ clipPath: 'inset(12% 12% 12% 12% round 28px)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.3, ease: EASE }}
            >
              <img
                src={p.images[0].srcMd}
                srcSet={`${p.images[0].srcMd} 1200w, ${p.images[0].src} 2000w`}
                sizes="(min-width: 768px) 50vw, 100vw"
                alt={`${p.title} — ${p.images[0].caption}`}
                width={1200}
                height={750}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
            </motion.div>

            {/* accent glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: `radial-gradient(80% 60% at 50% 110%, ${p.accent}55, transparent 70%)` }}
            />

            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 sm:left-4 sm:top-4">
              {p.platforms.map((pl) => (
                <Chip key={pl} className="!bg-ink/60 !text-fg/90">
                  {pl}
                </Chip>
              ))}
            </div>

            <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-lime text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 sm:bottom-4 sm:right-4 sm:h-14 sm:w-14 max-md:opacity-100 md:translate-y-3 md:group-hover:translate-y-0">
              <ArrowUpRight size={22} className="transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </div>

          <div className="mt-6 flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-dim">
                <span className="text-lime">{String(index + 1).padStart(2, '0')}</span>
                <span className="h-px w-6 bg-line" />
                {p.category}
              </div>
              <h3 className="font-display text-3xl font-semibold tracking-tight transition-colors sm:text-4xl">
                {p.title}
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{p.tagline}</p>
            </div>
          </div>
        </button>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {p.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-lime underline-offset-4 hover:underline"
            >
              Live project <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </motion.article>
    </div>
  )
}

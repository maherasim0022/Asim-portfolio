import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { MapPin, Briefcase, GraduationCap, PenTool } from 'lucide-react'
import { site, skills } from '../data/site'
import { Reveal, SectionHeading, EASE } from './ui'

const STATEMENT =
  'I’m a UI/UX designer with a computer science background. I turn requirements into user-centered interfaces — mapping user flows, sketching wireframes and crafting high-fidelity UI and interactive prototypes that are clear, consistent and ready for developers to build.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = STATEMENT.split(' ')

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="About me"
          title={
            <>
              Design with <span className="accent-serif text-lime">purpose</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <p
            ref={ref}
            className="font-display text-[clamp(1.6rem,3.4vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.02em]"
          >
            <span className="sr-only">{STATEMENT}</span>
            <span aria-hidden>
              {words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
            </span>
          </p>

          <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime/20 blur-[70px]" />
            <div className="relative flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime font-display text-2xl font-bold text-ink">
                MA
              </div>
              <div>
                <p className="font-display text-xl font-semibold">{site.name}</p>
                <p className="text-sm text-muted">{site.role}</p>
              </div>
            </div>
            <ul className="relative mt-8 space-y-5 text-[15px]">
              {[
                [MapPin, 'Based in', site.location],
                [Briefcase, 'Currently', 'UI/UX Developer at Artificizen'],
                [GraduationCap, 'Education', 'BS Computer Science — UCP, Lahore'],
                [PenTool, 'Main tool', 'Figma — prototyping, design systems, component libraries'],
              ].map(([Icon, k, v]) => (
                <li key={k} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-lime">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-dim">{k}</p>
                    <p className="mt-0.5 text-fg/90">{v}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3">
          {skills.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE, delay: gi * 0.1 }}
              className="group rounded-3xl border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-lime/40 sm:p-7"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                <span className="font-mono text-xs text-dim transition-colors group-hover:text-lime">
                  0{gi + 1}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-sm text-fg/85 transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

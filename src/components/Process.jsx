import { motion } from 'motion/react'
import { Search, Workflow, Palette, MousePointerClick } from 'lucide-react'
import { SectionHeading, EASE } from './ui'

const STEPS = [
  {
    icon: Search,
    title: 'Understand',
    text: 'Break down requirements and goals, then map the user flows so every screen has a clear job.',
  },
  {
    icon: Workflow,
    title: 'Wireframe',
    text: 'Sketch structure and hierarchy in low fidelity to validate layouts before any visual polish.',
  },
  {
    icon: Palette,
    title: 'Design',
    text: 'Craft high-fidelity UI on a consistent design system of type, colour and reusable components.',
  },
  {
    icon: MousePointerClick,
    title: 'Prototype & handoff',
    text: 'Build interactive prototypes, iterate on feedback and hand off clean, ready-to-build files.',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Process"
          title={
            <>
              How I <span className="accent-serif text-lime">work</span>
            </>
          }
          aside="A simple, repeatable process that takes an idea from requirements to a polished, developer-ready design."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 transition-transform duration-500 hover:-translate-y-2 sm:p-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(212,255,58,0.14),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white/[0.04] text-lime transition-colors duration-500 group-hover:bg-lime group-hover:text-ink">
                  <s.icon size={20} />
                </span>
                <span className="font-display text-6xl font-semibold leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-white/15">
                  0{i + 1}
                </span>
              </div>
              <h3 className="relative mt-auto pt-10 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

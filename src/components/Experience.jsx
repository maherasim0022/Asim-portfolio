import { motion } from 'motion/react'
import { experience, education } from '../data/site'
import { SectionHeading, EASE } from './ui'

function Row({ item, i, children }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
      className="group relative grid gap-3 border-t border-line py-7 sm:grid-cols-[150px_1fr] sm:gap-8"
    >
      <span className="absolute left-0 top-0 h-px w-0 bg-lime transition-all duration-700 group-hover:w-full" />
      <p className="font-mono text-sm text-lime">{item.period}</p>
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-1 text-muted">
          {item.org}
          {item.place && <span className="text-dim"> · {item.place}</span>}
        </p>
        {children}
      </div>
    </motion.li>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Experience & education"
          title={
            <>
              Where I’ve <span className="accent-serif text-lime">been</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="mb-2 text-xs uppercase tracking-[0.2em] text-dim">Work experience</h3>
            <ul className="border-b border-line">
              {experience.map((e, i) => (
                <Row key={e.title} item={e} i={i}>
                  <ul className="mt-5 space-y-3">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Row>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xs uppercase tracking-[0.2em] text-dim">Education</h3>
            <ul className="border-b border-line">
              {education.map((e, i) => (
                <Row key={e.title} item={e} i={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

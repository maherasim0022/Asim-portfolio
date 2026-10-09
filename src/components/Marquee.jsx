const ITEMS = [
  'UI Design',
  'UX Design',
  'User Flows',
  'Wireframing',
  'Prototyping',
  'Design Systems',
  'Mobile Apps',
  'Responsive Web',
  'Dashboards',
]

function Row({ reverse, className }) {
  const list = [...ITEMS, ...ITEMS]
  return (
    <div className={`overflow-hidden py-4 sm:py-5 ${className}`}>
      <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {list.map((t, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 pr-6 font-display text-2xl font-semibold uppercase tracking-tight sm:gap-10 sm:pr-10 sm:text-4xl"
          >
            {t}
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="shrink-0">
              <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section aria-label="Skills" className="relative overflow-hidden py-16 sm:py-24">
      <div className="relative">
        <Row reverse className="absolute inset-x-[-5%] top-0 rotate-[2deg] border-y border-line bg-ink-3 text-white/25" />
        <Row className="relative -rotate-[2deg] scale-x-110 bg-lime text-ink shadow-[0_20px_80px_-20px_rgba(212,255,58,0.45)]" />
      </div>
    </section>
  )
}

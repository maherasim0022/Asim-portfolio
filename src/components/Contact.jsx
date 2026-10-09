import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, Copy, Check, Mail, Phone, MapPin, Download, FileText, Send, LoaderCircle } from 'lucide-react'
import { site } from '../data/site'
import { Reveal, SplitWords, EASE } from './ui'
import { LinkedinIcon, WhatsappIcon } from './icons'
import { sendMessage, fallbackLinks } from '../lib/sendMessage'

const TOPICS = ['Mobile app', 'Website', 'Dashboard', 'Job opportunity', 'Other']

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-lime/[0.07] blur-[160px]" />
      <div className="container-x">
        <Reveal className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-lime">(05)</span>
          <span className="h-px w-10 bg-line" />
          Contact
        </Reveal>
        <h2 className="max-w-5xl font-display text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
          <SplitWords text="Let’s create something" />{' '}
          <span className="accent-serif text-lime">
            <SplitWords text="great" delay={0.2} />
          </span>{' '}
          <SplitWords text="together." delay={0.25} />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal className="flex flex-col gap-3">
            <EmailCard />
            <InfoLink
              href={`https://wa.me/${site.whatsapp}`}
              icon={<WhatsappIcon size={18} />}
              label="WhatsApp"
              value={site.phone}
              external
            />
            <InfoLink href={`tel:${site.phone.replace(/\s/g, '')}`} icon={<Phone size={18} />} label="Phone" value={site.phone} />
            <InfoLink href={site.linkedin} icon={<LinkedinIcon size={17} />} label="LinkedIn" value="asim-lak" external />
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-ink-2 p-4">
              <IconWrap>
                <MapPin size={18} />
              </IconWrap>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-dim">Location</p>
                <p className="mt-0.5 font-medium">{site.location}</p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-lime/30 bg-lime/[0.06] p-6">
              <p className="font-display text-2xl font-semibold tracking-tight">Grab my resume</p>
              <p className="mt-1 text-sm text-muted">Everything about my experience, skills and projects in one page.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={site.resumePdf}
                  download
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <Download size={16} className="transition-transform group-hover:translate-y-0.5" /> Download PDF
                </a>
                <a
                  href={site.resumeDocx}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:bg-white/[0.06]"
                >
                  <FileText size={16} /> Word (.docx)
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function IconWrap({ children }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-lime transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
      {children}
    </span>
  )
}

function InfoLink({ href, icon, label, value, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-2 p-4 transition-colors hover:border-white/20"
    >
      <IconWrap>{icon}</IconWrap>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.16em] text-dim">{label}</p>
        <p className="mt-0.5 truncate font-medium">{value}</p>
      </div>
      <ArrowUpRight size={18} className="text-dim transition-all duration-300 group-hover:rotate-45 group-hover:text-lime" />
    </a>
  )
}

function EmailCard() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-2 p-4 transition-colors hover:border-white/20">
      <IconWrap>
        <Mail size={18} />
      </IconWrap>
      <a href={`mailto:${site.email}`} className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.16em] text-dim">Email</p>
        <p className="mt-0.5 truncate font-medium">{site.email}</p>
      </a>
      <button
        onClick={copy}
        aria-label="Copy email address"
        className="relative flex h-10 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-medium text-muted transition-colors hover:text-fg"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-1.5 text-lime">
              <Check size={14} /> Copied
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-1.5">
              <Copy size={14} /> Copy
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-dim">{label}</span>
      {children}
    </label>
  )
}

const inputCls =
  'w-full rounded-2xl border border-line bg-ink px-4 py-3.5 text-[15px] text-fg placeholder:text-dim outline-none transition-colors focus:border-lime/70 focus:bg-ink-3'

function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0])
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const [fallback, setFallback] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const payload = {
      name: String(form.get('name')).trim(),
      email: String(form.get('email')).trim(),
      message: String(form.get('message')).trim(),
      honey: String(form.get('_honey') || ''),
      topic,
    }

    setStatus('sending')
    setFallback(null)
    try {
      await sendMessage(payload)
      setStatus('sent')
      formEl.reset()
    } catch {
      setFallback(fallbackLinks(payload))
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-5 sm:p-8"
    >
      <p className="font-display text-2xl font-semibold tracking-tight">Send a message</p>
      <p className="mt-1 text-sm text-muted">Have a project or role in mind? Drop me a message.</p>

      <div className="mt-7">
        <span className="mb-3 block text-xs uppercase tracking-[0.16em] text-dim">I’m interested in</span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Topic">
          {TOPICS.map((t) => (
            <button
              type="button"
              key={t}
              role="radio"
              aria-checked={topic === t}
              onClick={() => setTopic(t)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                topic === t ? 'border-lime bg-lime font-medium text-ink' : 'border-line text-muted hover:border-white/25 hover:text-fg'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* honeypot: hidden from people, catches spam bots */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your name">
          <input name="name" required autoComplete="name" placeholder="John Doe" className={inputCls} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required autoComplete="email" placeholder="john@company.com" className={inputCls} />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Message">
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell me a little about your project…"
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <AnimatePresence mode="wait">
          {status === 'sent' && (
            <motion.p key="s" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-lime">
              <Check size={16} /> Thanks! Your message has been sent — I’ll get back to you soon.
            </motion.p>
          )}
          {status === 'error' && fallback && (
            <motion.div key="e" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm">
              <p className="text-red-400">Couldn’t send right now. Reach me directly instead:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <a href={fallback.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-fg transition-colors hover:border-lime">
                  <WhatsappIcon size={14} /> WhatsApp
                </a>
                <a href={fallback.mail} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-fg transition-colors hover:border-lime">
                  <Mail size={14} /> Email
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group ml-auto inline-flex items-center gap-3 rounded-full bg-lime py-2 pl-6 pr-2 font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-lime"
            transition={{ ease: EASE }}
          >
            {status === 'sending' ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <Send size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </motion.span>
        </button>
      </div>
    </form>
  )
}

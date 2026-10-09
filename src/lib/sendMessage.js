import { site } from '../data/site'

/**
 * Sends the contact form straight to your inbox.
 * Uses Web3Forms when `site.web3formsKey` is set, otherwise FormSubmit (no signup needed).
 */
export async function sendMessage({ name, email, topic, message, honey }) {
  const subject = `Portfolio: ${topic} — ${name}`

  if (site.web3formsKey) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: site.web3formsKey,
        subject,
        from_name: 'Portfolio website',
        name,
        email,
        topic,
        message,
        botcheck: honey,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.success) throw new Error(data.message || 'Could not send message')
    return
  }

  const res = await fetch(`https://formsubmit.co/ajax/${site.formsubmitTo || site.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name,
      email,
      topic,
      message,
      _subject: subject,
      _replyto: email,
      _template: 'table',
      _captcha: 'false',
      _honey: honey,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Could not send message')
}

/** Pre-filled fallbacks shown if sending fails. */
export function fallbackLinks({ name, email, topic, message }) {
  const text = `${topic} — ${message}\n\n— ${name} (${email})`
  return {
    mail: `mailto:${site.email}?subject=${encodeURIComponent(`${topic} — message from ${name}`)}&body=${encodeURIComponent(text)}`,
    whatsapp: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi Asim! ${text}`)}`,
  }
}

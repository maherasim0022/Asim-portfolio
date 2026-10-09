// ─────────────────────────────────────────────────────────────
//  Personal info used across the whole site.
//  Edit anything here and the site updates automatically.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Muhammad Asim',
  shortName: 'Asim',
  role: 'UI/UX Designer',
  location: 'Sargodha, Pakistan',

  email: 'maherasimlak@gmail.com',
  phone: '+92 345 3496808',
  // WhatsApp number in international format, digits only
  whatsapp: '923453496808',
  linkedin: 'https://www.linkedin.com/in/asim-lak-b069382ab',

  resumePdf: '/resume/Muhammad-Asim-UIUX-Designer-Resume.pdf',
  resumeDocx: '/resume/Muhammad-Asim-UIUX-Designer-Resume.docx',

  // Contact form — messages are emailed straight to `email` above via FormSubmit (free, no signup).
  // ⚠️ The very first message sends an "Activate Form" email to your inbox — open it and click
  //    "Activate Form" once; after that every message arrives normally. (Check spam if you don't see it.)
  // Optional: after activating, FormSubmit gives you a random ID — paste it here to hide your email
  // address from the page source, e.g. formsubmitTo: 'a1b2c3d4e5f6...'
  formsubmitTo: '',
  // Optional alternative: a free Web3Forms access key (https://web3forms.com). If set, it is used instead.
  web3formsKey: '',
}

export const experience = [
  {
    period: 'Dec 2025 — Present',
    title: 'UI/UX Developer',
    org: 'Artificizen',
    place: 'Lahore / Sargodha, Pakistan',
    points: [
      'Design user-centered interfaces and interactive prototypes in Figma, translating requirements into clean, ready-to-build layouts.',
      'Create wireframes and high-fidelity UI screens with consistent components, ready for developer handoff.',
      'Partner with cross-functional teammates to keep design decisions aligned with project and development requirements.',
    ],
  },
]

export const education = [
  {
    period: 'Degree',
    title: 'Bachelor of Science in Computer Science',
    org: 'University of Central Punjab (UCP), Lahore',
  },
  {
    period: '2021',
    title: 'Intermediate',
    org: 'ILM College, Sargodha',
  },
  {
    period: '2019',
    title: 'Matriculation',
    org: 'Mission Grammar High School, Sargodha',
  },
]

export const skills = [
  {
    title: 'UI/UX Design',
    items: ['User flows', 'Wireframing', 'High-fidelity UI', 'Prototyping', 'Usability', 'Responsive web', 'Mobile apps', 'Dashboards'],
  },
  {
    title: 'Design Tools',
    items: ['Figma', 'Prototyping', 'Design systems', 'Component libraries', 'Developer handoff'],
  },
  {
    title: 'Ways of Working',
    items: ['Cross-functional collaboration', 'Iterative feedback', 'Requirement → prototype ownership', 'Detail-focused'],
  },
]

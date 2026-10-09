// ─────────────────────────────────────────────────────────────
//  PROJECTS
//
//  👉 To add a project's live link, paste it into `liveUrl`
//     e.g.  liveUrl: 'https://velariforge.com',
//     While `liveUrl` is empty the button shows "Live link coming soon".
//
//  👉 `figmaUrl` is optional — add a Figma prototype / file link
//     and a "View in Figma" button appears automatically.
//
//  Images live in /public/projects. Each project uses 4 images:
//  `<slug>-1.webp` (cover) … `<slug>-4.webp`, plus `-md` smaller copies.
// ─────────────────────────────────────────────────────────────

const shots = (slug, captions) =>
  captions.map((caption, i) => ({
    src: `/projects/${slug}-${i + 1}.webp`,
    srcMd: `/projects/${slug}-${i + 1}-md.webp`,
    caption,
  }))

export const projects = [
  {
    slug: 'timeless-jump',
    title: 'Timeless Jump',
    tagline: 'A bold, high-energy website for a jump-rope transformation club and store.',
    category: 'Fitness · Website',
    platforms: ['Desktop', 'Mobile'],
    tags: ['UI/UX Design', 'Figma', 'Responsive Web'],
    accent: '#FFE100',
    liveUrl: '',
    figmaUrl: '',
    overview:
      'Timeless Jump is a responsive website for a jump-rope fitness club and shop. I designed the mobile and desktop interfaces with structured content, product, media and navigation sections — from the hero and rope bundles to the 90-day program, community, membership pricing and FAQs — tied together by a striking black-and-yellow visual system.',
    highlights: [
      'Responsive mobile & desktop designs with a clear content structure',
      'Product listing with category filters, bundles and quick-add actions',
      'A cohesive visual system: typography, spacing, imagery and reusable components',
      'Conversion-focused sections: program timeline, membership pricing and FAQs',
    ],
    images: shots('timeless-jump', [
      'Hero — desktop & mobile',
      'Product setup section',
      '90-day program & membership pricing',
      'Mobile screens',
    ]),
  },
  {
    slug: 'velari-forge',
    title: 'Velari Forge',
    tagline: 'A cinematic storefront for handcrafted daggers — from browsing to checkout, plus a full admin panel.',
    category: 'E-commerce',
    platforms: ['Desktop', 'Mobile', 'Admin panel'],
    tags: ['UI/UX Design', 'Figma', 'E-commerce', 'Responsive'],
    accent: '#E07000',
    liveUrl: '',
    figmaUrl: '',
    overview:
      'Velari Forge is a complete e-commerce experience for a premium dagger brand. I designed the customer journey across desktop and mobile — home, shop, product details, a custom dagger builder, bulk & wholesale orders, the craftsmanship story, cart and secure checkout — along with account screens and an admin panel for managing pages, products, orders, users and the store theme.',
    highlights: [
      'End-to-end flows: browse → product detail → custom builder → cart → secure checkout',
      'Admin panel with dashboard, page management, orders, users and a live theme customizer',
      'A consistent dark visual system with amber accents, reusable cards, forms and navigation',
      'Responsive layouts designed for both mobile and desktop',
    ],
    images: shots('velari-forge', [
      'Home — desktop & mobile',
      'Shop listing & product details',
      'Mobile — craftsmanship, product & shop screens',
      'Admin panel — theme customizer & page management',
    ]),
  },
  {
    slug: 'le-jeu-de-la-voix',
    title: 'Le Jeu de la Voix',
    tagline: 'A party game app that listens to how your friends talk — and reveals everyone’s vocal personality.',
    category: 'Mobile game',
    platforms: ['Mobile app'],
    tags: ['UI/UX Design', 'Figma', 'Mobile Game Design'],
    accent: '#4C3AA8',
    liveUrl: '',
    figmaUrl: '',
    overview:
      'Le Jeu de la Voix is a mobile party game focused on an engaging, intuitive player experience. Players join with a game key, add their group and take turns asking questions — random, from a category or their own — and recording spoken answers. The app listens to how people talk, not what they say, and ends the evening by revealing playful vocal portraits like The Charmer or The Storyteller. I designed the full flow, from onboarding and house rules to gameplay, voice recording and the results reveal.',
    highlights: [
      'Complete game flow: join → add players → choose questions → record answers → results',
      'Clear onboarding with “How it works”, age, privacy and house-rule screens',
      'Playful results: a group verdict and personality cards with clarity, expressiveness & volume scores',
      'Warm, illustrated visual style with consistent buttons, cards and progress cues',
    ],
    images: shots('le-jeu-de-la-voix', [
      'Join, add players, splash, voice recording & custom question',
      'Onboarding — house rules, how it works & question type',
      'Gameplay — categories, question card & answer recorded',
      'Results — the verdict, personality card & what’s next',
    ]),
  },
  {
    slug: 'tara',
    title: 'Tara',
    tagline: 'An admin dashboard for managing properties, agents, leads and travel analytics.',
    category: 'Dashboard',
    platforms: ['Web app', 'Admin panel'],
    tags: ['UI/UX Design', 'Figma', 'Dashboard', 'Wireframes'],
    accent: '#2563EB',
    liveUrl: '',
    figmaUrl: '',
    overview:
      'Tara is a data-heavy admin platform. I designed wireframes and high-fidelity dashboard interfaces — overview stats, revenue and growth charts, property and lead management tables, transactions & commissions, vacation search analytics and organization requests — focusing on information hierarchy, usability and efficient navigation across complex workflows.',
    highlights: [
      'From low-fidelity wireframes to polished high-fidelity UI',
      'Tables, charts, forms and data-management views',
      'Clear information hierarchy for complex admin workflows',
      'Consistent sidebar navigation and reusable dashboard components',
    ],
    images: shots('tara', [
      'Dashboard — final design',
      'Dashboard overview & properties management',
      'Transactions & vacation search analytics',
      'Wireframes',
    ]),
  },
  {
    slug: 'visago',
    title: 'VisaGo',
    tagline: 'A trustworthy visa-consultancy website that helps applicants avoid rejection.',
    category: 'Website',
    platforms: ['Desktop', 'Mobile'],
    tags: ['UI/UX Design', 'Figma', 'Mobile & Web'],
    accent: '#2F6B55',
    liveUrl: '',
    figmaUrl: '',
    overview:
      'VisaGo is a website for a Schengen visa consultancy serving UK applicants. I designed desktop (with multiple hero explorations) and mobile interfaces that guide visitors from a quick rejection-risk check to expert help — covering the process, eligibility self-check, visa categories, real cases, FAQs, reviews and contact — with a calm, premium green visual language that builds trust.',
    highlights: [
      'Desktop & mobile designs, with several hero explorations',
      'Comparison and step-by-step process sections that build trust',
      'Lead-capture forms built into the hero and contact sections',
      'One consistent design system across long-form content',
    ],
    images: shots('visago', [
      'Hero — desktop & mobile',
      '“How we work” section',
      'Hero exploration & trusted guidance',
      'Mobile screens',
    ]),
  },
  {
    slug: 'khirki',
    title: 'Khirki App',
    tagline: 'A guided estimation flow for windows and safety grills — on mobile and web.',
    category: 'Mobile & Web App',
    platforms: ['Mobile', 'Web'],
    tags: ['UI/UX Design', 'Figma', 'User flows'],
    accent: '#4B5563',
    liveUrl: '',
    figmaUrl: '',
    overview:
      'Khirki is a window and safety-grill estimation app. I designed mobile screens and web modals around clear, step-by-step user flows: choose material and company, enter dimensions, pick glazing, gauge and Georgian bar design, select a pre-designed style and get a final specification with an estimated price. Before the UI, I mapped the whole configuration logic as a user-flow diagram.',
    highlights: [
      'Multi-step estimation flow with progress indicators',
      'Mobile app screens with matching website modal versions',
      'User-flow diagram mapping material, glazing and style options',
      'Wireframes to high-fidelity UI with consistent components',
    ],
    images: shots('khirki', [
      'Website modal & mobile app',
      'Window estimate — mobile flow',
      'Safety grills — mobile flow',
      'User-flow diagram',
    ]),
  },
  {
    slug: 'banking-app',
    title: 'Banking App',
    tagline: 'A sleek, gradient-rich landing page for a modern digital banking app.',
    category: 'FinTech · Landing page',
    platforms: ['Desktop'],
    tags: ['UI Design', 'Figma', 'FinTech', 'Landing page'],
    accent: '#A855F7',
    liveUrl: '',
    figmaUrl: '',
    overview:
      'A dark-themed landing page for a digital banking app. It showcases the product with app previews and highlights features like smart financial planning, spending tracking, transfers and digital cards — followed by pricing packages, testimonials, FAQs and a download call-to-action, all wrapped in vibrant purple-pink gradients.',
    highlights: [
      'Bold hero with app preview and store CTAs',
      'Feature, stats and digital-card sections',
      'Pricing packages, testimonials and FAQ',
      'Glowing gradient visual style on a dark UI',
    ],
    images: shots('banking-app', [
      'Hero section',
      'Features — grow your wealth',
      'Take control & pricing packages',
      'Download app call-to-action',
    ]),
  },
  {
    slug: 'mobile-template',
    title: 'App Template',
    tagline: 'A clean, conversion-focused landing page for a mobile app template business.',
    category: 'SaaS · Landing page',
    platforms: ['Desktop'],
    tags: ['UI Design', 'Figma', 'Landing page'],
    accent: '#2F80ED',
    liveUrl: '',
    figmaUrl: '',
    overview:
      'A bright, friendly landing page for a business that sells mobile app templates. It walks visitors through the product with an illustrated hero, about section, feature grid, app screenshots, testimonials, pricing plans, FAQs, team, download and contact sections — in a crisp blue-and-white style.',
    highlights: [
      'Illustrated hero with app-store buttons',
      'Feature grid and app screenshot showcase',
      'Pricing plans, FAQs and team sections',
      'Contact form and newsletter sign-up',
    ],
    images: shots('mobile-template', [
      'Hero section',
      'Features grid',
      'App screenshots',
      'Pricing & FAQ',
    ]),
  },
]

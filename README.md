# Muhammad Asim — Portfolio

Personal portfolio website built with **React + Vite**, **Tailwind CSS**, **Motion** (animations) and **Lenis** (smooth scrolling).

## Run it on your computer

```bash
npm install      # first time only
npm run dev      # opens at http://localhost:5173
```

## Add your project links

Open `src/data/projects.js` and paste each project's link into `liveUrl`:

```js
liveUrl: 'https://your-project-link.com',
figmaUrl: 'https://www.figma.com/proto/...',   // optional
```

- While `liveUrl` is empty the project shows a **"Live link coming soon"** badge.
- Once you add it, a **"Visit live project"** button appears in the case study and a **"Live project ↗"** link on the card.
- Adding `figmaUrl` shows a **"View in Figma"** button.

## Edit personal info

`src/data/site.js` holds your name, email, phone, WhatsApp, LinkedIn, experience, education and skills.

## Contact form

Messages are emailed straight to `maherasimlak@gmail.com` through **FormSubmit** (free, no account needed).

**One-time activation:** send the first message from the form yourself. FormSubmit emails you an
"Activate Form" link (check spam too) — click it once and every message after that is delivered.
Do this again once after deploying to your real domain if no messages arrive.

Optional: use a free Web3Forms key instead — get one at https://web3forms.com and paste it into
`web3formsKey` in `src/data/site.js`.

If sending ever fails, the form offers WhatsApp and email buttons with the message pre-filled.

## Update the resume

Replace the files in `public/resume/`, keeping the same file names
(`Muhammad-Asim-UIUX-Designer-Resume.pdf` and `.docx`).

## Project images

All images are in `public/projects/` — 4 per project (`<name>-1.webp` is the cover) plus smaller `-md` copies.
To change one, replace the file with a new image of the same name (16:10 ratio works best, e.g. 2000×1250).

## Deploy (free)

**Vercel** — push this folder to GitHub, then import it at https://vercel.com/new. Vercel detects Vite automatically (build command `npm run build`, output folder `dist`).

**Netlify** — run `npm run build` and drag the `dist` folder onto https://app.netlify.com/drop.

After deploying, update the `og:image` tag in `index.html` to the full URL
(e.g. `https://your-domain.com/projects/velari-forge-1.webp`) so link previews show the image on WhatsApp/LinkedIn.

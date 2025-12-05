# Mahabeer Portfolio (Next.js)

A fast, accessible personal portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Radix UI. It includes strong SEO defaults, an interactive Open Source showcase, projects gallery with filters, and a contact workflow powered by Nodemailer and React Email.

## Features

- Modern stack: `Next.js 15`, `React 19`, `TypeScript`, `Tailwind CSS`, `Radix UI`, `Framer Motion`
- Theming: `next-themes` with system/dark mode and safe hydration
- SEO-ready:
  - Global metadata with `metadataBase`, canonical, OpenGraph/Twitter
  - `robots.txt` and `sitemap.xml` generated from `NEXT_PUBLIC_SITE_URL`
  - JSON-LD schemas: `Person`, `WebSite`, `ItemList`, and OSS-specific `SoftwareSourceCode`
- Projects section: filter by category, responsive cards, badges
- Open Source showcase: unique split layout, animated, code snippets with copy-to-clipboard
- Contact flow: server route with Nodemailer and React Email templates

## Tech Stack

- Framework: `next`
- UI: `tailwindcss`, Radix primitives, shadcn-style components
- Animations: `framer-motion`
- Email: `nodemailer`, `@react-email/render`
- Utilities: `zod`, `clsx`, `tailwind-merge`

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm or pnpm

### Installation

```bash
npm install
npm run dev
```

App will start at `http://localhost:3000` (or port fallback `3001`).

## Environment Variables

Create `.env.local` and set:

```env
FROM_EMAIL=your.gmail.address@gmail.com
FROM_EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=your.admin@domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Notes:
- Gmail requires an App Password with 2FA; see Google support docs.
- `NEXT_PUBLIC_SITE_URL` is used to build absolute canonical/OG URLs, robots, and sitemap.

## Scripts

- `npm run dev` – start development server
- `npm run build` – build for production
- `npm run start` – start production server
- `npm run lint` – run ESLint using flat config (`eslint.config.mjs`)

## SEO Configuration

- Global metadata: `app/layout.tsx` uses `metadataBase`, canonical, OpenGraph/Twitter
- Robots and Sitemap:
  - `app/robots.ts` – dynamic `robots.txt`
  - `app/sitemap.ts` – dynamic `sitemap.xml`
- Page metadata:
  - Home: `app/page.tsx`
  - Projects: `app/projects/page.tsx`
- JSON-LD:
  - `Person` injected in `app/layout.tsx`
  - `WebSite` on Home
  - `ItemList` on Projects (derives from `lib/projects.ts`)
  - OSS `SoftwareSourceCode` and `WebSite` in Open Source section

Update `NEXT_PUBLIC_SITE_URL` and ensure your OG image is available in `public/` (currently `pic.webp`).

## Data & Content

- Projects data: `lib/projects.ts`
  - Add or edit project items (`title`, `description`, `image`, `tags`, `liveUrl`, `category`)
- Open Source contributions: `lib/oss.ts`
  - Manage `title`, `description`, `tags`, `url`, `type: "npm" | "website"`

## Key Components

- Home shell and layout:
  - `app/layout.tsx` – global styles, metadata, Person JSON-LD
  - `app/page.tsx` – sections ordering and WebSite JSON-LD
- Sections:
  - `components/hero.tsx`, `components/about.tsx`, `components/skills.tsx`, `components/experience.tsx`
  - `components/projects.tsx` – filterable projects grid
  - `components/open-source.tsx` – unique OSS showcase with code snippets and motion
  - `components/contact.tsx`, `components/footer.tsx`
- UI primitives: `components/ui/*` (Radix/shadcn-style)

## Contact API

- Route: `app/api/contact/route.ts`
  - Accepts `{ name, email, subject, message }`
  - Sends a thank-you email to the user and a notification to `ADMIN_EMAIL`
  - Transport: `lib/nodemailer.ts` (Gmail service)

## Linting

- ESLint flat config: `eslint.config.mjs`
- Address `react/no-unescaped-entities` and component purity warnings as needed

## Deployment Checklist

- Set `NEXT_PUBLIC_SITE_URL` to your production domain
- Provide a share image (`public/pic.webp`) sized 1200×630 for OG/Twitter
- Verify `https://your-domain.com/robots.txt` and `/sitemap.xml`
- Test contact emails with your SMTP credentials

## License

Personal portfolio. All rights reserved.

## Author

- Mahabeer – Full Stack Developer
- GitHub: `https://github.com/mahabeer-dev`
- LinkedIn: `https://www.linkedin.com/in/mahabeer-dev/`
- X/Twitter: `https://x.com/mahabeer_dev`


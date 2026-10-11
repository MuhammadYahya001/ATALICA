# ATALICA Website

The ATALICA website presents the studio’s interior design, construction, and décor services, selected project photography, founder information, and consultation/contact options. It is built with the Next.js App Router and the existing warm ivory, navy, copper, and charcoal visual identity.

## Stack

- Next.js 15.5.24 with the App Router
- React 18.3
- TypeScript
- Tailwind CSS
- npm and the committed `package-lock.json`

## Requirements

- Node.js 20 LTS or newer supported by Next.js 15
- npm

## Local setup

```bash
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Environment

`RESEND_API_KEY`, `LEADS_TO_EMAIL`, and `LEADS_FROM_EMAIL` configure consultation email delivery. The sender must be authorized by the Resend account before production use. `NEXT_PUBLIC_GA_ID` is optional; leave it blank to disable Google Analytics. Keep real credentials in `.env.local` or the hosting provider’s secret manager. Do not commit environment files.

In local development, if Resend is not configured, successful inquiries are saved to the ignored `data/leads.json` file and clearly marked as local only. In production, the form reports an error until email delivery is configured. A local JSON file is not durable storage for serverless hosting.

## Images and content

Original photographs and logo assets are retained in `images/` and `public/images/`. Responsive WebP variants are served from `public/images/optimized/`; keep the originals when updating or regenerating variants. Project descriptions and explicit image mappings live in `src/lib/projects.ts`.

## Routes

- `/` — Home
- `/projects` and `/projects/[slug]` — Portfolio and project details
- `/services` — Services
- `/about` — Founder and studio information
- `/contact` — Direct contact options
- `/consultation` — Inquiry form
- `/privacy` — Privacy information

The App Router also generates `/robots.txt` and `/sitemap.xml` for `atalica.com.pk`.

## Deployment

Deploy to a Node.js hosting platform that supports Next.js App Router route handlers. Configure the required Resend secrets in the host’s environment settings before enabling production inquiries. Set the production domain to `atalica.com.pk` in the hosting platform and follow that provider’s current domain instructions; this repository does not manage DNS. See [DEPLOYMENT.md](./DEPLOYMENT.md) for the operations checklist.

No open-source license has been added. Add one only after the project owner chooses a license.

# Salman Faris — personal brand, services and courses

Website for https://www.salmanfaris.in/. **Story. Motion. Code.**

Static **Astro 7** site with a noir and crimson design, no UI framework and under 20 KB of JavaScript. Hosted on Vercel.

## Run

Requires Node.js 22 or newer.

```sh
npm install
npm run dev        # local site
npm run build      # builds dist/, then runs the SEO check
npm run preview    # serve the production build on :4321
npm run check      # Astro and TypeScript diagnostics
npm test           # Playwright, against a server on :4321
```

## Edit content

| Content | File |
|---|---|
| Name, email, social links, WhatsApp | `src/data/portfolio.ts` (`profile`) |
| Projects and case studies | `src/data/portfolio.ts` (`projects`) |
| Home page text | `src/data/home.ts`, `src/components/home/` |
| Service pages | `src/data/services/*.ts` |
| Courses, status, fees, payment links | `src/data/courses.ts` |
| Location pages | `src/data/locations.ts` |
| Malayalam, Hindi, Tamil, Arabic | `src/data/i18n.ts` |
| Blog articles | `src/content/blog/*.md` |
| FAQs on the home page | `src/data/faqs.ts` |
| Design tokens and styles | `src/styles/global.css` |
| Build intro | `src/scripts/build-intro.ts`, `src/styles/build-intro.css` |
| Redirects and security headers | `vercel.json` |

## Quality gates

| Gate | Stops |
|---|---|
| `src/lib/services.ts` | Thin pages, duplicate keywords, titles, H1s or FAQs |
| `scripts/seo-check.mjs` | Broken links, bad canonicals, missing metadata, invalid hreflang, fake rating schema |

Both fail the build, so problems never reach production.

## Honest content rules

Every public claim must be true. Concepts stay labelled as concepts. Planned courses stay `planned` and noindex. No invented clients, reviews, numbers, offices or payment buttons.

## Build intro

On the first visit in a tab, a labelled crew of cursors rebuilds the page. It runs after the real page has painted, so it does not delay LCP. It is skipped for reduced motion, deep links, save-data and crawlers, and is original code. Use `?intro=1` to force it and `?intro=off` to turn it off.

## Deploy

Push to `main` and Vercel deploys. Optional settings are listed in `.env.example`. Setup guides and the full audit are in `docs/seo/`, starting with `docs/seo/owner-actions.md`.

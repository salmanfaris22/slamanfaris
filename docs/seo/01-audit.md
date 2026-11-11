# Website audit (7 November 2026)

Audited the live site at https://www.salmanfaris.in/ and this repository before changing anything.

## Stack

| Item | Finding |
|---|---|
| Framework | Astro 7.4.5, static output. Kept. Migrating to Next.js or React gives no ranking gain |
| Hosting | Vercel, deployed from `salmanfaris22/slamanfaris` |
| Domain | `www` is preferred. Apex and http both 308 to `https://www` correctly |
| Search Console | Verification file `google6bb373d30fb673ff.html` is live |
| Analytics | None configured |
| Old JS | React, Framer Motion, GSAP, Lenis, Three.js, Tailwind |

## Critical problems found on the live site

| # | Problem | Evidence | Fix |
|---|---|---|---|
| 1 | **Canonicals point to the old host** | Live canonical is `salman-faris-studio.salman567633800.chatgpt.site` | Canonicals now use `www.salmanfaris.in`; the build fails if the old host appears |
| 2 | **Sitemap lists the old host** | All 6 `<loc>` values use `chatgpt.site` | Rebuilt with 60 real URLs |
| 3 | **robots.txt points to the old sitemap** | `Sitemap: https://salman-faris-studio...` | Fixed |
| 4 | **No structured data** | 0 JSON-LD blocks on the live home page | Person, WebSite and page types added site-wide |
| 5 | `/best-developer-in-kerala/` returns 404 | The page was never committed | Rebuilt and included |
| 6 | Only 6 URLs exist | No service, course, about, contact or blog pages | 73 pages built, 60 indexable |
| 7 | Security headers | Only HSTS | CSP, nosniff, frame, referrer and permissions headers in `vercel.json` |
| 8 | Duplicate URL risk | No trailing-slash rule | `trailingSlash: true` plus 36 permanent redirects |

## Brand positioning audit

| Issue | Decision |
|---|---|
| "Salman Faris" is shared by many people | Stable `@id`, `alternateName: Salman Faris K`, `sameAs` to verified profiles only |
| A separate person, Muhammed Salman Faris, ranks with a similar profile | Nothing from `muhammedsalmanfaris.in` was used |
| Hero spoke of a generic "creative" with no location | H1 now states role and Calicut |
| Hero photo was a Ronaldo image; portrait was a placeholder | Removed. Your portrait is still a stand-in (see owner-actions) |
| Portfolio had only concept projects | 10 real projects added from public repos and verified facts. Concepts stay labelled |

## Gaps closed

| Area | Before | After |
|---|---|---|
| Service pages | 0 | 14 + hub |
| Course pages | 0 | Catalogue + 6 course pages, honest status |
| Location pages | 0 | Kozhikode, Kerala, India/remote |
| Languages | English | English + Malayalam, Hindi, Tamil, Arabic with hreflang |
| Case studies | 5 concepts | 16 projects, real ones first |
| Blog | None | 6 articles, 5 categories |
| FAQ content | None | Visible FAQs on home, services, courses and locations |
| Conversion | Email link | Project and course enquiry forms, tracked CTAs, consent-gated analytics |

## Not built, and why

| Requested | Decision | Reason |
|---|---|---|
| `/services/google-ads`, `/services/meta-ads` | Not built | No campaign evidence. Tell me if you run ads |
| Separate After Effects, Premiere and DaVinci pages | Folded into video pages | Would be near-duplicates |
| `/locations/calicut` | Redirects to Kozhikode | Same city |
| `/experience` | Redirects to About | Needs your real work history |
| `/events`, `/training` | Redirect to Workshops and Courses | No real events yet |
| 60+ individual course pages | 6 pages | Mass-generated thin pages are banned by your own brief |
| `LocalBusiness` schema | Not used | No public business address confirmed |
| `llms.txt` | Not added | Your brief says no unnecessary AI files |

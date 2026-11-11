# Test report (7 November 2026)

All numbers below were measured. "After" ran on the local production build through `astro preview`, which has no CDN compression, so Vercel should be equal or faster. Re-run PageSpeed Insights on the live URL after deploy for real-user data.

## Lighthouse (mobile unless stated)

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT | Weight |
|---|---|---|---|---|---|---|---|---|
| **Before:** live home, mobile | 92 | 96 | 93 | 100 | 2.3 s | 0 | 10 ms | 275 KiB |
| **Before:** live home, desktop | 92 | 96 | 100 | 100 | 0.5 s | 0 | 170 ms | 451 KiB |
| **After:** home, mobile (3 runs) | 99 | 100 | 100 | 100 | 1.6 to 2.0 s | 0 | 0 ms | 142 KiB |
| **After:** home, desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms | 175 KiB |
| Full-stack service | 100 | 100 | 100 | 100 | 1.4 s | 0 | 0 ms | 85 KiB |
| Website development | 100 | 100 | 100 | 100 | 1.5 s | 0 | 0 ms | 85 KiB |
| AI web development | 100 | 100 | 100 | 100 | 1.5 s | 0 | 0 ms | 85 KiB |
| Video editor | 100 | 100 | 100 | 100 | 1.4 s | 0 | 0 ms | 85 KiB |
| Digital marketer | 100 | 100 | 100 | 100 | 1.4 s | 0 | 0 ms | 85 KiB |
| Courses hub | 100 | 100 | 100 | 100 | 1.4 s | 0 | 0 ms | 82 KiB |
| Contact | 100 | 100 | 100 | 100 | 1.5 s | 0 | 0 ms | 84 KiB |
| Arabic home | 100 | 100 | 100 | 100 | 1.2 s | 0 | 0 ms | 51 KiB |
| Malayalam courses | 100 | 100 | 100 | 100 | 1.4 s | 0 | 0 ms | 51 KiB |
| Blog article | 100 | 100 | 100 | 100 | 1.5 s | 0 | 0 ms | 83 KiB |

Lighthouse does not measure INP. Check it in Search Console and PageSpeed field data once traffic exists. Total Blocking Time of 0 ms is a good sign.

## Automated checks

| Check | Result |
|---|---|
| `astro build` | 73 pages |
| `astro check` | 0 errors, 0 warnings |
| `npm test` (Playwright) | 16 of 16 passed |
| `scripts/seo-check.mjs` | Passed, 1 warning (short description on a noindex page) |
| Pages indexable | 60, all in the sitemap |
| Unique titles and descriptions | Yes, enforced by the build |
| One H1 per page | Yes |
| Canonicals on `www.salmanfaris.in` | Yes |
| Internal links and anchors | No broken links |
| Orphan pages | None |
| hreflang | Reciprocal on all language pages |
| FAQ schema matches visible text | Yes |
| Forbidden schema (fake ratings, LocalBusiness) | None |
| Old `chatgpt.site` host | Gone, and the build fails if it returns |
| Schema.org validator (9 page types) | 0 errors, 0 warnings |
| External links | 25 of 26 returned 200. LinkedIn returned 999, its usual response to scripts |
| Console errors | None on tested routes |
| Mobile overflow | None |
| No JavaScript | All content, cards and layer panels readable |
| Reduced motion | Intro skipped, no pulse animation |
| Keyboard | Tabs, FAQ, skip link and Tab-to-skip intro work |

## Still to test on the live site

| Check | Needs |
|---|---|
| Redirects and security headers | Vercel deployment |
| Google Rich Results Test | Live URL |
| PageSpeed Insights field data | Live URL and traffic |
| Forms end to end | Your email app, or a form service |
| GA4, Clarity and event firing | Your IDs |

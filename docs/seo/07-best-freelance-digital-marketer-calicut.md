# Ranking plan: "best freelance digital marketer in Calicut"

Built 15 November 2026. Page: `/best-freelance-digital-marketer-in-calicut/`. Content: `src/data/marketer.ts`.

Search volumes are **not verified** (no keyword tool data). Speed numbers are single Lighthouse 12.8 mobile lab runs from a Mac, so treat them as indicative.

## Summary

| Item | Detail |
|---|---|
| Main keyword | best freelance digital marketer in Calicut |
| Also targeted | best digital marketer in Calicut / Kozhikode, freelance digital marketer in Calicut, digital marketer in Kozhikode, Google AI answer lists of "top freelance digital marketers in Calicut" |
| Angle | No official ranking exists, so the page shows checkable proof and gives visitors 10 checks to judge any marketer, with Salman's own answer to each |
| Honest framing | Title and H1 contain the exact phrase without claiming to be the best: "Best Freelance Digital Marketer in Calicut? See the Proof" and "The best freelance digital marketer in Calicut is the one who can prove it." |
| Domain age | salmanfaris.in registered 5 Nov 2026 (10 days old on launch) |
| Realistic timeline | Estimate only: indexing in days after submission, first impressions in 2 to 6 weeks, page 1 possible in 1 to 3 months **if** the owner actions below are done. Four ranking competitors have domains only 3 to 8 months old, so the keyword is winnable |

## Competitors (fetched 15 Nov 2026)

| Site | Domain created | Title has exact phrase | H1 | Words | FAQ schema | Mobile perf | Weight |
|---|---|---|---|---|---|---|---|
| dhilshadh.com (#1) | 2026-03 | Yes | Freelance digital marketer in Calicut | 1,487 | No | 85 | 1.4 MB |
| rinshaaa.in (#2) | 2025-11 | Yes | Not fetchable (broken TLS on their server) | | | | |
| dmirsha.com (#3; #1 for "best digital marketer in Calicut") | 2022-11 | "Best Digital Marketing Strategist" | Strategist in Calicut | 2,853 | Yes, 10 | 0 (no LCP, FCP 6.8 s) | 2.3 MB |
| sibilalmc.in | 2026-07 | No ("Freelance…") | None | 837 | No | | |
| aleenadigitalmarketer.com | 2025-07 | Yes | None | 1,881 | No | 52 (LCP 16.9 s) | 2.4 MB |
| sidharthbiju.com | 2026-07 | Yes | None | 736 | No | | |
| nandhanaofficial.in | 2026-07 | Yes | None ("Add Your Heading Text Here" ×3 left in) | 382 | No | | |
| **salmanfaris.in new page** | 2026-11 | Yes | Exact phrase | 2,895 | Yes, 13 | **100** (LCP 1.7 s) | **102 KB** |

Common to all competitors: WordPress + Elementor, 24 to 51 scripts, 150 to 330 KB of HTML, generic "What is digital marketing?" filler, a services list, certificates, and claims of "best" without evidence. Only dmirsha has FAQ schema. None has Service schema, a working proof meter or a tool.

The "best digital marketer in Calicut" results also show a **map pack** (Google Business Profiles with 17 to 68 reviews) and Justdial. The map pack is out of reach without a Google Business Profile and real reviews. Several of those profiles put "Best Digital Marketer in Calicut" inside the business name, which breaks Google's naming rules and risks suspension. Do not copy that.

## What was built

| Part | Detail |
|---|---|
| Hero | Exact-phrase H1, short answer for AI and featured snippets, 4 quick facts, live proof panel |
| Live proof meter | Measures how fast the page opened in the visitor's own browser (LCP) and the bytes loaded |
| Proof | Media 360 Concept, 30-reel Malayalam series, reelbot, and this website's own SEO setup |
| One person loop | Plan, build, create, promote, measure, all done in-house |
| 8 services | SEO, local SEO, social and reels, Google and Meta ads, websites, tracking, video, AI automation |
| 60-second marketing check | 10 questions, score out of 100, top 3 fixes, email the result. Nothing stored or sent unless the visitor chooses |
| 10 checks for choosing a marketer | Each with "My answer" the visitor can hold Salman to |
| First 30 days, Calicut market, freelancer vs agency vs DIY, pricing models | Useful content no competitor has |
| 13 FAQs | Visible on the page and in FAQPage schema |
| Proof slots | `credentials`, `clients`, `reviews` in `src/data/marketer.ts`. Empty sections stay hidden. The build stops if an entry has no public source link, date or recorded permission |
| Schema | WebPage, Service with OfferCatalog and areaServed (Kozhikode, Kerala, India), FAQPage, BreadcrumbList, Person. No ratings |
| Site changes | Service page re-aimed at "digital marketing services in Calicut" so the two pages do not compete; links from home, footer, services index, service page and two blog posts; Person schema adds "Freelance Digital Marketer"; `/llms.txt` for AI assistants |

## Measured results

| Check | Result |
|---|---|
| Lighthouse mobile | 100 / 100 / 100 / 100, LCP 1.7 s, CLS 0, TBT 0 ms, 102 KB, 11 requests |
| Lighthouse desktop | 100 / 100 / 100 / 100, LCP 0.4 s |
| JavaScript for the page | 1.6 KB gzipped |
| `npm run build` + SEO check | 74 pages, 59 indexable, 0 errors, 0 warnings |
| `astro check` | 0 errors |
| Playwright | 21 of 21 passed, including 3 new tests for this page (desktop, phone, no JavaScript) |
| Overflow at 390, 820, 1440 px | None |
| Keyword use | Exact phrase 4 times in visible text (rule: 3 to 7) |

## Owner actions, in order

| # | Action | Why |
|---|---|---|
| 1 | Merge the pull request so Vercel deploys | Nothing ranks until it is live |
| 2 | Search Console: URL Inspection on the new URL, then Request indexing. Resubmit the sitemap | Gets the page crawled in days instead of weeks |
| 3 | Run `node scripts/indexnow.mjs` after deploy | Bing, and the AI tools that use Bing, see it fast |
| 4 | Create a Google Business Profile as a service-area business (hide the address), category "Internet marketing service", name exactly "Salman Faris" | The map pack and Google's AI lists lean on profiles. Only if you meet clients in person |
| 5 | Ask 5 real clients for Google reviews | Map pack and AI answers quote ratings. Never buy or swap reviews |
| 6 | Send a real photo | Every competitor shows a real face. The illustration is honest but builds less trust |
| 7 | Add certifications with public links, real clients (with permission) and review links to `src/data/marketer.ts` | Each one switches on its section and closes the gap with dmirsha |
| 8 | Confirm you run Google or Meta ads for clients | The page lists ads as a service. If not, delete that card in `src/data/marketer.ts` |
| 9 | Add your WhatsApp number to `profile.whatsapp` | Adds a "Send on WhatsApp" button to the marketing check and WhatsApp links site-wide |
| 10 | Links to the new page: LinkedIn (Featured + website), Instagram bio, GitHub profile, a "Website by Salman Faris" footer credit on media360concept.com | Links are the main thing a 10-day-old domain lacks |
| 11 | Free listings with the same name, area and link: Justdial, Sulekha, Clutch, GoodFirms, LinkedIn services page | Justdial already ranks for these searches |
| 12 | Post one reel or LinkedIn post about the 10 checks and link the page | Real people visiting and sharing it |

## Monitor monthly

| Where | What |
|---|---|
| Search Console | Queries containing "digital marketer", position and clicks for the new URL |
| GA4 (after IDs are set) | `health_check_complete` events, `landing_view`, contact form submits |
| Google AI Mode, ChatGPT, Perplexity, Gemini | Ask "best freelance digital marketer in Calicut" and "top freelance digital marketers in Kozhikode". Log whether Salman is listed. Inclusion cannot be guaranteed |

## Do not

| Don't | Why |
|---|---|
| Put "Best Digital Marketer" in the Google Business Profile name | Against Google's rules, risks suspension |
| Buy reviews, followers or backlink packages | Spam policies, and it breaks the honesty the page is built on |
| Name competitors on the site | Not needed, and it invites disputes |
| Copy text from competitor sites | Duplicate content and copyright |
| Create near-identical pages for every town | Doorway pages. Add a place only with real work there |

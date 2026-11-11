# What only you can do

Everything else is built. These items need your accounts, your facts or your approval.

## Do first

| # | Action | Why |
|---|---|---|
| 1 | Review and merge the pull request | Fixes the live `chatgpt.site` canonical bug, which hurts indexing today |
| 2 | Send a real photo of yourself | The hero uses your manga GitHub avatar as a stand-in. Its source is unknown, and it is not in your `Person` schema. Send a photo and it can be cut out and graded |
| 3 | Send your WhatsApp number | The form, contact page and pills add WhatsApp automatically: `profile.whatsapp` in `src/data/portfolio.ts` |
| 4 | Confirm the AI Web Development course | Your poster says live online, 1 month, ₹40,000. The fee is hidden and the status says "Details being confirmed" until you confirm |
| 5 | Confirm AI Vibe Coding | Lessons exist, but format and availability need your word |
| 6 | After deploy, submit the sitemap in Search Console | See `05-analytics-and-search-setup.md` |

## Please read and approve

| Item | Where |
|---|---|
| 6 articles written in your voice | `src/content/blog/` |
| Malayalam, Hindi, Tamil and Arabic pages | `src/data/i18n.ts`. Please have native speakers check them |
| Proposed syllabi for 4 planned courses | `src/data/courses.ts`. These pages stay noindex |
| Showing Buddy and reelbot | Their source is private, so no repo link is shown for Buddy |
| Listing Media 360 Concept and the resort site as your work | Check you are happy to name them |
| Refund policy and Terms | Plain drafts. Have them reviewed |
| Skills lists | `src/data/about.ts`. Remove anything you would not defend in an interview |

## Questions only you can answer

| Question | What it unlocks |
|---|---|
| Do you run Google or Meta Ads? | Ads pages, ad keywords, a Marketing course |
| Do you teach at Media 360 Academy? | Instructor proof on course pages |
| Do you offer offline classes in Calicut? | Offline batches, stronger local course pages |
| Any work history, qualifications or years of experience? | Experience section on About |
| Any real client testimonials? | Testimonials on service pages |
| Real price ranges? | A cost article, stronger FAQ answers |
| Are concept projects staying? | Replace them with real edits as they become ready |
| Do you meet clients in person? | Google Business Profile eligibility |

## Accounts to connect

| Service | What is needed |
|---|---|
| GA4, GTM, Clarity, Meta Pixel, Bing | IDs in Vercel environment variables |
| Form service | Formspree or Web3Forms endpoint, for forms that send without an email app |
| Razorpay or Stripe | Payment links for courses |
| Google Business Profile | Only if eligible |

## After deploy

| Run | Does |
|---|---|
| `scripts/github-backlinks.sh` | Points repo websites to case study pages |
| `node scripts/indexnow.mjs` | Pings Bing and other IndexNow engines |
| Paste the bios in `04-backlinks-and-profiles.md` | LinkedIn, Instagram, GitHub README |

## Security heads-up

Your public `hms` repository has a committed `.env` file. Check it for real secrets, rotate any you find and remove it from Git history.

## A note on the design

The layout closely follows Sahir Veerancheri's public site saai.pro. His photo, words, CSS and JavaScript were not copied, and his unlicensed `swarm.js` engine was not used. The build intro here is original code. You are both in the Kerala tech scene, so people may recognise the look. Changing the accent colour or wordmark would set you apart if you ever want that.

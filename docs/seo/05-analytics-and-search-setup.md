# Analytics, search and payment setup

All tools are ready in the code. Each switches on when you add its ID in Vercel (Project Settings > Environment Variables), then redeploy. Tracking loads only after the visitor accepts the consent notice.

| Variable | Tool | Where to get it |
|---|---|---|
| `PUBLIC_GA4_ID` | Google Analytics 4 | Admin > Data streams, `G-XXXXXXX` |
| `PUBLIC_GTM_ID` | Google Tag Manager | Container ID, `GTM-XXXXXX` |
| `PUBLIC_CLARITY_ID` | Microsoft Clarity | Settings > Setup > Project ID |
| `PUBLIC_META_PIXEL_ID` | Meta Pixel | Events Manager |
| `PUBLIC_BING_VERIFICATION` | Bing Webmaster Tools | HTML meta tag content |
| `PUBLIC_FORM_ENDPOINT` | Form service | Formspree or Web3Forms URL |

Use GA4 directly or through GTM, not both, or events will count twice.

## Events

| Event | When | Use |
|---|---|---|
| `service_view` | Service page opens | Interest by service |
| `project_view` | Case study opens | Proof usage |
| `course_view` | Course page opens | Course interest |
| `contact_form_submit` | Project enquiry sent | **Mark as key event** |
| `course_enquiry` | Course enquiry sent | **Mark as key event** |
| `course_registration` | Return from checkout to `/enrolled/` | **Mark as key event** |
| `whatsapp_click` | WhatsApp link clicked | **Mark as key event** |
| `email_click`, `email_copy` | Email used | Contact intent |
| `cta_click` | Tracked button clicked | Button performance |
| `outbound_click` | External link clicked | Project link use |
| `payment_failed` | Return to `/payment-failed/` | Checkout problems |

No names, emails or messages are sent.

## Google Search Console

1. Verification already exists through `google6bb373d30fb673ff.html`. Keep this file.
2. After deploy, open Indexing > Sitemaps and submit `https://www.salmanfaris.in/sitemap.xml`.
3. Remove any old sitemap entry for the `chatgpt.site` host.
4. URL Inspection > Request indexing for `/`, `/about/`, `/services/`, `/courses/` and the six priority service pages.
5. If you also own the old `chatgpt.site` host, set it to redirect or deindex it.
6. Check Pages and Core Web Vitals weekly for the first month.

## Bing Webmaster Tools

1. Import from Search Console.
2. Submit the sitemap.
3. After each deploy run `node scripts/indexnow.mjs`.

## Google Business Profile

Google needs in-person contact with customers at your location or theirs. Check this first.

| Step | Note |
|---|---|
| Eligibility | Purely remote work may not qualify |
| Name | Your real business or personal name, no keywords |
| Category | Website designer, or Marketing agency if accurate |
| Address | Hide it and set a service area if you visit clients |
| Phone and site | Match the website exactly |
| Reviews | Ask real clients. Never script or buy them |

Never use a virtual office or fake location.

## Course payments

1. Create a Razorpay or Stripe Payment Link for the course. Razorpay suits India, and Stripe or another provider helps with international cards.
2. Set the link's success URL to `/enrolled/` and failure URL to `/payment-failed/`.
3. In `src/data/courses.ts`, set `registrationUrl`, `fee`, `batches` and `status: 'available'`.
4. The page then shows **Enrol now**, and Course schema is already on.

Card details are handled by the provider and never touch this site.

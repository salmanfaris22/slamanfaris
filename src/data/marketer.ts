// Content for /best-freelance-digital-marketer-in-calicut/. Every claim here must stay true and checkable.
// Proof slots (credentials, clients, reviews) render only when filled, and the build stops if an entry
// cannot be verified. Never add sample or invented entries.
import type { Faq } from './faqs';

export const MARKETER_PATH = '/best-freelance-digital-marketer-in-calicut/';
export const MARKETER_UPDATED = '2026-11-15';

/** The one main search phrase for the page. Also covers "best digital marketer in Calicut". */
export const MARKETER_KEYWORD = 'best freelance digital marketer in Calicut';

export interface Credential {
  name: string;
  issuer: string;
  /** Year earned, for example '2025'. */
  year: string;
  /** Public verification link from the issuer. Required. */
  url: string;
}

export interface Client {
  name: string;
  /** Live website or profile of the business. */
  url: string;
  work: string;
  /** Written permission to name the business, for example 'WhatsApp, 2026-11-20'. */
  permission: string;
}

export interface Review {
  quote: string;
  name: string;
  business: string;
  /** Link to the review on Google, LinkedIn or another public source. Required. */
  source: string;
  date: string;
}

// Fill these only with real, verifiable entries. Each one switches on its section.
export const credentials: Credential[] = [];
export const clients: Client[] = [];
export const reviews: Review[] = [];

(function gate() {
  const problems: string[] = [];
  const https = (value: string) => /^https:\/\/\S+\.\S+/.test(value);
  for (const c of credentials) if (!c.name || !c.issuer || !/^\d{4}$/.test(c.year) || !https(c.url)) problems.push(`credential "${c.name}" needs issuer, year and a public verification URL`);
  for (const c of clients) if (!c.name || !https(c.url) || c.permission.trim().length < 6) problems.push(`client "${c.name}" needs a live URL and a recorded permission`);
  for (const r of reviews) if (r.quote.length < 30 || !r.name || !r.business || !https(r.source) || !/^\d{4}-\d{2}-\d{2}$/.test(r.date)) problems.push(`review from "${r.name}" needs a public source link and a date`);
  if (problems.length) throw new Error(`Marketer page proof gate failed:\n- ${problems.join('\n- ')}`);
})();

export const heroFacts = [
  'Based in Kozhikode (Calicut)',
  'Marketer, developer and video editor',
  'Malayalam, English and Manglish content',
  'Written plan before any spend',
];

/** The loop one person runs end to end. */
export const loop = [
  { title: 'Plan', text: 'Audit, goals and a short list of actions ordered by likely impact on enquiries.' },
  { title: 'Build', text: 'Landing pages, speed fixes and the one-tap WhatsApp path, made directly in the code.' },
  { title: 'Create', text: 'Reels, posts, page copy and ad creatives, scripted and edited in-house.' },
  { title: 'Promote', text: 'SEO, Google Business Profile, social media and paid tests once the basics work.' },
  { title: 'Measure', text: 'Calls, WhatsApp clicks and forms tracked, then reported in plain language.' },
];

export const marketingServices = [
  { title: 'SEO', text: 'Rank for what your customers already search.', items: ['Technical fixes made in the code', 'One page for each service', 'Content that answers real questions'], href: '/services/seo-services/' },
  { title: 'Local SEO and Google Business Profile', text: 'Show up on Google Maps when people nearby search.', items: ['Profile setup, categories and services', 'Matching name, address and phone everywhere', 'A simple way to ask real customers for reviews'], href: '/services/local-seo/' },
  { title: 'Social media and reels', text: 'Instagram content people actually watch.', items: ['Content pillars and a calendar you can keep', 'Scripts and edits in Malayalam or English', 'Comment-to-WhatsApp enquiry flows'], href: '/services/social-media-marketing/' },
  { title: 'Google Ads and Meta ads', text: 'Paid reach, once the page and tracking are ready.', items: ['Landing page and tracking checked first', 'A small test budget before any scaling', 'Campaigns run in your own ad accounts'], href: '/contact/?service=Digital%20marketing#project' },
  { title: 'Websites and landing pages', text: 'Pages that turn visits into enquiries.', items: ['Fast on phones and mobile data', 'Clear message and one main action', 'Built for search from the first day'], href: '/services/website-development-calicut/' },
  { title: 'Tracking and reporting', text: 'Know which channel brought each enquiry.', items: ['Google Analytics 4, Search Console and Clarity', 'WhatsApp, call and form events', 'A monthly report in plain language'], href: '/services/digital-marketer-calicut/' },
  { title: 'Video for ads and brands', text: 'Edits, promos and motion graphics that hold attention.', items: ['Reels, promos and course videos', 'Colour grading and clean sound', 'Captions locked to every word'], href: '/services/video-editor-calicut/' },
  { title: 'AI content and automation', text: 'Do more with the same small team.', items: ['Content pipelines with a human check', 'Automated reports and reminders', 'Clear limits and running costs'], href: '/services/ai-agent-automation/' },
];

export interface HealthQuestion { id: string; q: string; weight: number; fix: string; href: string; }

/** The 60-second marketing check. Weights add up to 100. */
export const healthQuestions: HealthQuestion[] = [
  { id: 'gbp', weight: 12, q: 'Does your business have a Google Business Profile with correct hours, photos and services?', fix: 'Complete your Google Business Profile: categories, services, hours and real photos. It is often the first thing a nearby customer sees.', href: '/services/local-seo/' },
  { id: 'reviews', weight: 10, q: 'Have customers left you Google reviews in the last three months?', fix: 'Ask every happy customer for an honest Google review and send the direct link on WhatsApp. Never buy reviews.', href: '/services/local-seo/' },
  { id: 'speed', weight: 12, q: 'Does your website open in under three seconds on mobile data?', fix: 'Speed up your website. Test it on PageSpeed Insights, then compress images and remove heavy sliders and plugins.', href: '/services/website-development-calicut/' },
  { id: 'whatsapp', weight: 8, q: 'Can a customer message you on WhatsApp in one tap from your website and Instagram?', fix: 'Add a one-tap WhatsApp button to your website and Instagram bio, with a message already filled in.', href: '/services/website-development-calicut/' },
  { id: 'tracking', weight: 14, q: 'Do you know how many enquiries came from Google, Instagram and ads last month?', fix: 'Track calls, WhatsApp clicks and form enquiries, so every channel is judged on enquiries instead of likes.', href: '/services/digital-marketer-calicut/' },
  { id: 'analytics', weight: 8, q: 'Are Google Analytics 4 and Search Console set up, and checked every month?', fix: 'Connect Google Analytics 4 and Search Console, and review both once a month.', href: '/services/seo-services/' },
  { id: 'pages', weight: 10, q: 'Does each main service or product you sell have its own page on your website?', fix: 'Give each main service its own page that answers one search, such as a service name plus Kozhikode.', href: '/services/seo-services/' },
  { id: 'rhythm', weight: 10, q: 'Do you post useful content at least twice a week, every week?', fix: 'Pick a posting rhythm you can keep, such as two reels and one post a week, and batch-produce them.', href: '/services/social-media-marketing/' },
  { id: 'video', weight: 8, q: 'Do you use short videos in Malayalam or English to show what you sell?', fix: 'Start short videos: product demos, answers to customer questions and behind the scenes, in the language your customers use.', href: '/services/video-editor-calicut/' },
  { id: 'value', weight: 8, q: 'Before spending on ads, do you know what one enquiry is worth to you?', fix: 'Work out what an enquiry is worth before running ads, so you can set a budget and judge results fairly.', href: '/services/digital-marketer-calicut/' },
];

export const scoreBands = [
  { min: 80, label: 'Strong base', text: 'The basics are in place. Your next step is scaling what already brings enquiries.' },
  { min: 50, label: 'Good start, clear gaps', text: 'Some foundations are missing. Fix the items below before spending more on promotion.' },
  { min: 0, label: 'Leaking enquiries', text: 'People who want what you sell are slipping away. Start with the fixes below.' },
];

/** The 10 checks for choosing a marketer, each with an answer the visitor can hold me to. */
export const checks = [
  { title: 'Live work you can click', check: 'Ask for links to real websites, profiles and campaigns, not only screenshots.', mine: 'The Media 360 Concept website is live, and every project on this site links to the real thing or is labelled a concept.' },
  { title: 'Their own website is fast', check: 'Run their site through PageSpeed Insights. If a marketer’s own site is slow, yours may be too.', mine: 'This page is plain, pre-rendered HTML with a few kilobytes of JavaScript. The live meter at the top shows how fast it opened for you.' },
  { title: 'A written plan for month one', check: 'A good marketer can explain the first 30 days before you pay anything.', mine: 'You get a written audit and a prioritised plan before any spend.' },
  { title: 'Reports on enquiries, not likes', check: 'Followers and impressions are easy to inflate. Ask how calls, WhatsApp messages and forms will be counted.', mine: 'Tracking is set up first, and every report leads with enquiries.' },
  { title: 'No guaranteed rankings', check: 'Nobody controls Google. A promise of page one in 30 days is a warning sign.', mine: 'No guarantees. You get clear work, honest reports and quick changes.' },
  { title: 'You own every account', check: 'Your domain, website, ad accounts, Google profile and analytics should be in your name.', mine: 'Everything is set up in your name, and my access can be removed at any time.' },
  { title: 'They can make the content', check: 'Plans fail when nobody produces the reels, pages and ads on time.', mine: 'I write, edit and build in-house, including Malayalam reels.' },
  { title: 'They know the local market', check: 'In Calicut, buying runs through WhatsApp, Instagram, Google Maps and word of mouth.', mine: 'I live and work in Kozhikode and plan around how people here buy.' },
  { title: 'Reviews you can verify', check: 'Read reviews on Google itself, not only quotes on a website.', mine: 'Every claim on this site is true and checkable. There are no invented reviews, ratings or client counts.' },
  { title: 'Price and scope in writing', check: 'Get the scope, the fee and the ad budget in writing, as separate items.', mine: 'A written quote for the exact scope before work starts. Ad budgets stay separate from fees.' },
];

export const firstMonth = [
  { week: 'Week 1', title: 'Audit and tracking', text: 'I review your website, Google profile, social accounts and competitors, then set up tracking for calls, WhatsApp clicks and forms.' },
  { week: 'Week 2', title: 'Fix the foundations', text: 'Speed, page messages, your Google Business Profile and the WhatsApp path get fixed before any promotion.' },
  { week: 'Week 3', title: 'Create and launch', text: 'A content calendar, the first reels and posts, and a small ad test if the numbers support one.' },
  { week: 'Week 4', title: 'Report and plan', text: 'A plain-language report on what brought enquiries and what did not, with the plan for next month.' },
];

export const localPoints = [
  { title: 'WhatsApp is the shop counter', text: 'Most local enquiries end in a WhatsApp chat, so every ad, post and page should lead to one in a single tap.' },
  { title: 'Malayalam and Manglish content', text: 'Customers trust content in the language they speak. Captions, reels and pages can be in Malayalam script, Manglish or English.' },
  { title: 'Google Maps decides “near me”', text: 'For shops, clinics, restaurants and institutes, the Google Business Profile matters as much as the website.' },
  { title: 'The Gulf connection', text: 'Malabar has strong family and business ties with the GCC, so some campaigns should reach people in the Gulf, on Gulf time.' },
  { title: 'A festival calendar', text: 'Onam, Vishu, Ramadan and Eid, Christmas and the wedding season shape demand, so content and offers are planned around them.' },
];

export const compareRows = [
  { label: 'Who does the work', freelancer: 'One accountable person', agency: 'A team: strategist, designer, ad specialist', diy: 'You and your staff' },
  { label: 'Monthly cost', freelancer: 'Usually lower than an agency', agency: 'Higher retainers', diy: 'Your time instead of fees' },
  { label: 'Speed of changes', freelancer: 'Same or next day', agency: 'Slower, with more handoffs', diy: 'Depends on your time' },
  { label: 'Best for', freelancer: 'Small and growing businesses with a focused goal', agency: 'Large budgets across many channels at once', diy: 'Very early businesses testing an idea' },
  { label: 'Watch out for', freelancer: 'Limited capacity, so ask how many clients they handle', agency: 'Your account may be run by a junior', diy: 'Spending on ads without tracking' },
];

export const priceModels = [
  { title: 'One-time audit', text: 'Website, Google profile, social accounts and tracking, with a prioritised list of fixes.' },
  { title: 'Monthly retainer', text: 'A fixed scope every month, such as SEO, content and reporting.' },
  { title: 'Project', text: 'A website or landing page, plus the launch and tracking setup.' },
  { title: 'Ad management', text: 'A management fee, kept separate from the ad budget you pay Google or Meta directly.' },
];

export const marketerFaqs: Faq[] = [
  { q: 'Who is the best freelance digital marketer in Calicut?', a: 'There is no official ranking, and most “best” titles online are written by the marketers themselves. Compare live work, measured results, written plans and real Google reviews. Salman Faris is a freelance digital marketer in Calicut who also builds websites and edits video, and every claim on his site can be checked.' },
  { q: 'How do I find the best digital marketer in Calicut for my business?', a: 'Shortlist two or three people whose live work you like, run the 10 checks on this page, and ask each one for a written plan for the first month. Choose the one who explains clearly, admits limits and measures enquiries.' },
  { q: 'Is a freelancer or an agency better for a small business in Calicut?', a: 'For a small business with a focused goal, a freelancer usually gives closer attention and faster changes at a lower monthly cost. An agency suits bigger budgets that need several specialists at once. Either way, ask who will actually do your work.' },
  { q: 'How much does a freelance digital marketer cost in Kozhikode?', a: 'It depends on the scope: an audit, a monthly retainer, a website project or ad management. Ad budgets are separate and should be paid to Google or Meta from your own account. You get a written quote for the exact scope before any work starts.' },
  { q: 'How long does digital marketing take to show results?', a: 'Tracking, profile fixes and ads can show signals within weeks. SEO usually takes several months, and new websites take longer. Anyone who promises a fixed ranking date is guessing.' },
  { q: 'When should a small business start Google or Meta ads?', a: 'After the foundations: tracking, a fast landing page and a clear offer. Start with a small test in an ad account in your own name, and scale only when the cost per enquiry makes sense. Ads sent to a slow page with no tracking mostly waste money.' },
  { q: 'Can you make marketing content in Malayalam?', a: 'Yes. Reels, captions and pages can be made in Malayalam, English or Manglish, depending on how your customers talk. Salman’s own 30-part reel series on AI and tech was made in Malayalam.' },
  { q: 'Do you work with businesses outside Calicut?', a: 'Yes. Work runs by call, WhatsApp, email and shared previews, so a business in Malappuram, Kochi, Bengaluru or the GCC can work with him the same way as one in Calicut.' },
  { q: 'Do you guarantee first-page rankings or followers?', a: 'No. Nobody controls Google rankings or Instagram reach. What you can expect is clear work, honest reports and quick changes when something is not working.' },
  { q: 'What do you need from me to start?', a: 'Your website address, links to your social and Google profiles, the services you most want to sell and the areas you serve. Access to analytics and ad accounts comes later, in your name.' },
  { q: 'Who owns the website, ad accounts and Google profile?', a: 'You do. Domains, websites, ad accounts, analytics and your Google Business Profile are set up in your name, and outside access can be removed at any time.' },
  { q: 'Do you also build websites and edit videos?', a: 'Yes. Salman is a full-stack developer and video editor as well as a digital marketer, so landing pages, fixes and reels do not wait for another freelancer.' },
  { q: 'How do I get started?', a: 'Take the 60-second marketing check on this page, then send the result or a short note about your business by email or through the contact page. You will get questions back first, then a written plan.' },
];

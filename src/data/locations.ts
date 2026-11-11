// Place pages. Each must say something true and specific about working in that place.
// Do not add a place by swapping the name: add it only with real work or a real audience there.
import type { Faq } from './faqs';

export interface Place {
  slug: string;
  keyword: string;
  seoTitle: string;
  description: string;
  h1: string;
  tag: string;
  answer: string;
  paragraphs: { heading: string; text: string }[];
  services: string[];
  projects: string[];
  faqs: Faq[];
  areas?: string[];
}

export const places: Place[] = [
  {
    slug: 'kozhikode', keyword: 'freelancer in Kozhikode',
    seoTitle: 'Developer and Creative Freelancer in Kozhikode | Salman Faris',
    description: 'Salman Faris is a freelance developer, video editor and digital marketer based in Kozhikode (Calicut), Kerala. See how he works with local businesses.',
    h1: 'Developer and Creative Freelancer in Kozhikode',
    tag: 'KOZHIKODE (CALICUT)',
    answer: 'Salman Faris is a freelancer based in Kozhikode, also known as Calicut, in Kerala. He builds websites and applications, edits video and handles SEO for local businesses and remote clients. Media 360 Concept, a Kozhikode agency at HiLITE Business Park, is one of the live websites he has built.',
    paragraphs: [
      { heading: 'Working with Calicut businesses', text: 'Kozhikode has a strong base of small businesses, restaurants, traders, institutions and a growing tech community around the Cyberpark. Most of them need the same few things online: a clear website, a presence on Google and content that shows what they do.' },
      { heading: 'Why both Calicut and Kozhikode matter', text: 'People search using both names, and some customers use only one. Good local pages use both naturally, which is why your site, Google profile and social accounts should agree on your details.' },
      { heading: 'How local work runs', text: 'Work runs by call, WhatsApp, email and shared previews. That keeps projects moving and leaves a clear record of what was agreed.' },
    ],
    services: ['full-stack-development', 'website-development-calicut', 'video-editor-calicut', 'digital-marketer-calicut', 'seo-services', 'social-media-marketing'],
    projects: ['media-360-concept'],
    faqs: [
      { q: 'Are Calicut and Kozhikode the same place?', a: 'Yes. Kozhikode is the official name of the city and district, and Calicut is the older English name. Both are in common use.' },
      { q: 'How can I hire a freelance developer in Kozhikode?', a: 'Check their live work, ask for a written scope and quote, and agree who owns the code and domain. You can send your requirements through the contact page.' },
    ],
  },
  {
    slug: 'kerala', keyword: 'developer and digital marketer in Kerala',
    seoTitle: 'Freelance Web, Video and SEO Work in Kerala | Salman Faris',
    description: 'Freelance web development, video editing and SEO for businesses across Kerala, from Salman Faris in Calicut. Malayalam-friendly and built around WhatsApp.',
    h1: 'Freelance Web, Video and SEO Work in Kerala',
    tag: 'KERALA',
    answer: 'Salman Faris works with businesses across Kerala from his base in Calicut, covering websites, applications, video and search. Projects include a 33-page travel website for Wayanad with a Malayalam version, and a 30-part Malayalam reel series. Everything runs remotely, so distance in Kerala does not limit the work.',
    paragraphs: [
      { heading: 'Built for how Kerala does business', text: 'Customers here often start on Instagram, move to WhatsApp and decide after a conversation. A website for this market needs a fast mobile page and an obvious way to start that chat. Enquiry paths are planned around that.' },
      { heading: 'Malayalam, English and Manglish', text: 'Many customers read English and search in Malayalam or Manglish. Malayalam pages and captions are added where they help, and Malayalam text needs careful handling in both web fonts and video.' },
      { heading: 'Districts served', text: 'Clients in Kozhikode, Malappuram, Wayanad, Kannur, Thrissur, Kochi and Thiruvananthapuram work the same way, by call and shared previews. A page for a specific district is only added when there is real work to show there.' },
    ],
    services: ['website-development-calicut', 'react-nextjs-development', 'ai-web-development', 'ai-agent-automation', 'local-seo', 'motion-graphics'],
    projects: ['reel-series'],
    areas: ['Kozhikode', 'Malappuram', 'Wayanad', 'Kannur', 'Thrissur', 'Kochi', 'Thiruvananthapuram'],
    faqs: [
      { q: 'Do you work with businesses outside Calicut?', a: 'Yes. Most work is remote, so clients across Kerala work the same way as clients in Calicut.' },
      { q: 'Can my website have a Malayalam version?', a: 'Yes. A Malayalam version can be added with proper language tags so search engines show the right version to the right person.' },
    ],
  },
  {
    slug: 'india', keyword: 'remote freelance developer India',
    seoTitle: 'Remote Freelance Developer in India | Salman Faris',
    description: 'Hire Salman Faris remotely from India for full-stack, AI, video and SEO work. How remote projects run, time zones, communication and handover.',
    h1: 'Remote Freelance Developer in India',
    tag: 'REMOTE AND INTERNATIONAL',
    answer: 'Salman Faris is a remote freelance developer in India, working from Kerala on India Standard Time (UTC+5:30). He takes on full-stack, AI, video and SEO work for clients in India and abroad. Projects run through written briefs, shared previews and Git, so time zones rarely slow things down.',
    paragraphs: [
      { heading: 'How remote projects run', text: 'Each project starts with a written brief and an agreed scope. Work is shared through preview links and pull requests, so you can check progress at any time without waiting for a meeting.' },
      { heading: 'Time zones', text: 'India Standard Time overlaps with the morning in Europe and the working day in the Gulf. For the United States, handovers happen at the start and end of the day, and calls can be scheduled around that.' },
      { heading: 'What suits remote work well', text: 'Websites, web applications, automation, SEO and video editing all work well remotely, because files, code and previews travel easily. Source code stays in your repository and accounts stay in your name.' },
    ],
    services: ['full-stack-development', 'react-nextjs-development', 'ai-web-development', 'ai-agent-automation', 'video-editor-calicut', 'seo-services'],
    projects: ['nexgo', 'lectern'],
    faqs: [
      { q: 'Do you work with international clients?', a: 'Yes, where the work can be done remotely. Payment terms and currency are agreed in the proposal.' },
      { q: 'What language do you work in?', a: 'Client work is in English. Malayalam is available for content and video.' },
    ],
  },
];

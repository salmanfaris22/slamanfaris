import type { Faq } from '../faqs';

export interface Item { title: string; text: string; }

export interface Service {
  /** URL becomes /services/<slug>/ */
  slug: string;
  group: 'Development' | 'AI' | 'Creative' | 'Marketing';
  /** Short name for cards and links. */
  name: string;
  /** The one main search phrase for this page. No other page may use it. */
  keyword: string;
  secondary: string[];
  seoTitle: string;
  description: string;
  h1: string;
  tag: string;
  /** Direct answer near the top of the page, 40 to 60 words. */
  answer: string;
  audience: string;
  intro: string[];
  problems: Item[];
  offers: Item[];
  tools: string[];
  /** Project ids from portfolio.ts. Evidence for the claims on this page. */
  proof: string[];
  process: Item[];
  deliverables: string[];
  local: string;
  faqs: Faq[];
  /** Slugs of related services. */
  related: string[];
  cta: { label: string; title: string; text: string };
  updated: string;
}

export const SERVICE_AREAS = ['Kozhikode', 'Kerala', 'India'];

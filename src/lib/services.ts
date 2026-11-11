// All service pages, checked at build time. A thin or duplicate page stops the build instead of going live.
import { projects } from '../data/portfolio';
import { aiServices } from '../data/services/ai';
import { creativeServices } from '../data/services/creative';
import { developmentServices } from '../data/services/development';
import { marketingServices } from '../data/services/marketing';
import type { Service } from '../data/services/types';

export const services: Service[] = [...developmentServices, ...aiServices, ...creativeServices, ...marketingServices];

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

export function serviceWordCount(s: Service) {
  const blocks = [s.answer, s.audience, ...s.intro, s.local, ...s.deliverables,
    ...s.problems.flatMap((i) => [i.title, i.text]), ...s.offers.flatMap((i) => [i.title, i.text]),
    ...s.process.flatMap((i) => [i.title, i.text]), ...s.faqs.flatMap((i) => [i.q, i.a])];
  return words(blocks.join(' '));
}

function gate(list: Service[]) {
  const problems: string[] = [];
  const seen = { keyword: new Map<string, string>(), seoTitle: new Map<string, string>(), description: new Map<string, string>(), h1: new Map<string, string>(), faq: new Map<string, string>() };
  const projectIds = new Set(projects.map((p) => p.id));
  const slugs = new Set(list.map((s) => s.slug));

  for (const s of list) {
    const fail = (message: string) => problems.push(`${s.slug}: ${message}`);
    if (s.seoTitle.length > 62) fail(`seoTitle is ${s.seoTitle.length} characters (max 62)`);
    if (s.description.length < 110 || s.description.length > 170) fail(`description is ${s.description.length} characters (110 to 170)`);
    const answerWords = words(s.answer);
    if (answerWords < 35 || answerWords > 65) fail(`answer is ${answerWords} words (35 to 65)`);
    if (serviceWordCount(s) < 350) fail(`only ${serviceWordCount(s)} words (min 350)`);
    if (s.faqs.length < 3) fail('needs at least 3 FAQs');
    // A single relevant project is sufficient; never retain removed work to fill a quota.
    if (s.proof.length < 1) fail('needs at least 1 proof project');
    if (s.related.length < 2) fail('needs at least 2 related services');
    if (!s.h1.toLowerCase().includes(s.keyword.toLowerCase().split(' in ')[0].slice(0, 12))) fail('main keyword is missing from the H1');
    for (const id of s.proof) if (!projectIds.has(id)) fail(`unknown project ${id}`);
    for (const slug of s.related) if (!slugs.has(slug)) fail(`unknown related service ${slug}`);
    for (const key of ['keyword', 'seoTitle', 'description', 'h1'] as const) {
      const other = seen[key].get(s[key]);
      if (other) fail(`${key} duplicates ${other}`);
      seen[key].set(s[key], s.slug);
    }
    for (const faq of s.faqs) {
      const other = seen.faq.get(faq.q);
      if (other) fail(`FAQ "${faq.q}" duplicates ${other}`);
      seen.faq.set(faq.q, s.slug);
    }
  }
  if (problems.length) throw new Error(`Service quality gate failed:\n- ${problems.join('\n- ')}`);
}

gate(services);

export const serviceBySlug = (slug: string) => {
  const found = services.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown service: ${slug}`);
  return found;
};

export const serviceGroups = (['Development', 'AI', 'Creative', 'Marketing'] as const).map((group) => ({ group, items: services.filter((s) => s.group === group) }));

const link = (s: Service) => ({ label: s.name, href: `/services/${s.slug}/` });

export const footerGroups = [
  { title: 'Development', links: [...developmentServices, ...aiServices].map(link) },
  { title: 'Creative', links: creativeServices.map(link) },
  { title: 'Marketing', links: marketingServices.map(link) },
];

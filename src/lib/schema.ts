// JSON-LD builders. Stable @id values connect every page back to one Person and one WebSite.
import { profile, SITE_URL } from '../data/portfolio';

const home = `${SITE_URL}/`;
export const PERSON_ID = `${home}#person`;
export const WEBSITE_ID = `${home}#website`;

export const absolute = (path: string) => new URL(path, home).href;

export const personNode = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: profile.name,
  alternateName: profile.alternateName,
  url: home,
  email: `mailto:${profile.email}`,
  jobTitle: ['Full Stack Developer', 'AI Web Developer', 'Video Editor', 'Motion Designer', 'Digital Marketer'],
  description: `${profile.name} is a full-stack developer, AI web developer, video editor and motion designer based in ${profile.city} (${profile.cityLocal}), ${profile.region}, ${profile.country}.`,
  knowsAbout: ['Web development', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'AI automation', 'Search engine optimization', 'Digital marketing', 'Video editing', 'Motion graphics', 'Color grading', 'UI/UX design'],
  address: { '@type': 'PostalAddress', addressLocality: profile.cityLocal, addressRegion: profile.region, addressCountry: 'IN' },
  sameAs: [profile.github, profile.linkedin, profile.instagram, profile.leetcode, profile.behance].filter(Boolean),
});

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: profile.name,
  url: home,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
});

export interface Crumb { name: string; path: string; }

export const breadcrumbNode = (path: string, crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  '@id': `${absolute(path)}#breadcrumb`,
  itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: absolute(crumb.path) })),
});

export const faqNode = (path: string, faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  '@id': `${absolute(path)}#faq`,
  mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
});

export const webPageNode = (path: string, title: string, description: string, extra: Record<string, unknown> = {}, type = 'WebPage') => ({
  '@type': type,
  '@id': `${absolute(path)}#webpage`,
  url: absolute(path),
  name: title,
  description,
  inLanguage: 'en',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': PERSON_ID },
  ...extra,
});

export const serviceNode = (path: string, name: string, description: string, areas: string[]) => ({
  '@type': 'Service',
  '@id': `${absolute(path)}#service`,
  name,
  description,
  url: absolute(path),
  provider: { '@id': PERSON_ID },
  areaServed: areas.map((area) => ({ '@type': 'AdministrativeArea', name: area })),
});

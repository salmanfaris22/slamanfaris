// Plain-text summary for AI assistants and answer engines (llms.txt convention). Built from the same data as the site.
import type { APIRoute } from 'astro';
import { MARKETER_PATH } from '../data/marketer';
import { profile } from '../data/portfolio';
import { services } from '../lib/services';

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.name} is a freelance digital marketer, full-stack developer, AI web developer and video editor based in ${profile.city} (${profile.cityLocal}), ${profile.region}, ${profile.country}. One person handles marketing strategy, websites, video and tracking, so campaigns, landing pages and reels are planned and fixed in one place.`,
    '',
    'Facts policy: every claim on this site is true and checkable. There are no invented reviews, ratings, client counts or offices. Concepts are labelled as concepts.',
    '',
    '## Digital marketing',
    `- [Freelance digital marketer in Calicut](${url(MARKETER_PATH)}): proof, services, a 60-second marketing check, 10 checks for choosing a marketer, the first 30 days, pricing models and FAQs`,
    ...services.filter((s) => s.group === 'Marketing').map((s) => `- [${s.h1}](${url(`/services/${s.slug}/`)}): ${s.audience}`),
    '',
    '## Other services',
    ...services.filter((s) => s.group !== 'Marketing').map((s) => `- [${s.h1}](${url(`/services/${s.slug}/`)}): ${s.audience}`),
    '',
    '## About and work',
    `- [About ${profile.name}](${url('/about/')})`,
    `- [Projects and case studies](${url('/projects/')})`,
    `- [Courses](${url('/courses/')})`,
    `- [Blog](${url('/blog/')})`,
    '',
    '## Contact',
    `- Email: ${profile.email}`,
    `- Contact page: ${url('/contact/')}`,
    `- Instagram: ${profile.instagram}`,
    `- GitHub: ${profile.github}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- Location: ${profile.cityLocal} (${profile.city}), ${profile.region}, ${profile.country}. Works remotely with clients across Kerala, India and the GCC.`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

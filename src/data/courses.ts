// Course records. Nothing here is advertised as available until its status says so.
//   available: open now, facts confirmed by Salman
//   upcoming:  a real batch or release is scheduled
//   confirm:   evidence exists (poster, recorded lessons), details still need confirmation
//   planned:   proposed only
import type { Faq } from './faqs';

export type CourseStatus = 'available' | 'upcoming' | 'confirm' | 'planned';

export const statusLabel: Record<CourseStatus, string> = {
  available: 'Open for enrolment',
  upcoming: 'Upcoming batch',
  confirm: 'Details being confirmed',
  planned: 'Planned',
};

export interface CourseModule { title: string; topics: string[]; }

export interface Course {
  slug: string;
  title: string;
  category: string;
  status: CourseStatus;
  short: string;
  description: string;
  forWho: string[];
  outcomes: string[];
  journey: string[];
  modules: CourseModule[];
  projects: string[];
  tools: string[];
  prerequisites: string[];
  /** Leave undefined until confirmed. Undefined values are never shown. */
  duration?: string;
  deliveryModes: string[];
  /** Leave undefined until confirmed. */
  fee?: string;
  batches?: string;
  registrationUrl?: string;
  thumbnail?: string;
  level?: string;
  faqs: Faq[];
  relatedServices: string[];
  updated: string;
}

const defaultJourney = ['Foundations', 'Tools and technology', 'Practical development', 'Real-world projects', 'Portfolio', 'Final project'];

export const courses: Course[] = [
  {
    slug: 'ai-reel-automation', title: 'AI Reel Automation', category: 'Video Editing', status: 'planned',
    short: 'Turn an idea into a reel: scripts, voice, captions and a repeatable video workflow.',
    description: 'A proposed practical course on creating reels with AI-assisted scripts, voice and code-driven video. Build a reusable workflow, review every output and export a finished vertical video.',
    forWho: ['Creators building a repeatable reel workflow', 'Editors exploring AI and automation'],
    outcomes: ['Plan a short video', 'Create and review AI-assisted scripts and voice', 'Build reusable Remotion scenes', 'Check captions, sound and final exports'],
    journey: ['Idea', 'Script', 'Voice', 'Scenes', 'Review', 'Export'],
    modules: [
      { title: 'Script and storyboard', topics: ['Hooks and pacing', 'Reviewing AI output'] },
      { title: 'Voice and captions', topics: ['Voice workflow', 'Word timing and readability'] },
      { title: 'Build the reel', topics: ['Remotion templates', 'Reusable scenes and motion'] },
      { title: 'Review and deliver', topics: ['Human review before publishing', 'Vertical export and quality checks'] },
    ],
    projects: ['A finished vertical reel', 'A reusable reel template'], tools: ['AI tools', 'Remotion', 'FFmpeg'],
    prerequisites: ['A laptop', 'Basic video editing familiarity'], deliveryModes: ['Recorded video lessons (planned)'],
    faqs: [{ q: 'Will the workflow publish without review?', a: 'The proposed workflow includes a human review step for scripts, visuals, captions and the final export.' }],
    relatedServices: ['ai-video-editing', 'ai-agent-automation'], updated: '2026-11-11',
  },
  {
    slug: 'design-with-figma', title: 'Design with Figma', category: 'Design', status: 'planned',
    short: 'Design clear, responsive interfaces and turn your idea into a clickable prototype.',
    description: 'A proposed project-led introduction to interface design, from layout and typography to reusable components and a working prototype.',
    forWho: ['Beginner designers', 'Developers improving their interfaces'],
    outcomes: ['Build a consistent layout', 'Create reusable components', 'Present a clickable prototype'],
    journey: ['Brief', 'Layout', 'Type', 'Components', 'Prototype', 'Review'],
    modules: [{ title: 'Visual foundations', topics: ['Layout and spacing', 'Type and colour'] }, { title: 'Build and prototype', topics: ['Components', 'Responsive screens', 'Prototype review'] }],
    projects: ['A responsive landing page prototype'], tools: ['Figma'], prerequisites: ['Basic computer use'], deliveryModes: [],
    faqs: [{ q: 'Is this course open?', a: 'This course is planned. Register your interest for the confirmed syllabus and release details.' }],
    relatedServices: ['ui-ux-design'], updated: '2026-11-11',
  },

  {
    slug: 'ai-web-development', title: 'AI Web Development', category: 'AI Development', status: 'confirm',
    short: 'Build modern websites and web apps with AI, using real projects and live classes.',
    description: 'A practical course on building websites and web applications with AI tools as part of the workflow. You learn the web foundations AI cannot replace, then use AI to design, write and debug real projects for your portfolio.',
    forWho: ['Beginners who want to build real websites', 'Students who want a portfolio before applying for work', 'Freelancers adding AI tools to how they build', 'Business owners who want to understand what they are paying for'],
    outcomes: ['Build and deploy a responsive website', 'Build a web app with React, Next.js and a database', 'Use AI tools to plan, write, review and debug code', 'Know when AI output is wrong, and how to check it', 'Finish with portfolio projects you can show and explain'],
    journey: defaultJourney,
    modules: [
      { title: 'How the web works', topics: ['Browsers, servers and domains', 'HTML and CSS you can read', 'JavaScript essentials'] },
      { title: 'Working with AI tools', topics: ['Writing clear prompts for code', 'Reviewing and testing what AI writes', 'Keeping control of your project'] },
      { title: 'Interfaces with React and Tailwind CSS', topics: ['Components and state', 'Responsive layouts', 'Reusable design patterns'] },
      { title: 'Full applications with Next.js and Node.js', topics: ['Routing and rendering', 'APIs', 'Authentication basics'] },
      { title: 'Databases', topics: ['Designing data', 'Connecting a database', 'Forms and validation'] },
      { title: 'Launch', topics: ['Deploying to the web', 'Search and speed basics', 'Presenting your final project'] },
    ],
    projects: ['A personal portfolio website', 'A business website with an enquiry form', 'A web app with login and a database', 'A final project of your own choice'],
    tools: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Databases', 'AI tools'],
    prerequisites: ['Basic computer use', 'A laptop and a reliable internet connection', 'No coding experience needed'],
    duration: '1 month',
    deliveryModes: ['Live online classes'],
    faqs: [
      { q: 'Which AI web development course should a beginner choose?', a: 'Pick one that teaches web foundations alongside AI tools and has you finish real projects. Without the foundations, you cannot tell when AI output is wrong.' },
      { q: 'Do I need to know coding first?', a: 'No. The course starts with how the web works. You do need to be comfortable using a computer and willing to practise.' },
      { q: 'Are online and offline learning options available?', a: 'This course is planned as live online classes. Ask through the enquiry form for current batch details.' },
      { q: 'What are the fees and batch dates?', a: 'These are confirmed directly. Send an enquiry and you will get the current fee and next batch.' },
    ],
    relatedServices: ['ai-web-development', 'full-stack-development'], updated: '2026-11-07',
  },
  {
    slug: 'ai-vibe-coding', title: 'AI Vibe Coding', category: 'AI Development', status: 'confirm',
    short: 'Go from an idea to a deployed website by directing AI tools, in Malayalam and English.',
    description: 'Vibe coding means building software by describing what you want to an AI and guiding the result. This course shows how to do it properly, with short lessons that take you from a blank chat to a live website.',
    forWho: ['Complete beginners curious about building with AI', 'Creators who want their own website', 'Malayalam speakers who prefer learning in their own language'],
    outcomes: ['Describe what you want clearly to an AI assistant', 'Build and improve a portfolio website with AI', 'Deploy a site to a live URL', 'Understand the limits of AI-written code'],
    journey: ['Foundations', 'Talking to AI', 'Your first site', 'Improving it', 'Going live', 'Your own project'],
    modules: [
      { title: 'What vibe coding is', topics: ['What AI can and cannot do', 'Setting up your tools'] },
      { title: 'Build and deploy a portfolio', topics: ['Describing a page', 'Improving it in steps', 'Publishing it online'] },
      { title: 'Working like a builder', topics: ['Fixing things when they break', 'Reading code you did not write', 'Keeping your work safe'] },
    ],
    projects: ['A personal portfolio published online', 'A small site for an idea of your own'],
    tools: ['Claude', 'ChatGPT', 'Chrome', 'Vercel'],
    prerequisites: ['Basic computer use', 'No coding experience needed'],
    deliveryModes: ['Recorded video lessons'],
    faqs: [
      { q: 'What is vibe coding?', a: 'Vibe coding is building software by describing what you want to an AI and steering the result through conversation, rather than writing every line yourself. It is fast, but you still have to check the work.' },
      { q: 'Is vibe coding enough to become a developer?', a: 'It is a good start and a useful skill, but professional work also needs the fundamentals. The AI Web Development course goes further.' },
    ],
    relatedServices: ['ai-web-development', 'website-development-calicut'], updated: '2026-11-07',
  },
  {
    slug: 'full-stack-development', title: 'Full-Stack Development', category: 'Software Development', status: 'planned',
    short: 'A proposed path from JavaScript to a deployed full-stack application.',
    description: 'A proposed course covering the frontend, backend and database skills needed to build complete applications, taught through one growing project.',
    forWho: ['Beginners who want a software career', 'Frontend developers moving to full-stack work'],
    outcomes: ['Build interfaces in React', 'Write APIs in Node.js', 'Design a database', 'Deploy a complete application'],
    journey: defaultJourney,
    modules: [
      { title: 'JavaScript and TypeScript', topics: ['Core language', 'Types'] },
      { title: 'React', topics: ['Components', 'State and data fetching'] },
      { title: 'Backend', topics: ['APIs', 'Authentication'] },
      { title: 'Databases', topics: ['SQL and MongoDB', 'Data modelling'] },
      { title: 'Deployment', topics: ['Hosting', 'Environment setup'] },
    ],
    projects: ['A full-stack application with roles and a dashboard'],
    tools: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'PostgreSQL'],
    prerequisites: ['Comfort with a computer', 'Basic HTML helps'],
    deliveryModes: [],
    faqs: [{ q: 'What will students build in a full-stack course?', a: 'The proposed course centres on one application with login, roles, a dashboard and a database, deployed to a live URL by the end.' }],
    relatedServices: ['full-stack-development'], updated: '2026-11-07',
  },
  {
    slug: 'golang-development', title: 'Golang Development', category: 'Software Development', status: 'planned',
    short: 'A proposed course on building fast backend services in Go.',
    description: 'A proposed course for developers who want to write backend services in Go, taught by someone who has published a Go web framework and built business systems with Go and PostgreSQL.',
    forWho: ['JavaScript developers moving to the backend', 'Students who want to learn a systems-friendly language'],
    outcomes: ['Write idiomatic Go', 'Build a REST API', 'Work with PostgreSQL using typed queries', 'Handle concurrency safely'],
    journey: defaultJourney,
    modules: [
      { title: 'Go fundamentals', topics: ['Types and structs', 'Errors', 'Modules'] },
      { title: 'Concurrency', topics: ['Goroutines', 'Channels'] },
      { title: 'Web services', topics: ['HTTP and routing', 'Middleware', 'Authentication'] },
      { title: 'Data', topics: ['PostgreSQL', 'sqlc', 'Migrations'] },
      { title: 'Shipping', topics: ['Testing', 'Docker', 'Deployment'] },
    ],
    projects: ['A REST API with PostgreSQL', 'A small file-routed web server'],
    tools: ['Go', 'PostgreSQL', 'sqlc', 'Docker'],
    prerequisites: ['Basic programming in any language'],
    deliveryModes: [],
    faqs: [{ q: 'Why learn Go for the backend?', a: 'Go compiles to a single binary, handles concurrent work well and has a small language to learn, which makes it a practical choice for APIs and services.' }],
    relatedServices: ['full-stack-development'], updated: '2026-11-07',
  },
  {
    slug: 'digital-marketing-and-seo', title: 'Digital Marketing and SEO', category: 'Digital Marketing', status: 'planned',
    short: 'A proposed practical course on search, content and measurement.',
    description: 'A proposed course covering the search and marketing work that brings real enquiries, taught through working on a live website.',
    forWho: ['Small business owners', 'Students entering digital marketing', 'Developers who want to understand SEO'],
    outcomes: ['Run a technical SEO audit', 'Map keywords to pages', 'Set up Search Console and analytics', 'Plan content people search for'],
    journey: defaultJourney,
    modules: [
      { title: 'How search works', topics: ['Crawling and indexing', 'Search intent'] },
      { title: 'Technical SEO', topics: ['Canonicals and sitemaps', 'Speed', 'Structured data'] },
      { title: 'Local SEO', topics: ['Google Business Profile', 'Local content'] },
      { title: 'Content and social media', topics: ['Content plans', 'Short-form video'] },
      { title: 'Measurement', topics: ['Analytics', 'Reporting on enquiries'] },
    ],
    projects: ['A full SEO audit of a real website', 'A keyword map and content plan'],
    tools: ['Google Search Console', 'Google Analytics 4', 'Lighthouse'],
    prerequisites: ['Basic computer use'],
    deliveryModes: [],
    faqs: [{ q: 'Is SEO still worth learning with AI search?', a: 'Yes. AI answers still draw on websites that are clear, crawlable and trusted, so the fundamentals of SEO carry over.' }],
    relatedServices: ['seo-services', 'digital-marketer-calicut'], updated: '2026-11-07',
  },
  {
    slug: 'professional-video-editing', title: 'Professional Video Editing', category: 'Video Editing', status: 'planned',
    short: 'A proposed course from first cut to finished, graded video.',
    description: 'A proposed course on the craft of editing, colour and sound, using Premiere Pro, After Effects and DaVinci Resolve on real footage.',
    forWho: ['Aspiring editors', 'Creators who edit their own videos'],
    outcomes: ['Structure and pace a video', 'Grade footage in DaVinci Resolve', 'Build titles and motion in After Effects', 'Export correctly for each platform'],
    journey: defaultJourney,
    modules: [
      { title: 'Editing fundamentals', topics: ['Story and pacing', 'Cutting in Premiere Pro'] },
      { title: 'Motion', topics: ['After Effects basics', 'Titles and captions'] },
      { title: 'Colour', topics: ['Correction', 'Looks in DaVinci Resolve'] },
      { title: 'Sound', topics: ['Dialogue', 'Music and loudness'] },
      { title: 'Delivery', topics: ['Export settings', 'Working with clients'] },
    ],
    projects: ['A vertical reel', 'A short promotional video', 'A graded short film'],
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    prerequisites: ['A computer that can run editing software'],
    deliveryModes: [],
    faqs: [{ q: 'Which software should a beginner learn first?', a: 'Learn one editor well first. Premiere Pro is a common start, and DaVinci Resolve has a capable free version. The editing skills carry over.' }],
    relatedServices: ['video-editor-calicut', 'motion-graphics'], updated: '2026-11-07',
  },
];

/** The proposed catalogue. Titles with a matching course record link to it. All others are planned topics. */
export const catalogue: { category: string; titles: { title: string; slug?: string }[] }[] = [
  { category: 'AI Development', titles: [{ title: 'AI Web Development', slug: 'ai-web-development' }, { title: 'AI Vibe Coding', slug: 'ai-vibe-coding' }, { title: 'AI Forward Deployed Engineer' }, { title: 'Generative AI Development' }, { title: 'AI Agent Development' }, { title: 'AI Workflow Automation' }, { title: 'Claude AI and Development Workflows' }, { title: 'ChatGPT and AI Productivity' }, { title: 'AI Application Development' }] },
  { category: 'Software Development', titles: [{ title: 'Full-Stack Development', slug: 'full-stack-development' }, { title: 'MERN Stack Development' }, { title: 'React.js Development' }, { title: 'Next.js Development' }, { title: 'Backend Development' }, { title: 'Golang Development', slug: 'golang-development' }, { title: 'Python Development' }, { title: 'API Development' }, { title: 'Database Development' }, { title: 'Deployment and DevOps Fundamentals' }] },
  { category: 'Data and Artificial Intelligence', titles: [{ title: 'AI and Machine Learning' }, { title: 'Data Science Fundamentals' }, { title: 'LLM Application Development' }, { title: 'Prompt Engineering' }] },
  { category: 'Creative Design', titles: [{ title: 'UI/UX Design' }, { title: 'Figma' }, { title: 'Website Design' }, { title: 'Creative Web Design' }, { title: 'Digital Design Fundamentals' }] },
  { category: 'Digital Marketing', titles: [{ title: 'Digital Marketing and SEO', slug: 'digital-marketing-and-seo' }, { title: 'Local SEO' }, { title: 'Technical SEO' }, { title: 'Social Media Marketing' }, { title: 'Google Ads' }, { title: 'Meta Ads' }, { title: 'Content Marketing' }, { title: 'Analytics and Reporting' }, { title: 'AI-Powered Digital Marketing' }] },
  { category: 'Video Editing', titles: [{ title: 'Professional Video Editing', slug: 'professional-video-editing' }, { title: 'Adobe After Effects' }, { title: 'Adobe Premiere Pro' }, { title: 'DaVinci Resolve' }, { title: 'AI Video Editing' }, { title: 'Motion Graphics' }, { title: 'Cinematic Editing' }, { title: 'Social Media Video Production' }, { title: 'AI-Assisted Creative Workflows' }] },
];

export const courseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
/** Planned pages stay out of search until the syllabus is approved. */
export const isIndexable = (course: Course) => course.status !== 'planned';

// Site-wide facts. Every claim on the site comes from this folder, so keep it true.
export const profile = {
  name: 'Salman Faris',
  alternateName: 'Salman Faris K',
  email: 'salmanfariskalm@gmail.com',
  github: 'https://github.com/salmanfaris22',
  instagram: 'https://www.instagram.com/salmanfaris.dev/',
  instagramHandle: '@salmanfaris.dev',
  city: 'Calicut',
  cityLocal: 'Kozhikode',
  region: 'Kerala',
  country: 'India',
  linkedin: 'https://www.linkedin.com/in/salman-faris-50b664272',
  leetcode: 'https://leetcode.com/u/salman567633800',
  // Fill these with confirmed values. Each one switches on its link when set.
  behance: '',
  // WhatsApp number in international format without + or spaces, for example 91XXXXXXXXXX.
  whatsapp: '',
};

export const SITE_URL = 'https://www.salmanfaris.in';
export const SITE_UPDATED = '2026-11-07';

export type Category = 'All work' | 'Film & motion' | 'Development' | 'Experiments';
export type ProjectStatus = 'built' | 'concept';

export interface Project {
  id: string;
  title: string;
  category: Exclude<Category, 'All work'>;
  discipline: string;
  /** Short label shown on cards: the build type for real work, CONCEPT 0n for concepts. */
  year: string;
  status: ProjectStatus;
  /** Who it was for, in plain words. */
  client: string;
  image?: string;
  imageAlt?: string;
  color: string;
  description: string;
  tools: string[];
  /** The goal of the project. */
  objective?: string;
  challenge: string;
  approach: string;
  /** How it was built, step by step. */
  process?: string[];
  /** Only things that were actually measured or verified. */
  results?: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Slugs of the service pages this work supports. */
  services: string[];
  updated: string;
}

export const projects: Project[] = [
  {
    id: 'lectern', title: 'Lectern', category: 'Development', discipline: 'NATIVE APP · C++ · VIDEO', year: 'NATIVE APP', status: 'built',
    client: 'Own product (working title)', color: '#ef4444',
    description: 'A native screen recorder and non-linear editor for teachers and course creators, built on a C++23 engine.',
    tools: ['C++23', 'Qt 6 Quick', 'FFmpeg', 'Objective-C++', 'CMake', 'GoogleTest'],
    objective: 'Give teachers a recorder and editor where the layout can change after recording, without re-recording anything.',
    challenge: 'Most screen recordings flatten the screen, camera and voice into one picture. Moving the camera or changing the layout later usually means recording again.',
    approach: 'Screen, cameras, microphone and system audio are recorded as separate, synchronized tracks. A Qt-free C++23 engine owns capture, timeline and rendering, and one compositor and one audio mixer serve both preview and export, so what you see and hear is what you export.',
    process: [
      'Wrote the architecture first: recording engine, timeline engine, rendering pipeline and project format each have their own document.',
      'Built crash-safe recording with automatic recovery and a command-line recorder, lectern-rec.',
      'Added the editing engine: split, trim, ripple delete, layouts by section, undo and redo, markers.',
      'Added the compositor, real-time playback, creator tools (text, subtitles, overlays, effects, colour, audio mix) and MP4 export.',
    ],
    results: ['155 unit and integration tests in the repository', 'Recording, editing and MP4 export verified on macOS', 'Windows backends written and compile-checked, not yet run on Windows'],
    repoUrl: 'https://github.com/salmanfaris22/video-editing-software',
    services: ['full-stack-development', 'video-editor-calicut'], updated: '2026-11-07',
  },
  {
    id: 'nexgo', title: 'NexGo', category: 'Development', discipline: 'GO · OPEN SOURCE FRAMEWORK', year: 'OPEN SOURCE', status: 'built',
    client: 'Open-source project', color: '#ef4444',
    description: 'A Go-powered web framework inspired by Next.js: file-based routing, server-side rendering, hot reload and API routes in a single binary.',
    tools: ['Go', 'Server-side rendering', 'File-based routing', 'Hot reload'],
    objective: 'Bring the Next.js developer experience to Go, with no Node.js or npm in the deployment.',
    challenge: 'Developers who like Go for its speed and simple deployment still reach for a Node.js stack when they want file-based routing and server rendering.',
    approach: 'NexGo gives Go projects file-based routing, server-side rendering, API routes and hot reload, and compiles the result to a single binary with zero runtime dependencies.',
    process: [
      'Designed the routing convention around the file system, the way Next.js does.',
      'Implemented server rendering, API routes and hot reload using Go alone.',
      'Published the module under the MIT license, with a documentation site.',
    ],
    results: ['Published at version 1.0.5 under the MIT license', 'Installable with go install', 'Documentation site live at nexgo-doc.vercel.app'],
    liveUrl: 'https://nexgo-doc.vercel.app', repoUrl: 'https://github.com/salmanfaris22/nexgo',
    image: '/images/projects/nexgo.webp', imageAlt: 'NexGo documentation site home page',
    services: ['full-stack-development', 'react-nextjs-development'], updated: '2026-11-07',
  },
  {
    id: 'mybuddy', title: 'MyBuddy', category: 'Development', discipline: 'SWIFT · KOTLIN · GO', year: 'MOBILE + DESKTOP', status: 'built',
    client: 'Own product', color: '#ef4444',
    description: 'Control and look after a Mac from an Android phone, privately, over an end-to-end encrypted channel.',
    tools: ['Swift 6', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'WebRTC', 'Go', 'PostgreSQL'],
    objective: 'Let someone check on and control their Mac from a phone while keeping the Mac in charge of every action.',
    challenge: 'Remote-control tools ask for a lot of trust. The Mac has to stay the authority, and AI keys and private data should never leave it.',
    approach: 'The phone pairs using a QR code plus a matching 6-digit code. Every command is checked on the Mac against capabilities the user granted, and screen video travels over WebRTC using hardware H.264.',
    process: [
      'Wrote the design, security and protocol documents and a shared protocol with test vectors.',
      'Built pairing, resume after restart and re-pairing between the Android app and the Swift host.',
      'Added screen streaming, remote control, file transfer and clipboard.',
      'Added an optional Go service that only introduces the phone to the Mac.',
    ],
    results: ['Pairing, streaming, remote control and file transfer verified between the Mac host and the Android emulator', 'Testing on a physical phone is still to come'],
    repoUrl: 'https://github.com/salmanfaris22/mybuddy',
    services: ['full-stack-development', 'ai-agent-automation'], updated: '2026-11-07',
  },
  {
    id: 'reel-series', title: '30-Day AI Reel Series', category: 'Film & motion', discipline: 'MOTION · REMOTION · 3D', year: 'REEL SERIES', status: 'built',
    client: 'Own Instagram channel', color: '#ef4444',
    description: '30 Malayalam explainer reels on AI and tech, built with a data-driven motion engine, 3D titles and word-synced captions.',
    tools: ['Remotion', 'three.js', 'ElevenLabs', 'Whisper', 'FFmpeg', 'After Effects'],
    objective: 'Turn long voice recordings into a month of short explainers without losing quality or variety.',
    challenge: 'Editing 30 reels by hand takes weeks, and reels made from one template all start to look the same.',
    approach: 'A voice file is cut by topic, each reel is described in a small data file, and one Remotion engine renders it with 3D titles, a talking mascot with lip-sync and captions locked to the words. Six font packs rotate so the series keeps changing.',
    process: [
      'Found the topic cuts in two long voice takes and split one voice file per reel.',
      'Described each reel in data: topic, scenes, marks and comment keyword.',
      'Rendered, trimmed, added soft music and checked sync on every reel.',
    ],
    results: ['30 reels finished, each 30 to 41 seconds', 'Topics include private AI, Redis, MCP, RAG, Docker and multi-agent systems'],
    repoUrl: 'https://github.com/salmanfaris22/intgome',
    services: ['motion-graphics', 'ai-video-editing', 'social-media-marketing'], updated: '2026-11-07',
  },
  {
    id: 'media-360-concept', title: 'Media 360 Concept', category: 'Development', discipline: 'ASTRO · AGENCY WEBSITE · CALICUT', year: 'LIVE WEBSITE', status: 'built',
    client: 'Media 360 Concept, Calicut', color: '#ef4444',
    description: 'A static, SEO-first website for a Calicut digital agency and AI academy, with service pages and no framework JavaScript.',
    tools: ['Astro', 'TypeScript', 'Tailwind CSS', 'JSON-LD', 'Vercel'],
    objective: 'Give a Calicut agency a site that search engines and AI crawlers can read in full.',
    challenge: 'An agency site has many services to explain, and pages that depend on JavaScript can hide that content from crawlers.',
    approach: 'Every page is pre-rendered HTML with no framework JavaScript. Each service page holds one primary keyword, and titles, metadata, canonicals, JSON-LD, the sitemap and links are checked automatically.',
    process: [
      'Organised branding, marketing, web, software and local pages around one primary keyword each.',
      'Wrote one page template with shared schema and head metadata.',
      'Added automatic checks on the built site before each release.',
    ],
    results: ['Static HTML on every page', 'Automated SEO checks run on the built site'],
    liveUrl: 'https://www.media360concept.com', repoUrl: 'https://github.com/salmanfaris22/360-landingpage',
    image: '/images/projects/media-360-concept.webp', imageAlt: 'Media 360 Concept website home page',
    services: ['website-development-calicut', 'digital-marketer-calicut'], updated: '2026-11-07',
  },
  {
    id: 'hms', title: 'HMS Clinic Management', category: 'Development', discipline: 'GO · REACT · HEALTHCARE', year: 'WEB APP', status: 'built',
    client: 'Clinic management system', color: '#ef4444',
    description: 'A clinic management system with a Go and PostgreSQL backend and a React and TypeScript frontend.',
    tools: ['Go', 'sqlc', 'PostgreSQL', 'Docker', 'React', 'TypeScript', 'Tailwind CSS'],
    objective: 'Run clinic operations from one web application.',
    challenge: 'Clinic data needs dependable queries and a clear structure as modules grow.',
    approach: 'The backend uses sqlc for typed SQL on PostgreSQL with a modular internal structure. The frontend follows a feature-sliced layout in React and TypeScript.',
    process: ['Structured the Go backend into core, infrastructure, interface and module layers.', 'Added PostgreSQL migrations and typed queries with sqlc.', 'Built the React frontend in a feature-sliced layout.'],
    repoUrl: 'https://github.com/salmanfaris22/hms',
    services: ['full-stack-development', 'react-nextjs-development'], updated: '2026-11-07',
  },
  {
    id: 'buddy', title: 'Buddy', category: 'Experiments', discipline: 'RUST · AI TOOLING · DESKTOP', year: 'DESKTOP APP', status: 'built',
    client: 'Own product (private repository)', color: '#ef4444',
    description: 'A desktop launcher that runs any AI from one place: Claude Code, Codex, OpenCode or local models, with history saved for every task.',
    tools: ['Rust', 'egui', 'Ollama', 'launchd', 'Claude Code', 'OpenRouter'],
    objective: 'Stop losing context when work moves between AI tools, and send each task to the right model.',
    challenge: 'Every AI tool keeps its own history. Moving between them loses context, and sending small questions to the largest model wastes money.',
    approach: 'One app starts every AI. Smart Auto reads the task and picks the model: small questions go to a local model, code changes and big builds go to stronger ones. Each task keeps its own history file, so any AI can continue it.',
    process: ['Started as a terminal menu, then rebuilt in Rust as a native desktop app with embedded terminals.', 'Added Smart Auto routing rules for model and effort.', 'Added per-task history that any AI can read and continue.', 'Added scheduled automations through launchd.'],
    results: ['Runs daily on macOS as the owner’s own AI workspace', 'Unit, terminal and headless UI tests in the repository'],
    services: ['ai-agent-automation', 'ai-web-development'], updated: '2026-11-07',
  },
  {
    id: 'reelbot', title: 'reelbot', category: 'Experiments', discipline: 'AI PIPELINE · REMOTION', year: 'AI PIPELINE', status: 'built',
    client: 'Own Instagram channel', color: '#ef4444',
    description: 'A pipeline that turns one prompt into a finished 30 to 45 second reel: AI script, AI voice, Remotion video and a scheduled post.',
    tools: ['Claude', 'ElevenLabs', 'Remotion', 'Node.js', 'Buffer'],
    objective: 'Publish a daily developer tip without spending the day editing.',
    challenge: 'Daily short-form video takes writing, voice, editing and posting every single day, and that is hard to keep up alongside client work.',
    approach: 'Claude writes the script and picks a post time, ElevenLabs reads it, Remotion renders a 1080 by 1920 video, a quality check runs, and Buffer schedules the post. A draft mode saves the video for review instead of posting.',
    process: ['Wrote the script and voice steps.', 'Built the Remotion video template.', 'Added quality checks and a draft mode.', 'Connected scheduling through Buffer and made the pipeline cloud-ready.'],
    results: ['End-to-end test reel produced on 3 November 2026'],
    repoUrl: 'https://github.com/salmanfaris22/reelbot-media',
    services: ['ai-agent-automation', 'ai-video-editing', 'social-media-marketing'], updated: '2026-11-07',
  },
  {
    id: 'atelier-monolith', title: 'Atelier Monolith', category: 'Development', discipline: 'NEXT.JS · E-COMMERCE DEMO', year: 'DEMO STORE', status: 'concept',
    client: 'Demo storefront for a fictional brand', color: '#ef4444',
    description: 'A working Next.js storefront for a fictional leather brand, with search, filters, cart, gift options and one-tap WhatsApp ordering.',
    tools: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4'],
    objective: 'Show how a premium small brand can sell online and close orders over WhatsApp.',
    challenge: 'Small brands in Kerala often take orders on WhatsApp, and a catalogue site still has to feel complete without a heavy checkout.',
    approach: 'A real catalogue with search, filters, sorting and pagination. The cart persists in the browser and the order goes to WhatsApp in one tap.',
    process: ['Built the catalogue, filters and product pages from one data file.', 'Added the cart drawer and browser persistence.', 'Added gift options and a WhatsApp checkout summary.'],
    repoUrl: 'https://github.com/salmanfaris22/salmanfarisk',
    services: ['ecommerce-development', 'react-nextjs-development'], updated: '2026-11-07',
  },
  {
    id: 'after-hours', title: 'After Hours', category: 'Film & motion', discipline: 'CINEMATIC EDIT · COLOR STUDY', year: 'CONCEPT 01', status: 'concept',
    client: 'Self-initiated concept', image: '/images/after-hours.svg', imageAlt: 'After Hours illustrative concept artwork', color: '#95b5ad',
    description: 'An exploration of the quiet moments between light and darkness. A cinematic concept told through atmosphere, rhythm, and restraint.',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'Sound design'],
    challenge: 'How do you tell a story without a single word? This self-initiated concept explores the emotional language of a late-night journey.',
    approach: 'A restrained visual palette, deliberate cuts, and room for silence. This cover is an illustrative placeholder for a future film and color-grading case study.',
    services: ['video-editor-calicut'], updated: '2026-11-05',
  },
  {
    id: 'kinetic-type', title: 'Motion, in every frame.', category: 'Film & motion', discipline: 'MOTION DESIGN · TYPE EXPERIMENT', year: 'CONCEPT 02', status: 'concept',
    client: 'Self-initiated concept', image: '/images/kinetic-type.svg', imageAlt: 'Motion, in every frame illustrative concept artwork', color: '#ff2d2d',
    description: 'Typography that refuses to sit still. A playful study of rhythm, scale, and the space between words.',
    tools: ['After Effects', 'Figma', 'Typography'],
    challenge: 'Give a simple phrase a physical presence, using only type, space, and movement.',
    approach: 'Oversized letterforms and a sharp lime-and-black palette form a flexible visual system. Illustrative concept artwork; finished motion footage can be added here.',
    services: ['motion-graphics'], updated: '2026-11-05',
  },
  {
    id: 'orbit', title: 'Orbit', category: 'Development', discipline: 'FULL-STACK · PRODUCT DESIGN', year: 'CONCEPT 03', status: 'concept',
    client: 'Self-initiated concept', image: '/images/orbit.svg', imageAlt: 'Orbit illustrative concept artwork', color: '#b8a5ff',
    description: 'A calmer workspace for ambitious ideas. A dashboard concept that brings clarity to complex information.',
    tools: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
    challenge: 'Make a data-rich workspace feel intuitive without removing its depth.',
    approach: 'A modular interface balances useful context with focused actions. This is a visual product concept, not a shipped application or client engagement.',
    services: ['ui-ux-design'], updated: '2026-11-05',
  },
  {
    id: 'form-study', title: 'Studies in form', category: 'Experiments', discipline: '3D · CREATIVE CODING', year: 'CONCEPT 04', status: 'concept',
    client: 'Self-initiated concept', image: '/images/form-study.svg', imageAlt: 'Studies in form illustrative concept artwork', color: '#d1c9ef',
    description: 'An ongoing conversation between code and sculpture. Simple geometry, unexpected possibilities.',
    tools: ['Three.js', 'WebGL', 'GSAP'],
    challenge: 'Explore how a digital object can feel tactile through light, material, and movement.',
    approach: 'Procedural forms meet carefully composed lighting to explore how far a digital object can go.',
    services: ['motion-graphics'], updated: '2026-11-07',
  },
  {
    id: 'frame-studio', title: 'Frame Studio', category: 'Development', discipline: 'CREATIVE DEVELOPMENT · WEB DESIGN', year: 'CONCEPT 05', status: 'concept',
    client: 'Self-initiated concept', image: '/images/frame-studio.svg', imageAlt: 'Frame Studio illustrative concept artwork', color: '#ded3bd',
    description: 'An architectural approach to the web. A minimal editorial concept where space becomes the story.',
    tools: ['Astro', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    challenge: 'Create a digital home for visual work that gives each image space to breathe.',
    approach: 'A typographic grid, architectural geometry, and measured motion establish the concept. All branding and imagery shown are illustrative placeholders.',
    services: ['ui-ux-design'], updated: '2026-11-05',
  },
];

export const projectById = (id: string) => {
  const found = projects.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown project id: ${id}`);
  return found;
};

/** Cards shown in the home page matrix, in order. Flagship projects sit in their own section. */
export const matrixIds = ['media-360-concept', 'hms', 'buddy', 'reelbot', 'atelier-monolith', 'after-hours', 'kinetic-type', 'orbit', 'form-study', 'frame-studio'];

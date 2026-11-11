// Home page content. Project facts live in portfolio.ts, answers in faqs.ts.

export const heroCards = [
  { index: '01.', tag: 'CODE', title: 'Code & AI', text: 'Full-stack apps in React, Next.js, Node.js and Go, with AI features and automation built in.', href: '/services/full-stack-development/' },
  { index: '02.', tag: 'MOTION', title: 'Video & motion', text: 'Edits, colour grades and motion graphics in After Effects, Premiere Pro and DaVinci Resolve.', href: '/services/video-editor-calicut/' },
  { index: '03.', tag: 'GROWTH', title: 'SEO & marketing', text: 'Technical SEO, local search and social content that bring the right people to your site.', href: '/services/digital-marketer-calicut/' },
];

export const heroTags = ['React', 'Next.js', 'TypeScript', 'Go', 'After Effects', 'DaVinci Resolve'];

export const heroStats = [
  { value: '90+', label: 'Public repos' },
  { value: '30', label: 'Reel series' },
  { value: '03', label: 'Disciplines' },
];

export const principles = [
  { title: 'Story first', text: 'Every good project starts with a better question. What should someone feel, understand, or do?' },
  { title: 'Motion with meaning', text: 'Giving ideas rhythm, character, and a life beyond the still frame.' },
  { title: 'Built to feel different', text: 'Beautiful on the outside. Thoughtful underneath.' },
];

export const serviceCards = [
  { chip: 'Development', title: 'Full-stack web development', text: 'Websites, dashboards and APIs built with React, Next.js, Node.js and Go, from database to interface.', tags: ['React', 'Next.js', 'Go'], href: '/services/full-stack-development/' },
  { chip: 'AI', title: 'AI websites and automation', text: 'AI features inside your site, and workflows that take repetitive work off your team.', tags: ['AI integration', 'Automation'], href: '/services/ai-web-development/' },
  { chip: 'Marketing', title: 'Digital marketing', text: 'A plan that connects your website, your content and your enquiries, built by the person who builds the site.', tags: ['Strategy', 'Content'], href: '/services/digital-marketer-calicut/' },
  { chip: 'Search', title: 'SEO and local search', text: 'Technical SEO, structured data and pages written for what people in Calicut and Kerala actually search.', tags: ['Technical SEO', 'Local SEO'], href: '/services/seo-services/' },
  { chip: 'Video', title: 'Video editing', text: 'Reels, promos and long-form edits with colour grading and sound, ready for each platform.', tags: ['Premiere Pro', 'DaVinci Resolve'], href: '/services/video-editor-calicut/' },
  { chip: 'Creative', title: 'Motion graphics and UI/UX', text: 'Titles, logo reveals and explainers in After Effects, and interfaces designed in Figma.', tags: ['After Effects', 'Figma'], href: '/services/motion-graphics/' },
];

export const lecternLayers = [
  { tab: 'L1: Capture', badge: 'LAYER 01 // CAPTURE', title: 'Separate, synchronized tracks', text: 'Screen, cameras, microphone and system audio are recorded as separate tracks, so a layout can change after recording without recording again.', tags: ['Multi-track', 'Zero-copy on macOS'] },
  { tab: 'L2: Encode', badge: 'LAYER 02 // ENCODE', title: 'Hardware encoding with a fallback', text: 'Video runs through FFmpeg libraries, with no command-line spawning. Hardware encoders do the work, and software encoding takes over when they are not available.', tags: ['FFmpeg libraries', 'Hardware encoders'] },
  { tab: 'L3: Recovery', badge: 'LAYER 03 // SAFETY', title: 'Crash-safe recording', text: 'Recording is written to survive a crash, with automatic recovery. The lectern-rec tool can salvage interrupted recordings from the command line.', tags: ['Crash-safe', 'lectern-rec'] },
  { tab: 'L4: Timeline', badge: 'LAYER 04 // EDIT', title: 'A non-destructive editing engine', text: 'Split, trim, ripple delete, remove pauses, set layouts by section, undo and redo. Originals are never modified: editing only changes project data.', tags: ['Non-destructive', 'Undo and redo'] },
  { tab: 'L5: Compositor', badge: 'LAYER 05 // RENDER', title: 'One compositor for preview and export', text: 'The same compositor and audio mixer drive preview and export, so what you see and hear is what you export.', tags: ['Real-time playback', 'Shared pipeline'] },
  { tab: 'L6: Creator Tools', badge: 'LAYER 06 // CREATE', title: 'Tools made for course creators', text: 'Text presets, subtitles in SRT and VTT, overlays, effects, colour, an audio mixer and music, all inside the editor.', tags: ['Subtitles', 'Colour and audio'] },
  { tab: 'L7: Export', badge: 'LAYER 07 // DELIVER', title: 'Finished MP4 export', text: 'H.264 and AAC export through the hardware encoder, also available from the command line with lectern-export.', tags: ['H.264 + AAC', 'lectern-export'] },
];

export const lecternMetrics = [
  { value: 'C++23', label: 'Native engine' },
  { value: '155', label: 'Automated tests' },
  { value: '4', label: 'Synced track types' },
  { value: 'H.264', label: 'Hardware export' },
];

export const flagshipCards = [
  { id: 'nexgo', badge: 'GO // OPEN SOURCE', title: 'NexGo — Go Web Framework', specs: ['File-based routing and server rendering', 'Hot reload and API routes', 'Single binary, zero dependencies'], tags: ['Go', 'MIT license'] },
  { id: 'mybuddy', badge: 'MOBILE // PRIVACY-FIRST', title: 'MyBuddy — Mac Control from Android', specs: ['QR plus 6-digit code pairing', 'End-to-end encrypted channel', 'WebRTC screen streaming with H.264'], tags: ['Swift', 'Kotlin'] },
  { id: 'reel-series', badge: 'MOTION // REEL SERIES', title: '30-Day AI Reel Series', specs: ['30 finished Malayalam explainers', 'Data-driven Remotion engine with 3D titles', 'Captions locked to every word'], tags: ['Remotion', 'three.js'] },
];

export const techStack = [
  { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Astro', 'Tailwind CSS'] },
  { title: 'Backend and data', items: ['Node.js', 'Go', 'REST APIs', 'PostgreSQL', 'MongoDB', 'SQL', 'Docker'] },
  { title: 'AI and automation', items: ['Claude', 'ChatGPT', 'LLM integrations', 'AI agents', 'Ollama', 'Workflow automation'] },
  { title: 'Creative and search', items: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Remotion', 'Figma', 'Technical SEO', 'Search Console'] },
];

export const processSteps = [
  { title: 'Imagine', text: 'Understand the idea and explore possibilities. What should someone feel, understand, or do?' },
  { title: 'Design', text: 'Find the visual language, shape the story and map the experience.' },
  { title: 'Create', text: 'Thoughtful code, expressive motion, and every frame in its place.' },
  { title: 'Refine', text: 'Test it on another screen, tune the timing and simplify the interaction.' },
  { title: 'Deliver', text: 'A considered handoff and a confident launch.' },
];

export const benefits = [
  { title: 'One point of contact', text: 'Design, motion, code and marketing come from one person, so nothing gets lost between teams.' },
  { title: 'Built to be found', text: 'Performance, accessibility and search are checked during the build, not added at the end.' },
  { title: 'Clear communication', text: 'You hear what is being done, why, and what it will cost in time.' },
  { title: 'Calicut based, remote ready', text: 'Work with clients in Kerala and elsewhere, by call, chat and shared previews.' },
];

import { profile } from './portfolio';

export interface Faq { q: string; a: string; }

export const homeFaqs: Faq[] = [
  {
    q: 'Who is Salman Faris?',
    a: 'Salman Faris is a full-stack developer, AI web developer, video editor and motion designer based in Calicut (Kozhikode), Kerala, India. He builds websites and web applications with React, Next.js, Node.js and Go, and edits video and motion graphics with After Effects, Premiere Pro and DaVinci Resolve.',
  },
  {
    q: 'What services does Salman Faris offer?',
    a: 'Custom websites, full-stack web applications, AI features and automation, technical and local SEO, digital marketing, social media content, video editing, motion graphics and UI/UX design.',
  },
  {
    q: 'Where is Salman Faris based?',
    a: 'Salman Faris is based in Calicut, also known as Kozhikode, in Kerala, India. He works remotely, so clients in Malappuram, Wayanad, Kannur, Thrissur, Kochi, Thiruvananthapuram, Bangalore and abroad can work with him the same way as clients in Calicut.',
  },
  {
    q: 'How can I hire a freelance web developer in Calicut?',
    a: `Send a short description of what you need, your timeline and a rough budget range to ${profile.email}, or use the contact page. Salman replies with questions, then a clear plan and quote before any work starts.`,
  },
  {
    q: 'How much does a business website cost in Kerala?',
    a: 'It depends on the number of pages, who writes the content, and what the site has to do, such as bookings, payments or dashboards. A small brochure site and a custom web application are very different jobs. Share your requirements and you will get a written quote for that exact scope.',
  },
  {
    q: 'Does Salman Faris work with clients outside Kerala?',
    a: 'Yes. Work runs remotely by call, chat and shared previews, so clients elsewhere in India and abroad work the same way as clients in Calicut. Everything is scheduled from India Standard Time.',
  },
];

export const learningFaqs: Faq[] = [
  { q: 'Can I join as a beginner?', a: 'Check the prerequisites on each course page. AI Vibe Coding starts with basic computer skills; more technical courses may need previous experience.' },
  { q: 'Are the courses recorded or live?', a: 'The format is listed on each course page. AI Vibe Coding has recorded lesson material, AI Web Development is planned around live online classes, and Reel Automation is planned as recorded lessons. Confirm availability before booking.' },
  { q: 'How do I enrol and pay?', a: 'Ask for the confirmed fee and availability first. Courses open for enrolment show a Razorpay button when their checkout is available. Payment methods are shown on the hosted checkout.' },
  { q: 'Do I get lifetime access or a certificate?', a: 'Access duration, certificates and support depend on the course and are confirmed before enrolment. They are not promised across the whole catalogue.' },
  { q: 'Can I get mentorship or a portfolio review?', a: 'Yes, you can enquire about one-to-one mentorship, a project review or portfolio feedback. Scope, availability and fees are agreed before booking.' },
  { q: 'Are free lessons and bundles available?', a: 'No free course or bundle is announced here yet. Use the enquiry form to ask about previews and future releases.' },
  { q: 'Where can I read reviews?', a: 'Student reviews will be published with permission once verified. For now, explore the trainer’s projects and course outlines to assess the fit.' },
];
homeFaqs.push(...learningFaqs.slice(1, 5));

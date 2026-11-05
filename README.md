# Salman Faris — Story. Motion. Code.

A dark, editorial portfolio built in **Astro 7 + TypeScript**, with Tailwind CSS, GSAP/ScrollTrigger, Lenis, React, Framer Motion, Lucide and a dynamically imported Three.js sculpture.

## Run

Requires Node.js 22.23.4 or newer (Node 24 LTS recommended).

```sh
npm install
npm run dev
```

Open the local address printed by Astro (normally `http://localhost:4321`).

```sh
npm run check       # Astro + TypeScript diagnostics
npm run build       # Static output in dist/
npm run preview     # Preview the production build
npm test            # Playwright, against an existing server on :4321
```

The working copy includes dependencies assembled from the workstation’s offline cache. A new checkout should use `npm install`. No machine-local dependency paths are used by application source.

## Edit content

| Content | File |
|---|---|
| Projects, tools, descriptions, email and social URLs | `src/data/portfolio.ts` |
| Hero and contact copy | `src/pages/index.astro` |
| About, skills, process and journey | `src/components/StorySections.astro` |
| Colors, typography, page layout | `src/styles/global.css` |
| About/process/timeline styles | `src/styles/story.css` |
| Scroll, intro, cursor and magnetic motion | `src/scripts/experience.ts` |
| 3D object and fallback | `src/scripts/sculpture.ts`, `src/components/Sculpture.astro` |
| Sample artwork and social preview | `public/images/` |

The five showcased projects are **illustrative concepts**, not claimed client engagements. Replace artwork, project copy, actual project years and verified career history before a public portfolio launch. The portrait is explicitly marked as a placeholder. LinkedIn, Behance and WhatsApp remain labeled “coming soon” until confirmed URLs are supplied. Email, GitHub and Instagram come from the supplied profile context.

## Architecture

Astro produces complete static HTML, including five dedicated project pages. The gallery progressively mounts a small React island for filtering, scrolling and animated native-dialog project previews. Without JavaScript, project cards navigate to their static detail pages. No backend or secret keys are required.

Three.js loads dynamically on desktop only; mobile, reduced-motion and unavailable WebGL receive the finished SVG sculpture. Animation pauses offscreen and when the tab is hidden. Lenis preserves native touch scrolling, anchors and modal scrolling. GSAP contexts and WebGL resources are cleaned up on page exit. System reduced-motion preference bypasses the intro, smooth scrolling and decorative motion.

Fonts are self-hosted Geist Sans and Geist Mono, distributed under the SIL Open Font License (see `public/fonts/OFL.txt`). Concept artwork is original SVG, with fixed image dimensions and lazy loading; the sharing image is PNG.

## Deployment

This is a static site: deploy **dist/** to any static host. Set `SITE_URL` at build time to the final origin so canonicals, sitemap and sharing URLs match your domain. The default matches the registered private Sites preview.

```sh
SITE_URL=https://your-domain.example npm run build
```

The Sites project identity is retained in `.openai/hosting.json`. Never store credentials in source control.

## Launch checklist

- Replace concept media and portrait with the actual work/profile.
- Add verified career roles and dates.
- Confirm contact details and add the remaining social profiles.
- Set the final domain, rebuild, and check sharing cards.
- Run the checks and browser tests against the final deployment.

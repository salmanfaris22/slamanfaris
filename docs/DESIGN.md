# Salman Faris — Creative portfolio

## System
- Canvas: #0b0c0a, raised surfaces #131510; ink: #f0f0e9; secondary: #a5a69e; accent: #d5ff5f.
- Geist variable for editorial display and body. Geist Mono for section numbers, technical labels and metadata. Self-hosted fonts.
- Page gutter: clamp(22px, 5.2vw, 96px). Layout max: 1600px. Section rhythm: 100–160px desktop, 72px mobile.
- Oversized, tightly tracked headings; fine hairline borders; intentional whitespace. Rounded pills reserved for controls. No generic card-grid page structure.
- Main motif: an impossible metallic lime loop, representing the intersection of story, motion and code. SVG fallback + lazily imported WebGL.
- Motion: 0.2s interactions, 0.7s editorial reveals. Pinning on desktop only, reduced-motion alternatives, native anchors and keyboard navigation.

## Structure
- src/pages/index.astro: semantic page composition.
- src/layouts/Layout.astro: head, metadata and global assets.
- src/components: Astro content + small React interaction islands.
- src/data: editable project and profile content.
- src/scripts: GSAP timelines, intro, Lenis, cursor, menu.
- src/styles: reusable tokens, layout and responsive styles.
- public/images: locally served illustrative project artwork.

## Content integrity
All sample projects explicitly marked as concepts. No invented client claims, experience dates or performance metrics. Missing social profiles are explained rather than linked to guessed accounts.

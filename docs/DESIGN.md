# Design system

Noir and crimson, following the layout of saai.pro as requested, rebuilt from scratch for this site.

| Token | Value |
|---|---|
| Background | `#050505` |
| Card | `rgba(14,14,14,.78)` |
| Accent | `#ef4444`, deep `#c93a3a` |
| Text | `#f5f5f5`, muted `#a3a3a3`, dim `#8a8a8a` |
| Lines | `rgba(255,255,255,.10)` |
| Display | Bebas Neue (wordmark, name) |
| Script | Caveat, subset to Basic Latin (greeting only) |
| Body | Plus Jakarta Sans |
| Labels | JetBrains Mono |
| Page width | 1360 px |

All fonts are self-hosted under the SIL Open Font License. Languages other than English use system fonts to stay light.

## Structure

| Folder | Holds |
|---|---|
| `src/pages` | Routes. `[lang]`, `services/[slug]`, `courses/[slug]`, `locations/[place]`, `projects/[id]`, `blog/[category]/[slug]` |
| `src/layouts` | `Layout` (head, schema), `PageShell` (dock, footer, toast) |
| `src/components` | Shared pieces, `home/` for home sections |
| `src/data` | All content. Pages hold no business facts |
| `src/lib` | Schema builders, service gate, blog helpers |
| `src/scripts` | Tracking, site behaviour, enquiry forms, build intro |

## Portrait

`public/images/portrait.webp` is 760 by 950 with a transparent background, and `portrait-420.webp` serves phones. To replace it, cut out the subject, grade it black and white, and keep the same sizes. The hero `sizes` value is capped on phones to protect LCP.

## Changes from the reference

| Reference | Here | Why |
|---|---|---|
| Unstyled blue CTA links | Solid red buttons | Clearly a bug on the reference |
| `478MCP Tools` run together | Value above label | Same |
| Aurora hidden behind the hero | Visible, subtle | Matches the intended look |
| Dock over the wordmark on phones | Extra top padding | Overlap |
| Sections wider than the hero | One 1360 px grid | Alignment |
| Dim text at 4.2:1 contrast | `#8a8a8a` | Passes AA |
| Rebuild replays on every load | Once per tab, with a replay button in the footer | Kinder to returning visitors |

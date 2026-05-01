# Design Spec: squizzer73.dev Personal Website

**Date:** 2026-05-01
**Status:** Approved
**Domain:** squizzer73.dev
**Hosting:** Cloudflare Pages (GitHub → auto-deploy)

---

## Overview

Personal website for Mark Squires — Home Assistant custom-card developer. Showcases released cards with live mini-renders, a build-log blog, and a per-card detail page with install instructions and config reference. Dark-only, developer-credibility-first. Design is fully specified in `design_handoff_squizzer_dev/` — this spec covers the implementation approach only.

---

## Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Astro 5 (TypeScript strict) | Static-first, zero JS by default, first-class Cloudflare Pages adapter, native MDX |
| Styling | Global CSS (ported from design handoff) | Design tokens already clean CSS custom properties — no translation layer needed |
| Blog | MDX via `@astrojs/mdx` + Astro content collections | Type-safe frontmatter, markdown convenience, zero external CMS |
| Interactive components | Vanilla TS `<script>` tags in Astro components | No framework runtime; interactions are simple enough (intervals, class toggling, clipboard) |
| Adapter | `@astrojs/cloudflare` in static output mode | Direct Cloudflare Pages compatibility |
| Repo | `squizzer73/squizzer73.dev` (public, GitHub) | Required for Cloudflare Pages git integration |

---

## Pages & Routing

| Route | File | Source design |
|---|---|---|
| `/` | `src/pages/index.astro` | `design_handoff_squizzer_dev/index.html` |
| `/blog/` | `src/pages/blog/index.astro` | `design_handoff_squizzer_dev/blog.html` |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | `design_handoff_squizzer_dev/blog-post.html` |
| `/cards/calendar-events-card` | `src/pages/cards/calendar-events-card.astro` | `design_handoff_squizzer_dev/card-calendar.html` |

Card detail pages are static files (not dynamic routes) until there are enough cards to justify dynamic routing.

---

## Project Structure

```
squizzer73.dev/
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── CardTile.astro
│   │   ├── previews/
│   │   │   ├── WordClockPreview.astro
│   │   │   ├── CalendarPreview.astro
│   │   │   └── HeatDemandPreview.astro
│   │   ├── blog/
│   │   │   ├── BlogRow.astro
│   │   │   └── PostFilter.astro
│   │   └── card-detail/
│   │       ├── InstallTabs.astro
│   │       ├── ConfigTable.astro
│   │       └── Changelog.astro
│   ├── content/
│   │   ├── config.ts
│   │   └── blog/
│   │       ├── calendar-rewrite.mdx
│   │       ├── trv-heat-demand.mdx
│   │       └── f1-lighting.mdx
│   ├── layouts/
│   │   ├── Base.astro
│   │   └── BlogPost.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── cards/
│   │       └── calendar-events-card.astro
│   └── styles/
│       ├── global.css
│       └── previews.css
├── public/
│   └── assets/
│       ├── logo.png
│       └── logo-mark.png
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Content Collections

Blog posts live in `src/content/blog/` as `.mdx` files.

**Frontmatter schema:**
```ts
{
  title: string       // Post title
  date: string        // Display date, e.g. "28 Apr 2026"
  tags: string[]      // One or more of: "ha" | "build" | "auto"
  excerpt: string     // One or two sentence summary shown in blog index
  readTime: string    // e.g. "6 min read"
}
```

**Seeded posts — 6 total (matches prototype's blog index):**
- `calendar-rewrite.mdx` — "Why I rewrote the calendar card from scratch (twice)" — full body from prototype
- `trv-heat-demand.mdx` — "Building a TRV heat demand aggregator in Home Assistant" — full body
- `f1-lighting.mdx` — "F1 race status lighting with Govee and govee2mqtt" — full body
- `word-clock-card.mdx` — "Building a word clock card with ResizeObserver" — stub (frontmatter + one paragraph)
- `hacs-submission.mdx` — "Getting a custom card accepted into HACS" — stub
- `ha-entities-explained.mdx` — "Home Assistant entities, devices, and areas — what actually matters" — stub

The 3 homepage posts are the first three above (matching the prototype's homepage blog list). All 6 appear in the blog index.

---

## Interactive Components

All interactivity is client-side vanilla TypeScript via Astro `<script>` tags. No framework runtime is shipped.

| Component | Behaviour |
|---|---|
| `WordClockPreview.astro` | `setInterval` every 30s; lit-letter computation ported from prototype's `wordClockLit()` function |
| `InstallTabs.astro` | Toggle `data-active` on tab buttons; animate underline only on switch via CSS transition |
| `Changelog.astro` | Single-open accordion; click toggles `open` attribute; chevron rotates 90° via CSS |
| `PostFilter.astro` | All posts rendered in HTML with `data-tag` attributes; JS shows/hides on filter click; counts update from same source list |
| Copy buttons (code blocks) | `navigator.clipboard.writeText` + 1.4s `copied` state; silent fallback if API unavailable |
| `CalendarPreview.astro` | Static render (no live tick in v1 — the detail page demo re-renders are out of scope) |
| `HeatDemandPreview.astro` | Static bar render |

---

## Styling

- `src/styles/global.css` — ported verbatim from `design_handoff_squizzer_dev/styles.css`. All CSS custom properties, base chrome, nav, footer, buttons, tags, code blocks.
- `src/styles/previews.css` — ported verbatim from `design_handoff_squizzer_dev/previews.css`. Card preview and tile styles.
- Both imported in `Base.astro` layout.
- Fonts loaded via Google Fonts in `Base.astro` `<head>`: Space Grotesk + IBM Plex Mono.
- No Tailwind, no CSS Modules — global namespaced CSS matching the design handoff.

---

## Design Fidelity

Build to pixel-close fidelity against the design handoff prototypes:
- Hero: `split` variant only (hardcoded — Tweaks panel not shipped)
- Accent: blue (`#388bfd`) only — accent switcher not shipped
- All design tokens, typography scale, spacing, radii, and border rules from the README are reflected in the ported CSS

---

## Deployment

- **Output mode:** `static` in `astro.config.mjs`
- **Adapter:** `@astrojs/cloudflare`
- **Build command:** `npm run build`
- **Output directory:** `dist/`
- **GitHub repo:** `squizzer73/squizzer73.dev` (public)
- **Branch:** `main` → Cloudflare Pages production deploy
- **Preview URLs:** automatic on pull requests
- **Environment variables:** none required for v1

---

## Out of Scope (v1)

These items are explicitly excluded, matching the design handoff's "Out of scope" list:

- Real GitHub star counts (shows `—`; wiring requires a Cloudflare Worker / edge function)
- About page
- Light mode / theme toggle
- Detail pages for word-clock and heat-demand cards
- Search, comments, newsletter
- Pagination on blog
- Real favicon / logo mark (uses existing `logo-mark.png` from design assets)
- Calendar live-demo tick animation on card detail page

# Handoff: squizzer73.dev personal site

## Overview
Personal website for a Home Assistant custom-card developer. Showcases released cards with live mini-renders, a build-log blog, and per-card detail pages with install instructions and config references. The site is dark-only, developer-credibility-first, and intentionally avoids polish-for-polish's-sake.

The intended domain is **squizzer73.dev**.

## About the Design Files
The files in this bundle are **design references created in HTML** — interactive prototypes showing intended look and behaviour, not production code to copy directly. The task is to **recreate these designs in the target codebase's environment** using its established patterns and libraries.

If no codebase exists yet, a reasonable starting point would be **Next.js (App Router) + TypeScript + plain CSS modules or Tailwind**, with MDX for blog posts. The site is content-light and mostly static — anything heavier than that is overkill.

## Fidelity
**High-fidelity.** The prototypes use final colours, typography, spacing, and interactions. Recreate them pixel-close using the chosen framework's idioms. Code blocks, the live calendar/word-clock previews, and the install-tabs interaction should all behave as they do in the prototype.

## Screens / Views

### 1. Homepage (`index.html`)
**Purpose:** Show who Mark is, what cards he ships, and surface the latest blog posts.

**Layout:**
- Sticky top nav (64px tall, 1px bottom border)
- Hero (3 variants — pick one; user has selected `split`)
- Stats row (3 stats, divided by a top rule, 64px gaps)
- Cards section (3-column grid, 16px gap, min tile 320px tall)
- Blog list (3 rows, full-width, divided)
- Footer

**Components:**
- **Nav:** logo `squizzer73.dev` (mono, blue dot accent on the period); centre links `cards / blog / about` (muted until hover); right `GitHub` button (surface bg, 1px border).
- **Hero (split variant — chosen):** two-column grid (1.1fr / 1fr, 64px gap). Left: blue mono eyebrow `Home Assistant · Custom cards`, 40px headline with the phrase "on purpose." in accent blue, muted lede, two CTAs (primary `Browse cards →`, secondary `Watch on YouTube`), stats row. Right: live `WordClockPreview` card on a surface-coloured panel.
- **Stats row:** `3 / cards released`, `— / GitHub stars`, `HACS / compatible`. 28px stat number (medium weight), 12px muted label.
- **Section header:** mono uppercase 11px label (e.g. `CARDS`), top 1px border, padding-top 28px, margin-top 64px, with a blue `View all →` link on the right.
- **Card tile:** 16:10 preview area on `#0a0e14` with 12px padding; version badge top-right (`v1.2` blue or `new` green); body has medium 15px name and 13px muted desc; meta footer with mono filename + greyed star icon and `—` count.
- **Blog row:** title (medium), mono date below, tag pill on the right.

### 2. Card detail (`card-calendar.html`)
**Purpose:** Sell the card and tell the user how to install it.

**Layout:**
- Mono breadcrumbs (`cards / calendar-events-card`)
- Detail head: H1 + 16px muted desc + meta line + actions on the right
- Demo frame: bar with live-pulse green dot + view tabs, then dark stage with the live `CalendarPreview` rendered at hero size
- Two-column grid below (1fr / 280px sidebar)
- Left column: Features (check bullets), Install (HACS/Manual tabs), Configuration table, Changelog accordion
- Right column: sticky `At a glance` and `Links` blocks

**Components:**
- **Demo frame:** outer surface card with 24px padding, dark inner stage (8px radius, 24px padding, min 420px). The "live" indicator is a 6px green dot pulsing on a 2s ease-in-out loop.
- **Install tabs:** segmented buttons under a 1px bottom border, active tab gets blue underline. HACS body has 3 numbered steps, each with a copyable code block. Manual body shows file path + resource YAML.
- **Copy button on code blocks:** absolute top-right, mono 11px, flips to green `copied` for 1.4s after click.
- **Config table:** mono option name in accent blue, mono type in muted; required tags in `#f78166` (orange), optional in muted.
- **Changelog accordion:** version (mono medium) + mono date + chevron rotates 90° when open; body shows bulleted release notes.
- **Sidebar block:** surface card with 18px padding; mono uppercase 11px header; rows divided by 1px border.

### 3. Blog index (`blog.html`)
**Purpose:** Long-form notes, filterable by tag.

**Layout:**
- Page header: small blue `BLOG` eyebrow, 36px H1, muted lede
- Filter row: mono `FILTER` label + pill buttons (`All`, `HA`, `build log`, `automation`) with mono counts
- Posts list: 110px date column / title + excerpt / tag pill, divided by 1px borders

**Components:**
- **Filter pill:** transparent default, surface-soft with blue border + `accent-soft` background when active. Counts in mono 11px.
- **Post row:** 22px vertical padding, hover turns title blue.
- **Excerpt:** muted, 14px, max 640px, 1.55 line-height.

### 4. Blog post (`blog-post.html`)
**Purpose:** Long-form readable post with code samples.

**Layout:**
- Mono breadcrumbs
- Header (max 720px, centred): tag + date + read time meta line, 38px H1, 18px muted lede, author row with circle avatar
- Body (max 720px, 16px / 1.7): H2/H3 hierarchy, paragraphs, inline `code`, code blocks, callout boxes, blockquotes, lists
- Footer with `← All posts` link and share row

**Components:**
- **Code block:** `#010409` background, 1px `--border`, 18/20 padding, 13.5px mono. Inline syntax highlighting via classed spans (`tok-k`, `tok-s`, `tok-c`, `tok-n`, `tok-y`, `tok-num`).
- **Callout:** `accent-soft` background with 1px `rgba(56,139,253,.25)` border, 6px radius, 14px text.
- **Blockquote:** 2px left border in accent blue, italic muted text.
- **Author avatar:** 32px circle, surface bg, 1px border, mono 12px accent-blue initials.

## Interactions & Behavior
- **Hero "Terminal" variant** has a 1.2s timed reveal of the install command output.
- **Word clock preview** updates the lit letters every 30 seconds based on the current time.
- **Calendar live demo** ticks every 3s (the `LiveCalendarDemo` wrapper currently re-renders silently; on a real build, simulate event additions/colour pulses).
- **Install tabs** toggle without reload; the active tab's underline animates only on switch.
- **Changelog** is single-open accordion (clicking an open item closes it).
- **Blog filters** are client-only; counts update from a single source list.
- **Card-tile hover:** name turns accent blue, border lightens (`var(--border-2)`).
- **Copy button:** clipboard write + 1.4s `copied` state; falls back silently if clipboard API unavailable.
- **Tweaks (design-time only):** the prototype includes a Tweaks panel for picking hero variant and accent colour. Don't ship that — it's a design tool.

## State Management
Minimal. All interactive state is local:
- Install-tab selection (one component)
- Changelog open-id (one component)
- Blog tag filter (one component)
- Word-clock current time (interval-driven)
- Hero "Terminal" timed reveal (single setTimeout)

No global store needed. No server state until you wire real GitHub stars / blog content.

## Design Tokens

### Colors
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0d1117` | page |
| `--surface` | `#161b22` | card surfaces |
| `--surface-2` | `#1c2128` | hover surfaces |
| `--border` | `#21262d` | default borders |
| `--border-2` | `#30363d` | hover borders / dividers |
| `--text` | `#e6edf3` | body |
| `--text-muted` | `#7d8590` | secondary |
| `--text-faint` | `#484f58` | tertiary / disabled |
| `--accent` | `#388bfd` | the only accent |
| `--accent-soft` | `rgba(56,139,253,.12)` | accent backgrounds |
| Tag — HA | bg `rgba(56,139,253,.13)` / fg `#58a6ff` | |
| Tag — build log | bg `rgba(35,134,54,.18)` / fg `#3fb950` | |
| Tag — automation | bg `rgba(137,87,229,.18)` / fg `#a371f7` | |
| Tag — new | bg `rgba(35,134,54,.22)` / fg `#3fb950` | |
| Tag — version | bg `rgba(56,139,253,.22)` / fg `#79b8ff` | |
| Code block bg | `#010409` | darker than `--bg` |
| Required marker | `#f78166` | orange |

### Typography
- Body / UI: **Inter**, weights 400 / 500. `font-feature-settings: "ss01", "cv11"`.
- Mono: **JetBrains Mono**, weights 400 / 500. Used for filenames, code, version strings, mono labels, dates in lists.
- Sentence case everywhere. No font weights heavier than 500.

### Type scale
- 11px mono uppercase eyebrow / section labels (letter-spacing 0.08–0.1em)
- 12px secondary mono / dates
- 13–14px body / UI
- 15px card-tile name
- 16px hero lede / blog body
- 17–18px section H2 / blog row title
- 22px post-body H2
- 28px stat numbers
- 36–44px page H1s

### Spacing
8px grid. Common values: 4 / 8 / 12 / 16 / 18 / 22 / 24 / 28 / 32 / 48 / 56 / 64 / 72 / 96.

### Radii
4px (small chips), 6px (buttons, code badges), 8px (cards, panels), 10px (large surfaces).

### Borders
1px solid `--border` is the default. No shadows. No gradients (one tiny exception: heat-demand bar fill is a blue→orange linear gradient — fine to drop on the real build).

## Assets
- **Fonts:** Inter + JetBrains Mono via Google Fonts.
- **Icons:** small inline SVGs (GitHub mark on the nav button, star on card meta, check for feature list, chevron for accordion). Replace the GitHub octocat with a generic mark or an icon library — it's a placeholder.
- **Card preview imagery:** all generated live in CSS/HTML — no images. Calendar uses dot indicators per day; word clock uses an 11×10 letter grid; heat demand uses horizontal progress bars.
- **Logo:** text-only `squizzer73.dev` with a blue period. No mark yet — flag this if you want one designed.

## Content
Real content baked into the prototype:
- 3 cards: `calendar-events-card` (v1.2, released), `word-clock-card` (new, released), `heat-demand-card` (wip)
- 6 blog posts (3 for the homepage list, 6 for the blog index)
- Footer: "Mark Squires · Buckinghamshire, UK"; socials: github / youtube / tiktok at handle `squizzer73`
- One full blog post: "Why I rewrote the calendar card from scratch (twice)"
- One full card detail: calendar events card

## Files
- `index.html` — homepage (3 hero variants in a Tweaks panel; `split` is the chosen one)
- `card-calendar.html` — calendar card detail page
- `blog.html` — blog index
- `blog-post.html` — calendar-rewrite long-form post
- `shared.jsx` — Nav, Footer, CardTile, CalendarPreview, WordClockPreview, HeatDemandPreview
- `styles.css` — design tokens + base chrome
- `previews.css` — card preview + tile styles
- `tweaks-panel.jsx` — design-time tweaks shell (do **not** ship this)

## Out of scope for v1
- Search, comments, newsletter signup
- Light mode / theme toggle (dark only)
- Detail pages for word-clock and heat-demand (currently link to anchors)
- About page
- Real favicon / logo mark
- Pagination on the blog (not needed at current post count)

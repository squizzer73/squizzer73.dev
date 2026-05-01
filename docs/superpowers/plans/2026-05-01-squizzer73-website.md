# squizzer73.dev Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build squizzer73.dev as an Astro 5 static site with 4 pages (homepage, card detail, blog index, blog post), deployed to Cloudflare Pages via GitHub.

**Architecture:** Astro 5 (static output) with global CSS ported verbatim from the design handoff, vanilla TypeScript `<script>` tags for all interactivity, and MDX content collections for blog posts. No JavaScript framework — zero runtime overhead.

**Tech Stack:** Astro 5, TypeScript (strict), `@astrojs/mdx`, `@astrojs/cloudflare`, Google Fonts (Space Grotesk + IBM Plex Mono), vanilla TS for interactive components.

**Design reference:** All visual specs, tokens, and content are in `design_handoff_squizzer_dev/`. The README.md in that folder is the authoritative source of truth. Every component should be built pixel-close to the prototypes.

**Working directory:** `/Users/marksquires/squizzer73 website/`

---

## Task 1: Bootstrap Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json` (via scaffold)
- Create: `.gitignore`

- [ ] **Step 1: Scaffold Astro 5 in the current directory**

```bash
cd "/Users/marksquires/squizzer73 website"
npm create astro@latest . -- --template minimal --typescript strict --no-git --install --yes
```

Expected: Astro creates `src/`, `public/`, `package.json`, `astro.config.mjs`, `tsconfig.json`. It will warn about the existing directory — confirm to continue.

- [ ] **Step 2: Install additional integrations**

```bash
cd "/Users/marksquires/squizzer73 website"
npm install @astrojs/mdx @astrojs/cloudflare
```

Expected: packages added to `node_modules/`.

- [ ] **Step 3: Replace `astro.config.mjs` with**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [mdx()],
  site: 'https://squizzer73.dev',
});
```

- [ ] **Step 4: Replace `tsconfig.json` with**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 5: Create `.gitignore`**

```
node_modules/
dist/
.env
.env.*
!.env.example
.DS_Store
.wrangler/
.astro/
```

- [ ] **Step 6: Delete Astro's placeholder files**

```bash
rm -f src/pages/index.astro src/components/Welcome.astro
```

- [ ] **Step 7: Verify the project builds cleanly**

```bash
cd "/Users/marksquires/squizzer73 website"
npm run build
```

Expected: Build succeeds with 0 errors (may warn about missing pages — that's fine at this stage).

- [ ] **Step 8: Create the GitHub repo and push**

```bash
cd "/Users/marksquires/squizzer73 website"
git init
git add .
git commit -m "chore: bootstrap Astro 5 project"
gh repo create squizzer73/squizzer73.dev --public --source=. --remote=origin --push
```

Expected: Repo created at `github.com/squizzer73/squizzer73.dev`, initial commit pushed.

---

## Task 2: Port global styles

**Files:**
- Create: `src/styles/global.css`
- Create: `src/styles/previews.css`
- Create: `src/styles/card-detail.css`

- [ ] **Step 1: Copy global styles from design handoff**

Copy `design_handoff_squizzer_dev/styles.css` to `src/styles/global.css` verbatim. No changes needed — it is production-ready.

- [ ] **Step 2: Copy preview styles from design handoff**

Copy `design_handoff_squizzer_dev/previews.css` to `src/styles/previews.css` verbatim.

- [ ] **Step 3: Create `src/styles/card-detail.css`**

Copy the entire `<style>` block from inside `design_handoff_squizzer_dev/card-calendar.html` (lines 12–360, everything between `<style>` and `</style>`) into `src/styles/card-detail.css`.

- [ ] **Step 4: Create `src/styles/blog.css`**

Read the `<style>` block from `design_handoff_squizzer_dev/blog.html` and save it to `src/styles/blog.css`. Read the `<style>` block from `design_handoff_squizzer_dev/blog-post.html` and append it to `src/styles/blog.css`.

- [ ] **Step 5: Copy logo assets**

```bash
mkdir -p "/Users/marksquires/squizzer73 website/public/assets"
cp "/Users/marksquires/squizzer73 website/design_handoff_squizzer_dev/assets/logo.png" \
   "/Users/marksquires/squizzer73 website/public/assets/"
cp "/Users/marksquires/squizzer73 website/design_handoff_squizzer_dev/assets/logo-mark.png" \
   "/Users/marksquires/squizzer73 website/public/assets/"
```

- [ ] **Step 6: Commit**

```bash
git add src/styles/ public/assets/
git commit -m "feat: port design system styles and assets"
```

---

## Task 3: Base layout, Nav, Footer

**Files:**
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
---
interface Props {
  active?: 'cards' | 'blog' | 'about';
}
const { active } = Astro.props;
---

<nav class="nav">
  <div class="container nav-inner">
    <a href="/" class="logo" aria-label="squizzer73.dev — home">
      <img src="/assets/logo-mark.png" alt="" class="logo-mark" />
      <span class="logo-stack">
        <span class="logo-text">squizzer<span class="num73">73</span><span class="dot">.</span>dev</span>
        <span class="logo-tag mono">custom home automation &amp; home assistant cards</span>
      </span>
    </a>
    <div class="nav-links">
      <a href="/#cards" class={active === 'cards' ? 'active' : ''}>cards</a>
      <a href="/blog/" class={active === 'blog' ? 'active' : ''}>blog</a>
      <a href="/#about" class={active === 'about' ? 'active' : ''}>about</a>
    </div>
    <a
      class="gh-btn"
      href="https://github.com/squizzer73"
      target="_blank"
      rel="noreferrer"
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      GitHub
    </a>
  </div>
</nav>
```

- [ ] **Step 2: Create `src/components/Footer.astro`**

```astro
---
---

<footer class="footer">
  <div class="container footer-inner">
    <div>Mark Squires · Buckinghamshire, UK</div>
    <div class="footer-links">
      <a href="https://github.com/squizzer73" target="_blank" rel="noreferrer">github</a>
      <a href="https://youtube.com/@squizzer73" target="_blank" rel="noreferrer">youtube</a>
      <a href="https://tiktok.com/@squizzer73" target="_blank" rel="noreferrer">tiktok</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Create `src/layouts/Base.astro`**

```astro
---
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';
import '../styles/previews.css';

interface Props {
  title: string;
  description?: string;
  activeNav?: 'cards' | 'blog' | 'about';
}

const {
  title,
  description = 'Open-source Home Assistant cards and automations by Mark Squires.',
  activeNav,
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
    <slot name="head" />
  </head>
  <body>
    <Nav active={activeNav} />
    <slot />
    <Footer />
  </body>
</html>
```

Page-specific CSS is imported directly in each page's frontmatter (e.g. `import '../styles/blog.css'`), not via a prop.

- [ ] **Step 4: Create a temporary `src/pages/index.astro` to smoke-test the layout**

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="squizzer73.dev — Home Assistant custom cards" activeNav="cards">
  <main class="container" style="padding: 64px 0;">
    <h1>Coming soon</h1>
  </main>
</Base>
```

- [ ] **Step 5: Start the dev server and verify the page renders**

```bash
cd "/Users/marksquires/squizzer73 website"
npm run dev
```

Open `http://localhost:4321` in a browser. Verify:
- Nav bar appears with logo, links, and GitHub button
- Fonts load (Space Grotesk + IBM Plex Mono)
- Dark background (`#0A0E14`) is applied
- Footer appears at the bottom

Stop the dev server when satisfied.

- [ ] **Step 6: Commit**

```bash
git add src/
git commit -m "feat: base layout with Nav and Footer"
```

---

## Task 4: Card preview components

**Files:**
- Create: `src/components/previews/WordClockPreview.astro`
- Create: `src/components/previews/CalendarPreview.astro`
- Create: `src/components/previews/HeatDemandPreview.astro`

- [ ] **Step 1: Create `src/components/previews/WordClockPreview.astro`**

```astro
---
interface Props {
  size?: 'tile' | 'hero';
}
const { size = 'tile' } = Astro.props;
const isHero = size === 'hero';

const GRID = [
  'ITLISASTIME',
  'ACQUARTERDC',
  'TWENTYFIVEX',
  'HALFSTENFTO',
  'PASTERUNINE',
  'ONESIXTHREE',
  'FOURFIVETWO',
  'EIGHTELEVEN',
  'SEVENTWELVE',
  'TENSEOCLOCK',
];
---

<div class={`wc-preview${isHero ? ' wc-hero' : ''}`}>
  <div class="wc-grid">
    {GRID.map((row, r) => (
      <div class="wc-row">
        {row.split('').map((letter, c) => (
          <span class="wc-letter" data-pos={`${r}-${c}`}>{letter}</span>
        ))}
      </div>
    ))}
  </div>
</div>

<script>
  type Phrase = [number, number, number][];

  const WC_PHRASES: Record<string, Phrase> = {
    IT:      [[0, 0, 1]],
    IS:      [[0, 3, 4]],
    A:       [[1, 0, 0]],
    QUARTER: [[1, 2, 8]],
    TWENTY:  [[2, 0, 5]],
    FIVE_M:  [[2, 6, 9]],
    TEN_M:   [[3, 6, 8]],
    HALF:    [[3, 0, 3]],
    PAST:    [[4, 0, 3]],
    TO:      [[3, 9, 10]],
    ONE:     [[5, 0, 2]],
    TWO:     [[6, 8, 10]],
    THREE:   [[5, 6, 10]],
    FOUR:    [[6, 0, 3]],
    FIVE:    [[6, 4, 7]],
    SIX:     [[5, 3, 5]],
    SEVEN:   [[8, 0, 4]],
    EIGHT:   [[7, 0, 4]],
    NINE:    [[4, 7, 10]],
    TEN:     [[9, 0, 2]],
    ELEVEN:  [[7, 5, 10]],
    TWELVE:  [[8, 5, 10]],
    OCLOCK:  [[9, 5, 10]],
  };

  const HOUR_KEYS = ['TWELVE','ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','TEN','ELEVEN','TWELVE'];

  function wordClockLit(date: Date): Set<string> {
    const lit = new Set<string>();
    const mark = (key: string) => {
      const ranges = WC_PHRASES[key];
      if (!ranges) return;
      for (const [r, a, b] of ranges) {
        for (let c = a; c <= b; c++) lit.add(`${r}-${c}`);
      }
    };

    mark('IT'); mark('IS');

    const h = date.getHours();
    const m = date.getMinutes();
    const rounded = Math.round(m / 5) * 5;
    const useNextHour = rounded > 30;
    let displayHour = useNextHour ? (h + 1) % 24 : h;
    displayHour = displayHour % 12;
    if (displayHour === 0) displayHour = 12;

    const min = rounded % 60;
    if (min === 0)       { mark('OCLOCK'); }
    else if (min === 5)  { mark('FIVE_M'); mark('PAST'); }
    else if (min === 10) { mark('TEN_M');  mark('PAST'); }
    else if (min === 15) { mark('A'); mark('QUARTER'); mark('PAST'); }
    else if (min === 20) { mark('TWENTY'); mark('PAST'); }
    else if (min === 25) { mark('TWENTY'); mark('FIVE_M'); mark('PAST'); }
    else if (min === 30) { mark('HALF');   mark('PAST'); }
    else if (min === 35) { mark('TWENTY'); mark('FIVE_M'); mark('TO'); }
    else if (min === 40) { mark('TWENTY'); mark('TO'); }
    else if (min === 45) { mark('A'); mark('QUARTER'); mark('TO'); }
    else if (min === 50) { mark('TEN_M');  mark('TO'); }
    else if (min === 55) { mark('FIVE_M'); mark('TO'); }

    mark(HOUR_KEYS[displayHour]!);
    return lit;
  }

  function updateClocks(): void {
    const lit = wordClockLit(new Date());
    document.querySelectorAll<HTMLElement>('.wc-letter[data-pos]').forEach(el => {
      el.classList.toggle('wc-lit', lit.has(el.dataset.pos!));
    });
  }

  updateClocks();
  setInterval(updateClocks, 30_000);
</script>
```

- [ ] **Step 2: Create `src/components/previews/CalendarPreview.astro`**

```astro
---
interface Props {
  size?: 'tile' | 'hero';
}
const { size = 'tile' } = Astro.props;
const isHero = size === 'hero';

const today = 14;
const days = Array.from({ length: 30 }, (_, i) => i + 1);
const weekHeaders = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const startOffset = 2; // April 2026 starts on Wednesday

interface CalEvent { color: string; label: string; time?: string; cal?: string; }
const events: Record<number, CalEvent> = {
  14: { color: '#388bfd', label: 'Gym',               time: '19:00', cal: 'personal' },
  16: { color: '#a371f7', label: 'F1 sprint',         time: '14:30', cal: 'f1' },
  18: { color: '#3fb950', label: 'Hike' },
  22: { color: '#f78166', label: 'Birthday' },
  27: { color: '#388bfd', label: 'Gym 19:00' },
};
const heroEvents = Object.values(events).filter(e => e.time);
---

<div class={`cal-preview${isHero ? ' cal-hero' : ''}`}>
  <div class="cal-head">
    <span class="cal-month">April 2026</span>
    <div class="cal-nav"><span>‹</span><span>›</span></div>
  </div>
  <div class="cal-grid">
    {weekHeaders.map(h => <div class="cal-dow">{h}</div>)}
    {Array.from({ length: startOffset }).map((_, i) => <div />)}
    {days.map(d => (
      <div class={`cal-day${d === today ? ' cal-today' : ''}`}>
        <span class="cal-num">{d}</span>
        {events[d] && <span class="cal-dot" style={`background:${events[d].color}`} />}
      </div>
    ))}
  </div>
  {isHero && (
    <div class="cal-events">
      {heroEvents.map(e => (
        <div class="cal-event">
          <span class="cal-event-dot" style={`background:${e.color}`} />
          <span class="cal-event-time mono">{e.time}</span>
          <span class="cal-event-title">{e.label}</span>
          <span class="cal-event-cal mono faint">{e.cal}</span>
        </div>
      ))}
    </div>
  )}
</div>
```

- [ ] **Step 3: Create `src/components/previews/HeatDemandPreview.astro`**

```astro
---
interface Props {
  size?: 'tile' | 'hero';
}
const { size = 'tile' } = Astro.props;
const isHero = size === 'hero';

const rooms = [
  { name: 'Lounge',   demand: 78, temp: '19.2°' },
  { name: 'Bedroom',  demand: 42, temp: '18.4°' },
  { name: 'Office',   demand: 91, temp: '17.8°' },
  { name: 'Kitchen',  demand: 12, temp: '20.1°' },
];
---

<div class={`hd-preview${isHero ? ' hd-hero' : ''}`}>
  <div class="hd-head">
    <span class="hd-title">Heat demand</span>
    <span class="hd-status mono">62% avg</span>
  </div>
  <div class="hd-rows">
    {rooms.map(r => (
      <div class="hd-row">
        <span class="hd-room">{r.name}</span>
        <div class="hd-bar"><div class="hd-fill" style={`width:${r.demand}%`} /></div>
        <span class="hd-temp mono">{r.temp}</span>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 4: Build to verify no TypeScript errors**

```bash
npm run build
```

Expected: Build succeeds, no type errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/previews/
git commit -m "feat: card preview components (word clock, calendar, heat demand)"
```

---

## Task 5: CardTile component

**Files:**
- Create: `src/components/CardTile.astro`

- [ ] **Step 1: Create `src/components/CardTile.astro`**

```astro
---
interface Props {
  name: string;
  desc: string;
  filename: string;
  versionTag: string;
  tagKind: 'version' | 'new';
  detailUrl: string;
}
const { name, desc, filename, versionTag, tagKind, detailUrl } = Astro.props;
---

<a class="card-tile" href={detailUrl}>
  <div class="card-tile-preview">
    <div class="card-tile-preview-inner">
      <slot />
    </div>
    <span class={`tag ${tagKind === 'new' ? 'tag-new' : 'tag-version'} card-tile-version`}>
      {versionTag}
    </span>
  </div>
  <div class="card-tile-body">
    <div class="card-tile-name">{name}</div>
    <div class="card-tile-desc">{desc}</div>
  </div>
  <div class="card-tile-meta">
    <span class="mono card-tile-filename">{filename}</span>
    <span class="card-tile-stars">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
      </svg>
      <span class="mono">—</span>
    </span>
  </div>
</a>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CardTile.astro
git commit -m "feat: CardTile component"
```

---

## Task 6: Content collection + blog posts

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/blog/calendar-rewrite.mdx`
- Create: `src/content/blog/trv-heat-demand.mdx`
- Create: `src/content/blog/f1-lighting.mdx`
- Create: `src/content/blog/word-clock-card.mdx` (stub)
- Create: `src/content/blog/hacs-submission.mdx` (stub)
- Create: `src/content/blog/ha-entities-explained.mdx` (stub)

- [ ] **Step 1: Create `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.enum(['ha', 'build', 'auto'])),
    excerpt: z.string(),
    readTime: z.string(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create `src/content/blog/calendar-rewrite.mdx`**

Open `design_handoff_squizzer_dev/blog-post.html` and find the article body content (all the paragraphs, code blocks, and headings inside the `<article>` or body element). Port it to MDX format. Use `##` for H2s, ` ``` ` fences for code blocks, and `>` for blockquotes. Frontmatter:

```mdx
---
title: "Why I rewrote the calendar card from scratch (twice)"
date: 2026-04-14
tags: ["build"]
excerpt: "The first rewrite fixed the layout. The second fixed time zones. Here is what I learned about building Lovelace cards that actually handle real calendar data."
readTime: "8 min read"
---

{/* Port the full article body from design_handoff_squizzer_dev/blog-post.html here */}
```

- [ ] **Step 3: Create `src/content/blog/trv-heat-demand.mdx`**

```mdx
---
title: "Building a TRV heat demand aggregator in Home Assistant"
date: 2026-04-28
tags: ["ha"]
excerpt: "TRVs report valve position, not demand. Here is how I built a sensor that aggregates per-room heat demand into something the boiler can act on."
readTime: "6 min read"
---

Home Assistant gives you a valve position per TRV but nothing that tells the boiler how hard to work. This post walks through a template sensor that computes a weighted heat demand score across every room.

The core formula weights each room by its valve open percentage, adjusted by how far it is from the target temperature. Rooms that are cold and wide open count more than rooms that are slightly below setpoint with a narrow opening.

Once the sensor was in place, the next step was wiring it to the boiler via a Shelly switch and a simple automation — fire when demand crosses a threshold, kill when it drops back. The result is a boiler that cycles less and heats more efficiently.
```

- [ ] **Step 4: Create `src/content/blog/f1-lighting.mdx`**

```mdx
---
title: "F1 race status lighting with Govee and govee2mqtt"
date: 2026-04-02
tags: ["auto"]
excerpt: "Race status from a public API, piped through MQTT, mapped to Govee light effects. The lights go green on race start, safety-car yellow on VSC, and red on a red flag."
readTime: "5 min read"
---

The F1 calendar integration in Home Assistant gives you session state — but only after a delay and without fine-grained race status. This post covers a small Node-RED flow that polls a public F1 status API every 30 seconds and maps race conditions to Govee light modes via govee2mqtt.

Green means go. Yellow means virtual safety car or safety car. Red means red flag or session stopped. The lights update within 30 seconds of the actual on-track event.

The trickiest part was handling the transition from qualifying to race day — the session entity changes ID between sessions, so the automation needed a template to resolve the current session entity dynamically.
```

- [ ] **Step 5: Create `src/content/blog/word-clock-card.mdx`**

```mdx
---
title: "Building a word clock card with ResizeObserver"
date: 2026-03-20
tags: ["build"]
excerpt: "An 11×10 letter grid that shows the time in English. The challenge was making it fit any tile size without JavaScript-driven font sizing."
readTime: "4 min read"
---

The word clock concept is simple: a fixed grid of letters, some lit up to spell the current time in plain English. The implementation problem is making it responsive — the grid needs to fill any tile size, from a narrow sidebar slot to a full-width panel.

CSS grid with `1fr` columns handles the layout. The letter size scales with the container via `clamp()` and a container query. ResizeObserver fires when the tile is resized and updates a CSS custom property that the font size reads from.
```

- [ ] **Step 6: Create `src/content/blog/hacs-submission.mdx`**

```mdx
---
title: "Getting a custom card accepted into HACS"
date: 2026-03-10
tags: ["ha"]
excerpt: "The HACS submission checklist is longer than it looks. Here is what caught me out and how to get through the review without back-and-forth."
readTime: "4 min read"
---

HACS requires a specific repo structure, a `hacs.json` manifest, proper semantic versioning via GitHub releases, and a `README.md` that meets their template requirements. None of this is hard, but missing any one item sends your submission back to the queue.

The review that tripped me up most was the info card — HACS pulls a preview from your README and renders it in their frontend. Images need to be absolute URLs to raw GitHub content, not relative paths. Took two submissions to spot that one.
```

- [ ] **Step 7: Create `src/content/blog/ha-entities-explained.mdx`**

```mdx
---
title: "Home Assistant entities, devices, and areas — what actually matters"
date: 2026-02-28
tags: ["ha"]
excerpt: "Three concepts that beginners conflate and experts take for granted. Getting this mental model right makes everything else click."
readTime: "3 min read"
---

A device is a physical thing — a Shelly relay, a TRV, a Zigbee bulb. An entity is one measurable or controllable property of that device — a switch entity, a temperature sensor entity, a brightness entity. A device can have dozens of entities. An area is just a label you assign to group devices and entities by room.

The confusion usually comes from the fact that simple devices — a single-relay switch, a basic motion sensor — have one entity each, so the device/entity distinction feels academic. It stops being academic when you add a TRV with seven entities (valve position, setpoint, battery, HVAC mode, current temp, link quality, last seen) and need to build an automation that only cares about two of them.
```

- [ ] **Step 8: Build to verify content collection parses correctly**

```bash
npm run build
```

Expected: Build succeeds. If Astro reports a type error in frontmatter, check that `date:` values in MDX files use ISO format `YYYY-MM-DD` (not quoted strings).

- [ ] **Step 9: Commit**

```bash
git add src/content/
git commit -m "feat: blog content collection with 6 seeded posts"
```

---

## Task 7: Homepage

**Files:**
- Modify: `src/pages/index.astro` (replace the smoke-test placeholder from Task 3)

- [ ] **Step 1: Add homepage-specific CSS to `src/styles/global.css`**

Append the entire `<style>` block from `design_handoff_squizzer_dev/index.html` (the block starting after `<link rel="stylesheet" href="previews.css" />` and ending before `</style></head>`) to `src/styles/global.css`. This adds `.hero`, `.hero-split`, `.hero-terminal`, `.stats`, `.blog-list`, `.blog-row`, and responsive breakpoints.

- [ ] **Step 2: Write `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import CardTile from '../components/CardTile.astro';
import WordClockPreview from '../components/previews/WordClockPreview.astro';
import CalendarPreview from '../components/previews/CalendarPreview.astro';
import HeatDemandPreview from '../components/previews/HeatDemandPreview.astro';
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
const homePosts = allPosts
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 3);

const TAG_CLASSES: Record<string, string> = { ha: 'tag-ha', build: 'tag-build', auto: 'tag-auto' };
const TAG_LABELS: Record<string, string> = { ha: 'HA', build: 'build log', auto: 'automation' };

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
---

<Base title="squizzer73.dev — Home Assistant custom cards" activeNav="cards">
  <!-- Hero (split variant) -->
  <section class="hero hero-split container">
    <div>
      <div class="hero-eyebrow eyebrow">
        <span>Home Assistant</span>
        <span class="sep">·</span>
        <span>Custom cards</span>
      </div>
      <h1>
        Custom home automation that looks <span class="accent">built on purpose.</span>
      </h1>
      <p class="hero-sub">
        Open-source Home Assistant cards and automations. Technical. Clean. Connected.
      </p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="#cards">Browse cards →</a>
        <a class="btn" href="https://youtube.com/@squizzer73" target="_blank" rel="noreferrer">Watch on YouTube</a>
      </div>
      <div class="stats">
        <div>
          <div class="stat-num">3</div>
          <div class="stat-label">cards released</div>
        </div>
        <div>
          <div class="stat-num">—</div>
          <div class="stat-label">GitHub stars</div>
        </div>
        <div>
          <div class="stat-num">HACS</div>
          <div class="stat-label">compatible</div>
        </div>
      </div>
    </div>
    <div class="hero-split-preview">
      <WordClockPreview size="hero" />
    </div>
  </section>

  <main class="container">
    <!-- Cards section -->
    <div class="section-head" id="cards">
      <h2>Cards</h2>
      <a class="view-all" href="#">View all →</a>
    </div>
    <div class="cards-grid">
      <CardTile
        name="Calendar events card"
        desc="Multi-calendar display with auto-scaling text and visual editor support."
        filename="calendar-events-card.js"
        versionTag="v1.2"
        tagKind="version"
        detailUrl="/cards/calendar-events-card/"
      >
        <CalendarPreview size="tile" />
      </CardTile>
      <CardTile
        name="Word clock card"
        desc="11×10 English word grid with ResizeObserver auto-scaling. Always fits."
        filename="word-clock-card.js"
        versionTag="new"
        tagKind="new"
        detailUrl="#word-clock"
      >
        <WordClockPreview size="tile" />
      </CardTile>
      <CardTile
        name="Heat demand card"
        desc="Per-room TRV demand visualisation with adaptive thresholds. WIP."
        filename="heat-demand-card.js"
        versionTag="wip"
        tagKind="version"
        detailUrl="#heat-demand"
      >
        <HeatDemandPreview size="tile" />
      </CardTile>
    </div>

    <!-- Blog section -->
    <div class="section-head">
      <h2>Latest from<br />the blog</h2>
      <a class="view-all" href="/blog/">All posts →</a>
    </div>
    <div class="blog-list">
      {homePosts.map(post => (
        <a class="blog-row" href={`/blog/${post.slug}/`}>
          <div class="blog-row-meta">
            <div class="blog-row-title">{post.data.title}</div>
            <div class="blog-row-date">{formatDate(post.data.date)}</div>
          </div>
          <span class={`tag ${TAG_CLASSES[post.data.tags[0]!] ?? ''}`}>
            {TAG_LABELS[post.data.tags[0]!] ?? post.data.tags[0]}
          </span>
        </a>
      ))}
    </div>
  </main>
</Base>
```

- [ ] **Step 3: Run dev server and visually verify homepage**

```bash
npm run dev
```

Open `http://localhost:4321`. Verify against `design_handoff_squizzer_dev/index.html` (open it in a browser for side-by-side comparison):
- Split hero: text left, word clock right
- Word clock shows current time with lit letters
- Stats row with 3 / — / HACS appears below CTAs
- Cards grid: 3 tiles, each with its preview, version badge, name, desc, filename, and star count
- Blog list: 3 rows with title, date, tag pill
- Footer visible

Fix any layout discrepancies by comparing the CSS class names to `src/styles/global.css`.

- [ ] **Step 4: Build to verify**

```bash
npm run build
```

Expected: Build succeeds with 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/styles/global.css
git commit -m "feat: homepage with split hero, cards grid, and blog list"
```

---

## Task 8: Blog index page

**Files:**
- Create: `src/components/blog/PostFilter.astro`
- Create: `src/pages/blog/index.astro`
- Modify: `src/styles/blog.css` (verify it's populated from Task 2)

- [ ] **Step 1: Create `src/components/blog/PostFilter.astro`**

This component renders the full post list with filter controls. All posts are rendered in HTML; JS shows/hides based on tag.

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  posts: CollectionEntry<'blog'>[];
}
const { posts } = Astro.props;

const TAG_CLASSES: Record<string, string> = { ha: 'tag-ha', build: 'tag-build', auto: 'tag-auto' };
const TAG_LABELS: Record<string, string>  = { ha: 'HA', build: 'build log', auto: 'automation' };

const tagCounts: Record<string, number> = { ha: 0, build: 0, auto: 0 };
for (const p of posts) {
  for (const t of p.data.tags) {
    if (t in tagCounts) tagCounts[t]!++;
  }
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
---

<div class="filter-row">
  <span class="filter-label mono">FILTER</span>
  <div class="filter-pills">
    <button class="filter-pill active" data-filter="all">
      All <span class="filter-count mono">{posts.length}</span>
    </button>
    {Object.entries(tagCounts).map(([tag, count]) => (
      <button class="filter-pill" data-filter={tag}>
        {TAG_LABELS[tag]} <span class="filter-count mono">{count}</span>
      </button>
    ))}
  </div>
</div>

<div class="posts-list" id="posts-list">
  {posts.map(post => (
    <a
      class="post-row"
      href={`/blog/${post.slug}/`}
      data-tags={post.data.tags.join(',')}
    >
      <div class="post-row-date mono">{formatDate(post.data.date)}</div>
      <div class="post-row-main">
        <div class="post-row-title">{post.data.title}</div>
        <p class="post-row-excerpt">{post.data.excerpt}</p>
      </div>
      <span class={`tag ${TAG_CLASSES[post.data.tags[0]!] ?? ''}`}>
        {TAG_LABELS[post.data.tags[0]!] ?? post.data.tags[0]}
      </span>
    </a>
  ))}
</div>

<script>
  const pills = document.querySelectorAll<HTMLButtonElement>('.filter-pill');
  const rows  = document.querySelectorAll<HTMLElement>('.post-row');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter!;

      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      rows.forEach(row => {
        const tags = row.dataset.tags?.split(',') ?? [];
        row.hidden = filter !== 'all' && !tags.includes(filter);
      });
    });
  });
</script>
```

- [ ] **Step 2: Create `src/pages/blog/index.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import PostFilter from '../../components/blog/PostFilter.astro';
import { getCollection } from 'astro:content';
import '../../styles/blog.css';

const posts = await getCollection('blog');
const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<Base
  title="Blog — squizzer73.dev"
  description="Build logs, Home Assistant deep-dives, and automation write-ups."
  activeNav="blog"
>
  <main class="container">
    <div class="blog-header">
      <div class="eyebrow" style="margin-bottom: 14px;">BLOG</div>
      <h1>Build log</h1>
      <p class="blog-lede">Home Assistant deep-dives, card build logs, and automation write-ups.</p>
    </div>
    <PostFilter posts={sorted} />
  </main>
</Base>
```

- [ ] **Step 3: Add blog index styles to `src/styles/blog.css`**

The blog index needs these CSS classes. If `blog.html` in the design handoff does not define them, add them manually:

```css
/* Blog index page */
.blog-header {
  padding: 48px 0 40px;
}
.blog-header h1 {
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
}
.blog-lede {
  color: var(--text-muted);
  font-size: 16px;
  margin: 0 0 40px;
}
.filter-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}
.filter-label {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  text-transform: uppercase;
}
.filter-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-pill {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 120ms, border-color 120ms, color 120ms;
}
.filter-pill.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}
.filter-count { color: inherit; }
.post-row {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  gap: 24px;
  align-items: start;
  padding: 22px 0;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  color: inherit;
  transition: background 120ms;
}
.post-row:last-child { border-bottom: none; }
.post-row:hover .post-row-title { color: var(--accent); }
.post-row-date {
  font-size: 12px;
  color: var(--text-muted);
  padding-top: 2px;
}
.post-row-title {
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 6px;
  transition: color 120ms;
}
.post-row-excerpt {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.55;
  max-width: 640px;
  margin: 0;
}
```

- [ ] **Step 4: Run dev and verify blog index**

```bash
npm run dev
```

Open `http://localhost:4321/blog/`. Verify:
- Page header with BLOG eyebrow, "Build log" H1, and lede
- Filter pills: All (6), HA, build log, automation — with correct counts
- All 6 posts listed with date column, title + excerpt, tag pill
- Clicking a filter pill shows/hides rows correctly
- Hovering a row turns the title accent blue

- [ ] **Step 5: Commit**

```bash
git add src/components/blog/ src/pages/blog/index.astro src/styles/blog.css
git commit -m "feat: blog index page with tag filter"
```

---

## Task 9: Blog post layout and page

**Files:**
- Create: `src/layouts/BlogPost.astro`
- Create: `src/pages/blog/[slug].astro`

- [ ] **Step 1: Create `src/layouts/BlogPost.astro`**

```astro
---
import Base from './Base.astro';
import '../styles/blog.css';

interface Props {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  readTime: string;
}

const { title, description, date, tags, readTime } = Astro.props;

const TAG_CLASSES: Record<string, string> = { ha: 'tag-ha', build: 'tag-build', auto: 'tag-auto' };
const TAG_LABELS: Record<string, string>  = { ha: 'HA', build: 'build log', auto: 'automation' };

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
---

<Base title={`${title} — squizzer73.dev`} description={description} activeNav="blog">
  <main class="container">
    <div class="post-crumbs mono">
      <a href="/blog/">blog</a>
      <span class="sep">/</span>
      <span>{title}</span>
    </div>

    <header class="post-header">
      <div class="post-header-meta mono">
        {tags.map(t => (
          <span class={`tag ${TAG_CLASSES[t] ?? ''}`}>{TAG_LABELS[t] ?? t}</span>
        ))}
        <span class="post-meta-sep">·</span>
        <span class="post-date">{formatDate(date)}</span>
        <span class="post-meta-sep">·</span>
        <span class="post-read-time">{readTime}</span>
      </div>
      <h1>{title}</h1>
      <p class="post-lede">{description}</p>
      <div class="post-author">
        <div class="post-author-avatar mono">MS</div>
        <span>Mark Squires</span>
      </div>
    </header>

    <article class="post-body">
      <slot />
    </article>

    <footer class="post-footer">
      <a href="/blog/" class="post-back">← All posts</a>
    </footer>
  </main>
</Base>
```

- [ ] **Step 2: Add blog post styles to `src/styles/blog.css`**

Append these styles (ported from `design_handoff_squizzer_dev/blog-post.html` `<style>` block, adapted to class names used above):

```css
/* Blog post */
.post-crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
  padding: 32px 0 24px;
}
.post-crumbs a { color: var(--text-muted); }
.post-crumbs a:hover { color: var(--accent); }
.post-crumbs .sep { color: var(--text-faint); }

.post-header {
  max-width: 720px;
  margin: 0 auto 56px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--border);
}
.post-header-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.post-meta-sep { color: var(--text-faint); }
.post-header h1 {
  font-size: 38px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 16px;
}
.post-lede {
  font-size: 18px;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 0 0 24px;
}
.post-author {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}
.post-author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--accent);
}
.post-body {
  max-width: 720px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.7;
}
.post-body h2 { font-size: 22px; font-weight: 500; margin: 2.5em 0 0.75em; letter-spacing: -0.01em; }
.post-body h3 { font-size: 18px; font-weight: 500; margin: 2em 0 0.6em; }
.post-body p  { margin: 0 0 1.25em; }
.post-body a  { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.post-body ul, .post-body ol { padding-left: 1.5em; margin: 0 0 1.25em; }
.post-body li { margin-bottom: 0.4em; }
.post-body code {
  font-family: var(--font-mono);
  font-size: 0.88em;
  background: var(--surface);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--border);
}
.post-body pre {
  background: #010409;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 18px 20px;
  font-family: var(--font-mono);
  font-size: 13.5px;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0 0 1.5em;
}
.post-body pre code {
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
}
.post-body blockquote {
  border-left: 2px solid var(--accent);
  margin: 0 0 1.25em;
  padding: 4px 0 4px 18px;
  color: var(--text-muted);
  font-style: italic;
}
.post-body .callout {
  background: var(--accent-soft);
  border: 1px solid rgba(56, 139, 253, 0.25);
  border-radius: 6px;
  padding: 14px 18px;
  font-size: 14px;
  margin: 0 0 1.5em;
}
.post-footer {
  max-width: 720px;
  margin: 56px auto 0;
  padding-top: 32px;
  border-top: 1px solid var(--border);
}
.post-back {
  font-size: 14px;
  color: var(--text-muted);
}
.post-back:hover { color: var(--accent); }
```

- [ ] **Step 3: Create `src/pages/blog/[slug].astro`**

```astro
---
import { getCollection } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogPost
  title={post.data.title}
  description={post.data.excerpt}
  date={post.data.date}
  tags={post.data.tags}
  readTime={post.data.readTime}
>
  <Content />
</BlogPost>
```

- [ ] **Step 4: Run dev and verify a blog post renders**

```bash
npm run dev
```

Open `http://localhost:4321/blog/calendar-rewrite/`. Verify:
- Breadcrumb: `blog / Why I rewrote the calendar card...`
- Tag pill + date + read time in mono header row
- 38px H1
- 18px muted lede
- Author avatar (MS in accent blue) + name
- Article body with correct typography (H2s, code blocks, blockquotes)
- "← All posts" footer link

- [ ] **Step 5: Build to verify all 6 static paths generate**

```bash
npm run build
```

Expected: Build succeeds. Check `dist/blog/` — should contain 6 subdirectories, one per post slug.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BlogPost.astro src/pages/blog/[slug].astro src/styles/blog.css
git commit -m "feat: blog post layout and dynamic route"
```

---

## Task 10: Card detail shared components

**Files:**
- Create: `src/components/card-detail/InstallTabs.astro`
- Create: `src/components/card-detail/ConfigTable.astro`
- Create: `src/components/card-detail/Changelog.astro`

- [ ] **Step 1: Create `src/components/card-detail/InstallTabs.astro`**

```astro
---
---

<div>
  <div class="install-tabs">
    <button class="install-tab active" data-tab="hacs">HACS</button>
    <button class="install-tab" data-tab="manual">Manual</button>
  </div>

  <div class="install-body" id="install-hacs">
    <p>One-click install via the Home Assistant Community Store. Updates land automatically.</p>
    <div class="install-step">
      <div class="install-step-num mono">01</div>
      <div>
        Open HACS → Frontend → Custom repositories. Add this URL as type <code>Lovelace</code>:
        <div class="copyable" style="margin-top: 10px;">
          <pre class="code-block">https://github.com/squizzer73/calendar-events-card</pre>
          <button class="copy-btn mono" data-copy="https://github.com/squizzer73/calendar-events-card">copy</button>
        </div>
      </div>
    </div>
    <div class="install-step">
      <div class="install-step-num mono">02</div>
      <div>
        Install <code>calendar-events-card</code>, then add the resource to your Lovelace config
        (HACS handles this on most setups).
      </div>
    </div>
    <div class="install-step">
      <div class="install-step-num mono">03</div>
      <div>
        <span>Or hit the badge:</span>
        <div class="hacs-badge" style="margin-top: 10px; display: inline-flex;">
          <span class="pill">HACS</span>
          <span>Open in My Home Assistant</span>
        </div>
      </div>
    </div>
  </div>

  <div class="install-body" id="install-manual" hidden>
    <p>Drop the file into your custom panel and register it as a Lovelace resource.</p>
    <div class="install-step">
      <div class="install-step-num mono">01</div>
      <div>
        Download <code>calendar-events-card.js</code> from the latest release and place it
        under <code>/config/www/</code>.
      </div>
    </div>
    <div class="install-step">
      <div class="install-step-num mono">02</div>
      <div>
        Add the resource (Settings → Dashboards → ⋮ → Resources):
        <div class="copyable" style="margin-top: 10px;">
          <pre class="code-block">url: /local/calendar-events-card.js
type: module</pre>
          <button class="copy-btn mono" data-copy="url: /local/calendar-events-card.js
type: module">copy</button>
        </div>
      </div>
    </div>
    <div class="install-step">
      <div class="install-step-num mono">03</div>
      <div>Reload the frontend (Ctrl/Cmd-Shift-R) and add the card from the picker.</div>
    </div>
  </div>
</div>

<script>
  // Tab switching
  document.querySelectorAll<HTMLButtonElement>('.install-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab!;
      document.querySelectorAll('.install-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const hacs   = document.getElementById('install-hacs')!;
      const manual = document.getElementById('install-manual')!;
      hacs.hidden   = tab !== 'hacs';
      manual.hidden = tab !== 'manual';
    });
  });

  // Copy buttons
  document.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy!;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'copy';
          btn.classList.remove('copied');
        }, 1400);
      } catch { /* clipboard not available */ }
    });
  });
</script>
```

- [ ] **Step 2: Create `src/components/card-detail/ConfigTable.astro`**

```astro
---
interface ConfigRow {
  option: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
}
interface Props {
  rows: ConfigRow[];
}
const { rows } = Astro.props;
---

<table class="config-table">
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {rows.map(row => (
      <tr>
        <td><span class="name">{row.option}</span></td>
        <td><span class="type">{row.type}</span></td>
        <td>
          {row.required
            ? <span class="req">required</span>
            : <code>{row.default}</code>
          }
        </td>
        <td set:html={row.description} />
      </tr>
    ))}
  </tbody>
</table>
```

- [ ] **Step 3: Create `src/components/card-detail/Changelog.astro`**

```astro
---
interface ChangelogEntry {
  version: string;
  date: string;
  notes: string[];
}
interface Props {
  entries: ChangelogEntry[];
}
const { entries } = Astro.props;
---

<div class="changelog">
  {entries.map((entry, i) => (
    <div class={`changelog-item${i === 0 ? ' open' : ''}`} data-version={entry.version}>
      <div class="changelog-header">
        <div class="changelog-left">
          <span class="changelog-version mono">{entry.version}</span>
          <span class="changelog-date mono">{entry.date}</span>
        </div>
        <span class="changelog-chevron">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M6 4l4 4-4 4"/>
          </svg>
        </span>
      </div>
      <div class="changelog-body">
        <ul>
          {entry.notes.map(note => <li>{note}</li>)}
        </ul>
      </div>
    </div>
  ))}
</div>

<script>
  document.querySelectorAll<HTMLElement>('.changelog-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest<HTMLElement>('.changelog-item')!;
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.changelog-item').forEach(i => i.classList.remove('open'));

      // Re-open if it wasn't already open
      if (!isOpen) item.classList.add('open');
    });
  });
</script>
```

- [ ] **Step 4: Build to verify no TypeScript errors**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/card-detail/
git commit -m "feat: card detail components (install tabs, config table, changelog accordion)"
```

---

## Task 11: Calendar card detail page

**Files:**
- Create: `src/pages/cards/calendar-events-card/index.astro`

- [ ] **Step 1: Create `src/pages/cards/calendar-events-card/index.astro`**

```astro
---
import Base from '../../../layouts/Base.astro';
import CalendarPreview from '../../../components/previews/CalendarPreview.astro';
import InstallTabs from '../../../components/card-detail/InstallTabs.astro';
import ConfigTable from '../../../components/card-detail/ConfigTable.astro';
import Changelog from '../../../components/card-detail/Changelog.astro';
import '../../../styles/card-detail.css';

const configRows = [
  { option: 'type',       type: 'string', default: '',     required: true,  description: 'Always <code>custom:calendar-events-card</code>.' },
  { option: 'entities',   type: 'list',   default: '',     required: true,  description: 'List of <code>calendar.*</code> entities to display.' },
  { option: 'view',       type: 'string', default: 'month',required: false, description: 'One of <code>month</code>, <code>agenda</code>, <code>compact</code>.' },
  { option: 'days_ahead', type: 'number', default: '14',   required: false, description: 'How many days the agenda view looks forward.' },
  { option: 'colors',     type: 'map',    default: '',     required: false, description: 'Per-entity hex colour override. Defaults to the auto palette.' },
  { option: 'title',      type: 'string', default: '',     required: false, description: 'Card header. Omit to hide.' },
];

const changelogEntries = [
  {
    version: 'v1.2',
    date: '21 Apr 2026',
    notes: [
      'Auto-scaling text on the events list — never overflows again.',
      'Visual editor: drag to reorder calendars, set per-calendar colour.',
      'Fix: time zone offset on all-day events spanning DST.',
    ],
  },
  {
    version: 'v1.1',
    date: '08 Apr 2026',
    notes: [
      'Multi-calendar support with stable colour mapping.',
      'Compact mode for small Lovelace tiles.',
      'Fix: today highlight off-by-one when locale week starts on Sunday.',
    ],
  },
  {
    version: 'v1.0',
    date: '29 Mar 2026',
    notes: [
      'Initial public release.',
      'Month grid + agenda list.',
      'HACS-compatible packaging.',
    ],
  },
];
---

<Base
  title="Calendar events card — squizzer73.dev"
  description="A multi-calendar Lovelace card with auto-scaling text, visual editor, and stable colour mapping."
  activeNav="cards"
>
  <main class="container detail">
    <!-- Breadcrumbs -->
    <div class="crumbs">
      <a href="/#cards">cards</a>
      <span class="sep">/</span>
      <span class="mono">calendar-events-card</span>
    </div>

    <!-- Detail head -->
    <div class="detail-head">
      <div>
        <h1>Calendar events card</h1>
        <p class="desc">
          A multi-calendar Lovelace card with auto-scaling text, a visual editor, and stable colour
          mapping. Built because the default calendar card was a single-calendar wall of grey text.
        </p>
        <div class="detail-head-meta">
          <span class="tag tag-version">v1.2</span>
          <span>·</span>
          <span>HACS compatible</span>
          <span class="dot">·</span>
          <span>HA 2024.4+</span>
          <span class="dot">·</span>
          <span>MIT</span>
        </div>
      </div>
      <div class="detail-actions">
        <a class="btn" href="https://github.com/squizzer73/calendar-events-card" target="_blank" rel="noreferrer">View on GitHub</a>
        <a class="btn btn-primary" href="#install">Install →</a>
      </div>
    </div>

    <!-- Demo frame -->
    <div class="demo-frame">
      <div class="demo-frame-bar">
        <div class="demo-frame-bar-left">
          <span class="demo-live-dot" />
          <span>Live demo · April 2026 data</span>
        </div>
        <div class="demo-frame-controls">
          <button class="demo-tab active">month</button>
          <button class="demo-tab">agenda</button>
          <button class="demo-tab">compact</button>
        </div>
      </div>
      <div class="demo-stage">
        <CalendarPreview size="hero" />
      </div>
    </div>

    <!-- Two-column grid -->
    <div class="detail-grid">
      <div>
        <!-- Features -->
        <section>
          <h2>Features</h2>
          <ul class="features">
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>
              <div>
                Multi-calendar overlay with stable per-calendar colour mapping.
                <span class="muted">Configure once, colours stick across reloads.</span>
              </div>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>
              <div>
                Auto-scaling text via ResizeObserver.
                <span class="muted">Looks right at any tile size, from full-width to 1×1.</span>
              </div>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>
              <div>
                Three views: month grid, agenda list, compact strip.
                <span class="muted">Switch in YAML or via the visual editor.</span>
              </div>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>
              <div>
                Visual editor with drag-reorder for calendars.
                <span class="muted">No YAML required, but every option still YAML-configurable.</span>
              </div>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>
              <div>
                All-day events handled correctly across DST and timezones.
                <span class="muted">Yes, this took two rewrites.</span>
              </div>
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>
              <div>
                Keyboard navigable, screen-reader friendly.
                <span class="muted">aria-live region for upcoming events.</span>
              </div>
            </li>
          </ul>
        </section>

        <!-- Install -->
        <section id="install">
          <h2>Install</h2>
          <InstallTabs />
        </section>

        <!-- Configuration -->
        <section>
          <h2>Configuration</h2>
          <ConfigTable rows={configRows} />
        </section>

        <!-- Changelog -->
        <section>
          <h2>Changelog</h2>
          <Changelog entries={changelogEntries} />
        </section>
      </div>

      <!-- Sidebar -->
      <aside class="detail-sidebar">
        <div class="sidebar-block">
          <h3>At a glance</h3>
          <div class="sidebar-row"><span class="label">Latest</span><span class="val">v1.2</span></div>
          <div class="sidebar-row"><span class="label">Released</span><span class="val">21 Apr 2026</span></div>
          <div class="sidebar-row"><span class="label">Min HA</span><span class="val">2024.4</span></div>
          <div class="sidebar-row"><span class="label">Size</span><span class="val">28 kB</span></div>
          <div class="sidebar-row"><span class="label">License</span><span class="val">MIT</span></div>
        </div>
        <div class="sidebar-block">
          <h3>Links</h3>
          <div class="sidebar-row">
            <span class="label">Repo</span>
            <a class="val" href="https://github.com/squizzer73/calendar-events-card" target="_blank" rel="noreferrer">github ↗</a>
          </div>
          <div class="sidebar-row">
            <span class="label">Issues</span>
            <a class="val" href="https://github.com/squizzer73/calendar-events-card/issues" target="_blank" rel="noreferrer">tracker ↗</a>
          </div>
          <div class="sidebar-row">
            <span class="label">Releases</span>
            <a class="val" href="https://github.com/squizzer73/calendar-events-card/releases" target="_blank" rel="noreferrer">all ↗</a>
          </div>
        </div>
      </aside>
    </div>
  </main>
</Base>
```

- [ ] **Step 2: Run dev and verify card detail page**

```bash
npm run dev
```

Open `http://localhost:4321/cards/calendar-events-card/`. Compare against `design_handoff_squizzer_dev/card-calendar.html`. Verify:
- Breadcrumb: `cards / calendar-events-card`
- H1 + muted desc + meta line (tag, HACS, HA version, MIT)
- GitHub + Install buttons top-right
- Demo frame with green pulsing live dot and CalendarPreview in hero size
- Features list with blue check icons
- Install tabs: HACS tab active by default; clicking Manual switches body; copy buttons work
- Config table with mono option names in blue, type in muted, required in orange
- Changelog: v1.2 open by default; clicking another version closes v1.2 and opens the clicked one
- Sidebar: "At a glance" and "Links" blocks with rows divided by 1px border

- [ ] **Step 3: Build to verify**

```bash
npm run build
```

Expected: Build succeeds. `dist/cards/calendar-events-card/index.html` exists.

- [ ] **Step 4: Commit**

```bash
git add src/pages/cards/ src/styles/card-detail.css
git commit -m "feat: calendar card detail page"
```

---

## Task 12: Cloudflare Pages deployment

- [ ] **Step 1: Verify `astro.config.mjs` is correct**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [mdx()],
  site: 'https://squizzer73.dev',
});
```

Confirm `output: 'static'` is set. This tells Astro to generate a static site, not a server-side rendered one. The Cloudflare adapter in static mode is essentially a no-op for routing — it just ensures the build output is correct for Pages.

- [ ] **Step 2: Do a final production build locally**

```bash
npm run build
```

Expected: Build succeeds. `dist/` directory contains `index.html`, `blog/index.html`, `blog/calendar-rewrite/index.html` (and all other slugs), `cards/calendar-events-card/index.html`.

Check the file count:
```bash
find dist -name "*.html" | sort
```

Expected output includes at minimum:
```
dist/index.html
dist/blog/index.html
dist/blog/calendar-rewrite/index.html
dist/blog/f1-lighting/index.html
dist/blog/ha-entities-explained/index.html
dist/blog/hacs-submission/index.html
dist/blog/trv-heat-demand/index.html
dist/blog/word-clock-card/index.html
dist/cards/calendar-events-card/index.html
```

- [ ] **Step 3: Push final code to GitHub**

```bash
git add .
git status  # confirm nothing unexpected is staged
git commit -m "feat: complete squizzer73.dev v1"
git push origin main
```

- [ ] **Step 4: Connect Cloudflare Pages**

In a browser:
1. Go to `dash.cloudflare.com` → Pages → Create a project → Connect to Git
2. Select the `squizzer73/squizzer73.dev` repository
3. Set build configuration:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 18 or 20 (set in Environment variables: `NODE_VERSION = 20`)
4. Click Save and Deploy

Expected: Cloudflare Pages runs the build and deploys. First deploy URL will be `squizzer73-dev.pages.dev` or similar.

- [ ] **Step 5: Connect custom domain**

In the Cloudflare Pages project settings → Custom domains → Add custom domain:
- Enter `squizzer73.dev`
- Follow the DNS instructions (if the domain is already on Cloudflare, it adds the CNAME automatically)

- [ ] **Step 6: Verify the live site**

Open `https://squizzer73.dev` in a browser. Verify:
- All 4 pages load correctly
- Word clock updates (wait or check at a 5-minute boundary)
- Blog filter works
- Install tabs copy correctly
- Changelog accordion opens/closes
- No console errors

---

## Self-Review Notes

- All 4 pages from the spec are covered: homepage (Task 7), blog index (Task 8), blog post (Task 9), calendar detail (Task 11)
- All 5 interactive components are covered: word clock (Task 4), install tabs (Task 10), changelog accordion (Task 10), blog filter (Task 8), copy buttons (Task 10)
- GitHub repo creation is in Task 1, Cloudflare Pages is Task 12
- Content collection with 6 posts (3 full + 3 stubs) matches the spec
- Tweaks panel is not shipped — confirmed not referenced anywhere in this plan
- GitHub stars remain `—` — confirmed no live API call
- `extraStyles` prop removed from `Base.astro` in favour of CSS imports — simpler

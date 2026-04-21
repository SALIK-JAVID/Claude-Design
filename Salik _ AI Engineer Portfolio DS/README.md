# Salik Javid — Portfolio Design System

A premium design system for **Salik Javid**, Full Stack AI Engineer. Built for a portfolio that reads as a personal brand AND a shipped SaaS product.

**Aesthetic:** More minimal than Notion, closer to Linear / Vercel. Warm Notion-inspired paper tones, pure black & white accents, Inter as the workhorse, Instrument Serif for editorial accents, JetBrains Mono for code and eyebrow captions.

**Principles**
1. **Restraint, always.** One accent (black). One typeface (Inter). Serif only to signal a moment.
2. **Motion earns its keep.** Every animation answers "why does this move?" Fade-ups are default. Springs for delight.
3. **Keyboard-first.** `⌘K` command palette, `j/k` project nav, `/` to search. Every interaction should have a shortcut.
4. **Warm neutrals, not gray slush.** Paper `#FFFCF8`, ink `#191918`. Never pure white, never flat `#000`.
5. **Hairlines over shadows.** `0.5px` borders carry the UI. Shadows are reserved for floating surfaces.

---

## Sources & context

- **Brand positioning:** Full Stack AI Engineer. SaaS-product-grade portfolio, job-ready AND freelance-ready.
- **Visual inspiration:** Notion (warm paper, subtle grayscale, Inter body), Linear (precision, density, keyboard-first), Vercel (b&w hero, restraint), editorial magazines (grid, serif accents).
- **Codebase attached:** `Claude-Design/` — was empty, acknowledged as placeholder only.
- **External reference discussed:** notion.com — aesthetic inspiration only; we build an original brand, NOT a copy of Notion's proprietary UI.
- **Fonts:** Inter (via rsms.me), Instrument Serif + JetBrains Mono (Google Fonts). ⚠️ See FONT NOTE below.

---

## Font note — substitution flag

We're shipping three web fonts via CDN, no license concerns:

- **Inter** (Rasmus Andersson, OFL) — body + display. Variable.
- **Instrument Serif** (Instrument, OFL) — editorial italic accents, big numerals, section eyebrows.
- **JetBrains Mono** (JetBrains, OFL) — `<code>`, keyboard shortcuts, technical captions.

No custom fonts were requested. If Salik has a licensed display face he prefers (e.g. GT America, Söhne, Reckless), drop the `.woff2` files in `fonts/` and wire them up in `colors_and_type.css` — everything downstream will inherit.

---

## CONTENT FUNDAMENTALS

### Voice
**Confident. Quiet. Technical without being smug.** The portfolio speaks like an engineer who has already shipped, not one who needs to prove it. No adjective-soup. No "passionate about leveraging cutting-edge…" Short declarative sentences. Proper nouns over vague categories (Postgres, not "databases").

### Casing
- **Sentence case** everywhere. Buttons, nav items, card titles. `View work` not `View Work`.
- **UPPERCASE WITH WIDE TRACKING** only for eyebrows (`SELECTED WORK`, `2024 → NOW`). Max ~20 chars.
- **Lowercase** in metadata and code comments when it reads cleaner (`ts · react · pgvector`).

### Pronouns
**First person, singular, restrained.** "I build", "I ship". Never "we" — it's one person. Occasionally pivot to the reader ("Let's talk" on the CTA). No "hey friend" energy.

### Numerals
Use the numbers. `4 years`, `12 projects shipped`, `p95 latency cut 3.2×`. Tabular figures (`font-variant-numeric: tabular-nums`) on stats so digits align across rows.

### Emoji
**None in product chrome.** A single emoji may appear in a URL slug or the "what I'm building" ticker. That's the ceiling. No ✨🚀.

### Example copy (tone reference)

> **Hero**
> Full stack AI engineer.
> Shipping production-grade agents, RAG pipelines, and the web apps that wrap them. Based in {city}, available Q1.
>
> **Project card**
> **Atlas** — an agentic research assistant.
> 8k daily agent runs · 94% tool-call accuracy · ships as a Chrome extension and a hosted API.
>
> **Services page lead**
> I take on 2–3 contracts a quarter. Scope below; email me with the thing you're trying to un-stick.
>
> **Contact**
> Reach out.
> Plain email is fastest. I reply within 48 hours or I tell you I can't.

### What we don't do
- No "Hi, I'm Salik 👋"
- No "passionate about…"
- No "ninja / rockstar / 10x"
- No generic stock photography of laptops
- No `Lorem ipsum` — if we don't have copy yet, write "[placeholder: 1-sentence project summary]"

---

## VISUAL FOUNDATIONS

### Color
- **Paper `#FFFCF8`** is the default canvas. It's warm, low-glare, recognizably Notion-lineage.
- **Ink `#191918`** is the body text. Pure `#000` is reserved for the `.accent` (CTA fills, focus ring).
- **Neutral ramp** is warm-gray, 12 steps from paper → ink. Every UI surface uses `--bg`, `--bg-subtle`, `--bg-muted`; never hand-picks a hex.
- **No gradients** in chrome. A single radial glow may appear behind the hero headline in dark mode — that's it.
- **Dark mode** is `#0B0B0A` on `#EDECE7`. Not "invert the light mode" — it's tuned separately so headlines don't shimmer.

### Type
- **Inter** handles 98% of the UI. Bold 700 for display, Semibold 600 for H2/H3, Medium 500 for UI labels, Regular 400 for body.
- **Instrument Serif italic** is the "magic marker." Used in: hero subhead accent word (e.g. *"building for"*), section pull-quotes, big numerals on stats (`3.2×`), project card indices (`01`, `02`).
- **JetBrains Mono** for everything code-adjacent: `<kbd>` keys, stack chips, terminal sections, eyebrow captions like `SELECTED WORK — 2024 / 25`.
- **Line height:** 1.05 display, 1.2 H, 1.55 body, 1.75 long-form.
- **Tracking:** −0.045em at display sizes, 0 at body, +0.12em on eyebrows.

### Space & rhythm
- **4px grid.** Spacing tokens go 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
- **Section rhythm:** 128px top/bottom on desktop, 80px on mobile. Sections introduce themselves with an eyebrow + 48px gap before the H2.
- **Container:** 1200px max. Gutters are `clamp(20px, 4vw, 48px)`.

### Backgrounds & texture
- **Paper base.** No full-bleed product screenshots — we inline them inside device frames.
- **Subtle parallax grain** (SVG noise, `mix-blend: multiply`, 4% opacity) on the hero and CTA sections. Toggleable via Tweaks.
- **No repeating patterns. No gradients. No glassmorphism.**
- **Hero backdrop:** a single radial `rgba(0,0,0,0.04)` glow behind the headline, plus the grain.

### Borders, cards, elevation
- **0.5px hairlines** (`--border`, warm gray 200) carry 90% of separation. Dividers, card outlines, input borders.
- **Cards** sit on `--bg-subtle` with a hairline + `--shadow-sm`. On hover they lift to `--shadow-md` and the border strengthens. No aggressive scale — `translateY(-2px)` max.
- **Radii:** `4px` default (inputs, chips), `8px` for cards, `12px` for modals / command palette, `9999px` for pills.
- **Shadows** are stacked hairline + soft drop (e.g. `0 0 0 0.5px rgba(15,15,15,0.06), 0 6px 20px -8px rgba(15,15,15,0.08)`) — not Material drops.

### Motion
- **Default easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` — "ease-out-quad," feels like paper settling.
- **Expo ease** (`cubic-bezier(0.16, 1, 0.3, 1)`) for hero reveal and page transitions.
- **Spring** (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for delight micro-interactions — command palette open, magnetic cursor snap.
- **Durations:** 80ms instant, 160ms fast (hover), 240ms base (UI), 420ms slow (reveal), 700–1000ms for page transitions and hero words.
- **Hero reveal:** words stagger in at 40ms apart, y:16→0, opacity 0→1, blur 4→0.
- **Scroll reveal:** IntersectionObserver triggers a fade-up at threshold 0.2. One-shot, never re-animates.
- **`prefers-reduced-motion`** collapses all animations to 0.01ms.

### Hover / press states
- **Text link hover:** underline thickness stays 1px, color goes from `--border-strong` to `--fg`. No color flash.
- **Button hover:** `--accent-hover` (lighten ink to `#2B2A26`), no scale.
- **Button press:** `transform: translateY(1px)`, `box-shadow` drops one step. Never scale below 1 — that feels like a game.
- **Card hover:** `translateY(-2px)`, border `--border` → `--border-strong`, shadow `sm → md`. 240ms ease-out.
- **Magnetic cursor:** CTAs with `data-magnetic` attract the cursor within 80px; the cursor dot scales from 6px → 40px and adopts `mix-blend-mode: difference`.

### Transparency / blur
- Used **only** on the sticky top nav (`backdrop-filter: blur(16px)` + `--bg` at 72% alpha) and the command palette backdrop (`--bg` at 60% + 20px blur).
- Never on cards, buttons, or project tiles.

### Layout rules
- **Top nav is sticky, 56px, hairline-bottom, backdrop-blur.** Logo left, section links center, `⌘K` + theme toggle right.
- **Fixed elements:** magnetic cursor, top nav, command palette. Nothing else.
- **Grid:** 12-col desktop, 4-col tablet, fluid mobile. Most layouts are actually 2-col asymmetric (left rail of metadata, right main content) — feels more editorial than a rigid 12.

### Imagery
- **B&W or desaturated** for any photography. Warm grain applied consistently.
- **Device frames** — we provide browser / phone frames in `ui_kits/` for product screenshots.
- **Architecture diagrams** are SVG, line-only, with the accent color for active nodes.

---

## ICONOGRAPHY

- **System:** [Lucide Icons](https://lucide.dev) via CDN — 1.5px stroke, rounded caps, 24×24 viewBox. Matches our type weight perfectly.
- **Usage:** `<i data-lucide="arrow-up-right">` in nav/buttons. Icons always come from Lucide, never hand-drawn. If a specific icon isn't available, we use a neutral alternative, NEVER invent one.
- **Stack chips** (tech logos like React, Postgres) use the [Simple Icons](https://simpleicons.org) CDN — b&w, official wordmarks/glyphs.
- **Size scale:** 14 (inline with body), 16 (UI default), 20 (nav), 24 (prominent), 32 (empty states only).
- **Color:** `currentColor`. Icons inherit from text.
- **No emoji in chrome.** Zero.
- **Keyboard hints** use `<kbd>` elements (styled as real keycaps), not icons.
- **Logos:** `assets/salik-logo.svg` is a monogram "S/" set in Inter Bold, tracking −0.08em. There's also a `.wordmark.svg` and `.mark-dark.svg` variant.

---

## Index

```
/
├── README.md                     ← you are here
├── SKILL.md                      ← invocation instructions for agents
├── colors_and_type.css           ← design tokens (CSS vars) + semantic classes
├── assets/                       ← logos, icons, textures
│   ├── salik-logo.svg
│   ├── salik-wordmark.svg
│   └── grain.svg
├── fonts/                        ← (empty — fonts served via CDN)
├── preview/                      ← design-system preview cards (registered as assets)
│   ├── type-display.html
│   ├── type-scale.html
│   ├── type-mono.html
│   ├── colors-neutrals.html
│   ├── colors-semantic.html
│   ├── spacing.html
│   ├── radii.html
│   ├── shadows.html
│   ├── buttons.html
│   ├── inputs.html
│   ├── cards.html
│   ├── badges.html
│   ├── kbd.html
│   ├── nav.html
│   └── logo.html
└── ui_kits/
    └── portfolio/                ← hi-fi interactive portfolio
        ├── index.html            ← full scrollable homepage
        ├── README.md
        ├── hero.jsx
        ├── projects.jsx
        ├── skills.jsx
        ├── services.jsx
        ├── experience.jsx
        ├── contact.jsx
        ├── command-palette.jsx
        ├── nav.jsx
        ├── cursor.jsx
        └── primitives.jsx        ← Button, Badge, Card, Field, Section
```

---

## Quick start for agents

If you are creating something with this design system:
1. Link `colors_and_type.css` first.
2. Use the CSS vars (`--fg`, `--bg-subtle`, `--s-8`) — do NOT hand-pick hexes.
3. Use semantic classes (`.h1`, `.p-lead`, `.eyebrow`, `.kbd`, `.mono`).
4. Icons from Lucide CDN. Stack logos from Simple Icons.
5. Motion: default ease-out 240ms. Reveal sequences stagger 40–80ms.
6. Never introduce a new color, new font family, or gradient without opening the CSS token file first.

See `SKILL.md` for the Agent Skill wrapper.

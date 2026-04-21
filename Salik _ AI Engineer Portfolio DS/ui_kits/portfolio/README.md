# Portfolio UI Kit

Reference implementation for Salik Javid's portfolio. One scrollable page demonstrating every pattern in the design system.

## Run

Open `index.html`. All assets link from the project root. No build step.

## Keyboard

- `⌘K` / `Ctrl+K` — command palette
- `J` / `K` — navigate project list
- `↑` / `↓` / `Enter` — move through palette results
- `Esc` — close overlays
- `T` (from palette) — toggle theme

## Tweaks (live)

Toggle the Tweaks panel from the toolbar. Persisted to localStorage, also written back to the file on change.

- **Theme:** light / dark
- **Accent:** ink / graphite / slate
- **Density:** compact / comfortable / spacious
- **Display font:** Inter / Instrument Serif / JetBrains Mono
- **Hero layout:** editorial / split / centered
- **Projects layout:** list / sticky
- **Grain:** on / off

## Components

| File | Exports |
| --- | --- |
| `primitives.jsx` | `MagneticCursor`, `RevealText`, `Button`, `Badge`, `Chip`, `Icon`, `Section`, `useReveal` |
| `nav.jsx` | `Nav`, `CommandPalette`, `PALETTE_ITEMS` |
| `hero.jsx` | `Hero` (editorial / split / centered), `ArchitectureDiagramMini` |
| `projects.jsx` | `ProjectList`, `ProjectSticky`, `PROJECTS` |
| `architecture.jsx` | `Architecture` (animated SVG) |
| `skills.jsx` | `Skills` (tabbed), `StackMarquee` |
| `sections.jsx` | `Services`, `Experience`, `Contact` |

All components export to `window` so Babel script tags can share scope.

## Signature moves shipped

- Magnetic cursor with `mix-blend-mode: difference`
- Scroll-triggered fade-ups (IntersectionObserver, one-shot)
- Word-by-word text reveal with blur + stagger
- Sticky ⌘K command palette with group + keyboard nav
- Live architecture diagram with animated edge-flow dashes
- Infinite marquee of the stack
- Parallax SVG grain (toggleable)
- `j/k` keyboard navigation on projects
- Curtain wipe on anchor clicks
- Real `<kbd>` keycap styling

## Known trade-offs

- Form doesn't send (alert placeholder).
- GitHub / LinkedIn / X links are `#`.
- Time display assumes Asia/Karachi. Swap `timeZone` string if wrong.

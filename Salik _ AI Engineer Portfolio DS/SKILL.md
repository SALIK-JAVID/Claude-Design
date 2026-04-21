---
name: salik-javid-portfolio-design
description: Use this skill to generate well-branded interfaces and assets for Salik Javid's portfolio brand — either for production code or throwaway prototypes/mocks. Contains essential design guidelines, colors, typography, fonts, assets, and UI kit components. The aesthetic is editorial, minimal, warm-paper neutrals with pure B&W accents, Inter + Instrument Serif + JetBrains Mono. Think Notion × Linear × Vercel.
user-invocable: true
---

Read `README.md` first — it contains the content voice, visual foundations, and iconography rules. Then skim `colors_and_type.css` to learn the design tokens.

## Workflow

1. **Always link `colors_and_type.css`** as the first stylesheet. All downstream work uses its CSS variables.
2. **Use semantic classes** (`.h1`, `.eyebrow`, `.p-lead`, `.mono`, `.link`, `.kbd`) instead of hand-rolled styles.
3. **Use CSS variables** (`var(--fg)`, `var(--bg-subtle)`, `var(--s-8)`, `var(--r-lg)`) — never hand-pick hex values.
4. **Reuse components** from `ui_kits/portfolio/` — Button, Badge, Card, Field, CommandPalette, MagneticCursor. Import them rather than reimplement.
5. **Icons** come from Lucide (via `<script src="https://unpkg.com/lucide@latest"></script>` + `<i data-lucide="arrow-right">`). Stack logos come from Simple Icons (`cdn.simpleicons.org/{slug}`).
6. **Motion:** default ease is `var(--ease-out)` at `var(--dur-base)` (240ms). Staggers are 40–80ms. Respect `prefers-reduced-motion`.

## What to build

- **Visual artifacts** (mocks, slides, throwaway prototypes, case studies): copy `colors_and_type.css` and the assets you need, write a static HTML file, open in the browser.
- **Production code**: copy the CSS tokens into your framework's theme file, port the JSX primitives into your component library, and keep the semantic class names — they map 1:1 to Tailwind theme values if you prefer that stack.

## Invocation

If the user invokes this skill without other guidance, ask:
1. What are you building? (page, section, component, slide, full flow)
2. Light, dark, or both?
3. Any real copy / project data to use, or should I use plausible placeholders?
4. Does it need interactivity (command palette, keyboard nav, magnetic cursor) or is it static?

Then produce a single HTML file (for one-offs) or a small file tree (for larger work), register the output via the project's asset system if applicable, and open it in the preview.

## Hard rules

- No gradients in chrome. No emoji. No pure `#000` on pure `#FFF`.
- Hairlines (0.5px) over drop shadows.
- Sentence case for UI. UPPERCASE only for eyebrows with wide tracking.
- One accent color (black). Status colors exist but are reserved.
- Never invent a new font family. Three are enough: Inter, Instrument Serif, JetBrains Mono.

## Key files

- `README.md` — full style guide (voice, visual foundations, iconography)
- `colors_and_type.css` — design tokens
- `assets/` — logos, textures
- `ui_kits/portfolio/` — reference implementation you can copy from
- `preview/*.html` — token specimens

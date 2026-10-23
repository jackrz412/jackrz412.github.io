# DESIGN.md: the site's design language

Every page follows these rules. Values live in `src/styles/tokens.css`; this file says how to use them.
Status marks: **CURRENT** = in the code now. **PLANNED** = agreed, not built yet.

## 1. Direction

- Editorial, research-report style: reads like a well-set paper, not a dashboard.
- Paper background, ink text, one navy accent.
- IBM Plex Serif for headings, Plex Sans for body, UI and charts, Plex Mono for data identifiers (model names, prompt IDs, model output).
- Analysis first. Every element earns its place by carrying information; decoration stays minimal.
- Accessible by default: text contrast of at least 4.5:1, color never the only signal, keyboard-usable controls.

## 2. Tokens

Use the token names, never raw values. No hex values in components or pages; add a token to `tokens.css` first.
Contrast ratios are measured against `--color-bg` unless noted.

### Color: neutrals and accent

| Token | Purpose | Contrast |
| --- | --- | --- |
| `--color-bg` | Page background (soft paper) | n/a |
| `--color-surface` | Cards, panels, callouts, scroll boxes (slightly darker paper) | n/a (1.1:1, a fill) |
| `--color-border` | Dividers, card edges, table rules | n/a (1.3:1, decorative) |
| `--color-text` | Body text, headings, chart labels (ink) | 16.0:1 |
| `--color-muted` | Captions, secondary text, axis text, labels | 6.5:1 (6.0:1 on surface) |
| `--color-accent` | Links, the toggle, focus outline (navy) | 8.2:1 |

### Color: meaning

| Token | Purpose | Contrast |
| --- | --- | --- |
| `--grade-pass` / `--grade-fail` | The words "pass" / "fail". Always the word, never color alone | 6.0:1 / 6.2:1 (5.6 / 5.7 on surface) |
| `--time-before` / `--time-writing` | Time split chart segments (not models) | 5.0:1 / 2.8:1 (so every bar is labeled) |
| `--chart-payment` / `--chart-equity` | Housing charts: payment burden (rust) vs thin equity (steel blue). Not models | 5.4:1 / 5.4:1 (5.1 / 5.0 on surface); ΔE 74 protan, 85 deutan |

### Color: models (fixed per model, everywhere)

| Model | Chart mark | Contrast | Text / tint in prose |
| --- | --- | --- | --- |
| `llama3.2:3b` | `--model-llama3` | 4.4:1 | `--model-llama3-text` on `--model-llama3-tint` |
| `llama3.1:8b` | `--model-llama8` | 3.6:1 | `--model-llama8-text` on `--model-llama8-tint` |
| `gemma3:12b` | `--model-gemma` | 4.9:1 | `--model-gemma-text` on `--model-gemma-tint` |
| `phi4-mini` | `--model-phi4` | 2.9:1 | `--model-phi4-text` on `--model-phi4-tint` |
| `qwen3.5:9b` | `--model-qwen` | 7.7:1 (the tokens.css comment says 8.1) | `--model-qwen-text` on `--model-qwen-tint` |

- Chart colors are Okabe-Ito based and checked for colorblind safety on adjacent pairs. Marks below 3:1 must carry a visible label.
- Prose pairs (`-text` on `-tint`) all read at 5.1:1 or better.
- A new model gets a mark color (validated with the existing set), a `-text` and `-tint` pair, and a `ModelKey` swatch.

### Type

| Role | Token |
| --- | --- |
| Headings | `--font-serif` (600 only) |
| Body, UI, charts | `--font-sans` (400, 600) |
| Model names, IDs, model output | `--font-mono` (400 only) |

| Token | Size | Use |
| --- | --- | --- |
| `--text-sm` | 13px | Captions, chart labels, tags, tables, source notes |
| `--text-md` | 15px | Secondary text that must read easily (quote explanations) |
| `--text-base` | 17px | Body |
| `--text-lg` | 21px | `h3`; lead paragraph |
| `--text-xl` | 26px | `h2`, the findings |
| `--text-2xl` | 34px | `h1` on phones; stat tile numbers |
| `--text-3xl` | 42px | `h1` on desktop |

Line heights: `--leading-body` (1.6) for paragraphs, `--leading-tight` (1.2) for headings and tiles.
Weights: `--weight-regular` (400), `--weight-semibold` (600). Only these two are loaded.

### Space and layout

- Spacing: `--space-1` 4 · `--space-2` 8 · `--space-3` 16 · `--space-4` 24 · `--space-5` 32 · `--space-6` 48 · `--space-7` 64 (between major sections).
- `--content-width` 46rem (~77 characters, near the comfortable limit): the single centered column for text, charts and project cards. `SectionNav`'s 78rem breakpoint is derived from it; change both together.
- `--wide-width` 64rem: for content that breaks out of the text column, centered on it. Not used now; content lines up with the column's edges.
- `--radius` 6px for cards, panels, tiles. Small chips and tags use 4px (no token yet: add `--radius-sm` before reusing).
- Side padding `--space-3` keeps content off the screen edge on phones.

### Motion

| Token | Value | Use |
| --- | --- | --- |
| `--duration-fast` | 150ms | Hovers, highlights, small state changes (heatmap toggle) |
| `--duration-slow` | 400ms | Chart draw-in, larger transitions |
| `--ease` | `cubic-bezier(0.2, 0, 0, 1)` | Every transition and animation: fast start, gentle stop |

## 3. Typography (CURRENT)

- Body: Plex Sans, 17px, line height 1.6, ink on paper.
- `h1`–`h3`: Plex Serif 600, line height 1.2, margin below `--space-3`. `h1` scales from 34px to 42px with the viewport (`clamp`).
- Findings are numbered `h2`s that name the topic in a few words ("1. Accuracy and answer speed"). The first sentence of the section states the result.
- Other sections use short topic `h2`s too, unnumbered ("Speed and size").
- `code` is Plex Mono at 0.9em. Use it for every model name, prompt ID and file name.
- A model name in prose: `<code class="model-name" data-model="…">`. It shows in the model's color on its tint and never breaks across lines.
- Model output (quotes, prompts) is `pre` in mono, `--text-sm`. It keeps its line breaks but wraps to the container (`pre-wrap`, `overflow-wrap: anywhere`).
- Captions and labels: `--text-sm`, `--color-muted`.
- Eyebrow labels (e.g. "Results"): `--text-sm`, semibold, uppercase, 0.08em letter spacing, muted. These are currently sans.
- Keyboard focus: a 2px `--color-accent` outline, 2px offset, on every focusable element (`:focus-visible`, so mouse clicks don't show it).
- Fonts are self-hosted through `@fontsource`, so the page makes no third-party font requests.

## 4. Charts

Built with Observable Plot in the page's `<script>`. Colors and fonts are read from tokens at runtime (`token('--…')`), never hard-coded.

| Rule | Status |
| --- | --- |
| Model colors are fixed per model across every chart (`modelColors`, from `--model-*`) | CURRENT |
| Direct labels instead of legends: model names beside dots, counts at bar ends, totals on stacked bars. A legend only when a chart's colors aren't models (time split) or labels won't fit (failure modes uses `ModelKey`) | CURRENT |
| Faint gridlines (Plot `grid: true`), muted axis text, no tick marks on categorical axes | CURRENT |
| A chart with an x-axis title sets `marginBottom: axisTitleMargin` (38px, Plot's default is 30), so the title sits 8px clear of the tick numbers. Charts with no bottom axis title (the heatmap) leave it out | CURRENT |
| Zero baselines where honest: bar lengths start at 0. Dot charts may start elsewhere, and a log axis is used when values span 20× or more, said so in the caption | CURRENT |
| Every chart has a `figcaption` saying how to read it | CURRENT |
| Every interactive mark has a hover tooltip (`tip`) | CURRENT |
| Marks: dots 8px radius with a 2px paper ring; bars rounded 4px at the data end only; 2px paper gap between adjacent fills; text labels get a paper halo | CURRENT |
| New palettes are validated for colorblind safety and contrast before use | CURRENT |
| Chart title states the finding, not the axes. Today the section's first sentence does this; charts have no own titles | PLANNED |
| Source line under every chart: small mono muted text naming the data file and run | PLANNED |
| When a chart makes a point about one series, highlight it and gray the rest | PLANNED |

## 5. Motion & navigation

### Rules

- Motion must carry meaning: it shows change, orientation, or the subject. No decoration.
- All animation sits inside `@media (prefers-reduced-motion: no-preference)`. Every feature has a complete static fallback: with motion off, nothing is missing, only unanimated.
- Animate only `transform` and `opacity`. Use only the motion tokens for durations and easing (staggers are multiples of `--duration-fast`).
  - One exception: a cell whose data changes in place (the heatmap's JSON toggle) may transition `fill` over `--duration-fast`.
  - One exception to the tokens: a bar whose length is a time may draw in at that time's pace, linear, scaled so the longest bar takes 6s (the time split chart: `timeScale` ≈ 0.040 s per measured second, every bar starting together).
- Nothing loops except the title cursor. Scroll-triggered effects run once per page load.
- Banned: fade-in-everything on scroll, parallax, scroll-jacking (taking over the scroll position or speed).

### Patterns

| Pattern | What it is | When to use it | Where it lives | Status |
| --- | --- | --- | --- | --- |
| Blinking cursor | A navy block after the page title. Hard on/off blink (`steps(1)`, 1s), about 5 blinks, then solid. `aria-hidden` | Once per page, after the `h1` only | `BlinkCursor` component | CURRENT |
| Reading progress bar | A 2px navy line fixed to the top of the window, filling as the page scrolls. Pure CSS scroll-driven animation (`animation-timeline: scroll()`); browsers without support show nothing | Every page, automatically | `BaseLayout` | CURRENT |
| Chart draw-in | When a chart first scrolls into view (IntersectionObserver, once), bars grow from the baseline and dots fade and scale in, staggered by model, over `--duration-slow`. Stagger: one `--duration-fast` step per model. Heatmap cells change color over `--duration-fast` when a toggle changes the data. CSS keyframe animations (not transitions), so they never delay the highlight's opacity changes. Static: charts are fully drawn | Every chart with bars or dots. Only the marks animate, never axes, text or reference lines | `byModel(data, kind)` in the page script; `modelDots` includes it | CURRENT |
| Section navigator | A sticky list of the page's sections in the left margin, using mono labels. Highlights the section in view (IntersectionObserver) and jumps to it on click. A `<nav>` with an `aria-label`; the current item has `aria-current`. Hidden on narrow screens | Long pages with 4 or more `h2` sections. A section can set `data-nav-label` for a shorter label. Jumps stop `--space-5` short of the section (`scroll-margin-top` on `section[id]` in `global.css`) | `SectionNav` component (`<SectionNav />` once in the page); shows from 78rem wide | CURRENT |
| Linked highlighting | Hovering (mouse), keyboard-focusing or tapping (touch, toggles) a model name anywhere (text, color key, chart marks) highlights that model: chart marks and key items for other models dim to 25% opacity over `--duration-fast`. Model names in text never dim; matching ones get a 1px ring in their own color. One shared state per page (`setHighlight(model)`). Model names and key items are focusable. Static: the highlight still applies, instantly | Any page where one model's results appear in several places. Every chart mark for a model carries `data-model` (via `byModel`) | Page script (`setHighlight`), styles in `global.css` | CURRENT |
| Speed race | One row per model, ordered by size, each streaming the same ~25-word sentence at that model's measured speed (characters per second from `summary.json`). Starts when in view, shows each finish time, has a Replay button. `qwen3.5:9b` is labeled answer-only speed (thinking excluded). Typing is paced by the data (a script, not CSS motion), so like the time split it is exempt from the duration tokens. Static: the HTML is the finished race, with times written out; the script only replays it | Showing a speed difference people should feel, not just read | `SpeedRace` component (Speed and size section) | CURRENT |

## 6. Planned details (not built yet)

- Tabular numerals (`font-variant-numeric: tabular-nums`) in tables, tiles and chart labels.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Section labels (eyebrows) in mono uppercase. Today they are sans.
- Heading anchor links, so findings can be linked directly.
- Open Graph preview image and tags (`og:title`, `og:description`, `og:image`).
- Favicon.
- Sidenotes in the margin on wide screens, falling back to inline notes on phones.

## 7. Components

### Exists now

| Component | Where | Use it for |
| --- | --- | --- |
| `BaseLayout` | `src/layouts/` | Every page: fonts, global styles, the site header, the centered column, the reading progress bar, `title` and `description` |
| `SiteFooter` | `src/components/` | The footer on every page (via `BaseLayout`): colophon (fonts, tools, a link to the code) and "Updated Mon YYYY", set at build time in US Eastern time |
| `ContactLinks` | `src/components/` | Email, LinkedIn, GitHub, Resume links from `home.json`. Skips any still set to `"TODO"`; shows the resume only when its file exists in `public/`. The email is stored reversed in two halves and assembled into a mailto link by script, so it never appears in the HTML |
| `SiteHeader` | `src/components/` | The header on every page (via `BaseLayout`): name at left linking home, small links at right (About, Projects, GitHub, Contact). Section links use `/#id` so they work from any page; the current page's link has `aria-current="page"` and the accent color. Text from `src/data/home.json`. A 2px `--color-accent` bar runs the full window width under it |
| `SectionNav` | `src/components/` | The section list in the left margin on wide screens; lists every `section[id]` with an `h2` |
| `SpeedRace` | `src/components/` | The speed race: one row per model, by size, typing one sentence at its measured characters per second |
| `ProjectCard` | `src/components/` | One project from the `projects` collection: 16:9 art area, title, summary, mono meta line (tools · Mon YYYY). Live cards are one link (the title link stretched over the card; external links get ↗). In-progress cards: dashed border, faded art, no link |
| `ProjectGrid` | `src/components/` | A list of project cards, sorted by `order` then newest first. Up to 3 columns on wide screens, inside the text column so cards line up with the headings; below 40rem a swipe row with scroll-snap and the next card peeking in. A focusable, labeled region |
| `BlinkCursor` | `src/components/` | The blinking block after a page's `h1`: `<h1>Title<BlinkCursor /></h1>` |
| `ModelKey` | `src/components/` | A color key of the models in `summary.json`, next to charts colored by model |
| `QuoteCard` | `src/components/` | A model's output on a card: model / question / run table, centered output, explanation tagged pass or fail |
| `.model-name` class | `global.css` | Any model name in running text |
| Stat tiles (`.stat-tiles`) | page-local | A row of 3–4 headline numbers (will become `StatTile`) |
| Intro panel (`.intro-panel`) | page-local | Grouping a page's setup sections on `--color-surface` |
| Results rule + eyebrow | page-local | Marking where the findings begin |
| Ruled heading (`h2.ruled`) | page-local (homepage) | Project-list headings: a 1px `--color-border` line from the end of the heading to the window's right edge |
| Chart helpers (`base`, `byModel`, `modelDots`, `modelLabels`) | page script | Shared Plot settings, model tagging and draw-in, model dots and labels |

### To build

| Component | Use it for |
| --- | --- |
| `SectionHeading` | Numbered finding headings with an anchor link and an optional eyebrow, so every finding looks and links the same |
| `Figure` | Every chart: the chart slot, a caption, and the required source line. Replaces bare `figure` + `figcaption` |
| `Sidenote` | Asides and method details beside the text on wide screens, inline on phones. Use it instead of parenthetical paragraphs |
| `StatTile` | One headline number with a short label. Use it in a row of 3–4, never alone, and only for numbers the page explains below |

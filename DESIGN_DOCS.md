# Design documentation

This document is the **design contract** for notkaramel.github.io. It exists so future edits (human or automated) stay coherent and avoid generic “SaaS landing page” aesthetics.

## Brand keywords

- **Pastel-first** — airy, paper-like backgrounds; ink is cool and desaturated.
- **Geometric play** — circles, rounded squares, off-axis grids; not perfect symmetry everywhere.
- **Editorial** — typographic hierarchy matters more than dense UI chrome.
- **Warm engineering** — friendly, handmade motion; not slick corporate motion.

## Non-goals (anti-patterns)

Avoid these unless the site owner explicitly asks for a redesign:

- **Inter / Roboto + purple gradient hero** default startup look.
- **Three identical feature cards** in a row with icons from the same pack.
- **Glassmorphism stacks** and heavy blur meshes that fight readability.
- **Over-automated copy tone** (“Empower your workflow…”).

## Color tokens

Defined as CSS variables in [`src/styles/tokens.css`](src/styles/tokens.css). Do not hard-code unrelated hex values in components unless you are introducing a new token (then document it here).

| Token | Role |
|-------|------|
| `--color-bg` | Page background |
| `--color-surface` | Cards / panels |
| `--color-ink` | Primary text |
| `--color-muted` | Secondary text |
| `--color-primary` | Pastel baby blue accent |
| `--color-secondary` | Soft teal accent |
| `--color-accent` | Warm muted orange accent |
| `--color-link` / `--color-link-hover` | Text links |

Pastels can fail contrast for small text. Prefer **muted ink** for long paragraphs; reserve light blues/teals for **surfaces**, highlights, and large type.

## Typography

- **Display:** Fraunces (Google Fonts) — expressive headings, slightly “printed”.
- **Body:** Source Sans 3 — readable, neutral without being generic UI sans.

Type ramp uses fluid `clamp()` steps (`--step-*` variables). When adding new headings, reuse the ramp instead of inventing new font sizes.

## Spacing and radii

- Rhythm uses `--space-xs` through `--space-xl`.
- Default card rounding: `--radius` plus a few pixels in section-specific CSS when a softer tile is needed.

## Landing tiles

The home page is a **hub of tiles**, not a traditional hero + CTA.

**States**

1. **Idle** — tiles sit on a subtle pastel wash; slight rotation variety per tile.
2. **Hover** — scale up slightly, lift shadow; no aggressive parallax.
3. **Active (press)** — subtle compress.
4. **Navigation** — click goes to the target section index; Astro’s **`<ClientRouter />`** (view transitions) keeps navigation soft.

**Reduced motion**

All meaningful motion must degrade under `prefers-reduced-motion: reduce` (see global CSS). Hover scale may collapse to no transform; transitions should be effectively instant.

## Section pages

- **Projects:** cards are intentionally uneven widths (auto-fit grid), not a rigid SaaS grid.
- **Experience:** left rail line + stacked entries; reads like a curated CV, not an applicant tracking form.
- **Wiki:** sticky sidebar on wide screens; stacks on small screens.
- **Gallery:** lazy-loaded images, captions from frontmatter; avoid loading full-resolution assets in listings.

## Media performance

- Use `loading="lazy"` and `decoding="async"` on non-critical images.
- Prefer **responsive** derivatives when replacing SVG placeholders with photos (`srcset` / Astro `Image` if introduced later).
- Do not autoplay audio/video on page load.

## Accessibility checklist

- Visible **focus** styles on interactive elements (links, tiles, nav).
- **Skip link** to `#main` is present in `BaseLayout`.
- **Alt text** is required for gallery images (`art` collection `alt` field).
- MuseScore and iframe demos should have textual fallbacks when implemented for real.

## CMS scope (Decap)

The **`/admin/`** UI ([`public/admin/`](public/admin/)) is for **Markdown content and uploads** only. It must not become the place to “redesign” the site: **colors, typography, layout primitives, and motion** stay in [`src/styles/`](src/styles/) and Astro components. If editorial needs drive a new visual pattern, implement it in code and tokens first, then document it here.

## When this document conflicts with code

Treat **this file as intent** and open an issue or PR to reconcile:

- If production must diverge (e.g. contrast fix), update tokens here **and** in `tokens.css` together.

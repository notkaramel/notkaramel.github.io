# Agents guide (notkaramel.github.io)

This file is for humans and for automated tools that edit the repo. Read it before making structural or visual changes.

## Purpose

Personal portfolio site: **projects**, **art** (music + gallery), **experience** (resume-shaped), **blog**, and a **technical wiki**. Content is Markdown in **content collections**; the UI is Astro components and global CSS tokens.

## Toolchain

- **Bun only** for installs and scripts. Do not add `package-lock.json` or `yarn.lock`.
- Install deps: `bun install`
- Dev server: `bun run dev`
- Production build: `bun run build` (output in `dist/`)
- Preview build: `bun run preview`
- Typecheck: `bun run check`

There is **no GitHub Actions workflow** in this repo by design. Deploy however you prefer (e.g. manual upload of `dist/`, GitHub Pages from `dist/`, or another host).

## Where to edit

| What | Where |
|------|--------|
| Global look (colors, type scale, base styles) | [`src/styles/tokens.css`](src/styles/tokens.css), [`src/styles/global.css`](src/styles/global.css) |
| Shell (header, footer, `<head>`) | [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro), [`src/components/layout/`](src/components/layout/) |
| Landing tiles | [`src/components/landing/LandingTiles.astro`](src/components/landing/LandingTiles.astro) |
| Collection schemas | [`src/content.config.ts`](src/content.config.ts) |
| Markdown content | [`src/content/<collection>/`](src/content/) |
| Routes | [`src/pages/`](src/pages/) |
| Static assets (favicon, placeholder media) | [`public/`](public/) |
| Decap CMS (admin UI + collection config) | [`public/admin/`](public/admin/) |
| CMS uploads (built site) | [`public/uploads/`](public/uploads/) |

Design rules that should survive refactors live in [`DESIGN_DOCS.md`](DESIGN_DOCS.md). If you change the visual language, update that document in the same PR.

## Content collections (frontmatter contracts)

Defined in [`src/content.config.ts`](src/content.config.ts). Common fields:

- **`draft: true`** — entry is omitted from public listings and `getStaticPaths` where filtered.
- **`order`** — lower numbers sort earlier within a section when applicable.

### `projects`

- `title`, `description`, `github` (URL), optional `demoUrl`, `tags[]`, `order`, `draft`
- Body: long-form write-up.

### `blog`

- `title`, `description`, `pubDate` (date), `tags[]`, optional `audio` (URL), `draft`
- Body: post.

### `wiki`

- `title`, `description`, `category` (string bucket for grouping), `order`, `draft`
- Body: article.

### `experience`

- `title`, `kind` (`work` \| `education` \| `teaching` \| `research` \| `publication` \| `workshop`), `org`, optional `location`, `startDate`, optional `endDate`, `order`, `draft`
- Body: short narrative bullets or paragraph.

### `art` (gallery metadata)

- `title`, `caption`, `alt`, `image` (path under `public/`), `category` (`portrait` \| `landscape` \| `other`), `order`, `draft`
- Body: optional longer note (not shown on gallery cards today).

## Decap CMS (`/admin/`)

- **Config:** [`public/admin/config.yml`](public/admin/config.yml) defines collections and fields. **Keep every field in sync** with [`src/content.config.ts`](src/content.config.ts): if you add or rename a Zod property, update the matching Decap field (and vice versa).
- **Entry filenames:** Decap uses `slug: "{{slug}}"` with `identifier_field: title` so new files get URL-safe names from the title. Astro uses the filename (without `.md`) as the collection entry `id` for routes.
- **Tags (`blog`, `projects`):** Decap `list` widget with no nested `field` stores a **comma-separated** list as a YAML array (see [Decap list widget](https://decapcms.org/docs/widgets/list/)).
- **`pubDate` (blog):** Use the datetime widget; values are written as a string that Zod coerces with `z.coerce.date()`.
- **Wiki `category`:** The CMS uses a **select** with `linux` \| `networking` \| `learning`. To add a category, update **both** [`public/admin/config.yml`](public/admin/config.yml) and any grouping logic in pages if needed.
- **Auth:** GitHub requires an OAuth **proxy** (`backend.base_url`). Official overview: [Decap backends](https://decapcms.org/docs/backends-overview/) (see “Using Github with an OAuth Proxy”). Do not commit OAuth **client secrets** into this repo—only the proxy stores them.
- **Publishing:** CMS saves commits to Git; the static site still needs a **build + deploy** step (no GitHub Actions in this repo by default).
- **Optional local-only editing:** To avoid GitHub auth while developing, you can temporarily set `local_backend: true` in `config.yml`, run a local Decap proxy (`bunx decap-server` per [Decap local backend](https://decapcms.org/docs/working-with-a-local-git-repository/)), then **revert** `local_backend` before shipping so production does not point editors at localhost.

## Embeds and security

- Prefer **linking out** to demos and MuseScore pages. **iframes** often fail on third-party sites due to `X-Frame-Options` / CSP.
- Never commit API keys, tokens, or private URLs.

## Docker

The [`Dockerfile`](Dockerfile) builds with Bun and serves static files with nginx. Requires `bun.lock` for `--frozen-lockfile`; generate it locally with `bun install` before relying on Docker in CI elsewhere.

## Product references

- High-level goals and tone: [`DESIGN_THOUGHTS.md`](DESIGN_THOUGHTS.md) (author notes, not a spec).
- Visual contract: [`DESIGN_DOCS.md`](DESIGN_DOCS.md).

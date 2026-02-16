# AGENTS.md

Guidance for AI agents working on this codebase.

## Project Overview

**Antoine's Portfolio** — A personal website/portfolio/blog built with SvelteKit. Hosted on GitHub Pages (notkaramel.github.io) and deployed via Vercel. Canonical domain: antoinephan.com.

## Tech Stack

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Runtime    | Bun                                                 |
| Framework  | SvelteKit 2.x                                       |
| UI         | Svelte 5 (runes: `$props`, `$derived`, `$state`)    |
| Styling    | TailwindCSS v4, DaisyUI                             |
| Font       | Comfortaa Variable (@fontsource-variable/comfortaa) |
| Markdown   | gray-matter, marked                                 |
| Animations | anime.js, svelte/transition                         |
| Deployment | Vercel (@sveltejs/adapter-vercel)                   |

## Project Structure

```
├── blogs/                    # Blog markdown files (flat: *.md)
├── cooking/                  # Recipe markdown (nested: YYYY-MM/recipe-name/index.md)
├── src/
│   ├── app.css               # Tailwind + DaisyUI themes + prose + font-faces
│   ├── app.html              # HTML shell
│   ├── app.d.ts              # App types
│   ├── lib/
│   │   ├── index.ts          # Exports: routes
│   │   ├── schemas.ts        # TypeScript types (aliased as @schemas)
│   │   ├── newblog.ts        # CLI: bun run src/lib/newblog.ts
│   │   ├── content/          # Static content modules
│   │   │   ├── cv.ts         # CV data (academic, publications, work, skills)
│   │   │   ├── projects.ts   # Project list
│   │   │   └── music.ts      # MuseScore transcripts
│   │   └── components/       # Reusable Svelte components
│   └── routes/
│       ├── +page.svelte      # Home (portfolio/resume)
│       ├── api/
│       │   ├── blogs/+server.ts
│       │   └── cooking/+server.ts, cooking/[...path]/+server.ts
│       └── (main)/           # Layout group: Navbar + pt-16
│           ├── +layout.svelte
│           ├── blogs/        # Blog listing + [slug]
│           ├── cooking/      # Recipe listing + [slug]
│           ├── music/        # MuseScore embeds
│           └── projects/     # Project gallery
```

## Path Aliases

- `$lib` → `src/lib`
- `@app.css` → `src/app.css`
- `@schemas` → `src/lib/schemas.ts`

## Key Conventions

### Svelte 5

- Use runes: `$props()`, `$derived()`, `$state()`.
- Use `{@render children()}` for slot content.
- Use `$props<{ data: PageData }>()` for page data.

### Content & Data

- **Blogs**: Flat `.md` in `blogs/`. Frontmatter: `title`, `slug`, `description`, `date`, `lastUpdated`, `tags`.
- **Recipes**: Nested `cooking/YYYY-MM/recipe-name/index.md`. Same frontmatter as blogs. Images referenced relatively; loaders rewrite paths to `/api/cooking/{recipeDir}/{imagePath}`.
- **Static content**: `src/lib/content/*.ts` exports typed data (cv, projects, music).

### API Routes

- `GET /api/blogs` — Reads `blogs/*.md`, returns `{ frontmatter, content }[]` sorted by date.
- `GET /api/cooking` — Recursively finds `index.md` in `cooking/`, returns `{ frontmatter, content, recipeDir }[]`.
- `GET /api/cooking/[...path]` — Serves static files (images) from `cooking/` with path traversal protection.

### Schemas (`@schemas`)

- `BlogFrontmatter`, `RecipeFrontmatter` — Same shape for blogs/recipes.
- `Route` — `{ title, url, icon }` for nav.
- `Project`, `AcademicRecord`, `Publication`, `ConferenceWorkshop`, `WorkExperience`, `Skill`, `Transcript`, `NewBlogAnswers`.

### Styling

- DaisyUI themes: `bright-caramel` (default), `dark-caramel`.
- ThemeSwapper toggles via `localStorage` and DaisyUI `theme-controller`.
- Prose styles in `app.css` for markdown content.
- Tailwind v4: `container` vs `@container` differ; see README.
- **Content colours**: Use `primary-content`, `secondary-content`, and `accent-content` for text, borders, and rings. These contrast with their base colours (primary, secondary, accent) and ensure readability and theme consistency across light/dark modes.

### Components

| Component            | Purpose                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Navbar               | Fixed top nav, routes, mobile dropdown, ThemeSwapper                                                                                        |
| ThemeSwapper         | Light/dark toggle (sun/moon icons)                                                                                                          |
| SearchEngineOp       | SEO: title, description, canonical                                                                                                          |
| ResumeSection        | Section wrapper with title + children                                                                                                       |
| Dropdown             | Collapsible (collapse-arrow) for resume items                                                                                               |
| general/\*Section    | SkillsSection, ProjectsSection, ExperienceSection, EducationSection, PublicationsSection, WorkshopsSection — content sections for home page |
| BlogCard, RecipeCard | Card for listing blogs/recipes                                                                                                              |
| ProjectCard          | Project card (featured only)                                                                                                                |
| MuseScore            | MuseScore embed iframe                                                                                                                      |
| Progress             | Vertical steps (checkpoints)                                                                                                                |

### Layouts

- `(main)/+layout.svelte`: Navbar + `pt-16`, wraps all main routes.
- `blogs/+layout.svelte`, `cooking/+layout.svelte`: Centered container for content.
- Home (`+page.svelte`) does not use `(main)` layout; it imports Navbar directly and has its own gradient background.

## Scripts

```sh
bun run dev          # Vite dev server
bun run build        # Production build
bun run new          # Scaffold new blog (bun run src/lib/newblog.ts)
bun run format       # Prettier
bun run check        # svelte-check
```

## Vite Plugins

- `watch-blogs`, `watch-cooking`: Vite dev server watches `blogs/` and `cooking/` for hot reload.

## Creating a New Blog

- Run `bun run new` (or `bun run src/lib/newblog.ts`).
- Prompts: title, slug, description, tags, date.
- Output: `blogs/{slug}.md` with frontmatter.

## Creating a New Recipe

- Add `cooking/YYYY-MM/recipe-name/index.md`. Same frontmatter as blogs. Images go in the same folder; use relative paths in markdown (e.g. `./image.png`).

## Error Handling

- `blogs/[slug]/+error.svelte`, `cooking/[slug]/+error.svelte`: 404 for missing slug.
- API routes return 500 on parse errors.

## Guidelines for AI Agents

1. **Preserve existing patterns**: Use Svelte 5 runes, `@schemas` types, DaisyUI components.
2. **Content paths**: Blogs in `blogs/`, recipes in `cooking/YYYY-MM/name/`.
3. **SEO**: Add `SearchEngineOp` to new pages with title, description, canonical.
4. **Styling**: Prefer DaisyUI classes (btn, badge, card, etc.) and semantic color tokens. Use **content colours** (`primary-content`, `secondary-content`, `accent-content`) for text, borders, and rings—they provide proper contrast with base colours and theme consistency across light/dark modes.
5. **Imports**: Use `$lib`, `@app.css`, `@schemas` aliases.
6. **Formatting**: Run `bun run format` before committing.
7. **Tailwind v4**: Be aware of `container` vs `@container`; see README.

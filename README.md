# notkaramel.github.io

Personal site: projects, art, experience, blog, and a small wiki. Built with [Astro](https://astro.build/) and [Bun](https://bun.sh/).

## Prerequisites

Install [Bun](https://bun.sh/) (v1+).

## Develop

```bash
bun install
bun run dev
```

Open the URL shown in the terminal (usually `http://localhost:4321`).

## Build and preview

```bash
bun run build
bun run preview
```

## Typecheck

```bash
bun run check
```

## Content

Markdown lives under `src/content/` in collection folders (`blog`, `wiki`, `projects`, `experience`, `art`). Edit frontmatter and body there; layouts read those files at build time.

## Content management (Decap CMS)

The site includes **[Decap CMS](https://decapcms.org/)** at **`/admin/`** ([`public/admin/`](public/admin/)): a browser UI that edits the same Markdown files and commits to GitHub.

1. Deploy the built site (or run `bun run preview` after `bun run build`) so `https://<your-domain>/admin/` loads.
2. **GitHub authentication** needs a small **OAuth proxy** (GitHub does not allow fully client-only OAuth for this flow). Typical options:
   - Deploy a worker such as [sterlingwes/decap-proxy](https://github.com/sterlingwes/decap-proxy) (Cloudflare Worker) and set its `CLIENT_ID` / `CLIENT_SECRET` from a [GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) for this repository.
   - Or host on **Netlify** and use Netlify’s GitHub auth integration as described in [Decap’s GitHub backend docs](https://decapcms.org/docs/github-backend/).
3. In [`public/admin/config.yml`](public/admin/config.yml), set `backend.repo` / `backend.branch` / `backend.site_url` to match your repo and deployed origin. **Uncomment and set `backend.base_url`** to your OAuth proxy origin (unless you rely on Netlify’s default).
4. After saving in the CMS, changes are **commits on GitHub**. The live static site updates only after you **`bun run build`** and redeploy `dist/` (this repo does not include a GitHub Actions workflow).

Uploaded media from the CMS media library is stored under **`public/uploads/`** and served as **`/uploads/...`**.

## Docker

See the `Dockerfile` at the repo root: multi-stage image builds the static site with Bun, then serves `dist/` with nginx.

```bash
docker build -t notkaramel-site .
docker run --rm -p 8080:80 notkaramel-site
```

Then visit `http://localhost:8080`.

## More for contributors

- [Agents.md](Agents.md) — repo conventions and where to change things.
- [DESIGN_DOCS.md](DESIGN_DOCS.md) — visual and UX contract for the site.

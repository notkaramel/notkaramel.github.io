import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { WikiFrontmatter } from "@schemas";

type WikiEntry = { frontmatter: WikiFrontmatter; content: string };

export const load: PageLoad = async ({ params, url, fetch }) => {
  const response = await fetch("/api/wiki");

  if (!response.ok) {
    error(500, "Failed to load wiki");
  }

  const wiki: WikiEntry[] = await response.json();
  const page = wiki.find((entry) => entry.frontmatter.slug === params.slug);

  if (page) {
    return {
      canonicalURL: url.href,
      title: page.frontmatter.title,
      description: page.frontmatter.description,
      date: page.frontmatter.date,
      lastUpdated: page.frontmatter.lastUpdated,
      tags: Array.isArray(page.frontmatter.tags) ? page.frontmatter.tags : [],
      content: page.content,
    };
  }

  error(404, "Not found");
};

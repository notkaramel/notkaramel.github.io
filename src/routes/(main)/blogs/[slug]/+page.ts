import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { BlogFrontmatter } from "@schemas";

type BlogEntry = { frontmatter: BlogFrontmatter; content: string };

export const load: PageLoad = async ({ params, url, fetch }) => {
  const response = await fetch("/api/blogs");

  if (!response.ok) {
    error(500, "Failed to load blogs");
  }

  const blogs: BlogEntry[] = await response.json();
  const post = blogs.find((entry) => entry.frontmatter.slug === params.slug);

  if (post) {
    return {
      canonicalURL: url.href,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      date: post.frontmatter.date,
      lastUpdated: post.frontmatter.lastUpdated,
      tags: Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : [],
      categories: Array.isArray(post.frontmatter.categories)
        ? post.frontmatter.categories
        : [],
      content: post.content,
    };
  }

  error(404, "Not found");
};

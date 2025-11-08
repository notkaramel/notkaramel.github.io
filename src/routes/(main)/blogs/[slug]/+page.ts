import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import blogs from "$lib/content/blogs.json";

export const load: PageLoad = async ({ params, url }) => {
  const post = blogs.find((entry) => entry.frontmatter.slug === params.slug);

  if (post) {
    return {
      canonicalURL: url.href,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      date: post.frontmatter.date,
      lastUpdated: post.frontmatter.lastUpdated,
      tags: Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : [],
      content: post.content,
    };
  }

  error(404, "Not found");
};

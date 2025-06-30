import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import blogs from "$lib/content/blogs.json";

export const load: PageLoad = async ({ params }) => {
  const post = blogs.filter((e) => e.frontmatter.slug == params.slug)[0];

  if (post) {
    return {
      title: post.frontmatter.title,
      timeWritten: post.frontmatter.timeWritten,
      lastUpdated: post.frontmatter.lastUpdated,
      content: post.content,
    };
  }

  error(404, "Not found");
};

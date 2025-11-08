import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import blogs from "$lib/content/blogs.json";

function toSortableDate(value?: string): number {
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export const load: PageLoad = async ({ url }) => {
  if (blogs == null) {
    error(404, "Not found");
  }

  function compareByDate(
    firstBlog: (typeof blogs)[number],
    secondBlog: (typeof blogs)[number],
  ): number {
    const secondDate =
      toSortableDate(secondBlog.frontmatter?.lastUpdated) ||
      toSortableDate(secondBlog.frontmatter?.timeWritten);
    const firstDate =
      toSortableDate(firstBlog.frontmatter?.lastUpdated) ||
      toSortableDate(firstBlog.frontmatter?.timeWritten);

    return secondDate - firstDate;
  }

  const sortedBlogs = [...blogs].sort(compareByDate);

  return {
    canonicalURL: url.href,
    blogs: sortedBlogs,
  };
};

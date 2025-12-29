import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, fetch }) => {
  const response = await fetch("/api/blogs");

  if (!response.ok) {
    error(500, "Failed to load blogs");
  }

  const blogs = await response.json();

  if (blogs == null) {
    error(404, "Not found");
  }

  return {
    canonicalURL: url.href,
    blogs: blogs,
  };
};

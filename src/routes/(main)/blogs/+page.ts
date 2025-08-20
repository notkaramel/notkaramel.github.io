import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import blogs from "$lib/content/blogs.json";

export const load: PageLoad = async ({url}) => {
  if (blogs == null) {
    error(404, "Not found");
  }  

  return {
    canonicalURL: url.href,
    blogs: blogs,
  };
};

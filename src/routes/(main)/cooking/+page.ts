import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, fetch }) => {
  const response = await fetch("/api/cooking");

  if (!response.ok) {
    error(500, "Failed to load recipes");
  }

  const recipes = await response.json();

  if (recipes == null) {
    error(404, "Not found");
  }

  return {
    canonicalURL: url.href,
    recipes: recipes,
  };
};

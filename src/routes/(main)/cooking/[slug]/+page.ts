import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url, fetch }) => {
  const response = await fetch("/api/recipes");

  if (!response.ok) {
    error(500, "Failed to load recipes");
  }

  const recipes = await response.json();
  const recipe = recipes.find((entry: { frontmatter: { slug: string; }; }) => entry.frontmatter.slug === params.slug);

  if (recipe) {
    return {
      canonicalURL: url.href,
      title: recipe.frontmatter.title,
      description: recipe.frontmatter.description,
      date: recipe.frontmatter.date,
      lastUpdated: recipe.frontmatter.lastUpdated,
      tags: Array.isArray(recipe.frontmatter.tags) ? recipe.frontmatter.tags : [],
      content: recipe.content,
    };
  }

  error(404, "Not found");
};
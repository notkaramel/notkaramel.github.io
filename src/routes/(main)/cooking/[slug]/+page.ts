import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url, fetch }) => {
  const response = await fetch("/api/cooking");

  if (!response.ok) {
    error(500, "Failed to load recipes");
  }

  const recipes = await response.json();
  const recipe = recipes.find(
    (entry: { frontmatter: { slug: string } }) =>
      entry.frontmatter.slug === params.slug,
  );

  if (recipe) {
    // Process markdown content to replace relative image paths
    let processedContent = recipe.content;
    if (recipe.recipeDir) {
      // Replace relative image paths like ./image.png or image.png with /cooking/{recipeDir}/image.png
      processedContent = processedContent.replace(
        /!\[([^\]]*)\]\((\.\/)?([^)]+)\)/g,
        (
          match: string,
          alt: string,
          relativePrefix: string,
          imagePath: string,
        ) => {
          // Skip if it's already an absolute URL (http:// or https://)
          if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://")
          ) {
            return match;
          }
          // Convert relative path to absolute path
          const absolutePath = `/api/cooking/${recipe.recipeDir}/${imagePath}`;
          return `![${alt}](${absolutePath})`;
        },
      );
    }

    return {
      canonicalURL: url.href,
      title: recipe.frontmatter.title,
      description: recipe.frontmatter.description,
      date: recipe.frontmatter.date,
      lastUpdated: recipe.frontmatter.lastUpdated,
      tags: Array.isArray(recipe.frontmatter.tags)
        ? recipe.frontmatter.tags
        : [],
      content: processedContent,
    };
  }

  error(404, "Not found");
};

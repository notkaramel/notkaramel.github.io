import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { RequestHandler } from './$types';

function toSortableDate(value?: string): number {
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

async function findRecipeFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively search in subdirectories
      const subFiles = await findRecipeFiles(fullPath, baseDir);
      files.push(...subFiles);
    } else if (entry.name === "index.md") {
      files.push(fullPath);
    }
  }

  return files;
}

export const GET: RequestHandler = async () => {
  try {
    // Get the cooking directory path (relative to project root)
    const cookingDir = path.resolve(process.cwd(), "cooking");

    // Recursively find all index.md files
    const recipeFiles = await findRecipeFiles(cookingDir);

    // Parse each markdown file
    const recipes = await Promise.all(
      recipeFiles.map(async (filePath) => {
        const fileContent = await readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        // Extract slug and directory path: cooking/YYYY-MM/recipe-name/index.md
        const relativePath = path.relative(cookingDir, filePath);
        const pathParts = relativePath.split(path.sep);
        const slug = pathParts.length >= 2 ? pathParts[pathParts.length - 2] : path.basename(filePath, '.md');
        // Get directory path (YYYY-MM/recipe-name) for image serving
        const recipeDir = pathParts.length >= 2 ? pathParts.slice(0, -1).join('/') : '';

        return {
          frontmatter: {
            ...data,
            slug: data.slug || slug,
          },
          content,
          recipeDir, // Directory path for serving images
        };
      })
    );

    // Sort recipes by date (lastUpdated or date, most recent first)
    function compareByDate(
      firstRecipe: { frontmatter: Record<string, any> },
      secondRecipe: { frontmatter: Record<string, any> },
    ): number {
      const secondDate =
        toSortableDate(secondRecipe.frontmatter?.lastUpdated) ||
        toSortableDate(secondRecipe.frontmatter?.date);
      const firstDate =
        toSortableDate(firstRecipe.frontmatter?.lastUpdated) ||
        toSortableDate(firstRecipe.frontmatter?.date);

      return secondDate - firstDate;
    }

    const sortedRecipes = [...recipes].sort(compareByDate);

    return new Response(JSON.stringify(sortedRecipes), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error parsing recipes:", err);
    return new Response(JSON.stringify({ error: "Failed to parse recipes" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
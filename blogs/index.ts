/**
 * This runs via `bun run blogs` from the root directory
 * - Purpose: Parse all blogs in this folder and send it to
 * /src/lib/blogs.json -- not tracked by git
 */

import { readdir } from "node:fs/promises";
import path from "path";
import matter from "gray-matter";

const dirname = import.meta.dirname;

// Directory containing markdown files
const blogsDir = path.join(dirname, "../blogs");

// Output file
const outputFile = path.join(dirname, "../src/lib/content/", "blogs.json");

try {
  const entries = await readdir(blogsDir);
  const mdFiles = entries.filter((file) => file.endsWith(".md"));

  const blogPosts = await Promise.all(
    mdFiles.map(async (filename) => {
      const filePath = path.join(blogsDir, filename);
      const fileContent = await Bun.file(filePath).text();
      const { data, content } = matter(fileContent);

      return {
        frontmatter: data,
        content,
      };
    })
  );

  await Bun.write(outputFile, JSON.stringify(blogPosts, null, 2));

  console.table(blogPosts.map((post) => post.frontmatter).map((frontmatter) => ({
    title: frontmatter.title,
    slug: frontmatter.slug,
    date: frontmatter.date,
    lastUpdated: frontmatter.lastUpdated,
  })));

  console.log(`Parsed ${blogPosts.length} blog posts into ${outputFile}`);
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}
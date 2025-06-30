import fs from "node:fs/promises";
import path from "path";
import matter from "gray-matter";
import { error, log } from "node:console";

const dirname = import.meta.dirname;

// Directory containing markdown files
const blogsDir = path.join(dirname, "../blogs");

// Output file
const outputFile = path.join(dirname, "../src/lib/content/", "blogs.json");

try {
  const entries = await fs.readdir(blogsDir);
  const mdFiles = entries.filter((file) => file.endsWith(".md"));

  const blogPosts = await Promise.all(
    mdFiles.map(async (filename) => {
      const filePath = path.join(blogsDir, filename);
      const fileContent = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(fileContent);

      return {
        frontmatter: data,
        content,
      };
    })
  );

  await fs.writeFile(outputFile, JSON.stringify(blogPosts, null, 2), "utf8");

  log(`Parsed ${blogPosts.length} blog posts into ${outputFile}`);
} catch (err) {
  error(err);
}

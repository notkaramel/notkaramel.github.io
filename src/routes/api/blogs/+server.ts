import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { RequestHandler } from "./$types";

function toSortableDate(value?: string): number {
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export const GET: RequestHandler = async () => {
  try {
    // Get the blogs directory path (relative to project root)
    const blogsDir = path.resolve(process.cwd(), "blogs");

    // Read all markdown files from blogs directory
    const entries = await readdir(blogsDir);
    const mdFiles = entries.filter((file) => file.endsWith(".md"));

    // Parse each markdown file
    const blogPosts = await Promise.all(
      mdFiles.map(async (filename) => {
        const filePath = path.join(blogsDir, filename);
        const fileContent = await readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        return {
          frontmatter: data,
          content,
        };
      }),
    );

    // Sort blogs by date (lastUpdated or date, most recent first)
    function compareByDate(
      firstBlog: (typeof blogPosts)[number],
      secondBlog: (typeof blogPosts)[number],
    ): number {
      const secondDate =
        toSortableDate(secondBlog.frontmatter?.lastUpdated) ||
        toSortableDate(secondBlog.frontmatter?.date);
      const firstDate =
        toSortableDate(firstBlog.frontmatter?.lastUpdated) ||
        toSortableDate(firstBlog.frontmatter?.date);

      return secondDate - firstDate;
    }

    const sortedBlogs = [...blogPosts].sort(compareByDate);

    return new Response(JSON.stringify(sortedBlogs), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error parsing blogs:", err);
    return new Response(JSON.stringify({ error: "Failed to parse blogs" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

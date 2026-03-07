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

/** Recursively find all .md files under dir, returns paths relative to dir (e.g. travel/welcome-to-montreal.md) */
async function findMarkdownFiles(
  dir: string,
  baseDir: string = dir,
): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const result: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      const nested = await findMarkdownFiles(fullPath, baseDir);
      result.push(...nested);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      result.push(relativePath);
    }
  }

  return result;
}

export const GET: RequestHandler = async () => {
  try {
    const blogsDir = path.resolve(process.cwd(), "blogs");
    const relativePaths = await findMarkdownFiles(blogsDir);

    const blogPosts = await Promise.all(
      relativePaths.map(async (relativePath) => {
        const filePath = path.join(blogsDir, relativePath);
        const fileContent = await readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        const topic = path.dirname(relativePath);
        const topicLabel =
          topic === "."
            ? "misc"
            : topic.charAt(0).toUpperCase() + topic.slice(1);

        return {
          frontmatter: { ...data, topic: topicLabel },
          content,
        };
      }),
    );

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

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  try {
    const wikiDir = path.resolve(process.cwd(), "wiki");
    const entries = await readdir(wikiDir);
    const mdFiles = entries.filter((file) => file.endsWith(".md"));

    const wikiPages = await Promise.all(
      mdFiles.map(async (filename) => {
        const filePath = path.join(wikiDir, filename);
        const fileContent = await readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        return {
          frontmatter: data,
          content,
        };
      }),
    );

    return new Response(JSON.stringify(wikiPages), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error parsing wiki:", err);
    return new Response(JSON.stringify({ error: "Failed to parse wiki" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

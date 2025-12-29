import { readFile } from "node:fs/promises";
import path from "node:path";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  try {
    const filePath = params.path;

    // Security: prevent directory traversal
    if (filePath.includes("..") || path.isAbsolute(filePath)) {
      error(400, "Invalid path");
    }

    // Resolve the file path relative to the cooking directory
    const cookingDir = path.resolve(process.cwd(), "cooking");
    const fullPath = path.resolve(cookingDir, filePath);

    // Ensure the file is within the cooking directory (normalize paths for comparison)
    const normalizedCookingDir = path.normalize(cookingDir);
    const normalizedFullPath = path.normalize(fullPath);
    if (
      !normalizedFullPath.startsWith(normalizedCookingDir + path.sep) &&
      normalizedFullPath !== normalizedCookingDir
    ) {
      error(403, "Access denied");
    }

    // Check if file exists and read it
    try {
      const fileContent = await readFile(fullPath);
      const ext = path.extname(filePath).toLowerCase();

      // Determine content type based on file extension
      const contentTypeMap: Record<string, string> = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
      };

      const contentType = contentTypeMap[ext] || "application/octet-stream";

      return new Response(fileContent, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch (err) {
      error(404, "File not found");
    }
  } catch (err) {
    console.error("Error serving cooking file:", err);
    error(500, "Failed to serve file");
  }
};

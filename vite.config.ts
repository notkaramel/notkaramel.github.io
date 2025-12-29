import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    {
      name: "watch-blogs",
      configureServer(server) {
        const blogsDir = path.resolve(process.cwd(), "blogs");
        server.watcher.add(blogsDir);
      },
    },
  ],
});

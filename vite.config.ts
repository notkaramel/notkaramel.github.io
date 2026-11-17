import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter(),
    }),

    {
      name: "watch-blogs",
      configureServer(server) {
        const blogsDir = path.resolve(process.cwd(), "blogs");
        server.watcher.add(blogsDir);
      },
    },
    {
      name: "watch-wiki",
      configureServer(server) {
        const wikiDir = path.resolve(process.cwd(), "wiki");
        server.watcher.add(wikiDir);
      },
    },
    {
      name: "watch-cooking",
      configureServer(server) {
        const cookingDir = path.resolve(process.cwd(), "cooking");
        server.watcher.add(cookingDir);
      },
    },
  ],
});

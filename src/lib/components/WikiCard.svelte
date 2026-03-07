<script lang="ts">
  import type { WikiFrontmatter } from "@schemas";
  import { slide } from "svelte/transition";

  let { frontmatter }: { frontmatter: WikiFrontmatter } = $props();

  function formatDate(value?: string | null): string | null {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const tags = $derived(Array.isArray(frontmatter.tags) ? frontmatter.tags : []);
  const published = $derived(formatDate(frontmatter?.date));
  const updated = $derived(formatDate(frontmatter?.lastUpdated));
</script>

<li
  class="blog-card blog-card-hover
    ring-2 ring-primary-content focus-visible:ring-2 hover:scale-[1.012] hover:shadow-xl hover:shadow-primary transform-gpu"
  transition:slide
>
  <a href={`/wiki/${frontmatter.slug}`} class="flex flex-col gap-3 p-6">
    <h2 class="font-semibold text-xl text-primary-content tracking-tight">
      {frontmatter.title}
    </h2>
    <div class="flex flex-wrap items-center gap-2">
      {#each tags as tag}
        <span class="badge badge-primary badge-outline text-primary-content text-xs">
          {tag}
        </span>
      {/each}
    </div>
    <div class="space-y-1 text-sm text-primary-content/90">
      {#if published}
        <p>Published {published}</p>
      {/if}
      {#if updated && updated !== published}
        <p>Updated {updated}</p>
      {/if}
    </div>
  </a>
</li>

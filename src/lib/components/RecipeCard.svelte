<script lang="ts">
  import type { RecipeFrontmatter } from "#schemas";
  import { slide } from "svelte/transition";

  let { frontmatter }: { frontmatter: RecipeFrontmatter } = $props();

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

  const tags = $derived(
    Array.isArray(frontmatter?.tags)
      ? frontmatter.tags.filter(
          (tag): tag is string =>
            typeof tag === "string" && tag.trim().length > 0,
        )
      : [],
  );
  const published = $derived(formatDate(frontmatter?.date));
  const updated = $derived(formatDate(frontmatter?.lastUpdated));
</script>

<li class="blog-card blog-card-hover overflow-hidden" transition:slide>
  <a href={`/cooking/${frontmatter.slug}`} class="flex flex-col h-full">
    <div
      class="h-2 w-full border-b-2 border-[var(--neo-ink)] bg-[var(--neo-yellow)]"
      aria-hidden="true"
    ></div>

    <div class="flex flex-col gap-3 p-6">
      <div class="flex items-start justify-between gap-4">
        <h2
          class="font-extrabold text-xl text-primary-content tracking-tight leading-snug"
        >
          {frontmatter.title}
        </h2>
        <span
          class="neo-pill neo-pill-yellow px-2.5 py-1 text-xs shrink-0"
          aria-hidden="true"
        >
          Recipe →
        </span>
      </div>

      {#if frontmatter.description}
        <p class="text-sm text-primary-content/85 leading-relaxed line-clamp-2">
          {frontmatter.description}
        </p>
      {/if}

      {#if tags.length > 0}
        <div class="flex flex-wrap items-center gap-1.5">
          {#each tags as tag (tag)}
            <span class="neo-pill neo-pill-soft px-2.5 py-0.5 text-xs">
              {tag}
            </span>
          {/each}
        </div>
      {/if}

      <div
        class="pt-2 border-t-2 border-dashed border-[var(--neo-ink)]/20 flex flex-wrap gap-3 text-xs font-artistic text-primary-content/75"
      >
        {#if published}
          <span>Published {published}</span>
        {/if}
        {#if updated && updated !== published}
          <span>Updated {updated}</span>
        {/if}
      </div>
    </div>
  </a>
</li>

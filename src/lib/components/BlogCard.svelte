<script lang="ts">
  import type { BlogFrontmatter } from "#schemas";
  import { slide } from "svelte/transition";

  let { frontmatter }: { frontmatter: BlogFrontmatter } = $props();

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

  const categories = $derived(
    Array.isArray(frontmatter?.categories)
      ? frontmatter.categories.filter(
          (cat) => typeof cat === "string" && cat.trim().length > 0,
        )
      : [],
  );

  const topic = $derived(frontmatter?.topic);

  const dateLines = $derived.by(() => {
    const dates: string[] = [];
    const published = formatDate(frontmatter?.date);
    const updated = formatDate(frontmatter?.lastUpdated);
    if (published) dates.push(`Published ${published}`);
    if (updated && published !== updated) dates.push(`Updated ${updated}`);
    return dates;
  });
</script>

<li class="blog-card blog-card-hover overflow-hidden" transition:slide>
  <a href={`/blogs/${frontmatter.slug}`} class="flex flex-col h-full">
    <!-- Pastel top ribbon -->
    <div
      class="h-2.5 w-full border-b-2 border-[var(--neo-ink)]"
      style="background: linear-gradient(90deg, var(--neo-blue) 0%, var(--neo-yellow) 100%);"
      aria-hidden="true"
    ></div>

    <div class="flex flex-col gap-3.5 p-6">
      <div class="flex items-start justify-between gap-4">
        <h2
          class="font-extrabold text-xl sm:text-2xl text-primary-content tracking-tight leading-snug"
        >
          {frontmatter.title}
        </h2>
        <span
          class="neo-pill neo-pill-yellow px-2.5 py-1 text-xs shrink-0"
          aria-hidden="true"
        >
          Read →
        </span>
      </div>

      {#if frontmatter.description}
        <p class="text-sm text-primary-content/85 leading-relaxed line-clamp-2">
          {frontmatter.description}
        </p>
      {/if}

      <div class="flex flex-wrap items-center gap-2">
        {#if topic}
          <span class="neo-pill neo-pill-yellow px-2.5 py-0.5 text-xs">
            #{topic}
          </span>
        {/if}
        {#each categories as cat (cat)}
          <span class="neo-pill neo-pill-blue px-2.5 py-0.5 text-xs">
            {cat}
          </span>
        {/each}
        {#each tags as tag (tag)}
          <span class="neo-pill neo-pill-soft px-2.5 py-0.5 text-xs">
            {tag}
          </span>
        {/each}
      </div>

      <div
        class="pt-2 border-t-2 border-dashed border-[var(--neo-ink)]/20 flex flex-wrap items-center gap-3 text-xs font-artistic text-primary-content/75"
      >
        {#if dateLines.length > 0}
          {#each dateLines as line (line)}
            <span>{line}</span>
          {/each}
        {:else}
          <span>Updated timeline coming soon.</span>
        {/if}
      </div>
    </div>
  </a>
</li>

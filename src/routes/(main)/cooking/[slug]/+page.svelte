<script lang="ts">
  import type { PageProps } from "./$types";
  import SearchEngineOp from "#lib/components/SearchEngineOp.svelte";
  import TableOfContents from "#lib/components/TableOfContents.svelte";
  import { parseMarkdownWithHeadingIds, extractToc } from "#lib/markdown.ts";

  let { data }: PageProps = $props();

  const content = $derived(parseMarkdownWithHeadingIds(data.content));
  const toc = $derived(extractToc(data.content));
</script>

<SearchEngineOp
  title="{data.title} – a recipe by @notkaramel"
  description={data.description}
  canonical={data.canonicalURL}
/>

<main class="w-full min-h-screen px-3 sm:px-6 pb-16">
  <div
    class="max-w-6xl mx-auto py-8 {toc.length > 0
      ? 'lg:grid lg:grid-cols-[240px_1fr] lg:gap-8 items-start'
      : ''}"
  >
    {#if toc.length > 0}
      <TableOfContents entries={toc} contained={true} />
    {/if}

    <div class="min-w-0 space-y-7">
      <header
        class="neo-card p-6 sm:p-8 lg:p-10 text-center space-y-4"
        style="background: linear-gradient(135deg, var(--neo-yellow-soft) 0%, var(--neo-surface) 52%, var(--neo-blue-soft) 100%);"
      >
        <div class="flex flex-wrap justify-center items-center gap-2">
          <span class="neo-pill neo-pill-yellow px-3 py-0.5 text-xs">
            🍞 Recipe
          </span>
          {#each data.tags as tag (tag)}
            <span class="neo-pill neo-pill-blue px-3 py-0.5 text-xs">
              #{tag}
            </span>
          {/each}
        </div>

        <h1
          class="text-3xl sm:text-4xl font-extrabold text-primary-content tracking-tight leading-tight"
        >
          {data.title}
        </h1>

        {#if data.description}
          <p
            class="text-base font-artistic text-primary-content/85 max-w-2xl mx-auto"
          >
            {data.description}
          </p>
        {/if}

        <div
          class="pt-3 border-t-2 border-dashed border-[var(--neo-ink)]/25 flex flex-wrap justify-center items-center gap-2 text-xs font-bold text-primary-content/75"
        >
          <span>Published {data.date}</span>
          {#if data.lastUpdated && data.lastUpdated !== data.date}
            <span>·</span>
            <span>Updated {data.lastUpdated}</span>
          {/if}
          <span>·</span>
          <span>by @notkaramel</span>
        </div>
      </header>

      <article class="neo-card blog-article p-6 sm:p-8 lg:p-10">
        <div class="prose max-w-full">
          {@html content}
        </div>
        <div
          class="mt-12 pt-6 border-t-2 border-dashed border-[var(--neo-ink)]/25"
        >
          <a href="/cooking" class="neo-btn neo-btn-yellow px-5 py-2 text-sm">
            ← Back to Cooking
          </a>
        </div>
      </article>
    </div>
  </div>
</main>

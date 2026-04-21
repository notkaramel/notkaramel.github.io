<script lang="ts">
  import type { PageProps } from "./$types";
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";
  import TableOfContents from "$lib/components/TableOfContents.svelte";
  import {
    parseMarkdownWithHeadingIds,
    extractToc,
  } from "$lib/markdown";

  let { data }: PageProps = $props();

  const content = $derived(parseMarkdownWithHeadingIds(data.content));
  const toc = $derived(extractToc(data.content));
</script>

<SearchEngineOp
  title="{data.title} – a blog by @notkaramel"
  description={data.description || "Checkout my blogs on various topics, including - but not limited to - Linux, travelling, technical takes, and food recipes!"}
  canonical={data.canonicalURL}
/>

<!-- Floating ToC handles both desktop sidebar and mobile drawer internally -->
<TableOfContents entries={toc} floating={true} />

<!-- Centered article content -->
<main class="w-full min-h-screen">
  <div class="max-w-3xl mx-auto px-6 py-8 space-y-6">
    <header class="blog-card p-6 lg:p-8 text-center">
      <h1 class="text-3xl lg:text-4xl font-bold text-primary-content tracking-tight mb-3">
        {data.title}
      </h1>
      {#if data.description}
        <p class="text-primary-content/90 max-w-2xl mx-auto mb-4">
          {data.description}
        </p>
      {/if}
      <div class="flex flex-wrap justify-center items-center gap-2 mb-3">
        {#each data.categories as cat}
          <span class="badge badge-primary text-primary-content text-xs">
            {cat}
          </span>
        {/each}
        {#each data.tags as tag}
          <span class="badge badge-primary badge-outline text-primary-content text-xs">
            {tag}
          </span>
        {/each}
      </div>
      <p class="text-sm text-primary-content/80">
        <span>Published {data.date}</span>
        {#if data.lastUpdated && data.lastUpdated !== data.date}
          <span class="mx-2">·</span>
          <span>Updated {data.lastUpdated}</span>
        {/if}
      </p>
      <p class="text-sm text-primary-content/80">by @notkaramel</p>
    </header>

    <article class="blog-card blog-article p-6 lg:p-8">
      <div class="prose max-w-full">
        {@html content}
      </div>
      <div class="mt-10 pt-6 border-t border-primary-content">
        <a href="/blogs" class="btn btn-primary btn-outline text-primary-content">
          ← Back to Blog
        </a>
      </div>
    </article>
  </div>
</main>

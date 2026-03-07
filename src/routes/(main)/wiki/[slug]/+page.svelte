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
  title="{data.title} – Wiki"
  description={data.description || "Technical documentation and guide."}
  canonical={data.canonicalURL}
/>

<div class="w-full">
  <aside
    class="hidden lg:block fixed left-0 top-24 w-56 h-[calc(100vh-5rem)] overflow-y-auto pl-4 pr-2 py-4 z-10"
  >
    <TableOfContents entries={toc} floating={true} />
  </aside>

  <div class="lg:hidden px-6 pt-6">
    <TableOfContents entries={toc} />
  </div>

  <main class="w-full lg:pl-56">
    <div class="max-w-3xl mx-auto px-6 lg:px-12 py-8 space-y-6">
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
      </header>

      <article class="blog-card blog-article p-6 lg:p-8">
        <div class="prose max-w-full">
          {@html content}
        </div>
        <div class="mt-10 pt-6 border-t border-primary-content">
          <a
            href="/wiki"
            class="btn btn-primary btn-outline text-primary-content"
          >
            ← Back to Wiki
          </a>
        </div>
      </article>
    </div>
  </main>
</div>

<script lang="ts">
  import type { PageProps } from "./$types";
  import { marked } from "marked";
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";

  let { data }: PageProps = $props();
  let content = $derived(marked.parse(data.content));
</script>

<SearchEngineOp
  title="{data.title} - a blog by @notkaramel"
  description={data.description || "Checkout my blogs on various topics, including - but not limited to - Linux, travelling, technical takes, and food recipes!"}
  canonical={data.canonicalURL}
/>

<div class="container lg:max-w-6xl w-full mx-auto px-6 lg:px-12 space-y-6 my-8">
  <!-- Article header card -->
  <header class="blog-card p-6 lg:p-8 text-center">
    <h1 class="text-3xl lg:text-4xl font-bold text-primary-content tracking-tight mb-3">
      {data.title}
    </h1>
    {#if data.description}
      <p class="text-primary-content/90 max-w-2xl mx-auto mb-4">{data.description}</p>
    {/if}
    <div class="flex flex-wrap justify-center items-center gap-2 mb-3">
      {#each data.categories as cat}
        <span class="badge badge-primary text-primary-content text-xs">{cat}</span>
      {/each}
      {#each data.tags as tag}
        <span class="badge badge-primary badge-outline text-primary-content text-xs">{tag}</span>
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

  <!-- Article content card -->
  <article class="blog-card blog-article p-6 lg:p-8">
    <div class="prose max-w-full">
      {@html content}
    </div>
    <div class="mt-10 pt-6 border-t border-primary-content">
      <a href="/blogs" class="btn btn-primary btn-outline text-primary-content">
        ← Back to Blogs
      </a>
    </div>
  </article>
</div>

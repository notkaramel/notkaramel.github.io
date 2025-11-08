<script lang="ts">
  import type { PageProps } from "./$types";
  import { marked } from "marked";
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";

  let { data }: PageProps = $props();
  let content = $derived(marked.parse(data.content));
</script>

<SearchEngineOp
  title="{data.title} - a blog by @notkaramel"
  description="Checkout my blogs on various topics, including - but not limited to - Linux, travelling, technical takes, and food recipes!"
  canonical={data.canonicalURL}
/>

<div class=" text-center">
  <h1 class="text-4xl font-bold text-shadow-primary text-shadow-sm mb-3">
    {data.title}
  </h1>
  <p>Published: {data.date}</p>
  {#if data.lastUpdated != data.date}
    <p>
      Last Updated: {data.lastUpdated}
    </p>
  {/if}
</div>

<div class="divider divider-primary divider-center my-4">by @notkaramel</div>

<div class="prose max-w-full">
  {@html content}

  <div class="divider divider-primary divider-center mt-10">
    <a href="/blogs">
      <button class="btn btn-primary"> Back to Blogs </button>
    </a>
  </div>
</div>

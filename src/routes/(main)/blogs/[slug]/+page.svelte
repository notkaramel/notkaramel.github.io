<script lang="ts">
  import type { PageProps } from "./$types";
  import { marked } from "marked";

  let { data }: PageProps = $props();
  let content = $derived(marked.parse(data.content));
</script>

<title>{data.title} - a blog by @notkaramel</title>

<div class=" text-center">
  <h1 class="text-4xl font-bold text-shadow-primary text-shadow-sm mb-3">
    {data.title}
  </h1>
  <p>
    Created: {data.timeWritten}
  </p>
  {#if data.lastUpdated != data.timeWritten}
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

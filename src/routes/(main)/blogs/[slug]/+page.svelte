<script lang="ts">
  import type { PageProps } from "./$types";
  import { marked } from "marked";

  let { data }: PageProps = $props();
  let content = $derived(marked.parse(data.content));
</script>

<!-- <div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/blogs">Blogs</a></li>
    <li>{data.title}</li>
  </ul>
</div> -->

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

<div
  class="prose max-w-full prose-sm lg:prose-base
        *:text-neutral-content
        prose-pre:bg-primary prose-pre:text-primary-content
        prose-hr:my-3 prose-p:my-1 prose-ul:my-2
        prose-code:text-sm lg:prose-code:text-base
        prose-h1:my-4 prose-h2:my-2 prose-h3:my-1
        prose-a:link-primary-content"
>
  {@html content}

  <div class="divider divider-accent divider-center"> ~ </div>
  <div>
    <a href="/blogs">
      <button class="btn btn-primary">
Back to Blogs
      </button>
    </a>
  </div>
</div>

<script lang="ts">
  import BlogCard from "$lib/components/BlogCard.svelte";
  import type { BlogFrontmatter } from "@schemas";

  let {
    blogs = [],
  }: {
    blogs: { frontmatter: BlogFrontmatter; content: string }[];
  } = $props();
</script>

<div class="space-y-6 min-h-[40vh]">
  {#if blogs.length === 0}
    <div class="blog-card p-12 text-center">
      <p class="text-primary-content/90 text-lg mb-2">
        No blogs match your filters.
      </p>
      <p class="text-sm text-primary-content/70">
        Try adjusting search or topic filters above.
      </p>
    </div>
  {:else}
    <ul class="w-full space-y-6">
      {#each blogs as blog (blog.frontmatter.slug)}
        <BlogCard frontmatter={blog.frontmatter} />
      {/each}
    </ul>
  {/if}
</div>

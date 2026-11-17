<script lang="ts">
  import BlogCard from "#lib/components/BlogCard.svelte";
  import type { BlogFrontmatter } from "#schemas";

  let {
    blogs = [],
  }: {
    blogs: { frontmatter: BlogFrontmatter; content: string }[];
  } = $props();
</script>

<div class="space-y-6 min-h-[40vh]">
  {#if blogs.length === 0}
    <div class="neo-card p-12 text-center space-y-2">
      <p class="text-primary-content text-lg font-bold">
        No blog notes match your filters ♪
      </p>
      <p class="text-sm font-artistic text-primary-content/75">
        Try adjusting your search or clearing topic pills above.
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

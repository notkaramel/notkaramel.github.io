<script lang="ts">
  import BlogList from "$lib/components/BlogList.svelte";
  import type { BlogFrontmatter } from "@schemas";

  let {
    blogs = [],
  }: {
    blogs: { frontmatter: BlogFrontmatter; content: string }[];
  } = $props();
</script>

<div class="container lg:max-w-6xl w-full mx-auto px-6 lg:px-12 overflow-visible">
  <BlogList {blogs} />
</div>

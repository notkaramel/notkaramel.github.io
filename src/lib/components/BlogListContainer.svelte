<script lang="ts">
  import BlogList from "#lib/components/BlogList.svelte";
  import type { BlogFrontmatter } from "#schemas";

  let {
    blogs = [],
  }: {
    blogs: { frontmatter: BlogFrontmatter; content: string }[];
  } = $props();
</script>

<div class="w-full overflow-visible">
  <BlogList {blogs} />
</div>

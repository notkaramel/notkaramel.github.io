<script lang="ts">
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";
  import BlogCard from "$lib/components/BlogCard.svelte";
  import type { BlogFrontmatter } from "@schemas";

  type PageData = {
    canonicalURL: string;
    blogs: {
      frontmatter: BlogFrontmatter;
      content: string;
    }[];
  };

  const { data } = $props<{ data: PageData }>();

</script>

<SearchEngineOp
  title="I write stuffs sometimes :P"
  description="Checkout my blogs on various topics, including - but not limited to - Linux, travelling, technical takes, and food recipes!"
  canonical={data.canonicalURL}
/>

<div>
  <p class="text-2xl text-center">I write blogs about all kinds of stuffs</p>
  <hr class="hr my-4" />

  <ul class="w-full space-y-4">
    {#each data.blogs as blog (blog.frontmatter.slug)}
      <BlogCard frontmatter={blog.frontmatter} />
    {/each}
  </ul>
</div>

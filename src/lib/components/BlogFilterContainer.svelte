<script lang="ts">
  import BlogSearchFilter from "$lib/components/BlogSearchFilter.svelte";
  import type { BlogCategory } from "@schemas";

  let {
    searchQuery = $bindable(""),
    sortBy = $bindable("date-desc" as "date-desc" | "date-asc" | "title" | "category"),
    selectedCategories = $bindable(new Set<BlogCategory>()),
  }: {
    searchQuery?: string;
    sortBy?: "date-desc" | "date-asc" | "title" | "category";
    selectedCategories?: Set<BlogCategory>;
  } = $props();
</script>

<div class="container lg:max-w-6xl w-full mx-auto px-6 lg:px-12 overflow-visible">
  <BlogSearchFilter
    bind:searchQuery
    bind:sortBy
    bind:selectedCategories
  />
</div>

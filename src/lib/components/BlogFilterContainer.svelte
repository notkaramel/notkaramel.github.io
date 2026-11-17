<script lang="ts">
  import BlogSearchFilter from "#lib/components/BlogSearchFilter.svelte";
  import type { BlogCategory } from "#schemas";

  let {
    searchQuery = $bindable(""),
    sortBy = $bindable(
      "date-desc" as "date-desc" | "date-asc" | "title" | "category",
    ),
    selectedCategories = $bindable(new Set<BlogCategory>()),
  }: {
    searchQuery?: string;
    sortBy?: "date-desc" | "date-asc" | "title" | "category";
    selectedCategories?: Set<BlogCategory>;
  } = $props();
</script>

<div class="w-full overflow-visible">
  <BlogSearchFilter bind:searchQuery bind:sortBy bind:selectedCategories />
</div>

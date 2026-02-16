<script lang="ts">
  import type { BlogCategory } from "@schemas";
  import { BLOG_CATEGORIES } from "@schemas";

  let {
    searchQuery = $bindable(""),
    sortBy = $bindable("date-desc" as "date-desc" | "date-asc" | "title" | "category"),
    selectedCategories = $bindable(new Set<BlogCategory>()),
  }: {
    searchQuery?: string;
    sortBy?: "date-desc" | "date-asc" | "title" | "category";
    selectedCategories?: Set<BlogCategory>;
  } = $props();

  function toggleCategory(cat: BlogCategory) {
    selectedCategories = new Set(selectedCategories);
    if (selectedCategories.has(cat)) {
      selectedCategories.delete(cat);
    } else {
      selectedCategories.add(cat);
    }
  }
</script>

<div
  class="blog-card sticky top-16 z-10 -mx-6 px-6 lg:-mx-12 lg:px-12 py-6"
>
  <p class="text-2xl font-semibold text-center text-primary-content mb-4 tracking-tight">
    I write blogs about all kinds of stuffs
  </p>
  <hr class="border-primary-content my-4" />

  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-3">
      <label
        class="input input-primary input-bordered flex items-center gap-2 flex-1 min-w-[200px] focus-within:ring-2 focus-within:ring-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="size-4 text-primary-content opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.755ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="text"
          class="grow text-primary-content placeholder-primary-content/60"
          placeholder="Search by title, description, tags..."
          bind:value={searchQuery}
        />
      </label>
      <select
        class="select select-primary select-bordered w-auto text-primary-content focus-within:ring-2 focus-within:ring-primary min-w-3xs"
        bind:value={sortBy}
        aria-label="Sort blogs"
      >
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="title">Title (A ~ Z)</option>
        <option value="category">By topic</option>
      </select>
    </div>

    <div class="flex flex-wrap gap-2">
      <span class="text-sm text-primary-content self-center">Topics:</span>
      {#each BLOG_CATEGORIES as cat}
        <button
          type="button"
          class="badge badge-lg cursor-pointer transition-all text-primary-content {selectedCategories.has(cat)
            ? 'badge-primary'
            : 'badge-outline badge-primary'}"
          onclick={() => toggleCategory(cat)}
        >
          {cat}
        </button>
      {/each}
      {#if selectedCategories.size > 0}
        <button
          type="button"
          class="btn btn-primary btn-outline btn-xs text-primary-content"
          onclick={() => (selectedCategories = new Set())}
        >
          Clear filters
        </button>
      {/if}
    </div>
  </div>
</div>

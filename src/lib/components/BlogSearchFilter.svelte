<script lang="ts">
  import type { BlogCategory } from "#schemas";
  import { BLOG_CATEGORIES } from "#schemas";

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

  function toggleCategory(cat: BlogCategory) {
    selectedCategories = new Set(selectedCategories);
    if (selectedCategories.has(cat)) {
      selectedCategories.delete(cat);
    } else {
      selectedCategories.add(cat);
    }
  }
</script>

<section
  class="neo-card p-6 lg:p-8 space-y-5 relative overflow-hidden"
  style="background: linear-gradient(135deg, var(--neo-blue-soft) 0%, var(--neo-surface) 55%, var(--neo-yellow-soft) 100%);"
>
  <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
    <div>
      <span class="neo-pill neo-pill-yellow px-3 py-0.5 text-xs mb-2">
        ✎ Journal &amp; Essays
      </span>
      <h1 class="text-3xl font-extrabold text-primary-content tracking-tight">
        Blog &amp; Daydreams
      </h1>
      <p class="text-sm font-artistic text-primary-content/80 mt-1">
        Thoughts, travel sketches, Linux notes, and lingering melodies.
      </p>
    </div>
    <span
      class="text-2xl select-none text-primary-content/50 hidden sm:inline"
      aria-hidden="true"
    >
      ♫
    </span>
  </div>

  <div
    class="border-t-2 border-dashed border-[var(--neo-ink)]/25 pt-4 flex flex-col gap-4"
  >
    <div class="flex flex-wrap items-center gap-3">
      <label
        class="neo-input flex items-center gap-2.5 px-3.5 py-2.5 flex-1 min-w-[220px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="size-4 text-primary-content opacity-75 shrink-0"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.755ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="text"
          class="w-full bg-transparent outline-none text-sm font-medium text-primary-content placeholder:text-primary-content/55"
          placeholder="Search by title, mood, tags..."
          bind:value={searchQuery}
        />
      </label>

      <select
        class="neo-input px-4 py-2.5 text-sm font-bold text-primary-content cursor-pointer min-w-[180px]"
        bind:value={sortBy}
        aria-label="Sort blogs"
      >
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="title">Title (A ~ Z)</option>
        <option value="category">By topic</option>
      </select>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <span
        class="text-xs font-extrabold uppercase tracking-wider text-primary-content/70 mr-1"
      >
        Topics:
      </span>
      {#each BLOG_CATEGORIES as cat (cat)}
        {@const active = selectedCategories.has(cat)}
        <button
          type="button"
          class="neo-btn px-3.5 py-1 text-xs
            {active ? 'neo-btn-yellow' : 'neo-btn-surface'}"
          onclick={() => toggleCategory(cat)}
        >
          {cat}
        </button>
      {/each}
      {#if selectedCategories.size > 0}
        <button
          type="button"
          class="neo-btn neo-btn-blue px-3 py-1 text-xs ml-1"
          onclick={() => (selectedCategories = new Set())}
        >
          Clear ✕
        </button>
      {/if}
    </div>
  </div>
</section>

<script lang="ts">
  import SearchEngineOp from "#lib/components/SearchEngineOp.svelte";
  import RecipeCard from "#lib/components/RecipeCard.svelte";
  import type { RecipeFrontmatter } from "#schemas";

  type PageData = {
    canonicalURL: string;
    recipes: {
      frontmatter: RecipeFrontmatter;
      content: string;
    }[];
  };

  const { data }: { data: PageData } = $props();

  let searchQuery = $state("");

  const filtered = $derived.by(() => {
    const list = data.recipes ?? [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter((item: { frontmatter: RecipeFrontmatter }) => {
      const fm = item.frontmatter;
      const searchable =
        `${fm.title} ${fm.description ?? ""} ${(fm.tags ?? []).join(" ")}`.toLowerCase();
      return searchable.includes(q);
    });
  });
</script>

<SearchEngineOp
  title="Cooking – Recipes"
  description="Recipes and food experiments by @notkaramel."
  canonical={data.canonicalURL}
/>

<div class="w-full px-3 sm:px-6 my-8">
  <div class="max-w-6xl mx-auto space-y-7">
    <header
      class="neo-card p-6 lg:p-8 space-y-4"
      style="background: linear-gradient(135deg, var(--neo-yellow-soft) 0%, var(--neo-surface) 58%, var(--neo-blue-soft) 100%);"
    >
      <div>
        <span class="neo-pill neo-pill-yellow px-3 py-0.5 text-xs mb-2">
          🍞 Kitchen Notebook
        </span>
        <h1 class="text-3xl font-extrabold text-primary-content tracking-tight">
          Cooking &amp; Warm Loaves
        </h1>
        <p class="text-sm font-artistic text-primary-content/80 mt-1">
          Bread experiments, cookies, and comforting kitchen rhythms.
        </p>
      </div>

      <label
        class="neo-input flex items-center gap-2.5 px-3.5 py-2.5 w-full max-w-md"
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
          placeholder="Search recipes..."
          bind:value={searchQuery}
        />
      </label>
    </header>

    <ul class="w-full space-y-5">
      {#each filtered as recipe (recipe.frontmatter.slug)}
        <RecipeCard frontmatter={recipe.frontmatter} />
      {/each}
    </ul>

    {#if filtered.length === 0}
      <div class="neo-card p-12 text-center space-y-2">
        <p class="text-primary-content text-lg font-bold">
          No recipes match your search.
        </p>
      </div>
    {/if}
  </div>
</div>

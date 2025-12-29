<script lang="ts">
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";
  import RecipeCard from "$lib/components/RecipeCard.svelte";
  import type { RecipeFrontmatter } from "@schemas";

  type PageData = {
    canonicalURL: string;
    recipes: {
      frontmatter: RecipeFrontmatter;
      content: string;
    }[];
  };

  const { data } = $props<{ data: PageData }>();

</script>

<SearchEngineOp
  title="My Cooking Adventures"
  description="Checkout my cooking recipes and food experiments!"
  canonical={data.canonicalURL}
/>

<div>
  <p class="text-2xl text-center">My Cooking Adventures</p>
  <hr class="hr my-4" />

  <ul class="w-full space-y-4">
    {#each data.recipes as recipe (recipe.frontmatter.slug)}
      <RecipeCard frontmatter={recipe.frontmatter} />
    {/each}
  </ul>
</div>
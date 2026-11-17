<script lang="ts">
  import { page } from "$app/state";
  const slug = $derived(page.params.slug);
</script>

<main class="max-w-2xl mx-auto px-6 py-16">
  <div class="neo-card p-8 text-center space-y-4">
    <span class="neo-pill neo-pill-yellow px-3 py-1 text-xs"
      >404 · Missing Recipe</span
    >
    <h1 class="text-3xl font-extrabold text-primary-content">
      Recipe not found
    </h1>
    <p class="text-sm font-artistic text-primary-content/80">
      The recipe "{slug}" could not be found in the kitchen notebook.
    </p>
    <div class="pt-2">
      <a href="/cooking" class="neo-btn neo-btn-yellow px-5 py-2 text-sm">
        ← Back to Cooking
      </a>
    </div>
  </div>
</main>

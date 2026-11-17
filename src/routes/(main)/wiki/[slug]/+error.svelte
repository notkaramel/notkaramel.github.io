<script lang="ts">
  import { page } from "$app/state";
  const slug = $derived(page.params.slug);
</script>

<main class="max-w-2xl mx-auto px-6 py-16">
  <div class="neo-card p-8 text-center space-y-4">
    <span class="neo-pill neo-pill-blue px-3 py-1 text-xs"
      >404 · Missing Page</span
    >
    <h1 class="text-3xl font-extrabold text-primary-content">
      Wiki page not found
    </h1>
    <p class="text-sm font-artistic text-primary-content/80">
      The wiki page "{slug}" could not be found.
    </p>
    <div class="pt-2">
      <a href="/wiki" class="neo-btn neo-btn-yellow px-5 py-2 text-sm">
        ← Back to Wiki
      </a>
    </div>
  </div>
</main>

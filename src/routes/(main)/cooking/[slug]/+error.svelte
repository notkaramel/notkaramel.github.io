<script lang="ts">
  import { page } from "$app/state";
  const slug = page.params.slug;
</script>

<h1>Recipe not found</h1>
<p>The recipe "{slug}" could not be found.</p>
<a href="/cooking" class="btn btn-primary btn-outline text-primary-content">Back to Cooking</a>
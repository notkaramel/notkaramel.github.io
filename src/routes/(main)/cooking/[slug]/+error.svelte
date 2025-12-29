<script lang="ts">
  import { page } from "$app/stores";
</script>

<h1>Recipe not found</h1>
<p>The recipe "{$page.params.slug}" could not be found.</p>
<a href="/cooking">Back to Recipes</a>
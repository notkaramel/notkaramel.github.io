<script lang="ts">
  import { page } from "$app/state";
  const slug = page.params.slug;
</script>

<h1>Wiki page not found</h1>
<p>The wiki page "{slug}" could not be found.</p>
<a href="/wiki" class="btn btn-primary btn-outline text-primary-content">Back to Wiki</a>

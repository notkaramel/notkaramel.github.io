<script lang="ts">
  import { page } from "$app/state";
  const slug = page.params.slug;
</script>

<h1>Blog not found</h1>
<p>The blog "{slug}" could not be found.</p>
<a href="/blogs" class="btn btn-primary btn-outline text-primary-content">Back to Blog</a>
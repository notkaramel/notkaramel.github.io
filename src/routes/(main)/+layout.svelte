<script lang="ts">
  import "@app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  let { children } = $props();
</script>

<Navbar />
<div class="pt-16">
  {@render children()}
</div>
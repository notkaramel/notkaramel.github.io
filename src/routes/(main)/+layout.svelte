<script lang="ts">
  import Navbar from "#lib/components/Navbar.svelte";
  let { children } = $props();
</script>

<Navbar />
<div class="relative z-10 pt-20">
  {@render children()}
</div>

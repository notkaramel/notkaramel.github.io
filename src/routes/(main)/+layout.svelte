<script lang="ts">
  import "@app.css";
  import Navigation from "$lib/components/Navigation.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
	let { children } = $props();
</script>

<!-- <Navigation /> -->
<Navbar/>
{@render children()}
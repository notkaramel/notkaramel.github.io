<script>
  import "../app.pcss";
  import "./global.pcss";
  import NavBar from "../components/NavBar.svelte";
</script>

<NavBar />
<div class="container mx-auto px-4 border-2">
  <slot />
</div>

<style lang="postcss">

</style>

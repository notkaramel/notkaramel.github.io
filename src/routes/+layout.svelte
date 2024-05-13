<script>
  import "../app.pcss";
  import NavBar from "../components/NavBar.svelte";
</script>

<NavBar />
<div id="page-content">
  <div id="page-center">
    <slot />
  </div>
</div>

<style lang="postcss">
  #page-content {
    @apply min-w-full min-h-screen;
    @apply px-4 md:px-32;
  }

  #page-center {
    @apply border-l-2 border-r-2 border-sky-500 min-h-screen;
    @apply flex items-center gap-10 flex-wrap flex-col content-center;
  }
</style>

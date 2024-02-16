<script>
  import "../app.pcss";
  import NavBar from "../components/NavBar.svelte";
</script>

<NavBar />
<div id="page-content">
  <slot />
</div>

<style lang="postcss">
  #page-content {
    @apply min-w-full min-h-screen flex items-center gap-10 flex-wrap flex-col content-center;
    background-color: #2a090c;
    background-image: radial-gradient(
        at 8% 74%,
        rgba(21, 87, 58, 0.374) 4px,
        transparent 50%
      ),
      radial-gradient(at 63% 51%, hsl(282, 64%, 25%) 0px, transparent 50%),
      radial-gradient(at 7% 92%, hsl(289, 100%, 5%) 0px, transparent 50%),
      radial-gradient(at 74% 8%, hsl(146, 83%, 16%) 0px, transparent 50%),
      radial-gradient(at 83% 99%, hsl(235, 92%, 20%) 0px, transparent 50%),
      radial-gradient(at 51% 26%, hsl(224, 82%, 15%) 0px, transparent 50%),
      radial-gradient(at 92% 84%, hsl(158, 44%, 10%) 0px, transparent 50%);
  }
</style>

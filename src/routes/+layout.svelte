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
    background-color: hsl(162, 40%, 43%);
    background-image: radial-gradient(
        at 8% 74%,
        rgba(21, 87, 58, 0.374) 4px,
        transparent 50%
      ),
      radial-gradient(at 63% 51%, hsla(282, 57%, 44%, 0.644) 0px, transparent 50%),
      radial-gradient(at 7% 92%, hsla(289, 31%, 50%, 0.541) 0px, transparent 50%),
      radial-gradient(at 74% 8%, hsla(64, 68%, 36%, 0.719) 0px, transparent 50%),
      radial-gradient(at 83% 99%, hsl(221, 86%, 41%) 0px, transparent 50%),
      radial-gradient(at 51% 26%, hsl(224, 82%, 15%) 0px, transparent 50%),
      radial-gradient(at 92% 84%, hsl(158, 44%, 10%) 0px, transparent 50%);
  }
</style>

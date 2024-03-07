<script>
  import profilepic from "$lib/images/pianocatpixelart-neonandretro.jpeg";
  const hamburger =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <!-- The small screen button -->
    <div class="avatar">
      <div class="w-12 rounded-xl">
        <img src={profilepic} alt="piano cat pixelart neon and retro" />
      </div>
    </div>
  </div>

  <!-- Center part of navbar -->
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/">Homepage</a></li>
      <li><a href="/blog"> Blog </a></li>
      <li><a href="/projects"> Projects </a></li>
      <li><a href="/resume"> Resume </a></li>
      <li><a href="/gallery"> Photography </a></li>
      <li><a href="/music"> Music </a></li>
    </ul>
  </div>

  <!-- End part of navbar -->
  <div class="navbar-end">
    <div class="dropdown dropdown-end dropdown-bottom">
      <div tabindex="0" role="button" class="btn btn-ghost md:hidden">
        {@html hamburger}
      </div>
      <ul
        class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-right z-[1]"
      >
        <li><a href="/">Homepage</a></li>
        <li><a href="/blog"> Blog </a></li>
        <li><a href="/projects"> Projects </a></li>
        <li><a href="/resume"> Resume </a></li>
        <li><a href="/gallery"> Photography </a></li>
        <li><a href="/music"> Music </a></li>
      </ul>
      <!-- End of the small screen button -->
    </div>
    <p class="btn hidden md:flex">Contact me</p>
  </div>
</div>

<style lang="postcss">
</style>

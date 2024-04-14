<script>
  import profilepic from "$lib/images/pianocatpixelart-neonandretro.jpeg";
  const hamburger =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
</script>

<div class="navbar bg-base-100 font-bold">
  <div class="navbar-start">
    <!-- The small screen button -->
    <div class="avatar w-12">
      <a href="/">
        <img class="rounded-lg border-2 border-accent" src={profilepic} alt="piano cat pixelart neon and retro" />
      </a>
    </div>
  </div>

  <!-- Center part of navbar -->
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1 items-center">
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
    <details class="dropdown dropdown-bottom dropdown-end">
      <summary class="m-1 btn">
        Theme
        <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
      </summary>
      <ul class="dropdown-content shadow-2xl bg-base-300 rounded-box w-24">
        <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-center" aria-label="Default" value="karamel"/></li>
        <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-center" aria-label="Dark" value="dark"/></li>
        <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-center" aria-label="Bright" value="emerald"/></li>
      </ul>
    </details>
    <details class="dropdown dropdown-end dropdown-bottom">
      <summary class="btn btn-ghost md:hidden">
        {@html hamburger}
      </summary>
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
    </details>
  </div>
</div>

<style lang="postcss">
</style>

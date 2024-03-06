<script>
  import profilepic from '$lib/images/pianocatpixelart-neonandretro.jpeg'
  const hamburger =
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>';
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <!-- The small screen button -->
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost md:hidden">
        {@html hamburger}
      </div>
      <ul
        class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
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
    <div class="avatar">
      <div class="w-8 rounded-xl">
        <img src={profilepic} alt="piano cat pixelart neon and retro"/>
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
  <div class="navbar-end hidden md:flex">
    <p class="btn">Contact me</p>
  </div>
</div>

<script>
  const hamburger =
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>';
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <!-- The small screen button -->
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        {@html hamburger}
      </div>
      <ul
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a href="/blog"> Blog </a></li>
        <li>
          <details>
            <summary>Artwork</summary>
            <ul class="p-2">
              <li class="lg:w-32"><a href="/gallery"> Photo Gallery </a></li>
              <li><a href="/music"> Music </a></li>
            </ul>
          </details>
        </li>
        <li><a href="/resume"> Resume </a></li>
        <li><a href="/projects"> Projects </a></li>
      </ul>
      <!-- End of the small screen button -->
    </div>
    <a class="btn btn-ghost text-xl" href="/">@notkaramel</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/blog"> Blog </a></li>
      <li>
        <details>
          <summary>Artwork</summary>
          <ul class="p-2">
            <li class="w-32"><a href="/gallery"> Photo Gallery </a></li>
            <li><a href="/music"> Music </a></li>
          </ul>
        </details>
      </li>
      <li><a href="/resume"> Resume </a></li>
      <li><a href="/projects"> Projects </a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <p class="btn">Button</p>
  </div>
</div>

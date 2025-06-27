<script>
  import { routes } from "$lib";
  import ThemeSwapper from "./ThemeSwapper.svelte";
</script>

<div class="navbar bg-base-300 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div role="button" class="btn btn-ghost fill-accent-content lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <ul
        class="menu menu-sm dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        {#each routes as route}
          <li>
            <a href={route.url}>{route.title}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      {#each routes as route}
        <a href={route.url}>
          <li
            class="btn btn-accent btn-soft text-accent-content mx-2 shadow-2xl"
          >
            {route.title}
          </li>
        </a>
      {/each}
    </ul>
  </div>
  <div class="navbar-end">
    <ThemeSwapper/>
  </div>
</div>

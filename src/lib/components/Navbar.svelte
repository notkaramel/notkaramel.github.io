<script>
  import { routes } from "$lib";
  import ThemeSwapper from "./ThemeSwapper.svelte";
</script>

<div
  class="navbar w-[98%] bg-base-100 mx-auto shadow-lg shadow-primary px-4 mt-2 rounded-box"
>
  <div class="navbar-start">
    <div class="dropdown">
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost lg:hidden"
      >
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
        class="menu menu-lg dropdown-content bg-base-100 border-t-2 border-t-primary rounded-b-box z-1 mt-3 w-52 shadow-xl shadow-primary"
      >
        {#each routes as route}
          <li>
            <a href={route.url}>{route.title}</a>
          </li>
        {/each}
      </ul>
    </div>
    <a class="lg:mx-8 text-xl font-bold text-primary-content" href="/">antoine's website</a>
  </div>

  <div class="navbar-center hidden lg:flex">
    <div
      class="flex flex-row gap-4 px-2 w-full justify-evenly place-content-baseline"
    >
      {#each routes as route}
        <a href={route.url}>
          <button class="btn btn-primary">
            <div class="size-6 fill-primary-content mr-1">
              {@html route.icon}
            </div>
            <span class="font-bold">
              {route.title}
            </span>
          </button>
        </a>
      {/each}
    </div>
  </div>

  <div class="navbar-end">
    <ThemeSwapper />
  </div>
</div>

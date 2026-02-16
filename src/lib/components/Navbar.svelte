<script>
  import { routes } from "$lib";
  import ThemeSwapper from "./ThemeSwapper.svelte";
</script>

<nav
  class="navbar fixed top-0 left-0 right-0 z-50
    bg-base-100 backdrop-blur-md
    border-b border-primary-content
    px-4 py-2"
>
  <div class="navbar-start">
    <div class="dropdown">
      <div
        tabindex="0"
        role="button"
        class="btn btn-primary fill-primary-content btn-sm lg:hidden"
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
        class="menu menu-lg dropdown-content bg-base-100 backdrop-blur-md border border-primary-content rounded-box z-50 mt-3 w-52 shadow-xl shadow-primary"
      >
        {#each routes as route}
          <li>
            <a href={route.url}>{route.title}</a>
          </li>
        {/each}
      </ul>
    </div>
    <a
      class="hidden lg:inline-block lg:mx-6 text-lg font-bold text-primary-content hover:text-secondary-content transition-colors"
      href="/"
      >antoine's website</a
    >
  </div>

  <div class="navbar-center">
    <div
      class="hidden lg:flex flex-row gap-2 px-2 w-full justify-evenly place-content-baseline"
    >
      {#each routes as route}
        <a href={route.url}>
          <button class="btn btn-primary btn-sm">
            <div class="size-5 fill-primary-content mr-1">
              {@html route.icon}
            </div>
            <span class="font-bold">{route.title}</span>
          </button>
        </a>
      {/each}
    </div>
    <a
      class="lg:hidden inline-block text-base font-bold text-primary-content"
      href="/"
      >antoine's website</a
    >
  </div>

  <div class="navbar-end">
    <ThemeSwapper />
  </div>
</nav>

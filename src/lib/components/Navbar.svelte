<script>
  import { routes } from "$lib";
  import ThemeSwapper from "./ThemeSwapper.svelte";
</script>

<div class="navbar w-[98%] bg-base-100 glass shadow-md mx-auto px-4 mt-2 rounded-xl">
  <div class="navbar-start">
    <div class="dropdown">
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost fill-accent-content lg:hidden"
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
        class="menu menu-sm dropdown-content bg-emerald-200 dark:bg-emerald-900 rounded-md z-1 mt-3 w-52 p-2 shadow"
      >
        {#each routes as route}
          <li>
            <a href={route.url}>{route.title}</a>
          </li>
        {/each}
      </ul>
    </div>
    <a class="lg:mx-8 text-xl font-bold" href="/">antoine's website</a>
  </div>

  <div class="navbar-center hidden lg:flex">
    <div class="flex flex-row gap-4 px-2 w-full justify-evenly place-content-baseline">
      {#each routes as route}
        <a
          href={route.url}
          class="btn btn-ghost bg-emerald-100 hover:bg-emerald-300 border-none rounded-lg px-4 py-2 flex items-center gap-3 transition-all duration-200 hover:shadow-md"
        >
          <div class="size-6 fill-emerald-900 flex-shrink-0">
            {@html route.icon}
          </div>
          <span class="text-emerald-950 font-medium">{route.title}</span>
        </a>
      {/each}
    </div>
  </div>

  <div class="navbar-end">
    <ThemeSwapper />
  </div>
</div>

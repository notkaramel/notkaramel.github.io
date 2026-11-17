<script lang="ts">
  import { page } from "$app/state";
  import { routes } from "#lib";
  import ThemeSwapper from "./ThemeSwapper.svelte";

  function isActive(url: string): boolean {
    const path = page.url.pathname;
    return path === url || path.startsWith(url + "/");
  }
</script>

<header
  class="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 pointer-events-none"
>
  <nav
    class="pointer-events-auto max-w-6xl mx-auto
      flex items-center justify-between gap-3
      px-3 sm:px-5 py-2
      rounded-full border-2 border-[var(--neo-ink)]
      bg-[var(--neo-surface)]/92 backdrop-blur-md
      shadow-[4px_4px_0px_var(--neo-ink)]"
    aria-label="Primary navigation"
  >
    <!-- Start: Mobile drawer + Brand -->
    <div class="flex items-center gap-2">
      <div class="dropdown lg:hidden">
        <div
          tabindex="0"
          role="button"
          aria-label="Open navigation menu"
          class="neo-btn neo-btn-blue h-9 w-9 p-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 7h16M4 12h10M4 17h16"
            />
          </svg>
        </div>
        <ul
          class="menu dropdown-content mt-3 w-56 p-2.5 gap-1.5
            rounded-2xl border-2 border-[var(--neo-ink)]
            bg-[var(--neo-surface)] shadow-[5px_5px_0px_var(--neo-ink)] z-50"
        >
          {#each routes as route (route.url)}
            <li>
              <a
                href={route.url}
                class="flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold text-sm transition-colors
                  {isActive(route.url)
                  ? 'bg-[var(--neo-yellow)] text-[var(--neo-ink-on-pastel)] border-2 border-[var(--neo-ink)]'
                  : 'text-primary-content hover:bg-[var(--neo-blue-soft)]'}"
              >
                <span class="size-4 fill-current shrink-0" aria-hidden="true">
                  {@html route.icon}
                </span>
                <span>{route.title}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <a
        href="/"
        class="group inline-flex items-center gap-2 px-3 py-1 rounded-full
          text-sm sm:text-base font-extrabold tracking-tight text-primary-content
          hover:bg-[var(--neo-yellow-soft)] transition-colors"
      >
        <span
          class="inline-flex items-center justify-center w-6 h-6 rounded-full
            border-2 border-[var(--neo-ink)] bg-[var(--neo-yellow)] text-[var(--neo-ink-on-pastel)]
            text-xs shadow-[1.5px_1.5px_0px_var(--neo-ink)]
            group-hover:rotate-12 transition-transform"
          aria-hidden="true"
        >
          ♪
        </span>
        <span>homepage</span>
      </a>
    </div>

    <!-- Center: Desktop route pills -->
    <div class="hidden lg:flex items-center gap-2">
      {#each routes as route (route.url)}
        {@const active = isActive(route.url)}
        <a
          href={route.url}
          class="neo-btn px-3.5 py-1.5 text-sm
            {active
            ? 'neo-btn-yellow'
            : 'neo-btn-blue opacity-95 hover:opacity-100'}"
        >
          <span class="size-4 fill-current shrink-0" aria-hidden="true">
            {@html route.icon}
          </span>
          <span>{route.title}</span>
        </a>
      {/each}
    </div>

    <!-- End: Theme toggle -->
    <div class="flex items-center">
      <ThemeSwapper />
    </div>
  </nav>
</header>

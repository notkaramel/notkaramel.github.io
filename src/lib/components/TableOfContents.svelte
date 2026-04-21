<script lang="ts">
  import type { TocEntry } from "$lib/markdown";

  let {
    entries = [],
    class: className = "",
    floating = false,
  }: { entries?: TocEntry[]; class?: string; floating?: boolean } = $props();

  let drawerOpen = $state(false);

  function indentClass(level: number): string {
    switch (level) {
      case 2:
        return "pl-2";
      case 3:
        return "pl-4";
      case 4:
        return "pl-6";
      default:
        return "pl-2";
    }
  }

  function closeDrawer() {
    drawerOpen = false;
  }
</script>

{#if entries.length > 0}
  {#if floating}
    <!-- Desktop: fixed sidebar on left -->
    <nav
      class="hidden lg:block fixed left-0 top-24 w-56 h-[calc(100vh-6rem)] overflow-y-auto pl-4 pr-2 py-4 z-20 {className}"
      aria-label="Table of contents"
    >
      <h2 class="text-xs font-bold text-primary-content/60 uppercase tracking-widest mb-3">
        On this page
      </h2>
      <ul class="space-y-1.5 text-sm">
        {#each entries as entry (entry.id)}
          <li
            class="border-l-2 border-primary/30 hover:border-primary transition-colors {indentClass(entry.level)}"
          >
            <a
              href="#{entry.id}"
              class="text-primary-content/80 hover:text-primary-content hover:underline underline-offset-2 block py-0.5 leading-snug"
            >
              {entry.text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Mobile: floating toggle button + slide-in drawer -->
    <div class="lg:hidden">
      <!-- Toggle button -->
      <button
        onclick={() => (drawerOpen = !drawerOpen)}
        class="fixed bottom-6 right-6 z-40 btn btn-primary btn-circle shadow-lg"
        aria-label={drawerOpen ? "Close table of contents" : "Open table of contents"}
        aria-expanded={drawerOpen}
      >
        {#if drawerOpen}
          <!-- X icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <!-- List / TOC icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h10M4 14h16M4 18h10" />
          </svg>
        {/if}
      </button>

      <!-- Backdrop -->
      {#if drawerOpen}
        <button
          class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onclick={closeDrawer}
          aria-label="Close table of contents"
          tabindex="-1"
        ></button>
      {/if}

      <!-- Drawer panel -->
      <div
        class="fixed bottom-0 left-0 right-0 z-40 max-h-[60vh] overflow-y-auto blog-card rounded-t-2xl px-6 py-5 shadow-2xl transition-transform duration-300 {drawerOpen
          ? 'translate-y-0'
          : 'translate-y-full'}"
        aria-hidden={!drawerOpen}
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-bold text-primary-content uppercase tracking-widest">
            On this page
          </h2>
          <button
            onclick={closeDrawer}
            class="btn btn-ghost btn-xs btn-circle"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul class="space-y-2 text-sm">
          {#each entries as entry (entry.id)}
            <li class="border-l-2 border-primary/30 {indentClass(entry.level)}">
              <a
                href="#{entry.id}"
                onclick={closeDrawer}
                class="text-primary-content/90 hover:text-primary-content hover:underline underline-offset-2 block py-0.5 leading-snug"
              >
                {entry.text}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {:else}
    <!-- Inline (non-floating) variant -->
    <nav
      class="blog-card p-4 max-h-[calc(100vh-8rem)] overflow-y-auto sticky top-24 {className}"
      aria-label="Table of contents"
    >
      <h2 class="text-sm font-bold text-primary-content uppercase tracking-wide mb-3">
        On this page
      </h2>
      <ul class="space-y-1.5 text-sm">
        {#each entries as entry (entry.id)}
          <li
            class="border-l-2 border-primary/30 hover:border-primary {indentClass(entry.level)}"
          >
            <a
              href="#{entry.id}"
              class="text-primary-content/90 hover:text-primary-content hover:underline underline-offset-2 block py-0.5"
            >
              {entry.text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
{/if}

<script lang="ts">
  import type { TocEntry } from "#lib/markdown.ts";

  let {
    entries = [],
    class: className = "",
    floating = false,
    contained = false,
  }: {
    entries?: TocEntry[];
    class?: string;
    floating?: boolean;
    contained?: boolean;
  } = $props();

  let drawerOpen = $state(false);

  function indentClass(level: number): string {
    switch (level) {
      case 2:
        return "pl-2.5";
      case 3:
        return "pl-5";
      case 4:
        return "pl-7";
      default:
        return "pl-2.5";
    }
  }

  function closeDrawer() {
    drawerOpen = false;
  }
</script>

{#if entries.length > 0}
  {#if contained}
    <!-- Desktop: sticky sidebar inside container -->
    <nav
      class="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto {className}"
      aria-label="Table of contents"
    >
      <div class="neo-card p-4 space-y-3">
        <div
          class="flex items-center justify-between border-b-2 border-dashed border-[var(--neo-ink)]/25 pb-2"
        >
          <h2
            class="text-xs font-extrabold text-primary-content uppercase tracking-widest"
          >
            On this page
          </h2>
          <span
            class="text-xs font-artistic text-primary-content/60"
            aria-hidden="true">♪</span
          >
        </div>
        <ul class="space-y-1.5 text-xs">
          {#each entries as entry (entry.id)}
            <li
              class="border-l-2 border-[var(--neo-blue)] hover:border-[var(--neo-ink)] transition-colors {indentClass(
                entry.level,
              )}"
            >
              <a
                href="#{entry.id}"
                class="text-primary-content/80 hover:text-primary-content hover:bg-[var(--neo-yellow-soft)] rounded-md px-1.5 py-1 block leading-snug font-medium transition-colors"
              >
                {entry.text}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </nav>

    <!-- Mobile / Tablet: floating button + slide-up drawer -->
    <div class="lg:hidden">
      <button
        type="button"
        onclick={() => (drawerOpen = !drawerOpen)}
        class="fixed bottom-6 right-6 z-40 neo-btn neo-btn-yellow w-12 h-12 p-0"
        aria-label={drawerOpen
          ? "Close table of contents"
          : "Open table of contents"}
        aria-expanded={drawerOpen}
      >
        {#if drawerOpen}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h10M4 18h14"
            />
          </svg>
        {/if}
      </button>

      {#if drawerOpen}
        <button
          type="button"
          class="fixed inset-0 z-30 bg-black/35 backdrop-blur-xs"
          onclick={closeDrawer}
          aria-label="Close table of contents"
          tabindex="-1"
        ></button>
      {/if}

      <div
        class="fixed bottom-0 left-0 right-0 z-40 max-h-[62vh] overflow-y-auto
          rounded-t-3xl border-t-2 border-x-2 border-[var(--neo-ink)]
          bg-[var(--neo-surface)] px-6 py-5 shadow-[0_-6px_0px_var(--neo-ink)]
          transition-transform duration-300
          {drawerOpen ? 'translate-y-0' : 'translate-y-full'}"
        aria-hidden={!drawerOpen}
      >
        <div
          class="flex items-center justify-between mb-4 pb-2 border-b-2 border-dashed border-[var(--neo-ink)]/25"
        >
          <h2
            class="text-sm font-extrabold text-primary-content uppercase tracking-widest"
          >
            On this page ♪
          </h2>
          <button
            type="button"
            onclick={closeDrawer}
            class="neo-btn neo-btn-blue w-8 h-8 p-0"
            aria-label="Close"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul class="space-y-2 text-sm">
          {#each entries as entry (entry.id)}
            <li
              class="border-l-2 border-[var(--neo-blue)] {indentClass(
                entry.level,
              )}"
            >
              <a
                href="#{entry.id}"
                onclick={closeDrawer}
                class="text-primary-content/90 hover:text-primary-content hover:bg-[var(--neo-yellow-soft)] rounded-md px-2 py-1 block leading-snug font-medium"
              >
                {entry.text}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {:else if floating}
    <!-- Desktop: fixed sidebar in outer left margin beside centered max-w-6xl content -->
    <nav
      class="hidden min-[1500px]:block fixed top-24 left-[max(0.75rem,calc(50vw-36rem-clamp(9.5rem,calc((100vw-72rem)/2-1.5rem),15rem)-1rem))] w-[clamp(9.5rem,calc((100vw-72rem)/2-1.5rem),15rem)] max-h-[calc(100vh-7rem)] overflow-y-auto z-20 {className}"
      aria-label="Table of contents"
    >
      <div class="neo-card p-4 space-y-3">
        <div
          class="flex items-center justify-between border-b-2 border-dashed border-[var(--neo-ink)]/25 pb-2"
        >
          <h2
            class="text-xs font-extrabold text-primary-content uppercase tracking-widest"
          >
            On this page
          </h2>
          <span
            class="text-xs font-artistic text-primary-content/60"
            aria-hidden="true">♪</span
          >
        </div>
        <ul class="space-y-1.5 text-xs">
          {#each entries as entry (entry.id)}
            <li
              class="border-l-2 border-[var(--neo-blue)] hover:border-[var(--neo-ink)] transition-colors {indentClass(
                entry.level,
              )}"
            >
              <a
                href="#{entry.id}"
                class="text-primary-content/80 hover:text-primary-content hover:bg-[var(--neo-yellow-soft)] rounded-md px-1.5 py-1 block leading-snug font-medium transition-colors"
              >
                {entry.text}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </nav>

    <!-- Below wide desktop: floating button + slide-up drawer -->
    <div class="min-[1500px]:hidden">
      <button
        type="button"
        onclick={() => (drawerOpen = !drawerOpen)}
        class="fixed bottom-6 right-6 z-40 neo-btn neo-btn-yellow w-12 h-12 p-0"
        aria-label={drawerOpen
          ? "Close table of contents"
          : "Open table of contents"}
        aria-expanded={drawerOpen}
      >
        {#if drawerOpen}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h10M4 18h14"
            />
          </svg>
        {/if}
      </button>

      {#if drawerOpen}
        <button
          type="button"
          class="fixed inset-0 z-30 bg-black/35 backdrop-blur-xs"
          onclick={closeDrawer}
          aria-label="Close table of contents"
          tabindex="-1"
        ></button>
      {/if}

      <div
        class="fixed bottom-0 left-0 right-0 z-40 max-h-[62vh] overflow-y-auto
          rounded-t-3xl border-t-2 border-x-2 border-[var(--neo-ink)]
          bg-[var(--neo-surface)] px-6 py-5 shadow-[0_-6px_0px_var(--neo-ink)]
          transition-transform duration-300
          {drawerOpen ? 'translate-y-0' : 'translate-y-full'}"
        aria-hidden={!drawerOpen}
      >
        <div
          class="flex items-center justify-between mb-4 pb-2 border-b-2 border-dashed border-[var(--neo-ink)]/25"
        >
          <h2
            class="text-sm font-extrabold text-primary-content uppercase tracking-widest"
          >
            On this page ♪
          </h2>
          <button
            type="button"
            onclick={closeDrawer}
            class="neo-btn neo-btn-blue w-8 h-8 p-0"
            aria-label="Close"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul class="space-y-2 text-sm">
          {#each entries as entry (entry.id)}
            <li
              class="border-l-2 border-[var(--neo-blue)] {indentClass(
                entry.level,
              )}"
            >
              <a
                href="#{entry.id}"
                onclick={closeDrawer}
                class="text-primary-content/90 hover:text-primary-content hover:bg-[var(--neo-yellow-soft)] rounded-md px-2 py-1 block leading-snug font-medium"
              >
                {entry.text}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {:else}
    <!-- Inline variant -->
    <nav
      class="neo-card p-4 max-h-[calc(100vh-8rem)] overflow-y-auto sticky top-24 {className}"
      aria-label="Table of contents"
    >
      <h2
        class="text-xs font-extrabold text-primary-content uppercase tracking-widest mb-3"
      >
        On this page ♪
      </h2>
      <ul class="space-y-1.5 text-sm">
        {#each entries as entry (entry.id)}
          <li
            class="border-l-2 border-[var(--neo-blue)] hover:border-[var(--neo-ink)] {indentClass(
              entry.level,
            )}"
          >
            <a
              href="#{entry.id}"
              class="text-primary-content/85 hover:text-primary-content hover:bg-[var(--neo-yellow-soft)] rounded-md px-1.5 py-0.5 block"
            >
              {entry.text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
{/if}

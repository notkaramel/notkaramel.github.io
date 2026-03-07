<script lang="ts">
  import type { TocEntry } from "$lib/markdown";

  let {
    entries = [],
    class: className = "",
    floating = false,
  }: { entries?: TocEntry[]; class?: string; floating?: boolean } = $props();

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
</script>

{#if entries.length > 0}
  <nav
    class="blog-card p-4 max-h-[calc(100vh-8rem)] overflow-y-auto {floating
      ? ''
      : 'sticky top-24'} {className}"
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

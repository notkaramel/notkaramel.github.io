<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    subtitle = "",
    tone = "blue",
    defaultOpen = false,
    children,
  }: {
    title: string;
    subtitle?: string;
    tone?: "blue" | "yellow";
    defaultOpen?: boolean;
    children?: Snippet;
  } = $props();
</script>

<div
  class="collapse collapse-arrow mb-3.5 overflow-hidden
    rounded-2xl border-2 border-[var(--neo-ink)]
    bg-[var(--neo-surface)]
    shadow-[4px_4px_0px_var(--neo-ink)]
    hover:-translate-x-[1.5px] hover:-translate-y-[1.5px]
    hover:shadow-[5.5px_5.5px_0px_var(--neo-ink)]
    transition-all duration-200"
>
  <input type="checkbox" checked={defaultOpen} />
  <div
    class="collapse-title min-h-0 py-3.5 px-5 pr-11 font-bold text-primary-content
      {tone === 'yellow'
      ? 'bg-[var(--neo-yellow-soft)]'
      : 'bg-[var(--neo-blue-soft)]'}"
  >
    <div class="flex flex-col gap-1">
      <span class="text-base leading-snug">{title}</span>
      {#if subtitle}
        <span class="text-xs font-medium text-primary-content/75 font-artistic">
          {subtitle}
        </span>
      {/if}
    </div>
  </div>
  <div
    class="collapse-content border-t-2 border-[var(--neo-ink)] bg-[var(--neo-surface)]"
  >
    <div class="pt-4 pb-2 text-primary-content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>

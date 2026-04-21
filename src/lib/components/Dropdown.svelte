<script>
  let {
    title,
    subtitle = "",
    defaultOpen = false,
    children,
  } = $props();
</script>

<div
  class="collapse collapse-arrow
    bg-base-100
    border border-primary/20
    hover:border-primary/40
    rounded-xl
    mb-2
    shadow-sm hover:shadow-md hover:shadow-primary/10
    transition-all duration-200
  "
>
  <input type="checkbox" checked={defaultOpen} />
  <div class="collapse-title min-h-0 py-3 px-4 pr-10 text-primary-content font-semibold">
    <div class="flex flex-col gap-0.5">
      <span>{title}</span>
      {#if subtitle}
        <span class="text-xs text-primary-content/60 font-normal tracking-wide">{subtitle}</span>
      {/if}
    </div>
  </div>
  <div class="collapse-content bg-primary/5 border-t border-primary/15 rounded-b-xl">
    <div class="pt-4 pb-2 text-primary-content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>

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
    bg-primary/5
    border border-primary-content
    rounded-box
    mb-2
  "
>
  <input type="checkbox" checked={defaultOpen} />
  <div class="collapse-title min-h-0 py-3 px-4 pr-10 text-primary-content font-medium">
    <div class="flex flex-col gap-0.5">
      <span>{title}</span>
      {#if subtitle}
        <span class="text-sm text-primary-content/80 font-normal">{subtitle}</span>
      {/if}
    </div>
  </div>
  <div class="collapse-content bg-primary/5 border-t border-primary-content">
    <div class="pt-4 pb-2 text-primary-content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>

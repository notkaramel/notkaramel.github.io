<script lang="ts">
  import type { LayoutProps } from "./$types";

  let { children }: LayoutProps = $props();
</script>

<div class="flex flex-col w-full min-h-screen gap-8 items-stretch pt-0 pb-8 overflow-visible">
  {@render children()}
</div>

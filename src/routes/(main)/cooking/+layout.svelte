<script lang="ts">
  import type { LayoutProps } from "./$types";

  let { children }: LayoutProps = $props();
</script>

<div class="flex w-full min-h-screen justify-center items-start">
  <div
    class="container lg:max-w-6xl mx-auto mt-0 bg-base-100 rounded-box text-primary-content shadow-2xl shadow-primary"
  >
    <div class="m-6 lg:m-12">
      {@render children()}
    </div>
  </div>
</div>
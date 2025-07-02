<script lang="ts">
  import type { LayoutProps } from "./$types";

  let { children }: LayoutProps = $props();
</script>

<title>Blogs</title>

<div class="flex w-full min-h-screen gap-4 m-auto my-8">
  <div
    class="container lg:max-w-6xl md:border-2 m-auto bg-base-100 rounded-box text-primary-content shadow-2xl shadow-primary"
  >
    <div class="m-6 lg:m-12">
      {@render children()}
    </div>
  </div>
</div>
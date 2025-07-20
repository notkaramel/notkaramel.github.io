<script>
  import { fly, slide } from "svelte/transition";

  let { title = "Resume Section Title", children } = $props();
</script>

<div class="mb-12"  transition:fly>
  <div class="divider divider-middle divider-primary mb-8 prose">
    <h2 class="text-primary-content">{title}</h2>
  </div>
  <div
    class="w-full prose text-primary-content"
    transition:slide
  >
    {@render children()}
  </div>
</div>

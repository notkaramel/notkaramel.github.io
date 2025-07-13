<script>
  import { fly, slide } from "svelte/transition";

  let { title = "Resume Section Title", children } = $props();
</script>

<div class="mb-12"  transition:fly>
  <div class="divider divider-middle divider-primary mb-8 prose-base md:prose-lg">
    <h2 class="text-primary-content">{title}</h2>
  </div>
  <div
    class="details prose-sm md:prose-base w-full prose-ul:list-disc prose-h2:py-0 prose-h3:font-black **:my-2 md:**:my-1"
    transition:slide
  >
    {@render children()}
  </div>
</div>

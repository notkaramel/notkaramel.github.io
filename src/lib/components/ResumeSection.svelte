<script>
  let { title = "Resume Section Title", children } = $props();
</script>

<div class="my-10">
  <div class="divider divider-start divider-primary mb-4 prose-base"><h2>{title}</h2></div>
  <div class="details prose-base w-full prose-ul:list-disc prose-h2:py-0 **:my-1">
    {@render children()}
  </div>
</div>

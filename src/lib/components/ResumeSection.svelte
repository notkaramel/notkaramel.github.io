<script>
  let { title = "Resume Section Title", children } = $props();
</script>

<div class="mb-12">
  <div class="divider divider-middle divider-primary mb-8 prose-base"><h2>{title}</h2></div>
  <div class="details prose-base w-full prose-ul:list-disc prose-h2:py-0 prose-h3:font-black **:my-1">
    {@render children()}
  </div>
</div>

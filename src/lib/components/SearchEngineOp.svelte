<script>
  let {
    title = "Page Title",
    description = "A very long description of the webpage",
    canonical = "https://antoinephan.com",
  } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
</svelte:head>

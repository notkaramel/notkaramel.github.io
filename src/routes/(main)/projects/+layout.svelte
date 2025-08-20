<script>
  import SearchEngineOp from '$lib/components/SearchEngineOp.svelte';

  let { children } = $props();
</script>

<SearchEngineOp
title="Project Gallery | Antoine @notkaramel"
description="A collection of all technical projects I have created and/or participated in. Take a look!"
canonical="https://antoinephan.com/projects"
/>
<div class="flex w-full min-h-screen my-8 justify-between">
  <div class="@container bg-base-100 rounded-box flex-5 mx-4 text-base-content">
    <div class="m-8">
        {@render children()}
    </div>
  </div>
</div>

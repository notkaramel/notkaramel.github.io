<script>
  let {
    checkpoints = [
      { label: "Ideation & design", done: true },
      { label: "Figuring out the layout", done: true },
      { label: "Implement the core functionality", done: true },
      { label: "Populate content", done: false },
    ],
  } = $props();
</script>

<ul class="steps steps-vertical">
  {#each checkpoints as checkpoint, i}
    {#if checkpoint.done}
      <li class="step step-primary" data-content="✓">
        {checkpoint.label}
      </li>
    {:else}
      <li class="step" data-content="✕">
        {checkpoint.label}
      </li>
    {/if}
  {/each}
</ul>

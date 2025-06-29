<script>
  let {
    checkpoints = [
      { label: "Ideation & design", done: true },
      { label: "Figuring out the layout", done: true },
      { label: "Implement the core functionality", done: false },
      { label: "Populate content", done: false },
    ],
  } = $props();
</script>

<ul class="timeline timeline-compact timeline-vertical">
  {#each checkpoints as checkpoint, i}
    <li>
      {#if i > 0}
        <hr class={checkpoint.done ? "bg-success" : "bg-error"} />
      {/if}

      {#if checkpoint.done}
        <div class="timeline-start timeline-box text-success-content">
          {checkpoint.label}
        </div>
        <div class="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="fill-success size-4"
            ><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            />
          </svg>
        </div>
      {:else}
        <div class="timeline-start timeline-box text-error-content">
          {checkpoint.label}
        </div>

        <div class="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="fill-error size-4"
            ><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
            />
          </svg>
        </div>
      {/if}

      {#if i < checkpoints.length - 1}
        <hr class={checkpoint.done ? "bg-success" : "bg-error"} />
      {/if}
    </li>
  {/each}
</ul>

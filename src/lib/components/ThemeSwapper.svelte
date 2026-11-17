<script lang="ts">
  import { onMount } from "svelte";

  let { fill = "fill-current" } = $props();
  let themeCheck = $state(false);
  let theme = $derived(themeCheck ? "dark-caramel" : "bright-caramel");

  onMount(() => {
    themeCheck = localStorage.getItem("theme") == "true";
  });
</script>

<label
  class="neo-btn neo-btn-yellow swap swap-rotate inline-grid place-items-center h-9 w-9 p-0"
  title={themeCheck ? "Switch to dreamy daylight" : "Switch to twilight studio"}
  aria-label={themeCheck ? "Switch to light theme" : "Switch to dark theme"}
>
  <input
    type="checkbox"
    class="theme-controller"
    onchange={() => {
      localStorage.setItem("theme", String(themeCheck));
    }}
    bind:checked={themeCheck}
    value={theme}
  />

  <!-- Daylight: Sun -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    class="swap-off size-4 {fill}"
    aria-hidden="true"
  >
    <path
      d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7 .2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"
    />
  </svg>

  <!-- Night studio: Crescent moon -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    class="swap-on size-4 {fill}"
    aria-hidden="true"
  >
    <path
      d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
    />
  </svg>
</label>

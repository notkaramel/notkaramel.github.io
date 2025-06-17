<script>
    import Navigation from "$lib/components/Navigation.svelte";
</script>

<Navigation/>
<div class="flex w-full">
  <div class="card bg-base-300 rounded-box grid h-20 grow place-items-center">content</div>
  <div class="divider divider-horizontal"></div>
  <div class="card bg-base-300 rounded-box grid h-20 grow place-items-center">content</div>
</div>

<slot/>
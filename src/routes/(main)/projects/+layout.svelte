<script>
  let { children } = $props();
</script>

<title>Project Gallery</title>

<div class="flex w-full min-h-screen my-8 justify-between">
  <div class="@container bg-base-100 rounded-box flex-5 mx-4 text-base-content">
    <div class="m-8">
        {@render children()}
    </div>
  </div>
</div>

<script>
  let { children } = $props();
</script>

<div class="flex w-full min-h-screen my-8 justify-between">
  <div class="bg-amber-200 rounded-box flex-1 mx-4 text-amber-900">
    <div class="flex flex-col m-4">
      <p>navigation</p>
      <ul>
        <li>Post 1</li>
        <li>Post 2</li>
      </ul>
    </div>
  </div>

  <div class="divider divider-horizontal m-0"></div>

  <div class="bg-blue-200 rounded-box flex-5 mx-4 text-blue-900">
    <div class="m-4 prose-base">
      {@render children()}
    </div>
  </div>
</div>

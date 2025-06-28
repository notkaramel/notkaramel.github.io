<script>
  let { children } = $props();
</script>

<title>Blogs</title>

<div class="flex w-full min-h-screen my-8 justify-between">
  <div class="bg-blue-200 rounded-box flex-1 mx-4 text-blue-900">
    <div class="flex flex-col m-4 prose-base **:my-2 prose-ul:list-disc">
      <p>Blog navigation panel</p>
      <hr>
      <ul>
        <li>Trust me that</li>
        <li>I'm still working on it</li>
      </ul>
    </div>
  </div>

  <div class="divider divider-horizontal m-0"></div>

  <div class="@container bg-sky-200 rounded-box flex-5 mx-4 text-sky-900">
    <div class="m-8">
      <div class="prose-base **:my-4 prose-a:underline">
        {@render children()}
      </div>
    </div>
  </div>
</div>

<script>
  let { children } = $props();
</script>

<title>Project Gallery</title>

<div class="flex w-full min-h-screen my-8 justify-between">
  <div class="bg-indigo-200 rounded-box flex-1 mx-4 text-indigo-900">
    <div class="flex flex-col m-4 prose-base **:my-2 prose-ul:list-disc">
      <p>Project navigation</p>
      <hr />
      <ul>
        <li>I'm still figuring out if this is needed</li>
        <li>like, categories maybe?</li>
      </ul>
    </div>
  </div>

  <div class="divider divider-horizontal m-0"></div>

  <div class="@container bg-fuchsia-200 rounded-box flex-5 mx-4 text-fuchsia-900">
    <div class="m-8">
      <div class="prose-base **:my-4 prose-a:underline">
        {@render children()}
      </div>
    </div>
  </div>
</div>

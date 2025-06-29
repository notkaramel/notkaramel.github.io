<script>
  import Progress from "$lib/components/Progress.svelte";

</script>
<!-- Blog content are in the right side panel only -->

<div class="flex w-full min-h-screen my-8 justify-between">
  <div
    class="bg-base-100 rounded-box flex-1 ml-4 text-secondary-content h-fit shadow-2xl"
  >
    <div class="flex flex-col m-4 prose-base **:my-2 prose-ul:list-disc">
      <p>Blog navigation</p>
      <hr />
      <ul>
        <li>Work</li>
        <li>in</li>
        <li>progress</li>
      </ul>
    </div>
  </div>

  <div
    class="container bg-base-200 rounded-box flex-2 lg:flex-5 mx-4 text-primary-content shadow-2xl shadow-primary"
  >
    <div class="m-8">
      <div class="prose-base **:my-4 prose-a:underline">
        <h1>I write blogs sometimes</h1>
        <hr />
        <p>
          With that said, this feature will come in the near future, I guess :)
        </p>
        <p>
          In the meantime, you can read:
          <a href="https://github.com/notkaramel/guide"
            >https://github.com/notkaramel/guide</a
          >
        </p>
      </div>
      <Progress/>
    </div>
  </div>
</div>

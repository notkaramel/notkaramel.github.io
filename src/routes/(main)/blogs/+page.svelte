<script>
  import Progress from "$lib/components/Progress.svelte";
  let { data } = $props();
</script>

<!-- Blog content are in the right side panel only -->

<div class="prose-base **:my-4 prose-a:underline">
  <h1>I write blogs sometimes</h1>
  <hr />
  <p>With that said, this feature will come in the near future, I guess :)</p>
  <p>
    In the meantime, you can read:
    <a href="https://github.com/notkaramel/guide"
      >https://github.com/notkaramel/guide</a
    >
  </p>
</div>
<Progress />

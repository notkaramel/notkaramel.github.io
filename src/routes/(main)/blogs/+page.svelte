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

<div>
  <p class="text-2xl">List of available blogs</p>
  <hr class="hr" />

  <div class="flex gap-2 flex-col flex-wrap w-full">
    {#each data.blogs as blog}
      <div
        class="card w-96 bg-base-100 card-sm shadow-lg shadow-primary border-2 my-4"
      >
        <div class="card-body">
          <h2 class="card-title">{blog.frontmatter.title}</h2>
          <p>
            <!-- {blog.frontmatter.title} -->
            Tags:
            <span class="badge badge-primary">
              {"<something/>"}
            </span>
          </p>
          <div class="card-actions justify-end">
            <a href="/blogs/{blog.frontmatter.slug}">
              <button class="btn btn-primary">Read</button>
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

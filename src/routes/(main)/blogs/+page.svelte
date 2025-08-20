<script>
  import Progress from "$lib/components/Progress.svelte";
  import { blur, slide } from "svelte/transition";
  let { data } = $props();
  let checkpoints = [
    { label: "Ideation", done: true },
    { label: "Design", done: true },
    { label: "Core functionality", done: true },
    { label: "Populate content-ish", done: true },
    { label: "Complete styling", done: false },
  ];
</script>

<title>Writings and blogs I write sometimes ~</title>

<!-- Blog content are in the right side panel only -->

<div class="prose-base **:my-4 prose-a:underline">
  <h1>I write blogs sometimes</h1>
  <hr />
</div>

<Progress {checkpoints} />

<div>
  <p class="text-2xl">List of available blogs</p>
  <hr class="hr" />

  <div class="flex gap-2 flex-col flex-wrap w-full">
    {#each data.blogs as blog}
      <div
        class="card w-full md:w-2/3 lg:w-96 bg-base-100 card-sm place-self-center shadow-lg shadow-primary border-2 my-4
        hover:shadow-2xl transition-all"
      >
        <a href="/blogs/{blog.frontmatter.slug}">
          <div class="card-body" transition:slide>
            <h2 class="card-title">{blog.frontmatter.title}</h2>
            <p>
              <!-- {blog.frontmatter.title} -->
              Tags:
              {#each ["<something/>", "<something else/>"] as tag}
                <span class="badge badge-primary ml-2">
                  {tag}
                </span>
              {/each}
            </p>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<script lang="ts">
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();
</script>

<title>Blogs</title>

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

      {#each data.blogEntries as slg}
        <div class="card">
          <a href="/blogs/{slg.frontmatter.slug}">
            {slg.frontmatter.title}
          </a>
        </div>
      {/each}
    </div>
  </div>

  <div
    class="container bg-base-200 rounded-box flex-2 lg:flex-5 mx-4 text-primary-content shadow-2xl shadow-primary"
  >
    <div class="m-8">
      {@render children()}
    </div>
  </div>
</div>

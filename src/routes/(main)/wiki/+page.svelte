<script lang="ts">
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";
  import WikiCard from "$lib/components/WikiCard.svelte";
  import type { WikiFrontmatter } from "@schemas";

  type PageData = {
    canonicalURL: string;
    wiki: {
      frontmatter: WikiFrontmatter;
      content: string;
    }[];
  };

  const { data } = $props<{ data: PageData }>();

  let searchQuery = $state("");

  const filtered = $derived.by(() => {
    const list = data.wiki ?? [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter((item) => {
      const fm = item.frontmatter;
      const searchable =
        `${fm.title} ${fm.description} ${(fm.tags ?? []).join(" ")}`.toLowerCase();
      return searchable.includes(q);
    });
  });
</script>

<SearchEngineOp
  title="Wiki – Technical docs & guides"
  description="Technical documentation, tutorials, and guides on Linux, Arch, development, and more."
  canonical={data.canonicalURL}
/>

<div class="container lg:max-w-6xl w-full mx-auto px-6 lg:px-12 space-y-6 my-8">
  <header class="blog-card p-6 lg:p-8">
    <h1 class="text-2xl font-bold text-primary-content tracking-tight mb-2">
      Wiki
    </h1>
    <p class="text-primary-content/90 mb-4">
      Technical documentation, tutorials, and guides.
    </p>
    <label
      class="input input-primary input-bordered flex items-center gap-2 w-full max-w-md focus-within:ring-2 focus-within:ring-primary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="size-4 text-primary-content opacity-70"
      >
        <path
          fill-rule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.755ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clip-rule="evenodd"
        />
      </svg>
      <input
        type="text"
        class="grow text-primary-content placeholder-primary-content/60"
        placeholder="Search wiki..."
        bind:value={searchQuery}
      />
    </label>
  </header>

  <ul class="w-full space-y-6">
    {#each filtered as item (item.frontmatter.slug)}
      <WikiCard frontmatter={item.frontmatter} />
    {/each}
  </ul>

  {#if filtered.length === 0}
    <div class="blog-card p-12 text-center">
      <p class="text-primary-content/90 text-lg mb-2">No wiki pages match your search.</p>
    </div>
  {/if}
</div>

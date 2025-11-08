<script lang="ts">
  import Progress from "$lib/components/Progress.svelte";
  import { slide } from "svelte/transition";
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";

  type BlogFrontmatter = {
    title: string;
    slug: string;
    timeWritten?: string;
    lastUpdated?: string;
    tags?: string[] | null;
  };

  type BlogEntry = {
    frontmatter: BlogFrontmatter;
    content: string;
  };

  type PageData = {
    canonicalURL: string;
    blogs: BlogEntry[];
  };

  const { data } = $props<{ data: PageData }>();

  const checkpoints: { label: string; done: boolean }[] = [
    { label: "Ideation", done: true },
    { label: "Design", done: true },
    { label: "Core functionality", done: true },
    { label: "Populate content-ish", done: true },
    { label: "Complete styling", done: false },
  ];

  function formatDate(value?: string | null): string | null {
    if (!value) {
      return null;
    }

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      return null;
    }

    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getDateMetadata(
    frontmatter: BlogFrontmatter | undefined,
  ): string | null {
    const published = formatDate(frontmatter?.timeWritten);
    const updated = formatDate(frontmatter?.lastUpdated);

    if (published && updated && published !== updated) {
      return `Updated ${updated} • Published ${published}`;
    }

    if (updated) {
      return `Updated ${updated}`;
    }

    if (published) {
      return `Published ${published}`;
    }

    return null;
  }

  function getTags(frontmatter: BlogFrontmatter | undefined): string[] {
    if (!frontmatter) {
      return [];
    }

    const tagsField = frontmatter.tags;

    if (!Array.isArray(tagsField)) {
      return [];
    }

    return tagsField.filter(
      (tag): tag is string => typeof tag === "string" && tag.trim().length > 0,
    );
  }
</script>

<SearchEngineOp
  title="I write stuffs sometimes :P"
  description="Checkout my blogs on various topics, including - but not limited to - Linux, travelling, technical takes, and food recipes!"
  canonical={data.canonicalURL}
/>

<div>
  <p class="text-2xl text-center">I write blogs about all kinds of stuffs</p>
  <hr class="hr my-4" />

  <ul class="w-full space-y-4">
    {#each data.blogs as blog (blog.frontmatter.slug)}
      <li
        class="border border-base-200 rounded-xl bg-base-100 shadow-lg shadow-primary/30 hover:shadow-primary/60 hover:shadow-2xl transition-all ring-1 ring-transparent hover:ring-2 hover:ring-primary"
        transition:slide
      >
        <a
          href="/blogs/{blog.frontmatter.slug}"
          class="flex flex-col gap-3 p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        >
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="font-semibold text-xl">{blog.frontmatter.title}</h2>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            {#each getTags(blog.frontmatter) as tag (tag)}
              <span class="badge badge-primary badge-outline">{tag}</span>
            {/each}
          </div>
          <p class="text-sm text-base-content/70">
            {#if getDateMetadata(blog.frontmatter)}
              {getDateMetadata(blog.frontmatter)}
            {:else}
              Updated timeline coming soon.
            {/if}
          </p>
        </a>
      </li>
    {/each}
  </ul>
</div>

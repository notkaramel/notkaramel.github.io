<script lang="ts">
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";
  import BlogFilterContainer from "$lib/components/BlogFilterContainer.svelte";
  import BlogListContainer from "$lib/components/BlogListContainer.svelte";
  import type { BlogFrontmatter, BlogCategory } from "@schemas";

  type PageData = {
    canonicalURL: string;
    blogs: {
      frontmatter: BlogFrontmatter;
      content: string;
    }[];
  };

  const { data } = $props<{ data: PageData }>();

  let searchQuery = $state("");
  let sortBy = $state<"date-desc" | "date-asc" | "title" | "category">("date-desc");
  let selectedCategories = $state<Set<BlogCategory>>(new Set());

  function toSortableDate(value?: string): number {
    if (!value) return 0;
    const timestamp = Date.parse(value);
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  const filteredAndSorted = $derived.by(() => {
    let result = [...data.blogs];

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((blog) => {
        const fm = blog.frontmatter;
        const searchable =
          `${fm.title} ${fm.description} ${(fm.tags ?? []).join(" ")} ${(fm.categories ?? []).join(" ")}`.toLowerCase();
        return searchable.includes(q);
      });
    }

    if (selectedCategories.size > 0) {
      result = result.filter((blog) => {
        const cats: BlogCategory[] = blog.frontmatter.categories ?? [];
        return cats.some((c: BlogCategory) => selectedCategories.has(c));
      });
    }

    result = [...result].sort((a, b) => {
      const fmA = a.frontmatter;
      const fmB = b.frontmatter;

      switch (sortBy) {
        case "date-desc": {
          const dateA =
            toSortableDate(fmA.lastUpdated) || toSortableDate(fmA.date);
          const dateB =
            toSortableDate(fmB.lastUpdated) || toSortableDate(fmB.date);
          return dateB - dateA;
        }
        case "date-asc": {
          const dateA =
            toSortableDate(fmA.lastUpdated) || toSortableDate(fmA.date);
          const dateB =
            toSortableDate(fmB.lastUpdated) || toSortableDate(fmB.date);
          return dateA - dateB;
        }
        case "title":
          return (fmA.title ?? "").localeCompare(fmB.title ?? "");
        case "category": {
          const catA = (fmA.categories ?? [])[0] ?? "";
          const catB = (fmB.categories ?? [])[0] ?? "";
          return catA.localeCompare(catB) || (fmA.title ?? "").localeCompare(fmB.title ?? "");
        }
        default:
          return 0;
      }
    });

    return result;
  });
</script>

<SearchEngineOp
  title="Blog – thoughts, travel & more"
  description="Blog posts on travel, discussion, random thoughts, and more."
  canonical={data.canonicalURL}
/>

<div class="container lg:max-w-6xl w-full mx-auto px-6 lg:px-12 space-y-6 my-8">
  <BlogFilterContainer
    bind:searchQuery
    bind:sortBy
    bind:selectedCategories
  />
  
  <BlogListContainer blogs={filteredAndSorted} />
</div>

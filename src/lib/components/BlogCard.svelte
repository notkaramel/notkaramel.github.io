<script lang="ts">
    import type { BlogFrontmatter } from "@schemas";
    import { slide } from "svelte/transition";

    let { frontmatter }: { frontmatter: BlogFrontmatter } = $props();

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

    function getTags(): string[] {
        if (!frontmatter || !Array.isArray(frontmatter.tags)) {
            return [];
        }

        return frontmatter.tags.filter(
            (tag): tag is string =>
                typeof tag === "string" && tag.trim().length > 0,
        );
    }

    function getCategories(): string[] {
        if (!frontmatter || !Array.isArray(frontmatter.categories)) {
            return [];
        }

        return frontmatter.categories.filter(
            (cat): boolean => typeof cat === "string" && cat.trim().length > 0,
        ) as string[];
    }

    const topic = $derived(frontmatter?.topic);

    function getDateMetadata(): string[] {
        const dates: string[] = [];
        const published = formatDate(frontmatter?.date);
        const updated = formatDate(frontmatter?.lastUpdated);

        if (published) {
            dates.push(`Published ${published}`);
        }

        if (updated && published !== updated) {
            dates.push(`Updated ${updated}`);
        }

        return dates;
    }

    const tags = getTags();
    const categories = getCategories();
    const dateLines = getDateMetadata();
</script>

<li
    class="blog-card blog-card-hover
            ring-2 ring-primary-content focus-visible:ring-2 hover:scale-[1.012] hover:shadow-xl hover:shadow-primary transform-gpu"
    transition:slide
>
    <a href={`/blogs/${frontmatter.slug}`} class="flex flex-col gap-3 p-6">
        <div class="flex flex-wrap items-center gap-2">
            <h2 class="font-semibold text-xl text-primary-content tracking-tight">{frontmatter.title}</h2>
        </div>
        <div class="flex flex-wrap items-center gap-2">
            {#if topic}
                <span class="badge badge-secondary text-secondary-content text-xs">{topic}</span>
            {/if}
            {#each categories as cat}
                <span class="badge badge-primary text-primary-content text-xs">
                    {cat}
                </span>
            {/each}
            {#each tags as tag}
                <span class="badge badge-primary badge-outline text-primary-content text-xs">
                    {tag}
                </span>
            {/each}
        </div>
        <div class="space-y-1 text-sm text-primary-content/90">
            {#if dateLines.length > 0}
                {#each dateLines as line}
                    <p>{line}</p>
                {/each}
            {:else}
                <p>Updated timeline coming soon.</p>
            {/if}
        </div>
    </a>
</li>

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
    const dateLines = getDateMetadata();
</script>

<li
    class="border border-primary-content rounded-xl bg-base-100 shadow-lg
            shadow-primary hover:shadow-2xl hover:shadow-secondary transition-all
            ring-2 ring-primary-content hover:ring-accent-content focus-visible:ring-accent-content"
    transition:slide
>
    <a href={`/blogs/${frontmatter.slug}`} class="flex flex-col gap-3 p-5">
        <div class="flex flex-wrap items-center gap-2">
            <h2 class="font-semibold text-xl text-primary-content">{frontmatter.title}</h2>
        </div>
        <div class="flex flex-wrap items-center gap-2">
            {#each tags as tag}
                <span class="badge badge-primary badge-outline text-xs">
                    {tag}
                </span>
            {/each}
        </div>
        <div class="space-y-1 text-sm text-secondary-content/90">
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

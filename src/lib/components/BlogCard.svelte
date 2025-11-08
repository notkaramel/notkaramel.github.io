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
    class="border border-base-200 rounded-xl bg-base-100 shadow-lg
            shadow-primary/36 hover:shadow-primary hover:shadow-2xl transition-all
            ring-2 ring-primary hover:ring-primary-content focus-visible:ring-primary-content"
    transition:slide
>
    <a href={`/blogs/${frontmatter.slug}`} class="flex flex-col gap-3 p-5">
        <div class="flex flex-wrap items-center gap-2">
            <h2 class="font-semibold text-xl">{frontmatter.title}</h2>
        </div>
        <div class="flex flex-wrap items-center gap-2 text-base-content/60">
            {#each tags as tag}
                <span
                    class="badge badge-primary badge-outline text-secondary-content tracking-wide text-xs"
                >
                    {tag}
                </span>
            {/each}
        </div>
        <div class="space-y-1 text-sm text-base-content/70">
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

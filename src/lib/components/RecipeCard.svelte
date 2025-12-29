<script lang="ts">
    import type { RecipeFrontmatter } from "@schemas";
    import { slide } from "svelte/transition";

    let { frontmatter }: { frontmatter: RecipeFrontmatter } = $props();

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

    function getCookingEmoji(tags: string[]): string {
        const emojiMap: Record<string, string> = {
            bread: "🍞",
            cookies: "🍪",
            dessert: "🍰",
            cake: "🎂",
            pie: "🥧",
            pasta: "🍝",
            pizza: "🍕",
            soup: "🍲",
            salad: "🥗",
            burger: "🍔",
            sushi: "🍣",
            taco: "🌮",
            breakfast: "🥞",
            dinner: "🍽️",
            snack: "🍿",
            drink: "🥤",
            coffee: "☕",
            tea: "🍵",
        };

        for (const tag of tags) {
            const lowerTag = tag.toLowerCase();
            if (emojiMap[lowerTag]) {
                return emojiMap[lowerTag];
            }
        }

        // Default emojis based on common patterns
        const randomEmojis = ["👨‍🍳", "🍳", "🥘", "🧁", "🍮"];
        return randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
    }

    const tags = getTags();
    const dateLines = getDateMetadata();
    const emoji = getCookingEmoji(tags);
</script>

<li
    class="group relative rounded-2xl bg-gradient-to-br from-base-100 via-base-100 to-primary/10 
            shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 
            transition-all duration-300 ease-out
            ring-2 ring-primary/50 hover:ring-primary-content ring-offset-2 ring-offset-base-100
            hover:scale-[1.01] hover:-translate-y-0.5
            transform-gpu"
    transition:slide
>
    <!-- Animated background gradient -->
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-primary/10 to-accent/12
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <a href={`/cooking/${frontmatter.slug}`} class="relative flex flex-col gap-4 p-6 z-10">
        <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <div class="text-4xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    {emoji}
                </div>
                <h2 class="font-bold text-2xl bg-gradient-to-r from-primary-content to-secondary-content bg-clip-text text-transparent
                           group-hover:from-primary-content group-hover:to-secondary-content
                           transition-all duration-300">
                    {frontmatter.title}
                </h2>
            </div>
            
            <div class="flex items-center gap-2 text-sm text-base-content/60">
                <div class="space-y-1 text-right">
                    {#if dateLines.length > 0}
                        {#each dateLines as line}
                            <p class="text-xs">{line}</p>
                        {/each}
                    {:else}
                        <p class="text-xs">Updated timeline coming soon.</p>
                    {/if}
                </div>
            </div>
        </div>
        
        {#if frontmatter.description}
            <p class="text-base-content/80 text-sm leading-relaxed line-clamp-2">
                {frontmatter.description}
            </p>
        {/if}

        <div class="flex flex-wrap items-center gap-2">
            {#each tags as tag, i}
                <span
                    class="badge badge-primary badge-lg text-xs font-semibold tag-badge"
                    style="animation-delay: {i * 100}ms;"
                >
                    {tag}
                </span>
            {/each}
        </div>
    </a>
</li>

<style>
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-5px);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .group:hover .text-4xl {
        animation: float 2s ease-in-out infinite;
    }

    .tag-badge {
        opacity: 0;
        animation: fadeIn 0.3s ease-out forwards;
    }
</style>
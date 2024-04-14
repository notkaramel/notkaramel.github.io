<script lang="ts">
    import ContentBlock from "./ContentBlock.svelte";

    export let title: string;
    export let tags: string[];
    export let viewCount: number;
    export let slug: string;
</script>

<a href={`/blog/${slug}`}>
<ContentBlock>
        <h2 class="card-title">{title}</h2>
        <p class="text-black-500">Views: {viewCount}</p>
        <div class="flex flex-wrap space-between">
            {#each tags as tag}
                <span class="badge badge-accent mx-2">{tag}</span>
            {/each}
        </div>
    </ContentBlock>
</a>

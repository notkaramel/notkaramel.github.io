<script lang="ts">
    export let title: string;
    export let tags: string[];
    export let slug: string;
</script>

<a href={`/blog/${slug}`}>
    <h2 class="blog-title">{title}</h2>
    <div class="tag-container">
        {#each tags as tag}
            <span class="tag">{tag}</span>
        {/each}
    </div>
</a>

<style lang="postcss">
    .blog-title {
        @apply font-bold text-2xl ;
    }

    .tag-container {
        @apply flex gap-2;
    }

    .tag {
        @apply py-1 px-4 rounded-lg;
        @apply bg-sky-900 text-white;
    }
</style>

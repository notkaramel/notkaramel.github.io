<script lang="ts">
    export let title: string;
    export let date: string;
    export let tags: string[];
    export let content: string;
</script>

<div class="w-full xl:w-1/2">
    <div class="blog-post">
        <h1 class="font-bold text-4xl">{title}</h1>
        <p>Date: {date}</p>
        <div>
            {#each tags as tag}
                <div class="badge badge-primary badge-outline mx-1">{tag}</div>
            {/each}
        </div>
        <div class="content">
            {content}
        </div>
    </div>
</div>

<style lang="postcss">
    .blog-post {
        @apply p-8 m-6;
        @apply border-2 rounded-lg shadow-lg;
        @apply bg-base-100 border-base-200 border-4;
    }
</style>

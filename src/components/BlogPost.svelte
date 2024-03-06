<script lang=ts>
    export let title:string;

    export let date:string;
    export let tags:string[];
    export let content:string;
</script>

<div class="blog-post">
    <h1>{title}</h1>
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

<style lang="postcss">
    .blog-post {
        @apply p-8 m-6;
        @apply border-2 rounded-lg shadow-lg;
        background-color: hsla(203, 17%, 53%, 0.322);
    }
</style>
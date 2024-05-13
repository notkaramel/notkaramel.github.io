<script lang="ts">
    export let title: string = "Something";
    export let date: string;
    export let content: string;
</script>

<article id=content>
    <h1 class="prose-h1">{title}</h1>
    <div class="blog-post">
        <p class="prose-">Date: {date}</p>
        <div>
            {content}
        </div>
    </div>
</article>

<style lang="postcss">
    #content {
        @apply prose xl:prose-lg w-full text-left pt-8;
    }
</style>

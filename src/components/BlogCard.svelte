<script lang="ts">
    export let title: string;
    export let slug: string;
</script>

<div class="aBlog">
    <a href={`/blog/${slug}`}>
        <h2 class="blog-title">{title}</h2>
    </a>
</div>

<style lang="postcss">
    .aBlog {
        @apply bg-white w-full md:w-1/2;
        @apply rounded-lg shadow-md shadow-sky-300;
        a {
            @apply block;
            @apply p-12;
            @apply transition-transform;
        
        }
    }
    .blog-title {
        @apply font-bold text-2xl ;
    }
</style>

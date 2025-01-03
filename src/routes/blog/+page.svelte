<script>
    import BlogCard from "components/BlogCard.svelte";
    import ContentBlock from "components/ContentBlock.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<title>Blog</title>
<h1>Blog</h1>
<p>Here are some of my blog posts:</p>

{#each data.summaries as post}
    <BlogCard
        title={post.title}
        slug={post.slug}
    />
{/each}

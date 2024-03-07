<script>
// @ts-nocheck

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<title>Blog</title>
<h1>Blog</h1>
<p>Here are some of my blog posts:</p>
<ul>
    {#each data.summaries as post}
        <li>
            <a href={`blog/${post.slug}`}>{post.title}</a>
        </li>
    {/each}
</ul>
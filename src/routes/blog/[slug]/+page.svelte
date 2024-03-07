<script>
// @ts-nocheck

    import BlogPost from "components/BlogPost.svelte";
    export let data;
</script>

<title>{data.title} ~ Blog</title>

<BlogPost
    title={data.title}
    date={data.date}
    tags={data.tags}
    content={data.content}
/>
<script>
    // /** @type {import('./$types').LayoutData} */
    export let data;
</script>

<main>
    <h1>{data.title}</h1>
    <p>{data.content}</p>
    <slot />
</main>

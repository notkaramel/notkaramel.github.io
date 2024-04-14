<script lang='ts'>
    export let title:string;
    export let description:string;
    export let githubLink:string;
    export let productLink:string;
</script>

<div class="bg-base-100 rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-bold mb-2">{title}</h2>
    <p class="mb-4">{description}</p>
    <div class="flex justify-between">
        {#if githubLink}
            <a href={githubLink} target="_blank" class="hover:underline font-bold">GitHub</a>
        {/if}
        {#if productLink}
            <a href={productLink} target="_blank" class="hover:underline font-bold">Product</a>
        {/if}
    </div>
</div>
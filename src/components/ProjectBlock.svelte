<script lang='ts'>
    export let title:string;
    export let description:string;
    export let githubLink:string;
    export let productLink:string;
</script>

<div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-bold mb-2">{title}</h2>
    <p class="text-gray-600 mb-4">{description}</p>
    <div class="flex justify-between">
        {#if githubLink}
            <a href={githubLink} target="_blank" class="text-blue-500 hover:underline">GitHub</a>
        {/if}
        {#if productLink}
            <a href={productLink} target="_blank" class="text-blue-500 hover:underline">Product</a>
        {/if}
    </div>
</div>
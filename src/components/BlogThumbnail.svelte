<script lang='ts'>
    import ContentBlock from "./ContentBlock.svelte";

    export let title:string;
    export let tags:string[];
    export let viewCount:number;
    export let slug:string;
</script>

<div class="card card-bordered bg-cyan-200 text-cyan-900">
    <a href="{`/blog/${slug}`}">
    <div class="card-body">
            <h2 class="card-title">{title}</h2>
            <p class="text-black-500">Views: {viewCount}</p>
            <div class="flex flex-wrap">
                {#each tags as tag}
                <span class="badge badge-accent mx-2">{tag}</span>
                {/each}
            </div>
        </div>
    </a>
</div>
<script lang="ts">
    import githubLogo from "$lib/svgs/github.svg";

    export let title: string;
    export let description: string;
    export let github: string;
    export let link: string | null;
    export let techStack: string[];
</script>

<div class="bg-blue-300 rounded-lg shadow-lg p-6 w-5/6 lg:w-1/2">
    <h2 class="text-xl font-semibold mb-2">{title}</h2>
    <p class="mb-4">
        {description}
    </p>

    <div class="flex justify-between pb-2">
        {#if link}
            <a href={link} target="_blank" class="hover:bg-blue-400 font-bold">
                View project
            </a>
        {/if}
        {#if github}
            <a href={github} target="_blank" class="hover:bg-blue-400 font-bold">
                <img
                    src={githubLogo}
                    alt="GitHub logo"
                    class="h-6 inline-block"
                />
                &nbsp; View on GitHub
            </a>
        {/if}
    </div>

    {#if techStack}
        <p>
            <span class="flex flex-wrap gap-2">
                {#each techStack as tech}
                    <span class="bg-blue-500 text-white px-2 py-1 rounded-md">
                        {tech}
                    </span>
                {/each}
            </span>
        </p>
    {/if}
</div>

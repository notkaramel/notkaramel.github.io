<script>
    import ProjectBlock from "components/ProjectBlock.svelte";

    import projects from '$lib/content/projects.json';
</script>

<title> Projects </title>
<h1> Projects </h1>

<div class="container flex flex-col flex-wrap gap-4">
    {#each projects as project}
        {#if project.featured}
            <ProjectBlock
                title={project.title}
                description={project.shortDesc}
                techStack={project.techStack}
                github={project.github}
                link={project.link}
            />
        {/if}
    {/each}
</div>

<style lang=postcss>
    h1 {
        @apply text-4xl font-bold;
    }
</style>
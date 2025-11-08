<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { projects } from "$lib/content/projects";
</script>

<section class="flex flex-col items-center gap-6">
  <h1 class="text-2xl text-center">I build all kinds of project!</h1>

  <div class="flex w-full flex-wrap justify-center gap-6">
    {#each projects as project}
      <ProjectCard {project}/>
    {/each}
  </div>
</section>

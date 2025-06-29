<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { projects } from "$lib/content/projects";
</script>

<!-- Blog content are in the right side panel only -->

<h1 class="text-2xl text-center">I build all kinds of project!</h1>

<div class="flex flex-wrap items-center justify-center gap-4">
  {#each projects as project}
   <ProjectCard {project}/>
  {/each}
</div>

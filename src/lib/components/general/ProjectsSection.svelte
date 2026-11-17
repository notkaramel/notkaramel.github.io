<script lang="ts">
  import projects from "#lib/content/projects.json";
  import ProjectCard from "#lib/components/ProjectCard.svelte";
  import type { Project } from "#schemas";

  const typedProjects = projects as Project[];

  const activeProjects = $derived(
    typedProjects.filter((p) => p.featured && p.status === "active"),
  );
  const previousProjects = $derived(
    typedProjects.filter((p) => p.featured && p.status === "previous"),
  );
</script>

<div class="space-y-10">
  {#if activeProjects.length > 0}
    <section class="space-y-4">
      <div class="flex items-center gap-2.5">
        <span class="neo-pill neo-pill-yellow px-3 py-1 text-xs">
          ✦ Currently Tinkering
        </span>
        <span class="text-xs font-artistic text-primary-content/70">
          {activeProjects.length} active explorations
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        {#each activeProjects as project, i (project.title)}
          <ProjectCard {project} tone={i % 2 === 0 ? "blue" : "yellow"} />
        {/each}
      </div>
    </section>
  {/if}

  {#if previousProjects.length > 0}
    <section class="space-y-4">
      <div class="flex items-center gap-2.5">
        <span class="neo-pill neo-pill-blue px-3 py-1 text-xs">
          ♫ Archive &amp; Past Works
        </span>
        <span class="text-xs font-artistic text-primary-content/70">
          {previousProjects.length} completed pieces
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        {#each previousProjects as project, i (project.title)}
          <ProjectCard {project} tone={i % 2 === 0 ? "yellow" : "blue"} />
        {/each}
      </div>
    </section>
  {/if}
</div>

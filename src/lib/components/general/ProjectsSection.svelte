<script>
  import projects from "$lib/content/projects.json";
  import Dropdown from "$lib/components/Dropdown.svelte";

  const activeProjects = $derived(
    projects.filter((p) => p.featured && p.status === "active")
  );
  const previousProjects = $derived(
    projects.filter((p) => p.featured && p.status === "previous")
  );
</script>

<div class="space-y-8">
  {#if activeProjects.length > 0}
    <section>
      <h3 class="text-lg font-semibold text-primary-content mb-3">
        Active Projects
      </h3>
      <div class="space-y-2">
        {#each activeProjects as project}
          <Dropdown
            title={project.title}
            subtitle={project.category.join(" · ")}
          >
            <p class="text-sm mb-3">{project.shortDesc}</p>
            <div class="flex flex-wrap gap-2 mb-2">
              {#each project.techStack as tech}
                <span class="badge badge-sm badge-secondary text-secondary-content"
                  >{tech}</span
                >
              {/each}
            </div>
            <div class="flex gap-3">
              {#if project.github}
                <a
                  href={project.github}
                  class="link link-primary text-sm text-primary-content"
                  target="_blank"
                  rel="noreferrer"
                  >GitHub</a
                >
              {/if}
              {#if project.link}
                <a
                  href={project.link}
                  class="link link-primary text-sm text-primary-content"
                  target="_blank"
                  rel="noreferrer"
                  >Live</a
                >
              {/if}
            </div>
          </Dropdown>
        {/each}
      </div>
    </section>
  {/if}

  {#if previousProjects.length > 0}
    <section>
      <h3 class="text-lg font-semibold text-primary-content mb-3">
        Previous Projects
      </h3>
      <div class="space-y-2">
        {#each previousProjects as project}
          <Dropdown
            title={project.title}
            subtitle={project.category.join(" · ")}
          >
            <p class="text-sm mb-3">{project.shortDesc}</p>
            <div class="flex flex-wrap gap-2 mb-2">
              {#each project.techStack as tech}
                <span class="badge badge-sm badge-secondary text-secondary-content"
                  >{tech}</span
                >
              {/each}
            </div>
            <div class="flex gap-3">
              {#if project.github}
                <a
                  href={project.github}
                  class="link link-primary text-sm text-primary-content"
                  target="_blank"
                  rel="noreferrer"
                  >GitHub</a
                >
              {/if}
              {#if project.link}
                <a
                  href={project.link}
                  class="link link-primary text-sm text-primary-content"
                  target="_blank"
                  rel="noreferrer"
                  >Live</a
                >
              {/if}
            </div>
          </Dropdown>
        {/each}
      </div>
    </section>
  {/if}
</div>

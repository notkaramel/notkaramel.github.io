<script lang="ts">
  import type { Project } from "#schemas";

  let {
    project,
    tone = "blue",
  }: {
    project: Project;
    tone?: "blue" | "yellow";
  } = $props();
</script>

{#if project.featured}
  <article
    class="neo-card neo-card-hover flex flex-col justify-between gap-4 p-5 h-full"
  >
    <div class="space-y-3">
      <!-- Top sticker row -->
      <div class="flex items-start justify-between gap-3">
        <div class="flex flex-wrap gap-1.5">
          {#each project.category as cat}
            <span
              class="neo-pill px-2.5 py-0.5 text-[11px]
                {tone === 'yellow' ? 'neo-pill-yellow' : 'neo-pill-blue'}"
            >
              {cat}
            </span>
          {/each}
        </div>

        {#if project.github || project.link}
          <div class="flex items-center gap-1.5 shrink-0">
            {#if project.github}
              <a
                href={project.github}
                class="neo-btn neo-btn-surface w-8 h-8 p-0"
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                title="Source code"
              >
                <svg
                  class="size-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"
                  />
                </svg>
              </a>
            {/if}

            {#if project.link}
              <a
                href={project.link}
                class="neo-btn neo-btn-yellow w-8 h-8 p-0"
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title} project site`}
                title="Open live"
              >
                <svg
                  class="size-3.5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"
                  />
                </svg>
              </a>
            {/if}
          </div>
        {/if}
      </div>

      <h3 class="font-extrabold text-lg text-primary-content leading-snug">
        {project.title}
      </h3>

      <p class="text-sm text-primary-content/85 leading-relaxed">
        {project.shortDesc}
      </p>
    </div>

    <div
      class="pt-3 border-t-2 border-dashed border-[var(--neo-ink)]/25 flex flex-wrap gap-1.5"
    >
      {#each project.techStack as tech}
        <span
          class="neo-pill neo-pill-soft px-2.5 py-0.5 text-[11px] font-semibold"
        >
          {tech}
        </span>
      {/each}
    </div>
  </article>
{/if}

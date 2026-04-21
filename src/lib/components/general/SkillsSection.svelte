<script>
  import skills from "$lib/content/skills.json";
</script>

<div class="space-y-5">
  {#each skills as skill, i}
    {@const isEven = i % 2 === 0}
    <div
      class="rounded-xl border bg-base-100 p-4 shadow-sm transition-all duration-200
        {isEven
          ? 'border-secondary/30 hover:border-secondary/60 hover:shadow-md hover:shadow-secondary/10'
          : 'border-accent/30 hover:border-accent/60 hover:shadow-md hover:shadow-accent/10'}"
    >
      <!-- left accent bar -->
      <div class="flex items-start gap-3">
        <div
          class="mt-0.5 w-1 self-stretch rounded-full shrink-0
            {isEven ? 'bg-secondary' : 'bg-accent'}"
          aria-hidden="true"
        ></div>
        <div class="flex-1">
          <p class="font-semibold text-sm mb-2 tracking-wide uppercase
            {isEven ? 'text-secondary-content' : 'text-accent-content'}">
            {skill.title}
          </p>
          <div class="flex flex-wrap gap-1.5">
            {#each skill.tools as tool}
              <span
                class="badge badge-sm font-normal px-2 py-0.5
                  {isEven
                    ? 'bg-secondary/20 text-secondary-content border border-secondary/30'
                    : 'bg-accent/20 text-accent-content border border-accent/30'}"
              >
                {tool}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

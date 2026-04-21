<script>
  import skills from "$lib/content/skills.json";
</script>

<div class="space-y-5">
  {#each skills as skill}
    <div class="rounded-xl border border-primary/20 bg-base-100 p-4 shadow-sm hover:shadow-md hover:shadow-primary/10 hover:border-primary/40 transition-all duration-200">
      <p class="text-primary-content font-semibold text-sm mb-2 tracking-wide uppercase">
        {skill.title}
      </p>
      <div class="flex flex-wrap gap-1.5">
        {#each skill.tools as tool}
          <span class="badge badge-sm bg-primary/15 text-primary-content border border-primary/25 font-normal px-2 py-0.5">
            {tool}
          </span>
        {/each}
      </div>
    </div>
  {/each}
</div>

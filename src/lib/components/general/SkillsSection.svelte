<script lang="ts">
  import skills from "#lib/content/skills.json";
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
  {#each skills as skill, i (skill.title)}
    {@const isYellow = i % 2 === 1}
    <div class="neo-card neo-card-hover p-5 flex flex-col gap-3.5">
      <div class="flex items-center justify-between gap-2">
        <span
          class="neo-pill px-3 py-1 text-xs uppercase tracking-wider
            {isYellow ? 'neo-pill-yellow' : 'neo-pill-blue'}"
        >
          {skill.title}
        </span>
        <span
          class="text-xs font-artistic text-primary-content/60"
          aria-hidden="true"
        >
          {isYellow ? "♪" : "✦"}
        </span>
      </div>

      <div class="flex flex-wrap gap-2">
        {#each skill.tools as tool}
          <span
            class="neo-pill px-3 py-1 text-xs font-semibold
              {isYellow
              ? 'bg-[var(--neo-yellow-soft)] text-primary-content'
              : 'bg-[var(--neo-blue-soft)] text-primary-content'}"
          >
            {tool}
          </span>
        {/each}
      </div>
    </div>
  {/each}
</div>

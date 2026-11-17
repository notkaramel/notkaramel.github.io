<script lang="ts">
  import education from "#lib/content/education.json";
</script>

<div class="space-y-5">
  {#each education as eduItem (eduItem.school + eduItem.degree)}
    <div class="neo-card p-6 space-y-4">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="space-y-1">
          <span class="neo-pill neo-pill-yellow px-3 py-0.5 text-xs">
            🎓 {eduItem.duration}
          </span>
          <h3 class="text-xl font-extrabold text-primary-content pt-1">
            {eduItem.degree}
          </h3>
          <p class="text-sm font-artistic text-primary-content/80">
            {eduItem.school}
          </p>
        </div>
      </div>

      <ul
        class="space-y-2 text-sm list-disc pl-5 border-t-2 border-dashed border-[var(--neo-ink)]/20 pt-4"
      >
        {#each eduItem.details as detail}
          <li class="leading-relaxed text-primary-content/90">{detail}</li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

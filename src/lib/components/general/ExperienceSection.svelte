<script lang="ts">
  import workExperience from "#lib/content/experience.json";
  import Dropdown from "#lib/components/Dropdown.svelte";
</script>

<div class="space-y-1">
  {#each workExperience as we, i (`${we.jobTitle}-${we.workplace}-${we.time}`)}
    <Dropdown
      title={we.jobTitle}
      subtitle={`${we.workplace} · ${we.time}`}
      tone={i % 2 === 0 ? "blue" : "yellow"}
      defaultOpen={i === 0}
    >
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <span class="neo-pill neo-pill-soft px-2.5 py-0.5 text-xs">
          📍 {we.location}
        </span>
      </div>
      <ul class="mt-0 mb-0 text-sm space-y-2 list-disc pl-5">
        {#each we.description as wedesc}
          <li class="leading-relaxed text-primary-content/90">{wedesc}</li>
        {/each}
      </ul>
    </Dropdown>
  {/each}
</div>

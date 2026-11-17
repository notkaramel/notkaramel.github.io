<script lang="ts">
  import conferenceWorkshops from "#lib/content/workshops.json";
  import Dropdown from "#lib/components/Dropdown.svelte";
</script>

<div class="space-y-1">
  {#each conferenceWorkshops as cw, i (cw.title)}
    <Dropdown
      title={cw.title}
      subtitle={`${cw.time} · ${cw.location}`}
      tone={i % 2 === 0 ? "blue" : "yellow"}
      defaultOpen={true}
    >
      <p class="text-sm leading-relaxed text-primary-content/90 mb-0">
        Presented by <span class="font-semibold">{cw.authors.join(", ")}</span>.
      </p>
    </Dropdown>
  {/each}
</div>

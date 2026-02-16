<script>
  import conferenceWorkshops from "$lib/content/workshops.json";
  import Dropdown from "$lib/components/Dropdown.svelte";
</script>

<div>
  {#each conferenceWorkshops as cw}
    <Dropdown
      title={cw.title}
      subtitle={`${cw.time} · ${cw.location}`}
    >
      <p class="text-sm mb-0">
        Presented by {cw.authors.join(", ")}.
      </p>
    </Dropdown>
  {/each}
</div>

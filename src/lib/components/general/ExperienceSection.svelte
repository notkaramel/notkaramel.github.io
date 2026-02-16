<script>
  import workExperience from "$lib/content/experience.json";
  import Dropdown from "$lib/components/Dropdown.svelte";
</script>

<div>
  {#each workExperience as we}
    <Dropdown
      title={we.jobTitle}
      subtitle={`${we.workplace} · ${we.time}`}
    >
      <p class="text-sm text-primary-content/80 mb-2">{we.location}</p>
      <ul class="mt-0 mb-0 text-sm list-disc pl-4">
        {#each we.description as wedesc}
          <li><p class="mb-1">{wedesc}</p></li>
        {/each}
      </ul>
    </Dropdown>
  {/each}
</div>

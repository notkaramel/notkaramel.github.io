<script>
  import publications from "$lib/content/publications.json";
  import Dropdown from "$lib/components/Dropdown.svelte";
</script>

<div>
  {#each publications as pub}
    <Dropdown title={pub.title} subtitle={pub.authors.join(", ")}>
      <ul class="mt-0 mb-0 text-sm list-disc pl-4">
        {#each pub.details as detail}
          <li><p class="mb-1">{detail}</p></li>
        {/each}
      </ul>
    </Dropdown>
  {/each}
</div>

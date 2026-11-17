<script lang="ts">
  import publications from "#lib/content/publications.json";
  import Dropdown from "#lib/components/Dropdown.svelte";
</script>

<div class="space-y-1">
  {#each publications as pub, i (pub.title)}
    <Dropdown
      title={pub.title}
      subtitle={pub.authors.join(", ")}
      tone={i % 2 === 0 ? "yellow" : "blue"}
      defaultOpen={i === 0}
    >
      <div class="mb-2.5">
        <span class="neo-pill neo-pill-blue px-2.5 py-0.5 text-[11px]">
          ♫ {pub.type}
        </span>
      </div>
      <ul class="mt-0 mb-0 text-sm space-y-1.5 list-disc pl-5">
        {#each pub.details as detail}
          <li class="leading-relaxed text-primary-content/90">{detail}</li>
        {/each}
      </ul>
    </Dropdown>
  {/each}
</div>

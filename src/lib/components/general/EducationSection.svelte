<script>
  import education from "$lib/content/education.json";
</script>

<div>
  {#each education as eduItem}
  <div class="prose">
    <div class="flex flex-col gap-0.5 font-medium">
      <span>{eduItem.degree}</span>
      <span class="text-sm text-primary-content/80 font-normal"
        >{eduItem.school} · {eduItem.duration}</span
      >
    </div>
    <ul class="">
      {#each eduItem.details as detail}
          <li><p class="mb-1">{detail}</p></li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

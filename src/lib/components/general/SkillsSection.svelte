<script>
  import skills from "$lib/content/skills.json";
</script>

<div class="space-y-4">
  {#each skills as skill}
    <div>
      <p class="text-primary-content font-medium text-sm mb-1">
        {skill.title}
      </p>
      <p class="text-secondary-content/90 text-sm leading-relaxed">
        {skill.tools.join(", ")}
      </p>
    </div>
  {/each}
</div>

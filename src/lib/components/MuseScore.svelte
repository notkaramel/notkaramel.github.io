<script lang="ts">
  let { scoreTitle, scoreUrl } = $props();
</script>

<div class="rounded-2xl w-full ring-2 ring-secondary my-4 shadow-md">
  <iframe
    class="w-full h-[70vh] rounded-2xl"
    title={scoreTitle}
    src={scoreUrl + "/embed"}
    allowfullscreen
    allow="autoplay; fullscreen"
  >
  </iframe>

  <a href={scoreUrl} target="_blank" class="w-full">
    <p
      class="text-center italic text-primary-content place-content-center my-3"
    >
      {scoreTitle}
    </p>
  </a>
</div>

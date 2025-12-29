<script>
  import MuseScore from "$lib/components/MuseScore.svelte";
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";
  import { transcripts } from "$lib/content/music";
</script>

<SearchEngineOp
  title="Music"
  description="A creative gallery of music, photography, art creation, cuisine, and so much more. All by Antoine @notkaramel"
  canonical="https://antoinephan.com/music"
/>

<div
  class="container place-self-center my-4 p-4 ring rounded-2xl ring-primary shadow-lg"
>
  <div
    class="divider divider-accent divider-center text-center font-bold text-2xl text-accent-content"
  >
    Music 🎶
  </div>
  <div class="flex flex-wrap">
    {#each transcripts as piece}
      <MuseScore scoreTitle={piece.title} scoreUrl={piece.url} />
    {/each}
  </div>
</div>

<div
  class="container place-self-center my-4 p-4 ring rounded-2xl ring-primary shadow-lg"
>
  <div
    class="divider divider-accent divider-center text-center font-bold text-2xl text-accent-content"
  >
    Photography 📷
  </div>
  <div>
    <p class="text-center">Coming soon!</p>
  </div>
</div>

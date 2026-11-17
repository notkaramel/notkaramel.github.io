<script lang="ts">
  import MuseScore from "#lib/components/MuseScore.svelte";
  import SearchEngineOp from "#lib/components/SearchEngineOp.svelte";
  import MusicalChimes from "#lib/components/MusicalChimes.svelte";
  import { transcripts } from "#lib/content/music.ts";
</script>

<SearchEngineOp
  title="Music & Art · Antoine"
  description="A creative gallery of music transcriptions, soundscapes, photography, and artistic explorations by Antoine @notkaramel."
  canonical="https://antoinephan.com/music"
/>

<main class="w-full px-3 sm:px-6 py-8 pb-16">
  <div class="max-w-6xl mx-auto space-y-10">
    <!-- Studio Header -->
    <header
      class="neo-card p-6 sm:p-8 lg:p-10 space-y-5 relative overflow-hidden"
      style="background: linear-gradient(135deg, var(--neo-blue-soft) 0%, var(--neo-surface) 50%, var(--neo-yellow-soft) 100%);"
    >
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="space-y-2">
          <span class="neo-pill neo-pill-yellow px-3 py-0.5 text-xs">
            𝄞 Sound &amp; Transcriptions
          </span>
          <h1
            class="text-3xl sm:text-4xl font-extrabold text-primary-content tracking-tight"
          >
            Music Room
          </h1>
          <p class="text-base font-artistic text-primary-content/85 max-w-xl">
            Sheet music transcriptions, melodic arrangements, and quiet
            late-night harmonies.
          </p>
        </div>

        <MusicalChimes />
      </div>
    </header>

    <!-- MuseScore Embeds -->
    <section class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="neo-pill neo-pill-blue px-3.5 py-1 text-xs">
          ♫ Transcribed Scores ({transcripts.length})
        </span>
        <span class="text-xs font-artistic text-primary-content/70">
          press play inside any sheet below
        </span>
      </div>

      <div class="space-y-7">
        {#each transcripts as piece, i (piece.url)}
          <MuseScore
            scoreTitle={piece.title}
            scoreUrl={piece.url}
            tone={i % 2 === 0 ? "blue" : "yellow"}
          />
        {/each}
      </div>
    </section>

    <!-- Photography Teaser -->
    <section
      class="neo-card p-6 sm:p-8 text-center space-y-3"
      style="background: linear-gradient(135deg, var(--neo-yellow-soft) 0%, var(--neo-surface) 60%, var(--neo-blue-soft) 100%);"
    >
      <span class="neo-pill neo-pill-yellow px-3 py-1 text-xs">
        📷 Darkroom &amp; Film
      </span>
      <h2 class="text-2xl font-extrabold text-primary-content">
        Photography Gallery
      </h2>
      <p class="text-sm font-artistic text-primary-content/80 max-w-md mx-auto">
        Developing snapshots, pastel skies, and quiet street frames — arriving
        in the studio soon.
      </p>
    </section>
  </div>
</main>

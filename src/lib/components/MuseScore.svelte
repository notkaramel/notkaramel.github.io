<script lang="ts">
  let {
    scoreTitle,
    scoreUrl,
    tone = "blue",
  }: {
    scoreTitle: string;
    scoreUrl: string;
    tone?: "blue" | "yellow";
  } = $props();
</script>

<article class="neo-card overflow-hidden w-full">
  <div
    class="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b-2 border-[var(--neo-ink)]
      {tone === 'yellow'
      ? 'bg-[var(--neo-yellow-soft)]'
      : 'bg-[var(--neo-blue-soft)]'}"
  >
    <div class="flex items-center gap-2.5">
      <span
        class="neo-pill px-2.5 py-0.5 text-xs
          {tone === 'yellow' ? 'neo-pill-yellow' : 'neo-pill-blue'}"
      >
        ♫ Score
      </span>
      <h2 class="font-extrabold text-base sm:text-lg text-primary-content">
        {scoreTitle}
      </h2>
    </div>

    <a
      href={scoreUrl}
      target="_blank"
      rel="noreferrer"
      class="neo-btn neo-btn-surface px-3.5 py-1 text-xs"
    >
      Open on MuseScore ↗
    </a>
  </div>

  <div class="p-3 sm:p-4 bg-[var(--neo-surface)]">
    <iframe
      class="w-full h-[65vh] rounded-2xl border-2 border-[var(--neo-ink)] bg-white"
      title={scoreTitle}
      src={scoreUrl + "/embed"}
      allowfullscreen
      allow="autoplay; fullscreen"
    ></iframe>
  </div>
</article>

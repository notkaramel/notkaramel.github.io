<script lang="ts">
  // Playful interactive pastel chimes (dreamy major pentatonic scale)
  // Audio only plays on explicit user click/tap.
  type ChimeKey = {
    note: string;
    freq: number;
    tone: "blue" | "yellow";
  };

  const keys: ChimeKey[] = [
    { note: "C", freq: 261.63, tone: "blue" },
    { note: "D", freq: 293.66, tone: "yellow" },
    { note: "E", freq: 329.63, tone: "blue" },
    { note: "G", freq: 392.0, tone: "yellow" },
    { note: "A", freq: 440.0, tone: "blue" },
    { note: "C'", freq: 523.25, tone: "yellow" },
  ];

  let audioCtx: AudioContext | null = null;
  let activeNote = $state<string | null>(null);
  let lastPlayedLabel = $state<string>("tap a key ♪");

  function playNote(key: ChimeKey) {
    activeNote = key.note;
    lastPlayedLabel = `${key.note} · ${Math.round(key.freq)} Hz ♪`;

    if (typeof window === "undefined") return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Warm dreamy electric-piano / celesta blend
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(key.freq, now);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(key.freq * 2, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.exponentialRampToValueAtTime(650, now + 1.1);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.35);

    const overtoneGain = audioCtx.createGain();
    overtoneGain.gain.setValueAtTime(0.18, now);

    osc1.connect(filter);
    osc2.connect(overtoneGain);
    overtoneGain.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.4);
    osc2.stop(now + 1.4);

    setTimeout(() => {
      if (activeNote === key.note) {
        activeNote = null;
      }
    }, 260);
  }
</script>

<div
  class="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border-2 border-[var(--neo-ink)] bg-[var(--neo-surface)] shadow-[3px_3px_0px_var(--neo-ink)]"
  aria-label="Interactive dreamy chime keys"
>
  <span
    class="text-xs font-bold tracking-wide text-primary-content/80 px-1 flex items-center gap-1.5"
  >
    <span aria-hidden="true">♫</span>
    <span>{lastPlayedLabel}</span>
  </span>
  <div class="flex items-center gap-1.5">
    {#each keys as key (key.note)}
      <button
        type="button"
        onclick={() => playNote(key)}
        aria-label={`Play note ${key.note}`}
        class="w-8 h-8 rounded-xl border-2 border-[var(--neo-ink)] text-xs font-extrabold cursor-pointer
          transition-all duration-150 select-none
          {key.tone === 'blue'
          ? 'bg-[var(--neo-blue)] text-[var(--neo-ink-on-pastel)]'
          : 'bg-[var(--neo-yellow)] text-[var(--neo-ink-on-pastel)]'}
          {activeNote === key.note
          ? 'translate-x-[2px] translate-y-[2px] shadow-[0px_0px_0px_var(--neo-ink)] scale-95'
          : 'shadow-[2px_2px_0px_var(--neo-ink)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_var(--neo-ink)]'}"
      >
        {key.note}
      </button>
    {/each}
  </div>
</div>

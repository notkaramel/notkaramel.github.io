<script lang="ts">
  import {
    playKeyProgressionNote,
    type PlayedNoteInfo,
  } from "#lib/audio/harmonicSynth.ts";

  type PopupInstance = {
    id: number;
    xPx: number;
    yPx: number;
    bgColor: string;
    glyph: string;
    noteLabel: string;
    tilt: number;
  };

  const POPUP_COLORS = [
    "#A8CBFA", // soft sky blue
    "#FDE68A", // buttercup yellow
    "#B9EAC8", // pastel mint green
    "#F9C6D7", // sunrise rose pink
    "#D7C6FB", // sunset lavender purple
    "#BFE6F5", // cerulean cloud mist
    "#FED7AA", // warm peach butter
    "#C5D5FA", // periwinkle sky
  ];

  let lastPopupColor = "";

  const IGNORED_KEYS = new Set([
    "Shift",
    "Control",
    "Alt",
    "Meta",
    "CapsLock",
    "NumLock",
    "ScrollLock",
    "Escape",
  ]);

  let popups = $state<PopupInstance[]>([]);
  let nextId = 1;

  // Pick a position outside the centered max-w-6xl (1152px) main content area
  function getOutsideContentPosition(
    preferredX?: number,
    preferredY?: number,
  ): { xPx: number; yPx: number } {
    const vw = window.innerWidth || 1280;
    const vh = window.innerHeight || 800;

    // max-w-6xl = 1152px
    const contentHalf = 576;
    const contentLeft = Math.max(0, vw / 2 - contentHalf);
    const contentRight = Math.min(vw, vw / 2 + contentHalf);

    if (
      preferredX !== undefined &&
      preferredY !== undefined &&
      (preferredX < contentLeft - 8 || preferredX > contentRight + 8)
    ) {
      return {
        xPx: Math.min(vw - 36, Math.max(36, preferredX)),
        yPx: Math.min(vh - 36, Math.max(88, preferredY)),
      };
    }

    if (contentLeft >= 68) {
      const useLeft =
        preferredX !== undefined ? preferredX < vw / 2 : Math.random() < 0.5;
      const xPx = useLeft
        ? 34 + Math.random() * (contentLeft - 52)
        : contentRight + 18 + Math.random() * (vw - contentRight - 52);
      const yPx =
        preferredY !== undefined
          ? Math.min(vh - 48, Math.max(96, preferredY))
          : 96 + Math.random() * Math.max(120, vh - 160);
      return { xPx, yPx };
    }

    const useLeft =
      preferredX !== undefined ? preferredX < vw / 2 : Math.random() < 0.5;
    const xPx = useLeft
      ? 28 + Math.random() * 14
      : vw - 28 - Math.random() * 14;
    const yPx =
      preferredY !== undefined
        ? Math.min(vh - 44, Math.max(92, preferredY))
        : 92 + Math.random() * Math.max(120, vh - 150);
    return { xPx, yPx };
  }

  function triggerInteraction(popupPos: { xPx: number; yPx: number }) {
    const vw = window.innerWidth || 1280;
    const isBigScreen = vw >= 1024;
    const normX = Math.min(1, Math.max(0, popupPos.xPx / vw));
    // Spatial pan spanning 30%-70% (-0.4 to +0.4) on big screens
    const pan = isBigScreen ? (normX - 0.5) * 0.8 : 0;

    const noteInfo: PlayedNoteInfo = playKeyProgressionNote(pan);

    const candidates = POPUP_COLORS.filter((c) => c !== lastPopupColor);
    const bgColor = candidates[Math.floor(Math.random() * candidates.length)];
    lastPopupColor = bgColor;

    const popupId = nextId++;
    const popup: PopupInstance = {
      id: popupId,
      xPx: popupPos.xPx,
      yPx: popupPos.yPx,
      bgColor,
      glyph: noteInfo.glyph,
      noteLabel: noteInfo.noteLabel,
      tilt: Math.round((Math.random() - 0.5) * 10),
    };

    popups = [...popups.slice(-11), popup];
    setTimeout(() => {
      popups = popups.filter((p) => p.id !== popupId);
    }, 1550);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.repeat) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (IGNORED_KEYS.has(event.key)) return;

    const popupPos = getOutsideContentPosition();
    triggerInteraction(popupPos);
  }

  function handlePointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement | null;
    if (!target) return;

    if (
      target.closest(
        'a, button, input, select, textarea, label, [role="button"], .collapse-title, summary, iframe, .neo-card, .blog-card',
      )
    ) {
      return;
    }

    const popupPos = getOutsideContentPosition(event.clientX, event.clientY);
    triggerInteraction(popupPos);
  }
</script>

<svelte:window onkeydown={handleKeyDown} onpointerdown={handlePointerDown} />

<div
  class="fixed inset-0 pointer-events-none overflow-hidden z-0"
  style="background: var(--neo-canvas-bg);"
  aria-hidden="true"
>
  <!-- SVG Paper Grain Filter -->
  <svg class="absolute w-0 h-0" aria-hidden="true">
    <filter id="artistic-paper-grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.78"
        numOctaves="3"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </svg>

  <!-- Soft Pastel Blue Watercolor Splash (top-left) -->
  <div
    class="animate-splash-a absolute -top-36 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-80"
    style="background: radial-gradient(circle at 40% 40%, var(--neo-splash-blue) 0%, transparent 72%);"
  ></div>

  <!-- Soft Butter Yellow Watercolor Splash (top-right) -->
  <div
    class="animate-splash-b absolute -top-24 -right-28 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-85"
    style="background: radial-gradient(circle at 55% 45%, var(--neo-splash-yellow) 0%, transparent 70%);"
  ></div>

  <!-- Dreamy Misty Cerulean Pool (middle-left) -->
  <div
    class="animate-splash-b absolute top-[42%] -left-40 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-65"
    style="background: radial-gradient(circle at 50% 50%, var(--neo-splash-mist) 0%, transparent 72%);"
  ></div>

  <!-- Warm Butter-Cream Glow (bottom-right) -->
  <div
    class="animate-splash-a absolute -bottom-36 right-[-6rem] w-[36rem] h-[36rem] rounded-full blur-3xl opacity-75"
    style="background: radial-gradient(circle at 45% 50%, var(--neo-splash-yellow) 0%, transparent 72%);"
  ></div>

  <!-- Soft Blue Pool (bottom-center-left) -->
  <div
    class="animate-splash-b absolute -bottom-28 left-[18%] w-[26rem] h-[26rem] rounded-full blur-3xl opacity-65"
    style="background: radial-gradient(circle at 50% 50%, var(--neo-splash-blue) 0%, transparent 72%);"
  ></div>

  <!-- Sunrise Pastel Pink Blush (upper-center cloud horizon) -->
  <div
    class="animate-splash-a absolute -top-28 left-[32%] w-[30rem] h-[24rem] rounded-full blur-3xl opacity-75"
    style="background: radial-gradient(ellipse at 50% 45%, var(--neo-splash-pink) 0%, transparent 72%);"
  ></div>

  <!-- Hint of Pastel Mint Green (soft cloud drift, mid-right & lower-left) -->
  <div
    class="animate-splash-b absolute top-[26%] -right-32 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-70"
    style="background: radial-gradient(circle at 48% 50%, var(--neo-splash-green) 0%, transparent 72%);"
  ></div>
  <div
    class="animate-splash-a absolute bottom-[12%] -left-24 w-[24rem] h-[24rem] rounded-full blur-3xl opacity-65"
    style="background: radial-gradient(circle at 50% 50%, var(--neo-splash-green) 0%, transparent 74%);"
  ></div>

  <!-- Sunset Lavender-Purple & Pink Cloud Veil (lower-center & mid-right) -->
  <div
    class="animate-splash-b absolute -bottom-32 left-[46%] w-[32rem] h-[26rem] rounded-full blur-3xl opacity-75"
    style="background: radial-gradient(ellipse at 50% 55%, var(--neo-splash-lavender) 0%, var(--neo-splash-pink) 42%, transparent 74%);"
  ></div>

  <!-- Subtle flowing musical staff / fluid wave ribbons -->
  <svg
    class="absolute inset-0 w-full h-full opacity-70"
    viewBox="0 0 1440 900"
    preserveAspectRatio="none"
    fill="none"
  >
    <path
      d="M-80 230 C 260 150, 520 310, 860 210 C 1140 130, 1320 240, 1520 190"
      stroke="var(--neo-staff-line)"
      stroke-width="1.5"
    />
    <path
      d="M-80 244 C 260 164, 520 324, 860 224 C 1140 144, 1320 254, 1520 204"
      stroke="var(--neo-staff-line)"
      stroke-width="1.5"
    />
    <path
      d="M-80 258 C 260 178, 520 338, 860 238 C 1140 158, 1320 268, 1520 218"
      stroke="var(--neo-staff-line)"
      stroke-width="1.5"
    />
    <path
      d="M-80 670 C 280 760, 620 580, 960 690 C 1180 760, 1340 650, 1520 700"
      stroke="var(--neo-staff-line)"
      stroke-width="1.5"
    />
    <path
      d="M-80 684 C 280 774, 620 594, 960 704 C 1180 774, 1340 664, 1520 714"
      stroke="var(--neo-staff-line)"
      stroke-width="1.5"
    />
  </svg>

  <!-- Subtle artistic cotton-paper grain overlay -->
  <div
    class="absolute inset-0 opacity-[0.045] mix-blend-multiply"
    style="filter: url(#artistic-paper-grain); background: #808080;"
  ></div>
</div>

<!-- Pop-up note stickers outside the main content area -->
<div
  class="fixed inset-0 pointer-events-none overflow-hidden z-30"
  aria-hidden="true"
>
  {#each popups as popup (popup.id)}
    <div
      class="note-popup absolute flex items-center gap-1.5 px-3 py-1.5
        rounded-full border-2 border-[var(--neo-ink)]
        shadow-[3px_3px_0px_var(--neo-ink)]
        text-xs font-extrabold select-none"
      style="
        left: {popup.xPx}px;
        top: {popup.yPx}px;
        background-color: {popup.bgColor};
        color: var(--neo-ink-on-pastel);
        --popup-tilt: {popup.tilt}deg;
      "
    >
      <span>{popup.glyph}</span>
      <span>{popup.noteLabel}</span>
    </div>
  {/each}
</div>

<style>
  @keyframes note-popup-fade {
    0% {
      opacity: 0;
      transform: translate(-50%, -30%) rotate(var(--popup-tilt)) scale(0.68);
    }
    18% {
      opacity: 1;
      transform: translate(-50%, -56%) rotate(var(--popup-tilt)) scale(1.05);
    }
    68% {
      opacity: 0.96;
      transform: translate(-50%, -76%) rotate(var(--popup-tilt)) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -105%) rotate(var(--popup-tilt)) scale(0.86);
    }
  }

  .note-popup {
    animation: note-popup-fade 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    will-change: transform, opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    .note-popup {
      animation: none;
      opacity: 0;
    }
  }
</style>

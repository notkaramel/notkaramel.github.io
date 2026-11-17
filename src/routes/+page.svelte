<script lang="ts">
  import Navbar from "#lib/components/Navbar.svelte";
  import SearchEngineOp from "#lib/components/SearchEngineOp.svelte";
  import SkillsSection from "#lib/components/general/SkillsSection.svelte";
  import ProjectsSection from "#lib/components/general/ProjectsSection.svelte";
  import ExperienceSection from "#lib/components/general/ExperienceSection.svelte";
  import EducationSection from "#lib/components/general/EducationSection.svelte";
  import PublicationsSection from "#lib/components/general/PublicationsSection.svelte";
  import WorkshopsSection from "#lib/components/general/WorkshopsSection.svelte";
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { animate } from "animejs";
  import { onMount } from "svelte";
  import {
    onAudioActivity,
    sampleAudioColumns,
  } from "#lib/audio/harmonicSynth.ts";
  import social from "#lib/content/social.json";
  import "#app.css";

  const sections = [
    {
      id: "projects",
      num: "01",
      label: "Creations",
      subtitle: "playful software, music tech & experiments",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    },
    {
      id: "skills",
      num: "02",
      label: "Toolkit",
      subtitle: "instruments, languages & tinkering gear",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>`,
    },
    {
      id: "experience",
      num: "03",
      label: "Journey",
      subtitle: "labs, musicology teams & engineering",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    },
    {
      id: "publications",
      num: "04",
      label: "Papers",
      subtitle: "music encoding & digital soundscapes",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    },
    {
      id: "education",
      num: "05",
      label: "Studies",
      subtitle: "electrical engineering & music tech",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    },
    {
      id: "workshops",
      num: "06",
      label: "Workshops",
      subtitle: "sharing early music & sound tools",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    },
  ];

  const COLUMN_COUNT = 28;
  let selected = $state(sections[0].id);
  let columnLevels = $state<number[]>(Array(COLUMN_COUNT).fill(0));
  let soundPlaying = $state(false);
  let showMagicToast = $state(false);

  const activeSection = $derived(
    sections.find((s) => s.id === selected) ?? sections[0],
  );

  onMount(() => {
    showMagicToast = true;
    const toastTimer = setTimeout(() => {
      showMagicToast = false;
    }, 5500);

    animate(".avatar-img", {
      scale: [{ from: 0.72, to: 1, ease: "outExpo", duration: 750 }],
      opacity: [{ from: 0, to: 1, ease: "outQuad", duration: 500 }],
    });

    let rafId: number | null = null;

    const step = () => {
      const { levels, active } = sampleAudioColumns(COLUMN_COUNT);
      let anyResidual = false;

      const next = new Array<number>(COLUMN_COUNT);
      for (let i = 0; i < COLUMN_COUNT; i++) {
        const target = levels[i] ?? 0;
        const prev = columnLevels[i] ?? 0;
        const smoothed =
          target > prev
            ? prev * 0.35 + target * 0.65
            : prev * 0.84 + target * 0.16;
        const val = smoothed < 0.008 ? 0 : smoothed;
        next[i] = val;
        if (val > 0) anyResidual = true;
      }

      columnLevels = next;
      soundPlaying = active || anyResidual;

      if (soundPlaying) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = null;
      }
    };

    const unsubscribe = onAudioActivity(() => {
      soundPlaying = true;
      if (rafId === null) {
        rafId = requestAnimationFrame(step);
      }
    });

    return () => {
      clearTimeout(toastTimer);
      unsubscribe();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  });
</script>

<SearchEngineOp
  title="Antoine Phan · Musician & Creative Technologist"
  description="Dreamy studio, music transcriptions, creative tech experiments, blogs & recipes by Antoine (@notkaramel)."
  canonical="https://antoinephan.com"
/>

<Navbar />

<main class="relative z-10 min-h-screen px-3 sm:px-6 pt-24 pb-16">
  <!-- ─── Hero Studio Poster ───────────────────────────────────────────────── -->
  <section class="max-w-6xl mx-auto mb-12">
    <div
      class="relative overflow-hidden rounded-[2rem] border-2 border-[var(--neo-ink)]
        shadow-[6px_6px_0px_var(--neo-ink)]
        px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
      style="background: linear-gradient(135deg, var(--neo-blue-soft) 0%, var(--neo-surface) 48%, var(--neo-yellow-soft) 100%);"
    >
      <!-- Splashy pastel watercolor aura blobs inside hero -->
      <div
        class="animate-splash-a absolute -top-24 -left-16 w-80 h-80 rounded-full blur-2xl opacity-75 pointer-events-none"
        style="background: radial-gradient(circle, var(--neo-blue) 0%, transparent 72%);"
        aria-hidden="true"
      ></div>
      <div
        class="animate-splash-b absolute -bottom-28 -right-12 w-96 h-96 rounded-full blur-2xl opacity-75 pointer-events-none"
        style="background: radial-gradient(circle, var(--neo-yellow) 0%, transparent 70%);"
        aria-hidden="true"
      ></div>

      <!-- Fluid flowing musical staff lines across the hero -->
      <svg
        class="absolute inset-0 w-full h-full opacity-55 pointer-events-none"
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-40 90 C 260 20, 480 180, 780 95 C 980 40, 1110 120, 1240 70"
          stroke="var(--neo-staff-line)"
          stroke-width="1.8"
        />
        <path
          d="M-40 104 C 260 34, 480 194, 780 109 C 980 54, 1110 134, 1240 84"
          stroke="var(--neo-staff-line)"
          stroke-width="1.8"
        />
        <path
          d="M-40 118 C 260 48, 480 208, 780 123 C 980 68, 1110 148, 1240 98"
          stroke="var(--neo-staff-line)"
          stroke-width="1.8"
        />
        <path
          d="M-40 315 C 240 370, 560 245, 890 330 C 1050 370, 1150 300, 1240 325"
          stroke="var(--neo-staff-line)"
          stroke-width="1.8"
        />
      </svg>

      <div
        class="relative flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12"
      >
        <!-- Vinyl / Sticker Avatar with Stationary Ring & Audio Pulse Columns -->
        <div
          class="relative shrink-0 flex items-center justify-center my-2 sm:my-3"
        >
          <!-- Stationary outer ring -->
          <div
            class="avatar-ring absolute rounded-full pointer-events-none"
            style="
              width: calc(100% + 22px);
              height: calc(100% + 22px);
              border: 2px dashed var(--neo-ink);
              opacity: 0.55;
              top: -11px;
              left: -11px;
            "
            aria-hidden="true"
          ></div>

          <!-- Radial pulsing columns around the stationary ring when sound plays -->
          <svg
            class="absolute pointer-events-none overflow-visible"
            style="
              width: calc(100% + 74px);
              height: calc(100% + 74px);
              top: -37px;
              left: -37px;
            "
            viewBox="-140 -140 280 280"
            aria-hidden="true"
          >
            {#each columnLevels as level, idx (idx)}
              {@const angle = (idx / COLUMN_COUNT) * 360}
              {@const colHeight = 5 + level * 26}
              <rect
                x="-2.8"
                y={-(102 + colHeight)}
                width="5.6"
                height={colHeight}
                rx="2.8"
                transform={`rotate(${angle})`}
                fill={idx % 2 === 0 ? "var(--neo-blue)" : "var(--neo-yellow)"}
                stroke="var(--neo-ink)"
                stroke-width="1.2"
                opacity={soundPlaying ? 0.55 + level * 0.45 : 0.45}
              />
            {/each}
          </svg>

          <div
            class="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden
              border-[3px] border-[var(--neo-ink)]
              bg-[var(--neo-yellow)]
              shadow-[5px_5px_0px_var(--neo-ink)]"
          >
            <img
              class="avatar-img w-full h-full object-cover"
              src="https://avatars.githubusercontent.com/u/24505220?v=4"
              alt="Antoine Phan"
            />
          </div>

          <span
            class="z-20 absolute -bottom-2 -right-1 neo-pill neo-pill-yellow px-3 py-1 text-xs shadow-[2px_2px_0px_var(--neo-ink)]"
          >
            𝄞 @notkaramel
          </span>
        </div>

        <!-- Bio & Musical Controls -->
        <div class="flex-1 text-center lg:text-left space-y-4">
          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-2"
          >
            <span class="neo-pill neo-pill-blue px-3 py-1 text-xs">
              ♪ Musician &amp; Sound Tinkerer
            </span>
            <span class="neo-pill neo-pill-yellow px-3 py-1 text-xs">
              ✦ Creative Technologist
            </span>
          </div>

          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-content tracking-tight leading-tight text-balance"
          >
            Antoine Phan
          </h1>

          <p
            class="text-base sm:text-lg text-primary-content/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-pretty"
          >
            Arranging melodies, dreaming up playful software, and wandering
            between
            <span
              class="font-artistic underline decoration-2 decoration-[var(--neo-blue)] underline-offset-4"
              >music technology</span
            >, Linux &amp;
            <code
              class="font-mono text-xs sm:text-sm px-2 py-0.5 rounded-lg border-2 border-[var(--neo-ink)] bg-[var(--neo-yellow)] text-[var(--neo-ink-on-pastel)] font-bold"
              >Neovim</code
            >, split keyboards, cats, and warm homemade bread&nbsp;🍞
          </p>

          <!-- Social Links -->
          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1"
            aria-label="Social links"
          >
            {#each social as link (link.name)}
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.ariaLabel}
                class="neo-btn neo-btn-surface px-3.5 py-2 text-sm"
              >
                {#if link.name === "GitHub"}
                  <svg
                    class="size-4 fill-current shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"
                    />
                  </svg>
                  <span>GitHub</span>
                {:else if link.name === "LinkedIn"}
                  <svg
                    class="size-4 fill-current shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                    />
                  </svg>
                  <span>LinkedIn</span>
                {:else if link.name === "Email"}
                  <svg
                    class="size-4 fill-current shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                    />
                  </svg>
                  <span>Email</span>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ─── Studio Chapters / Portfolio ──────────────────────────────────────── -->
  <section class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-10">
      <!-- Sidebar / Pill Switcher -->
      <aside class="lg:sticky lg:top-24 lg:self-start">
        <div class="neo-card p-4 space-y-3">
          <div class="flex items-center justify-between px-1">
            <p
              class="text-xs font-extrabold tracking-[0.18em] uppercase text-primary-content/70"
            >
              Studio Index
            </p>
            <span
              class="text-xs font-artistic text-primary-content/60"
              aria-hidden="true"
            >
              ♩
            </span>
          </div>

          <nav
            class="flex flex-wrap lg:flex-col gap-2"
            aria-label="Portfolio chapters"
          >
            {#each sections as item (item.id)}
              {@const isSelected = selected === item.id}
              <button
                type="button"
                onclick={() => (selected = item.id)}
                class="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-bold
                  border-2 transition-all duration-200 cursor-pointer w-auto lg:w-full text-left
                  {isSelected
                  ? 'border-[var(--neo-ink)] bg-[var(--neo-yellow)] text-[var(--neo-ink-on-pastel)] shadow-[3px_3px_0px_var(--neo-ink)] -translate-x-[1px] -translate-y-[1px]'
                  : 'border-transparent text-primary-content/80 hover:border-[var(--neo-ink)] hover:bg-[var(--neo-blue-soft)] hover:text-primary-content hover:shadow-[2px_2px_0px_var(--neo-ink)]'}"
              >
                <span class="text-[11px] font-mono opacity-65 shrink-0">
                  {item.num}
                </span>
                <span class="shrink-0" aria-hidden="true">
                  {@html item.svg}
                </span>
                <span>{item.label}</span>
                {#if isSelected}
                  <span
                    class="ml-auto hidden lg:inline text-xs"
                    aria-hidden="true"
                  >
                    ♫
                  </span>
                {/if}
              </button>
            {/each}
          </nav>
        </div>
      </aside>

      <!-- Main Stage -->
      <article class="min-w-0">
        <!-- Chapter header -->
        <div
          class="neo-card p-5 sm:p-6 mb-6 flex flex-wrap items-center justify-between gap-4"
          style="background: linear-gradient(90deg, var(--neo-blue-soft) 0%, var(--neo-surface) 60%, var(--neo-yellow-soft) 100%);"
        >
          <div class="flex items-center gap-4">
            <span
              class="flex items-center justify-center w-11 h-11 rounded-2xl border-2 border-[var(--neo-ink)]
                bg-[var(--neo-yellow)] text-[var(--neo-ink-on-pastel)]
                shadow-[3px_3px_0px_var(--neo-ink)]"
              aria-hidden="true"
            >
              {@html activeSection.svg}
            </span>
            <div>
              <div class="flex items-center gap-2">
                <span
                  class="text-xs font-mono font-bold text-primary-content/65"
                >
                  CHAPTER {activeSection.num}
                </span>
              </div>
              <h2
                class="text-2xl sm:text-3xl font-extrabold text-primary-content tracking-tight"
              >
                {activeSection.label}
              </h2>
            </div>
          </div>

          <p class="text-sm font-artistic text-primary-content/80">
            ~ {activeSection.subtitle}
          </p>
        </div>

        <!-- Fluid Transitioning Chapter Content -->
        {#key selected}
          <div
            class="min-h-[240px]"
            in:fly={{ y: 14, duration: 320, easing: cubicOut }}
            out:fade={{ duration: 140 }}
          >
            {#if selected === "skills"}
              <SkillsSection />
            {:else if selected === "projects"}
              <ProjectsSection />
            {:else if selected === "experience"}
              <ExperienceSection />
            {:else if selected === "education"}
              <EducationSection />
            {:else if selected === "publications"}
              <PublicationsSection />
            {:else if selected === "workshops"}
              <WorkshopsSection />
            {/if}
          </div>
        {/key}
      </article>
    </div>
  </section>
</main>

{#if showMagicToast}
  <div
    class="fixed bottom-5 right-4 sm:right-6 z-40 max-w-sm"
    role="status"
    aria-live="polite"
    in:fly={{ y: 18, duration: 340, easing: cubicOut }}
    out:fade={{ duration: 300 }}
  >
    <div
      class="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-[var(--neo-ink)]
        bg-[var(--neo-yellow-soft)] text-primary-content
        shadow-[4px_4px_0px_var(--neo-ink)]"
    >
      <p class="text-xs sm:text-sm font-bold leading-snug">
        press any key or click the background for some magic ✨
      </p>
      <button
        type="button"
        onclick={() => (showMagicToast = false)}
        class="neo-btn neo-btn-surface w-6 h-6 p-0 text-[10px] shrink-0"
        aria-label="Dismiss tip"
      >
        ✕
      </button>
    </div>
  </div>
{/if}

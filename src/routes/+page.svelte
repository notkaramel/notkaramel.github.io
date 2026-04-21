<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";
  import SkillsSection from "$lib/components/general/SkillsSection.svelte";
  import ProjectsSection from "$lib/components/general/ProjectsSection.svelte";
  import ExperienceSection from "$lib/components/general/ExperienceSection.svelte";
  import EducationSection from "$lib/components/general/EducationSection.svelte";
  import PublicationsSection from "$lib/components/general/PublicationsSection.svelte";
  import WorkshopsSection from "$lib/components/general/WorkshopsSection.svelte";
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { animate } from "animejs";
  import { onMount } from "svelte";
  import social from "$lib/content/social.json";
  import "@app.css";

  const sections = [
    {
      id: "projects",
      label: "Projects",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22" stroke-dasharray="2 3"/></svg>`,
    },
    {
      id: "experience",
      label: "Experience",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>`,
    },
    {
      id: "education",
      label: "Education",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    },
    {
      id: "skills",
      label: "Skills",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 1.8 14.1M4.93 19.07A10 10 0 0 1 4.93 4.93"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
    },
    {
      id: "publications",
      label: "Publications",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="12" y2="15"/></svg>`,
    },
    {
      id: "workshops",
      label: "Workshops",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h2l1 3 2-5 1 2h3"/></svg>`,
    },
  ];

  let selected = $state(sections[0].id);
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
    // Avatar: scale + fade in from nothing, then idle float
    animate(".avatar-img", {
      scale: [{ from: 0.6, to: 1, ease: "outExpo", duration: 700 }],
      opacity: [{ from: 0, to: 1, ease: "outQuad", duration: 500 }],
    });
    // Orbital ring: continuous slow spin
    animate(".avatar-ring", {
      rotate: [{ from: "0turn", to: "1turn" }],
      ease: "linear",
      duration: 8000,
      loop: true,
    });
  });
</script>

<SearchEngineOp
  title="Hi there, I'm Antoine!"
  description="Welcome to my library of personal digital footprint, or simply website/portfolio/blog site!"
  canonical="https://antoinephan.com"
/>

<Navbar />

<main class="min-h-screen pt-16 bg-base-100">

  <!-- SVG noise filter definition (hidden) -->
  <svg class="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
    <filter id="hero-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feBlend in="SourceGraphic" mode="overlay" result="blend" />
      <feComposite in="blend" in2="SourceGraphic" operator="in" />
    </filter>
  </svg>

  <!-- ─── Hero ─────────────────────────────────────────────────────────────── -->
  <div class="relative overflow-hidden bg-primary border-b-4 border-primary-content/20">

    <!-- Diagonal line texture overlay -->
    <div
      class="absolute inset-0 opacity-[0.07] pointer-events-none"
      style="background-image: repeating-linear-gradient(
        -45deg,
        var(--color-primary-content) 0px,
        var(--color-primary-content) 1px,
        transparent 1px,
        transparent 18px
      );"
      aria-hidden="true"
    ></div>

    <!-- Noise grain overlay -->
    <div
      class="absolute inset-0 opacity-[0.12] pointer-events-none"
      style="filter: url(#hero-noise); background: var(--color-primary-content);"
      aria-hidden="true"
    ></div>

    <!-- Accent color blobs for depth -->
    <div
      class="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-20"
      style="background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);"
      aria-hidden="true"
    ></div>
    <div
      class="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none opacity-15"
      style="background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);"
      aria-hidden="true"
    ></div>

    <div class="relative w-full px-6 py-12 md:w-4/5 md:mx-auto lg:py-16">
      <div class="flex flex-col lg:flex-row items-center lg:items-end gap-8">

        <!-- Avatar -->
        <div class="relative shrink-0 flex items-center justify-center">
          <!-- Slow-spinning orbital ring (dashed, secondary color) -->
          <div
            class="avatar-ring absolute rounded-full pointer-events-none"
            style="
              width: calc(100% + 28px);
              height: calc(100% + 28px);
              border: 2.5px dashed var(--color-secondary);
              opacity: 0.85;
              top: -14px;
              left: -14px;
            "
            aria-hidden="true"
          ></div>
          <!-- Glow halo -->
          <div
            class="absolute inset-0 rounded-full blur-2xl opacity-50 scale-125 -z-10"
            style="background: var(--color-primary-content);"
          ></div>
          <div
            class="w-36 h-36 lg:w-44 lg:h-44 avatar rounded-full shadow-2xl"
            style="outline: 3px solid var(--color-secondary); outline-offset: 3px;"
          >
            <img
              class="avatar-img rounded-full w-full h-full object-cover"
              src="https://avatars.githubusercontent.com/u/24505220?v=4"
              alt="Antoine Phan"
            />
          </div>
        </div>

        <!-- Bio -->
        <div class="flex-1 text-center lg:text-left">
          <h1 class="text-4xl lg:text-5xl font-bold text-primary-content mb-3 text-balance drop-shadow-sm">
            Antoine Phan
          </h1>
          <p class="text-base text-primary-content/85 leading-relaxed max-w-xl text-pretty">
            Linux enthusiast, cats lover,
            <code class="font-mono bg-primary-content/20 text-primary-content px-1.5 py-0.5 rounded text-sm border border-primary-content/30">Neovim</code>
            &amp; split keyboard devotee.
            Side-questing through tech &amp; building fun stuff.
            Oh, and I make bread sometimes&nbsp;🍞
          </p>

          <!-- Social links: inverted (primary-content bg, primary text) for strong contrast on colored hero -->
          <div class="flex gap-3 mt-6 justify-center lg:justify-start flex-wrap" aria-label="Social links">
            {#each social as link}
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.ariaLabel}
                class="group flex items-center gap-2 px-4 py-2 rounded-lg
                  bg-primary-content text-primary
                  hover:bg-primary-content/90
                  text-sm font-bold
                  transition-all duration-200 shadow-md
                  hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.03]"
              >
                {#if link.name === "GitHub"}
                  <svg class="size-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                  </svg>
                  <span>GitHub</span>
                {:else if link.name === "LinkedIn"}
                  <svg class="size-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
                  </svg>
                  <span>LinkedIn</span>
                {:else if link.name === "Email"}
                  <svg class="size-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                  </svg>
                  <span>Email</span>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── Content area ──────────────────────────────────────────────────────── -->
  <div class="w-full px-4 py-8 md:w-4/5 md:mx-auto md:px-6 lg:py-10">
    <div class="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-10">

      <!-- Sidebar nav -->
      <aside class="lg:sticky lg:top-24 lg:self-start">
        <p class="text-xs font-bold tracking-[0.2em] uppercase text-base-content/40 mb-3 px-1 hidden lg:block">
          Navigate
        </p>
        <nav
          class="flex flex-wrap lg:flex-col gap-2"
          aria-label="Section navigation"
        >
          {#each sections as item}
            <button
              type="button"
              onclick={() => (selected = item.id)}
              class="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium w-auto lg:w-full text-left
                transition-all duration-200 cursor-pointer
                {selected === item.id
                  ? 'bg-primary-content text-primary shadow-md shadow-primary-content/20 scale-[1.02] font-bold'
                  : 'text-base-content/70 hover:bg-accent/20 hover:text-accent-content border border-transparent hover:border-accent/40'}"
            >
              <span
                class="flex items-center justify-center w-6 h-6 rounded-md shrink-0 transition-colors
                  {selected === item.id
                    ? 'text-primary'
                    : 'text-base-content/50 group-hover:text-accent-content'}"
                aria-hidden="true"
              >
                {@html item.svg}
              </span>
              <span>{item.label}</span>
              {#if selected === item.id}
                <span class="ml-auto opacity-40 hidden lg:inline" aria-hidden="true">›</span>
              {/if}
            </button>
          {/each}
        </nav>
      </aside>

      <!-- Main content panel -->
      <article class="min-w-0">
        <!-- Section header: secondary border, accent icon badge, primary title -->
        <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-secondary">
          <span
            class="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-content shadow-sm"
            aria-hidden="true"
          >
            {@html sections.find((s) => s.id === selected)?.svg ?? ""}
          </span>
          <h2 class="text-2xl font-bold text-primary-content">
            {sections.find((s) => s.id === selected)?.label ?? selected}
          </h2>
          <!-- small accent dot row for decoration -->
          <div class="flex items-center gap-1 ml-2 opacity-60" aria-hidden="true">
            <span class="w-2 h-2 rounded-full bg-secondary inline-block"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
            <span class="w-1 h-1 rounded-full bg-primary-content/40 inline-block"></span>
          </div>
        </div>

        <!-- Section content with transition -->
        {#key selected}
          <div
            class="min-h-[200px]"
            in:fly={{ y: 12, duration: 300, easing: cubicOut }}
            out:fade={{ duration: 150 }}
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
  </div>
</main>

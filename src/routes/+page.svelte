<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import SearchEngineOp from "$lib/components/SearchEngineOp.svelte";
  import SkillsSection from "$lib/components/general/SkillsSection.svelte";
  import ProjectsSection from "$lib/components/general/ProjectsSection.svelte";
  import ExperienceSection from "$lib/components/general/ExperienceSection.svelte";
  import EducationSection from "$lib/components/general/EducationSection.svelte";
  import PublicationsSection from "$lib/components/general/PublicationsSection.svelte";
  import WorkshopsSection from "$lib/components/general/WorkshopsSection.svelte";
  import { slide } from "svelte/transition";
  import "@app.css";
  import { animate, cubicBezier } from "animejs";
  import { onMount } from "svelte";
  import social from "$lib/content/social.json";

  const sections = [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Work Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "publications", label: "Publications" },
    { id: "workshops", label: "Workshops" },
  ];

  let selected = $state(sections[0].id);

  onMount(() => {
    animate("img", {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: { from: "-1turn", delay: 0 },
      delay: (_, i) => i * 50,
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: false,
    });
  });
</script>

<SearchEngineOp
  title="Hi there, I'm Antoine!"
  description="Welcome to my library of personal digital footprint, or simply website/portfolio/blog site!"
  canonical="https://antoinephan.com"
/>

<Navbar />

<main
  class="min-h-screen pt-16
    bg-base-100
    bg-linear-to-br from-primary via-secondary/60 to-accent/40
  "
>
  <div
    class="w-full px-4 py-8 md:w-4/5 md:mx-auto md:px-6 lg:py-12"
  >
    <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
      <!-- Sidebar -->
      <aside class="lg:sticky lg:top-24 lg:self-start">
        <div class="flex flex-col items-center lg:items-start">
          <div class="w-32 h-32 lg:w-40 lg:h-40 mb-4 avatar shrink-0">
            <img
              class="mask mask-squircle w-full h-full object-cover shadow-lg shadow-primary"
              src="https://avatars.githubusercontent.com/u/24505220?v=4"
              alt="Antoine"
            />
          </div>
          <h1
            class="text-xl font-bold text-primary-content mb-1 text-center lg:text-left"
          >
            Antoine Phan
          </h1>
          <p class="text-sm text-base-content/90 mb-4 text-center lg:text-left">
            Linux enthusiast, cats lover, <code>Neovim</code> & split keyboard. Sidequests and side projects
            to learn new tech and build fun stuff. Oh and, I make bread sometimes :)
          </p>

          <div
            class="flex flex-wrap gap-3 mb-4 justify-center lg:justify-start"
            aria-label="Contact and social links"
          >
            {#each social as link}
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.ariaLabel}
                class="btn btn-ghost btn-sm btn-square text-primary-content hover:bg-primary/20 border border-primary/30 hover:border-primary"
              >
                {#if link.name === "GitHub"}
                  <svg
                    class="size-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    />
                  </svg>
                {:else if link.name === "LinkedIn"}
                  <svg
                    class="size-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                    />
                  </svg>
                {:else if link.name === "Email"}
                  <svg
                    class="size-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                    />
                  </svg>
                {/if}
              </a>
            {/each}
          </div>

          <nav
            class="flex flex-wrap gap-6 w-full justify-center"
            aria-label="Section navigation"
          >
            {#each sections as item}
              <button
                type="button"
                onclick={() => (selected = item.id)}
                class="btn btn-sm scale-110 cursor-pointer transition-all hover:scale-[1.15] active:scale-[1.05]
                  {selected === item.id
                  ? 'btn-primary ring-2 ring-offset-primary ring-offset-2'
                  : 'btn-ghost border border-primary/50 text-primary-content hover:border-primary hover:bg-primary/10'}"
              >
                <span>{item.label}</span>
              </button>
            {/each}
          </nav>
        </div>
      </aside>

      <!-- Main content -->
      <article class="min-w-0">
        <div class="divider divider-start divider-primary mb-6">
          <h2
            class="text-xl text-primary-content font-bold text-center lg:text-left"
          >
            {sections.find((s) => s.id === selected)?.label ?? selected}
          </h2>
        </div>
        {#key selected}
          <div
            class="min-h-[200px]"
            in:slide={{
              duration: 500,
              easing: cubicBezier(0.25, 0.1, 0.25, 1.0),
            }}
            out:slide={{
              duration: 500,
              easing: cubicBezier(0.25, 0.1, 0.25, 1.0),
            }}
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

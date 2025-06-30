<script>
  import { routes } from "$lib";
  import ThemeSwapper from "$lib/components/ThemeSwapper.svelte";
  import "@app.css";
</script>

<title>Hi there!</title>

<div
  class="hero min-h-screen
  bg-[linear-gradient(27deg,_rgba(207,255,249,0.6)_0%,_rgba(142,230,167,0.4)_24%,_rgba(221,139,232,0.34)_43%,_rgba(148,178,255,0.42)_71%,_rgba(255,221,84,0.8)_100%)]
  "
>
  <!-- <div class="hero-overlay"></div> -->
  <div class="hero-content text-center flex-col lg:flex-row">
    <div class="max-w-xs lg:max-w-sm lg:mr-18 avatar">
      <img
        class="mask mask-squircle shadow-2xl shadow-primary"
        src="https://avatars.githubusercontent.com/u/24505220?v=4"
        alt=""
      />
    </div>

    <div class="p-4 max-w-md">
      <!-- TEXT and stuff -->
      <div class="prose-md text-primary-content">
        <h1 class="mb-5 text-3xl lg:text-4xl font-bold">
          Hello! It's Antoine :)
        </h1>
        <p class="mb-5">
          Linux enthusiast, cats lover, <code>Neovim</code> and a split keyboard.
          Love doing sidequests to learn new technologies and build fun stuff.
        </p>
        <p>Ready to join me on this journey?</p>
        <br />
        <hr />
      </div>
      <!-- Buttons -->
      <div
        class="flex gap-3 flex-col md:flex-row items-center justify-center py-4"
      >
        {#each routes.filter((e) => e.url != "/") as route}
          <a href={route.url}>
            <button
              class="btn btn-primary
                w-[10rem] shadow-sm shadow-primary-content
                hover:shadow-md
                transition-all ease-in-out"
            >
              <div class="size-6 fill-primary-content mr-1">
                {@html route.icon}
              </div>
              <span class="font-bold">
                {route.title}
              </span>
            </button>
          </a>
        {/each}
      </div>
      <div
        class="btn btn-ghost shadow-sm shadow-accent-content
                hover:shadow-md
                transition-all ease-in-out"
      >
        <ThemeSwapper fill="fill-neutral-content"/>
      </div>
    </div>
  </div>
</div>

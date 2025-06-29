<script>
  import { routes } from "$lib";
  import "@app.css";
</script>

<title>Hi there!</title>

<div
  class="hero min-h-screen
  bg-[linear-gradient(27deg,_rgba(207,255,249,1)_0%,_rgba(142,230,167,1)_24%,_rgba(148,178,255,1)_43%,_rgba(221,139,232,1)_71%,_rgba(255,221,84,1)_100%)]
  "
>
  <div
    class="hero-overlay
  "
  ></div>
  <div class="hero-content text-center flex-col lg:flex-row">
    <div class="max-w-xs lg:max-w-sm lg:mr-18 avatar">
      <img
        class="mask mask-squircle shadow-2xl"
        src="https://avatars.githubusercontent.com/u/24505220?v=4"
        alt=""
      />
    </div>

    <div class="p-4 max-w-md prose-md text-white">
      <h1 class="mb-5 text-3xl lg:text-4xl font-bold">
        Hello! It's Antoine :)
      </h1>
      <p class="mb-5">
        Linux enthusiast, cats lover, <code>Neovim</code> and a split keyboard. Love
        doing sidequests to learn new technologies and build fun stuff.
      </p>
      <p>Ready to join me on this journey?</p>
      <br />
      <hr />
      <br />
      <div
        class="flex gap-3 flex-col md:flex-row items-center justify-center p-4"
      >
        {#each routes.filter((e) => e.url != "/") as route}
          <a href={route.url}>
            <button
              class="btn
              w-[10rem] md:w-[9rem]
              bg-linear-[60deg,var(--color-sky-100)_30%,var(--color-fuchsia-100)_75%]
              border-4 px-6 py-4 border-indigo-100
              hover:shadow-2xl hover:border-orange-300
              transition-all ease-in"
            >
              <span class="text-black font-bold">
                {route.title}
              </span>
            </button>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>

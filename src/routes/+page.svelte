<script>
  import { routes } from "$lib";
  import "@app.css";
</script>

<title>Hi there!</title>

<div
  class="hero min-h-screen"
  style="
background: linear-gradient(64deg, rgba(64, 193, 195, 1) 0%, rgba(103, 182, 191, 1) 26%, rgba(189, 104, 189, 1) 60%, rgba(253, 187, 45, 1) 100%);"
>
  <div class="hero-overlay"></div>

  <div class="hero-content text-white text-center">
    <img
      src="https://avatars.githubusercontent.com/u/24505220?v=4"
      class="max-w-sm rounded-lg shadow-2xl mask mask-squircle"
      alt=""
    />

    <div class="p-4 max-w-lg prose-md">
      <h1 class="mb-5 text-5xl font-bold text-white">Hello! It's Antoine :)</h1>
      <p class="mb-5">
        Linux enthusiast, cats lover, <code>Neovim</code> and a split keyboard. Love
        doing sidequests to learn new technologies and build fun stuff.
      </p>
      <p>Ready to join me on this journey?</p>
      <br />
      <hr />
      <br />
      <div class="flex gap-5 items-center justify-center">
        {#each routes.filter((e) => e.url != "/") as route}
          <a href={route.url}>
            <button
              class="btn
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

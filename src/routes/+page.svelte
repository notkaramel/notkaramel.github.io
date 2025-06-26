<script>
  import { routes } from "$lib";
  import "@app.css";
</script>

<div
  class="hero min-h-screen"
  style="
background: linear-gradient(64deg, rgba(34, 193, 195, 1) 0%, rgba(103, 182, 191, 1) 26%, rgba(189, 104, 189, 1) 60%, rgba(253, 187, 45, 1) 100%);"
>
  <div class="hero-content text-neutral-content text-center">
    <img
      src="https://gravatar.com/avatar/382b80007f28a7448de5408d542d747f?size=256"
      class="max-w-sm rounded-lg shadow-2xl mask mask-squircle"
      alt=""
    />

    <div class="p-4 max-w-lg prose-md">
      <h1 class="mb-5 text-5xl font-bold text-white">Hello! It's Antoine</h1>
      <p class="mb-5">
        Linux enthusiast, cats lover, <code>Neovim</code> and a split keyboard.
        Love doing sidequests to learn new technologies and build fun stuff.
      </p>
      <p> Ready to join me on this journey? </p>
      <br/>
      <hr />
      <br />
      <div class="flex gap-5 items-center justify-center">
        {#each routes as route}
          <a href={route.url}>
            <button class="btn btn-primary">
              <span class="text-primary-content">
                {route.title}
              </span>
            </button>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>

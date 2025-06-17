<script>
  import { routes } from "$lib";
</script>

<div
  class="hero min-h-screen"
  style="background: #22C1C3;
background: linear-gradient(64deg, rgba(34, 193, 195, 1) 0%, rgba(103, 182, 191, 1) 26%, rgba(189, 104, 189, 1) 60%, rgba(253, 187, 45, 1) 100%);"
>
  <div class="hero-overlay"></div>
  <div class="hero-content text-neutral-content text-center">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
      <p class="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
        id nisi.
      </p>
      <div class="flex gap-5 items-center justify-center">
          {#each routes as route}
            <a href={route.url}>
              <button class="btn btn-primary">{route.title}</button>
            </a>
          {/each}
      </div>
    </div>
  </div>
</div>

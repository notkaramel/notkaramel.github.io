<script>
  /*
   * Navigation design notes:
   * - Mobile: Dock
   *   - class="dock-active" for active section
   * - Big screen: Nav bar
   *
   */
  import { routes } from "$lib";
</script>

<div class="dock dock-md">
  {#each routes as route}
    <a href={route.url}>
      <button class="size-8 fill-primary">
        {@html route.icon}
        <!-- <span class="dock-label">{route.title}</span> -->
      </button>
    </a>
  {/each}
</div>

<script lang="ts">
  import "#app.css";
  import DreamyBackdrop from "#lib/components/DreamyBackdrop.svelte";
  import CursorMusicTrail from "#lib/components/CursorMusicTrail.svelte";

  let { children } = $props();
</script>

<DreamyBackdrop />
<CursorMusicTrail />
{@render children()}

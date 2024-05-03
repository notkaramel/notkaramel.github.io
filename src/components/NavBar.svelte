<script lang="ts">
  import profilepic from "$lib/images/pianocatpixelart-neonandretro.jpeg";
  import {
    fade, blur, fly, slide, scale, draw, crossfade
  } from "svelte/transition";

  $: hamburgerState = true;

  function toggleHambuger() {
    hamburgerState = !hamburgerState;
    console.log(hamburgerState);
  }
</script>

<div class="navbar">
  <div class="navbar-left">
    <a href="/">
      <img
        class="navbar-pfp"
        src={profilepic}
        alt="piano cat pixelart neon and retro"
      />
    </a>
  </div>

  <div class="navbar-center">
    <!-- Center part of navbar -->
    <ul>
      <a href="/blog">
        <li>Blog</li>
      </a>
      <a href="/projects">
        <li>Projects</li>
      </a>
      <a href="/resume">
        <li>Resume</li>
      </a>
      <a href="/gallery">
        <li>Photography</li>
      </a>
      <a href="/music">
        <li>Music</li>
      </a>
    </ul>
  </div>

  <div class="navbar-right">
    <button on:click={toggleHambuger}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>
  </div>
</div>
{#if !hamburgerState}
<!-- The svelte/transition module exports seven functions: fade, blur, fly, slide, scale, draw and crossfade. They are for use with Svelte transitions. -->
  <div class="navbar-dropdown" transition:slide>
    <ul>
      <a href="/blog">
        <li>Blog</li>
      </a>
      <a href="/projects">
        <li>Projects</li>
      </a>
      <a href="/resume">
        <li>Resume</li>
      </a>
      <a href="/gallery">
        <li>Photography</li>
      </a>
      <a href="/music">
        <li>Music</li>
      </a>
    </ul>
  </div>
{/if}

<style lang="postcss">
  * {
    @apply transition-all ease-in-out;
  }
  .navbar {
    @apply flex w-full justify-between items-center;
    @apply h-14 md:h-12;
  }

  .navbar-left {
    @apply pl-4 flex justify-center items-center gap-1;

    .navbar-pfp {
      @apply h-full w-12 md:w-10 md:h-fit rounded-lg;
    }
  }

  .navbar-center {
    @apply invisible md:visible;
    > ul {
      @apply flex items-center gap-2 justify-between;

      > a {
        @apply border-b-2 border-white w-32 py-1 text-center;
        @apply hover:border-sky-400;
        @apply active:border-sky-900;
      }
    }
  }

  .navbar-right {
    @apply flex flex-col;
    @apply md:collapse;
    @apply pr-6;

    > button > svg {
      @apply h-8 stroke-current;
      @apply border-2 rounded-lg border-transparent;
      @apply active:border-sky-500;
    }
  }

  .navbar-dropdown {
    > ul {
      @apply flex flex-col items-center gap-2 justify-between;

      > a {
        @apply border-b-2 border-white w-full py-1 text-center font-bold;
        @apply hover:border-sky-400;
        @apply active:border-sky-900;
      }
    }
  }
</style>

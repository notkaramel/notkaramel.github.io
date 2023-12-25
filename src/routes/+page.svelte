<script>
    import { LightSwitch } from "@skeletonlabs/skeleton";
</script>

<div
    class="flex justify-center items-center h-screen w-screen gap-10 flex-wrap flex-col content-center"
    id="main"
>
    <LightSwitch />
    <a href="/blog" class="btn variant-ghost-primary"> Blog </a>
    <a href="/gallery" class="btn variant-ghost-primary"> Photo Gallery </a>
    <a href="/music" class="btn variant-ghost-primary"> Music </a>
    <a href="/resume" class="btn variant-ghost-primary"> Resume </a>
    <a href="/projects" class="btn variant-ghost-primary"> Projects </a>
</div>

<style lang="postcss">
    a {
        @apply text-2xl font-bold w-11/12 md:w-1/3;
    }
    #main {
        background-color: #ff99a3;
        background-image: radial-gradient(
                at 8% 74%,
                hsla(254, 70%, 79%, 1) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 63% 51%,
                hsla(282, 63%, 69%, 1) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 7% 92%,
                hsla(289, 90%, 77%, 1) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 74% 8%,
                hsla(146, 88%, 72%, 1) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 83% 99%,
                hsla(199, 70%, 73%, 1) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 51% 26%,
                hsla(223, 85%, 64%, 1) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 92% 84%,
                hsla(159, 75%, 60%, 1) 0px,
                transparent 50%
            );
    }
</style>

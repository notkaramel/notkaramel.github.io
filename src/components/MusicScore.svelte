<script lang="ts">
    export let scoreTitle: string;
    export let scoreUrl: string;
</script>

<span>
    <a href={scoreUrl} target="_blank">
        {scoreTitle}
    </a>
    by <a href="https://musescore.com/karamusique">notkaramel</a>
</span>
<iframe
    title={scoreTitle}
    src={scoreUrl + "/embed"}
    allowfullscreen
    allow="autoplay; fullscreen"
>
</iframe>

<style lang="postcss">
    iframe {
        @apply w-full h-96;
        border-radius: 10px;
    }
</style>

<script lang="ts">
    export let scoreTitle: string;
    export let scoreUrl: string;
</script>

<iframe
    title={scoreTitle}
    src={scoreUrl + "/embed"}
    allowfullscreen
    allow="autoplay; fullscreen"
    style="
        width: 72vw;
        height: 80vh;
        border-radius: 10px;"
>
</iframe>
<span>
    <a href={scoreUrl} target="_blank">
        {scoreTitle}
    </a>
    by <a href="https://musescore.com/karamusique">notkaramel</a>
</span>

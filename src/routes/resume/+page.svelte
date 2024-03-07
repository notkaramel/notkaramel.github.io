<script>
    // /** @type {import('./$types').PageData} */
    // export let data;
    import cv from "./CV-latest.pdf";
    import ContentBlock from "components/ContentBlock.svelte";
</script>

<title> Resume </title>
<ContentBlock>
    <a href={cv}><button class="btn btn-secondary">My resume (English)</button></a>
    <p> I can definitely do more than what I listed in my resume. </p>
</ContentBlock>

<ContentBlock>
    <button class="btn btn-primary"> Primary </button>
    <button class="btn btn-secondary"> Secondary </button>
    <button class="btn btn-accent"> Accent </button>
    <button class="btn btn-ghost"> Ghost </button>
    <button class="btn btn-link"> Link </button>
    <button class="btn btn-outline btn-primary"> Outline primary</button>
    <button class="btn btn-outline btn-secondary"> Outline secondary</button>
    <button class="btn btn-lg glass btn-primary"> Glass primary </button>
</ContentBlock>

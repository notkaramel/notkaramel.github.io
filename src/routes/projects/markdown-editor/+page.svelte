<script>
    import ContentBlock from "components/ContentBlock.svelte";
    import { marked } from "marked";
    let markdown =
        "## Hello, world!\n this is a *very* `powerful` **markdown** editor.\n## Like no joke\n- It's\n- **really**\n- _good_";
</script>

<title>Markdown Editor</title>
<ContentBlock>
    <h1 class="font-bold font-4xl font-mono">Markdown editor</h1>
    <div class="grid grid-cols-2">
        <ContentBlock>
            <textarea
                class="textarea textarea-primary min-w-full min-h-full font-mono"
                bind:value={markdown}
            ></textarea>
        </ContentBlock>
        <ContentBlock>
            <article class="prose lg:prose-xl">
                {@html marked(markdown)}
            </article>
        </ContentBlock>
    </div>
</ContentBlock>

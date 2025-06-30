<script lang="ts">
  import type { PageProps } from "./$types";
  import { marked } from "marked";

  let { data }: PageProps = $props();
  let content = $derived(marked.parse(data.content));
</script>

<h1>{data.title}</h1>
<hr />
<div class="prose prose-basse text-primary-content">
  {@html content}
</div>

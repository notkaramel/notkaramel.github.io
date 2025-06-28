<script lang="ts">
  import type { PageProps } from "./$types";
  import { marked } from "marked";

  let { data }: PageProps = $props();
  let content = marked.parse(data.content);
</script>

<p>{data.title}</p>
<hr />
{@html content}

import { marked } from "marked";

export type TocEntry = {
  id: string;
  text: string;
  level: number; // 2 = h2, 3 = h3, etc.
};

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Extract TOC entries from markdown (h2–h4 for a clear document structure). */
export function extractToc(markdown: string): TocEntry[] {
  const tokens = marked.lexer(markdown);
  const toc: TocEntry[] = [];

  for (const token of tokens) {
    if (token.type === "heading" && token.depth >= 2 && token.depth <= 4) {
      const raw =
        typeof token.text === "string" ? token.text : (token.text ?? "");
      const text = raw.replace(/\s*\{#[\w-]+\}\s*$/, "").trim();
      const id = slugifyHeading(text);
      toc.push({ id, text, level: token.depth });
    }
  }

  return toc;
}

function getHeadingTextFromTokens(tokens: { text?: string }[]): string {
  return tokens.map((t) => t.text ?? "").join("");
}

/** Parse markdown to HTML with id attributes on h2–h4 for TOC linking. */
export function parseMarkdownWithHeadingIds(markdown: string): string {
  const renderer = new marked.Renderer();
  const originalHeading = renderer.heading?.bind(renderer);

  renderer.heading = ({
    tokens,
    depth,
  }: {
    tokens: { text?: string }[];
    depth: number;
  }) => {
    const text = getHeadingTextFromTokens(tokens);
    const id = slugifyHeading(text);
    const tag = `h${depth}`;
    const inner = originalHeading
      ? originalHeading({ tokens, depth }).replace(/^<h\d[^>]*>|<\/h\d>$/g, "")
      : text;
    return `<${tag} id="${id}">${inner}</${tag}>`;
  };

  return marked.parse(markdown, { renderer }) as string;
}

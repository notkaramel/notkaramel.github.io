/**
 * Interactive CLI to scaffold a blog Markdown entry in ./blogs/.
 * Run with: bun run src/lib/newblog.ts
 */

import type { NewBlogAnswers } from "@schemas";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import * as path from "node:path";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const BLOG_DIR = path.resolve(import.meta.dir, "../../blogs");
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

type PromptOptions = {
  required?: boolean;
  defaultValue?: string;
  transform?: (value: string) => string;
  validate?: (value: string) => true | string;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function todayYMD(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function ensureDir(directory: string) {
  await mkdir(directory, { recursive: true });
}

async function ask(
  rl: readline.Interface,
  prompt: string,
  options?: PromptOptions,
): Promise<string> {
  const defaultValue = options?.defaultValue ?? "";
  const label =
    defaultValue !== "" ? `${prompt} [${defaultValue}]: ` : `${prompt}: `;

  while (true) {
    const rawInput = (await rl.question(label)).trim();
    let answer = rawInput || defaultValue;

    if (options?.transform) {
      answer = options.transform(answer);
    }

    if (options?.required && !answer) {
      console.log("This field is required.");
      continue;
    }

    if (options?.validate) {
      const validation = options.validate(answer);
      if (validation !== true) {
        console.log(typeof validation === "string" ? validation : "Invalid input.");
        continue;
      }
    }

    return answer;
  }
}

async function findAvailableFilename(
  directory: string,
  slug: string,
): Promise<string> {
  let candidate = `${slug}.md`;
  let suffix = 1;

  while (existsSync(path.join(directory, candidate))) {
    candidate = `${slug}-${suffix}.md`;
    suffix += 1;
  }
  return candidate;
}

function deriveTags(slug: string, rawTags: string): string[] {
  const primaryTag = slug.split("-")[0] ?? slug;
  const additionalTags = rawTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return Array.from(new Set([primaryTag, ...additionalTags]));
}

function buildFrontmatter(answers: NewBlogAnswers): string {
  const escapeQuotes = (value: string) => value.replace(/"/g, '\\"');

  const tagsContent =
    answers.tags.length > 0
      ? answers.tags.map((tag) => `"${escapeQuotes(tag)}"`).join(", ")
      : "";

  const fm = [
    "---",
    `title: "${escapeQuotes(answers.title)}"`,
    `slug: "${escapeQuotes(answers.slug)}"`,
    `description: "${escapeQuotes(answers.description)}"`,
    `date: "${answers.date}"`,
    `lastUpdated: "${answers.lastUpdated}"`,
    `tags: [${tagsContent}]`,
    "---",
    "",
  ].join("\n");
  return fm;
}

async function collectAnswers(
  rl: readline.Interface,
): Promise<NewBlogAnswers> {
  const title = await ask(rl, "Post title", { required: true });
  const slug = await ask(rl, "Slug", {
    defaultValue: slugify(title),
    required: true,
    transform: slugify,
    validate: (value) => (value ? true : "Slug cannot be empty."),
  });
  const description = await ask(rl, "Short description", { defaultValue: "" });
  const rawTags = await ask(rl, "Tags (comma-separated)", { defaultValue: "" });
  const date = await ask(rl, "Date (YYYY-MM-DD)", {
    defaultValue: todayYMD(),
    validate: (value) =>
      DATE_REGEX.test(value) ? true : "Use format YYYY-MM-DD.",
  });

  return {
    title,
    slug,
    description,
    tags: deriveTags(slug, rawTags),
    date,
    lastUpdated: date,
  };
}

async function main() {
  await ensureDir(BLOG_DIR);

  const rl = readline.createInterface({ input, output });

  try {
    const answers = await collectAnswers(rl);
    const filename = await findAvailableFilename(BLOG_DIR, answers.slug);
    const filepath = path.join(BLOG_DIR, filename);

    await Bun.write(filepath, buildFrontmatter(answers));

    console.log(`\n✅ Created: ${path.relative(process.cwd(), filepath)}`);
  } catch (err) {
    console.error("Error:", err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();

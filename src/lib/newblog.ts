/**
 * Interactive CLI to create a blog Markdown entry in ./blog/
 * Run with: bun scripts/new-post.ts
 */

import * as fs from "node:fs/promises";
import * as fssync from "node:fs";
import * as path from "node:path";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

type Answers = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  date: string; // YYYY-MM-DD
};

const BLOG_DIR = path.resolve(process.cwd(), "blogs");

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

async function ensureDir(p: string) {
  if (!fssync.existsSync(p)) {
    await fs.mkdir(p, { recursive: true });
  }
}

async function ask(
  rl: readline.Interface,
  prompt: string,
  opts?: {
    required?: boolean;
    default?: string;
    transform?: (x: string) => string;
    validate?: (x: string) => string | true;
    yesNo?: boolean;
  }
): Promise<string> {
  const def = opts?.default;
  const suffix = def !== undefined ? ` [${def}]` : "";
  const q = `${prompt}${suffix}: `;

  while (true) {
    const raw = (await rl.question(q)).trim();
    let val = raw || (def ?? "");
    if (opts?.yesNo) {
      // normalize yes/no
      const v = val.toLowerCase();
      if (v === "" && def) val = def;
      if (["y", "yes", "true", "1"].includes(v)) val = "yes";
      else if (["n", "no", "false", "0"].includes(v)) val = "no";
      else if (v === "" && def) {
        val = def.toLowerCase().startsWith("y") ? "yes" : "no";
      } else if (!["yes", "no"].includes(val)) {
        console.log("Please answer yes or no.");
        continue;
      }
    }
    if (opts?.transform) val = opts.transform(val);
    if (opts?.required && !val) {
      console.log("This field is required.");
      continue;
    }
    if (opts?.validate) {
      const res = opts.validate(val);
      if (res !== true) {
        console.log(typeof res === "string" ? res : "Invalid input.");
        continue;
      }
    }
    return val;
  }
}

async function findAvailableFilename(
  dir: string,
  base: string
): Promise<string> {
  // base should be slug (without extension)
  let candidate = `${base}.md`;
  let i = 1;
  while (fssync.existsSync(path.join(dir, candidate))) {
    candidate = `${base}-${i}.md`;
    i++;
  }
  return candidate;
}

function buildFrontmatter(a: Answers): string {
  // Escape quotes in strings safely
  const esc = (s: string) => s.replace(/"/g, '\\"');
  const fm = [
    "---",
    `title: "${esc(a.title)}"`,
    `slug: "${esc(a.slug)}"`,
    `date: ${a.date}`,
    `description: "${esc(a.description)}"`,
    `tags: [${a.tags.map((t) => `"${esc(t)}"`).join(", ")}]`,
    "---",
    "",
  ].join("\n");
  return fm;
}

async function main() {
  await ensureDir(BLOG_DIR);

  const rl = readline.createInterface({ input, output });

  try {
    const title = await ask(rl, "Post title", { required: true });
    const defaultSlug = slugify(title);
    const slug = await ask(rl, "Slug", {
      default: defaultSlug,
      required: true,
      transform: (s) => slugify(s),
      validate: (s) => (s ? true : "Slug cannot be empty."),
    });
    const description = await ask(rl, "Short description", { default: "" });
    const tagsRaw = await ask(rl, "Tags (comma-separated)", { default: "" });
    const date = await ask(rl, "Date (YYYY-MM-DD)", {
      default: todayYMD(),
      validate: (s) =>
        /^\d{4}-\d{2}-\d{2}$/.test(s) ? true : "Use format YYYY-MM-DD.",
    });

    const answers: Answers = {
      title,
      slug,
      description,
      tags: tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      date,
    };

    const filename = await findAvailableFilename(BLOG_DIR, answers.slug);
    const filepath = path.join(BLOG_DIR, filename);
    const content = buildFrontmatter(answers);

    await fs.writeFile(filepath, content, "utf8");

    console.log(`\n✅ Created: ${path.relative(process.cwd(), filepath)}`);
  } catch (err) {
    console.error("Error:", err instanceof Error ? err.message : String(err));
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();

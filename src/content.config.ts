import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    audio: z.string().url().optional(),
  }),
});

const wiki = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/wiki" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    github: z.string().url(),
    demoUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    title: z.string(),
    kind: z.enum([
      "work",
      "education",
      "teaching",
      "research",
      "publication",
      "workshop",
    ]),
    org: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const art = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/art" }),
  schema: z.object({
    title: z.string(),
    caption: z.string(),
    alt: z.string(),
    image: z.string(),
    category: z.enum(["portrait", "landscape", "other"]),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, wiki, projects, experience, art };

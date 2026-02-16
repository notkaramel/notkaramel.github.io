/** Valid blog categories for filtering and display */
export const BLOG_CATEGORIES = [
  "Discussion",
  "Random Thoughts",
  "Technical Docs",
  "Travel Guide",
  "Misc.",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  lastUpdated: string;
  tags: string[];
  /** One or more of BLOG_CATEGORIES. Defaults to [] if missing. */
  categories?: BlogCategory[];
};

export type RecipeFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  lastUpdated: string;
  tags: string[];
};

export type Route = {
  title: string;
  url: string;
  icon: string;
};

export type NewBlogAnswers = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  categories: BlogCategory[];
  date: string;
  lastUpdated: string;
};

export type AcademicRecord = {
  degree: string;
  school: string;
  duration: string;
  details: string[];
  cgpa: string;
};

export type Publication = {
  title: string;
  authors: string[];
  type: string;
  details: string[];
  doi: string | null;
  url: string | null;
};

export type ConferenceWorkshop = {
  title: string;
  authors: string[];
  time: string;
  location: string;
};

export type WorkExperience = {
  jobTitle: string;
  workplace: string;
  location: string;
  time: string;
  description: string[];
};

export type Skill = {
  title: string;
  tools: string[];
};

export type Transcript = {
  title: string;
  url: string;
};

export type Project = {
  title: string;
  featured: boolean;
  shortDesc: string;
  techStack: string[];
  category: string[];
  github: string;
  link: string;
  status: "active" | "previous";
};

export type BlogFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  lastUpdated: string;
  tags: string[];
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
};

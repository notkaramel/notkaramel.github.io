import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, fetch }) => {
  const response = await fetch("/api/wiki");

  if (!response.ok) {
    error(500, "Failed to load wiki");
  }

  const wiki = await response.json();

  if (wiki == null) {
    error(500, "Failed to load wiki");
  }

  return {
    canonicalURL: url.href,
    wiki,
  };
};

export const prerender = true;

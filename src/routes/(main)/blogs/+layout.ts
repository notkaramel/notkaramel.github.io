import blogs from "$lib/content/blogs.json";

export const load = () => {    
  return {
    blogEntries: blogs
  }
};

export const csr = true;
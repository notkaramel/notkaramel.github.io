import { demoBlog } from '$lib/content/blogs.mjs';
import { Blog } from '$lib/content/types.mjs';

/** @type {Blog[]} */
const posts = [demoBlog];

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        summaries: posts.map((post) => ({
            slug: post.slug,
            title: post.title,
            shortDesc: post.shortDesc,
            categories: post.categories
        }))
    }
};
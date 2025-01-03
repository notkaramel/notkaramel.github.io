import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        slug: params.slug,
    };
    // error(404, 'Post not found');
};
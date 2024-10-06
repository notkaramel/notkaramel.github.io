import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    if (params.slug === 'do-everything-in-vim') {
        return {
            slug: params.slug,
            title: 'Hello, world!',
            date: '2022-01-01',
            category: ['productivity', 'technology'],
            content: 'This is the first post on my blog.'
        };
    }
    if (params.slug === 'another-blog-post') {
        return {
            slug: params.slug,
            title: 'My focaccia recipe',
            date: '2022-01-02',
            tags: ['food', 'cooking'],
            content: 'So here\'s my recipe for focaccia.'
        };
    }

    return {
        slug: params.slug,
        title: 'My focaccia recipe',
        date: '2022-01-02',
        tags: ['food', 'cooking'],
        content: 'So here\'s my recipe for focaccia.'
    };
    // error(404, 'Post not found');
};
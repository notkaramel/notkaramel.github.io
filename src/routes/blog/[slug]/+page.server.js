import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    if (params.slug === 'hello-world') {
        return {
            slug: params.slug,
            title: 'Hello, world!',
            date: '2022-01-01',
            tags: ['hello', 'world'],
            content: 'This is the first post on my blog.'
        };
    }
    if (params.slug === 'another-blog-post') {
        return {
            slug: params.slug,
            title: 'Another blog post',
            date: '2022-01-02',
            tags: ['hello', 'world'],
            content: 'This is the second post on my blog.'
        };
    }
    error(404, 'Post not found');
};
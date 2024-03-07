const posts = [
    {
        slug: 'hello-world',
        title: 'Hello, world!',
        date: '2022-01-01',
        viewCount: 4,
        tags: ['hello', 'world'],
        content: 'This is the first post on my blog.'
    },
    {
        slug: 'another-blog-post',
        title: 'Another blog post',
        date: '2022-01-02',
        viewCount: 4,
        tags: ['hello', 'world'],
        content: 'This is the second post on my blog.'
    }
];

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        summaries: posts.map((post) => ({
            slug: post.slug,
            title: post.title,
            date: post.date,
            viewCount: post.viewCount,
            tags: post.tags
        }))
    }
};
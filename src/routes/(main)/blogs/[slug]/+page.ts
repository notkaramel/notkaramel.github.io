import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { blogs } from '$lib/content/blogs';

export const load: PageLoad = async ({ params }) => {
	const post = blogs.filter((e) => e.slug == params.slug)[0];
	
	console.log(post);
	if (post) {
		return {
			post: post
		};
	}

	error(404, 'Not found');
};
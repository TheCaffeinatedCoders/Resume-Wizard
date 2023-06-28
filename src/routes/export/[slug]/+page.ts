import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import {
	resumeStore,
} from '$lib/resumeStore';

export function load({ params }) {
	const slug: number = +params.slug;
    // console.log('slug', slug);
	// let currentResumeObject = get(resumeStore)[slug];
    // console.log("Object:", get(resumeStore));

	// if (!currentResumeObject) throw error(404);

	return {
        slug,
	};
}
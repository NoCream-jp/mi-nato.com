import { defineCollection, z } from 'astro:content';

const articleCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		category: z.string(),
		thumbnail: z.string(),
		date: z.date(),
	}),
});

export const collections = {
	'article': articleCollection,
};
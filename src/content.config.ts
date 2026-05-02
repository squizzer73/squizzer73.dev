import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.enum(['ha', 'build', 'auto'])),
    excerpt: z.string(),
    readTime: z.string(),
  }),
});

export const collections = { blog };

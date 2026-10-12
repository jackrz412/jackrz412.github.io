// Content collections: typed sets of content files that Astro checks at build time.
// Each project is one Markdown file in src/content/projects/; its front matter (the block
// between the --- lines) must match the schema below, or `npm run build` fails and says why.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  // Every .md file in the folder is one project; the file name becomes its id.
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string(),
      // One sentence, short enough to fit a card.
      summary: z.string().max(140),
      status: z.enum(['live', 'in-progress']),
      // When it went live, or when work started. Written as YYYY-MM-DD.
      date: z.coerce.date(),
      // Short tool names, e.g. ["Python", "Ollama"].
      tools: z.array(z.string()),
      // The project page: a site path like /projects/local-llm-lab/ or a full URL.
      href: z.string().optional(),
      repo: z.url().optional(),
      // Key for the project's custom card art (built in a later stage).
      art: z.string().optional(),
      // Manual sort position; projects without one sort newest first.
      order: z.number().optional(),
    })
    // A live project must say where to find it.
    .refine((p) => p.status !== 'live' || p.href, {
      message: 'A live project needs an href.',
      path: ['href'],
    }),
});

export const collections = { projects };

import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({image}) => z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    author: z.string().default("Milan Gruner"),
    image: image().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

const gamesCollection = defineCollection({
  type: "content",
  schema: ({image}) => z.object({
    name: z.string(),
    date: z.date(),
    description: z.string(),
    image: image().optional(),
    screenshots: z.array(image()),
    links: z.array(z.string().url()),
  }),
});

export const collections = {
  blog: blogCollection,
  games: gamesCollection,
};

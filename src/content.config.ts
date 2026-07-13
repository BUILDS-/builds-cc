import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const clubEvents = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/events" }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      title: z.string(),
      description: z.string(),
      instructors: z.array(
        z.object({
          name: z.string(),
          image: image().optional(),
        }),
      ),
      date: z.coerce.date(),
      location: z.string(),
      badges: z.array(
        z.object({
          label: z.string(),
          emoji: z.string(),
        }),
      ),
      link: z.url().optional(),
      linkText: z.string().optional(),
    }),
});

const eBoard = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/eboard" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      image: image().optional(),
      position: z.number(),
      linkedin: z.url().optional(),
      github: z.url().optional(),
    }),
});

const formerEBoard = defineCollection({
  loader: glob({ pattern: "*.md", base: ".src/content/alumni/eboard" }),
});
const founders = defineCollection({
  loader: glob({ pattern: "*.md", base: ".src/content/alumni/founders" }),
});

export const collections = { clubEvents, eBoard };

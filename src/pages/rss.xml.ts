import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

interface Item {
  data: {
    title?: string;
    name?: string;
    description: string;
    date: Date;
    customData?: string;
  };
  slug: string;
  type?: string;
}

export const GET: APIRoute = async (context) => {
  const blog = (await getCollection("blog")).map((item: Item) => {
    item.type = "blog";
    return item;
  });
  const games = (await getCollection("games")).map((item: Item) => {
    item.type = "games";
    return item;
  });
  const items = blog
    .concat(games)
    .sort((a, b) => {
      return b.data.date.getTime() - a.data.date.getTime();
    })
    .map((item) => ({
      title: item.data.title || item.data.name || "Untitled post",
      pubDate: item.data.date,
      description: item.data.description,
      customData: item.data.customData,
      link: `/${item.type}/${item.slug}`,
    }));

  return rss({
    title: "GrunerTech Blog",
    description: "Ramblings about game and software development",
    site: context.site!,
    items,
    customData: `<language>en-us</language>`,
  });
};

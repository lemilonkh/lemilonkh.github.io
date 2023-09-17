import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

interface Item {
  data: {
    title?: string;
    name?: string;
    description: string;
    image?: {
      src: string;
      format: string;
      width: number;
      height: number;
    };
    date: Date;
  };
  slug: string;
  body: string;
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
      link: `/${item.type}/${item.slug}`,
      content: sanitizeHtml(parser.render(item.body)),
      customData: item.data.image ? `<media:content
        type="image/${item.data.image.format == "jpg" ? "jpeg" : "png"}"
        width=${item.data.image.width}
        height=${item.data.image.height}
        medium="image"
        url="https://${context.site?.host + item.data.image.src}"
      />` : undefined,
    }));

  return rss({
    title: "GrunerTech Blog",
    description: "Ramblings about game and software development",
    site: context.site!,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
    },
    items,
    customData: `<language>en-us</language>`,
  });
};

import "server-only";

import { load } from "cheerio";

export type ProjectCopySection = {
  heading: string;
  paragraphs: string[];
  items: string[];
};

export type ProjectDetailData = {
  title: string;
  subtitle: string;
  summary: string;
  gallery: string[];
  sections: ProjectCopySection[];
  quote?: string;
  quoteAuthor?: string;
};

export type ExtractedProjectPage = {
  data: ProjectDetailData;
  remainingMainHtml: string;
  auxiliaryHtml: string;
};

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function extractProjectPage(html: string): ExtractedProjectPage | null {
  const $ = load(html, null, false);
  const hero = $("#section-4-67").first();
  const gallerySection = $("#section-208-67").first();
  const copySection = $("#section-33-67").first();
  if (!hero.length || !gallerySection.length || !copySection.length) return null;

  const sections: ProjectCopySection[] = [];
  let current: ProjectCopySection | null = null;
  copySection.find(".oxy-stock-content-styles").first().children().each((_, element) => {
    const node = $(element);
    const tag = element.tagName?.toLowerCase();
    if (/^h[2-4]$/.test(tag)) {
      current = { heading: cleanText(node.text()), paragraphs: [], items: [] };
      sections.push(current);
    } else if (tag === "p" && current) {
      const text = cleanText(node.text());
      if (text) current.paragraphs.push(text);
    } else if ((tag === "ul" || tag === "ol") && current) {
      node.children("li").each((__, item) => {
        const text = cleanText($(item).text());
        if (text) current?.items.push(text);
      });
    }
  });

  const gallery = gallerySection.find("a.oxy-gallery-item[href]").map((_, anchor) => $(anchor).attr("href") ?? "").get().filter(Boolean);
  const fallbackImage = hero.find("#image-10-67").attr("src");
  if (!gallery.length && fallbackImage) gallery.push(fallbackImage);

  const data: ProjectDetailData = {
    title: cleanText(hero.find("#headline-7-67").text()),
    subtitle: cleanText(hero.find("#headline-12-67").text()),
    summary: cleanText(hero.find("#text_block-14-67").text()),
    gallery,
    sections,
    quote: cleanText(copySection.find("#text_block-45-67").text()) || undefined,
    quoteAuthor: cleanText(copySection.find("#text_block-46-67").text()) || undefined,
  };

  hero.remove();
  gallerySection.remove();
  copySection.remove();
  $("header, footer, script").remove();
  $("main").each((_, element) => {
    $(element).replaceWith($(element).contents());
  });

  return {
    data,
    remainingMainHtml: $("body").html() ?? $.html(),
    auxiliaryHtml: "",
  };
}

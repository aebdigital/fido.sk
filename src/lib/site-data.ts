import rawData from "@/data/scraped-data.json";

export type WpRendered = {
  rendered?: string;
};

export type WpMedia = {
  id: number;
  title?: WpRendered;
  alt_text?: string;
  source_url?: string;
  media_type?: string;
  mime_type?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, { source_url?: string; width?: number; height?: number }>;
  };
};

export type WpItem = {
  id: number;
  date?: string;
  modified?: string;
  slug: string;
  type: string;
  link: string;
  title: WpRendered;
  content?: WpRendered;
  excerpt?: WpRendered;
  featured_media?: number;
  kategorie_realizacie?: number[];
  categories?: number[];
  tags?: number[];
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: Array<Array<Term>>;
  };
};

export type Term = {
  id: number;
  name: string;
  slug: string;
  link?: string;
  taxonomy?: string;
};

export type HtmlPage = {
  url: string;
  path: string;
  title: string;
  text: string;
  assetUrls: string[];
};

type ScrapedData = {
  scrapedAt: string;
  site: string;
  routes: string[];
  collections: {
    pages: WpItem[];
    posts: WpItem[];
    sluzby: WpItem[];
    realizacie: WpItem[];
    nehnutelnost: WpItem[];
    media: WpMedia[];
    categories: Term[];
    tags: Term[];
    kategorie_realizacie: Term[];
  };
  htmlPages: HtmlPage[];
};

export const data = rawData as unknown as ScrapedData;

export const pages = data.collections.pages;
export const posts = data.collections.posts;
export const services = data.collections.sluzby;
export const projects = data.collections.realizacie;
export const properties = data.collections.nehnutelnost;
export const media = data.collections.media;
export const categories = data.collections.categories;
export const tags = data.collections.tags;
export const projectCategories = data.collections.kategorie_realizacie;

export const navItems = [
  { href: "/nehnutelnosti/", label: "Nehnuteľnosti" },
  { href: "/rezidencia-lubovec/", label: "Rezidencia Ľubovec" },
  { href: "/sluzby/nabytok-na-mieru/", label: "Nábytok" },
  { href: "/sluzby/okna-brany-a-dvere/", label: "Okná, Brány a dvere" },
  { href: "/realizacie/", label: "Realizácie" },
  { href: "/sluzby/", label: "Ďalšie služby" },
  { href: "/o-nas/", label: "O nás" },
  { href: "/kontakt/", label: "Kontakt" },
];

export function plainText(html = "") {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8222;/g, "„")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

export function localizeUrl(url?: string) {
  if (!url) return "";
  return url.replace("https://www.fido.sk", "");
}

export function normalizePath(path: string) {
  if (!path.startsWith("/")) return `/${path}`;
  return path.endsWith("/") ? path : `${path}/`;
}

export function itemPath(item: Pick<WpItem, "link">) {
  try {
    return normalizePath(new URL(item.link).pathname);
  } catch {
    return "/";
  }
}

export function featuredImage(item?: WpItem) {
  const embedded = item?._embedded?.["wp:featuredmedia"]?.[0];
  const found = item?.featured_media ? media.find((asset) => asset.id === item.featured_media) : undefined;
  const image = embedded ?? found;
  const sizes = image?.media_details?.sizes;
  const preferred =
    sizes?.large?.source_url ??
    sizes?.["1536x1536"]?.source_url ??
    sizes?.medium_large?.source_url ??
    image?.source_url;
  return {
    src: localizeUrl(preferred),
    alt: image?.alt_text || plainText(image?.title?.rendered ?? item?.title?.rendered ?? "FIDO"),
    width: image?.media_details?.width ?? 1200,
    height: image?.media_details?.height ?? 800,
  };
}

export function sanitizeWpHtml(html = "") {
  return html
    .replaceAll("https://www.fido.sk", "")
    .replace(/srcset="[^"]*"/g, "")
    .replace(/sizes="[^"]*"/g, "")
    .replace(/\sclass="[^"]*"/g, "")
    .replace(/\sstyle="[^"]*"/g, "");
}

export function allContentItems() {
  return [...pages, ...posts, ...services, ...projects, ...properties];
}

export function findByPath(path: string) {
  const normalized = normalizePath(path);
  return allContentItems().find((item) => itemPath(item) === normalized);
}

export function htmlForPath(path: string) {
  const normalized = normalizePath(path);
  return data.htmlPages.find((page) => normalizePath(page.path) === normalized);
}

export function getArchive(kind: string) {
  if (kind === "sluzby") return services;
  if (kind === "realizacie") return projects;
  if (kind === "blog") return posts;
  if (kind === "nehnutelnost" || kind === "nehnutelnosti") return properties;
  return [];
}

export function routeParams() {
  return data.routes
    .map((route) => new URL(route).pathname)
    .filter((path) => path !== "/")
    .map((path) => ({
      slug: path.replace(/^\/|\/$/g, "").split("/"),
    }));
}

export function firstImageByName(fragment: string) {
  const lower = fragment.toLowerCase();
  const asset = media.find((item) => item.source_url?.toLowerCase().includes(lower));
  return localizeUrl(asset?.source_url);
}

export function routeForCollection(item: WpItem) {
  return itemPath(item);
}

export const primaryHeroImage =
  firstImageByName("Fido_LUBOVCE_Rendre_Exterier_1F-1-scaled-1") ||
  featuredImage(pages.find((page) => page.slug === "nehnutelnosti")).src ||
  featuredImage(projects[0]).src;

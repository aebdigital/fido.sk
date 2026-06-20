import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const site = "https://www.fido.sk";
const outDir = path.join(process.cwd(), "src", "data");
const publicDir = path.join(process.cwd(), "public");
const uploadDir = path.join(publicDir, "wp-content", "uploads");
const endpoints = [
  "pages",
  "posts",
  "sluzby",
  "realizacie",
  "nehnutelnost",
  "media",
  "categories",
  "tags",
  "kategorie_realizacie",
  "menu-items",
];

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  const res = await fetch(url, {
    headers: {
      "user-agent": "fido-nextjs-rebuild/1.0",
    },
    signal: controller.signal,
  });
  clearTimeout(timeout);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function fetchJson(url) {
  return JSON.parse(await fetchText(url));
}

async function fetchCollection(restBase) {
  const items = [];
  for (let page = 1; page < 20; page += 1) {
    const url = `${site}/wp-json/wp/v2/${restBase}?per_page=100&page=${page}&_embed=1`;
    const res = await fetch(url);
    if (res.status === 400) break;
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    const chunk = await res.json();
    if (!Array.isArray(chunk) || chunk.length === 0) break;
    items.push(...chunk);
    if (chunk.length < 100) break;
  }
  return items;
}

function decodeHtml(input = "") {
  return input
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8222;/g, "„")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripHtml(input = "") {
  return decodeHtml(
    input
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function extractUrls(text) {
  const urls = new Set();
  const patterns = [
    /https?:\/\/www\.fido\.sk\/wp-content\/uploads\/[^"')\s<>]+/g,
    /https?:\/\/www\.fido\.sk\/wp-content\/themes\/oxygen-is-not-a-theme\/assets\/fonts\/[^"')\s<>]+/g,
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      urls.add(decodeHtml(match[0]).replace(/\\\//g, "/"));
    }
  }
  return [...urls];
}

function localPathFor(url) {
  const parsed = new URL(url);
  return parsed.pathname;
}

async function downloadAsset(url) {
  const parsed = new URL(url);
  const relative = parsed.pathname.replace(/^\/wp-content\/uploads\//, "");
  const filePath = path.join(uploadDir, relative);
  await mkdir(path.dirname(filePath), { recursive: true });
  try {
    const existing = await stat(filePath);
    if (existing.size > 0) return { url, ok: true, path: parsed.pathname, skipped: true };
  } catch {
    // File does not exist yet.
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  const res = await fetch(url, { signal: controller.signal });
  clearTimeout(timeout);
  if (!res.ok) return { url, ok: false, status: res.status };
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(filePath, buffer);
  return { url, ok: true, path: parsed.pathname };
}

async function mapLimit(items, limit, task) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await task(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await mkdir(uploadDir, { recursive: true });

  const sitemapIndex = await fetchText(`${site}/wp-sitemap.xml`);
  const sitemapUrls = [...sitemapIndex.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const pageUrls = new Set();

  for (const sitemapUrl of sitemapUrls) {
    const xml = await fetchText(sitemapUrl);
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) pageUrls.add(match[1]);
  }

  const collections = {};
  for (const endpoint of endpoints) {
    try {
      collections[endpoint] = await fetchCollection(endpoint);
    } catch (error) {
      collections[endpoint] = [];
      console.warn(`Skipping ${endpoint}: ${error.message}`);
    }
  }

  const htmlPages = [];
  for (const url of pageUrls) {
    try {
      const html = await fetchText(url);
      const title = decodeHtml(html.match(/<title>(.*?)<\/title>/i)?.[1] ?? "");
      htmlPages.push({
        url,
        path: new URL(url).pathname,
        title,
        text: stripHtml(html).slice(0, 8000),
        assetUrls: extractUrls(html),
      });
    } catch (error) {
      console.warn(`HTML failed ${url}: ${error.message}`);
    }
  }

  const assetUrls = new Set();
  for (const page of htmlPages) page.assetUrls.forEach((url) => assetUrls.add(url));
  for (const items of Object.values(collections)) {
    const json = JSON.stringify(items);
    extractUrls(json).forEach((url) => assetUrls.add(url));
    for (const item of items) {
      if (item.source_url) assetUrls.add(item.source_url);
      const media = item?._embedded?.["wp:featuredmedia"]?.[0];
      if (media?.source_url) assetUrls.add(media.source_url);
    }
  }

  const uploadUrls = [...assetUrls].filter((url) => url.includes("/wp-content/uploads/"));
  const downloaded = await mapLimit(uploadUrls, 12, async (url) => {
    try {
      return await downloadAsset(url);
    } catch (error) {
      return { url, ok: false, error: error.message };
    }
  });

  const data = {
    scrapedAt: new Date().toISOString(),
    site,
    routes: [...pageUrls],
    collections,
    htmlPages,
    assets: [...assetUrls].map((url) => ({ url, localPath: localPathFor(url) })),
    downloaded,
  };

  await writeFile(path.join(outDir, "scraped-data.json"), `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Scraped ${pageUrls.size} routes, ${assetUrls.size} assets, ${downloaded.filter((a) => a.ok).length} downloads.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

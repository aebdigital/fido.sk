import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://www.fido.sk";
const cwd = process.cwd();
const publicDir = path.join(cwd, "public");
const mirrorDir = path.join(publicDir, "_mirror");
const scraped = JSON.parse(await readFile(path.join(cwd, "src/data/scraped-data.json"), "utf8"));
const archiveRoutes = ["/sluzby/", "/realizacie/"];
const routes = [
  ...new Set([
    ...scraped.routes.map((url) => new URL(url).pathname),
    ...archiveRoutes,
  ]),
];
const assetQueue = [];
const queuedAssets = new Set();

function localPageFile(pathname) {
  if (pathname === "/") return path.join(mirrorDir, "index.html");
  return path.join(mirrorDir, pathname.replace(/^\//, ""), "index.html");
}

function localAssetFile(url) {
  return path.join(publicDir, decodeURIComponent(url.pathname).replace(/^\//, ""));
}

function isMirrorAsset(url) {
  return url.origin === origin && (
    url.pathname.startsWith("/wp-content/") ||
    url.pathname.startsWith("/wp-includes/")
  );
}

function normalizeUrl(value, base) {
  if (!value || value.startsWith("data:") || value.startsWith("blob:") || value.startsWith("#")) return null;
  try {
    return new URL(value.replace(/^\/\//, "https://"), base);
  } catch {
    return null;
  }
}

function enqueue(value, base) {
  const url = normalizeUrl(value, base);
  if (!url || !isMirrorAsset(url)) return;
  const key = url.origin + url.pathname;
  if (queuedAssets.has(key)) return;
  queuedAssets.add(key);
  assetQueue.push(url);
}

function discoverAssets(text, base) {
  for (const match of text.matchAll(/(?:src|href|poster)=["']([^"']+)["']/gi)) enqueue(match[1], base);
  for (const match of text.matchAll(/srcset=["']([^"']+)["']/gi)) {
    for (const candidate of match[1].split(",")) enqueue(candidate.trim().split(/\s+/)[0], base);
  }
  for (const match of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) enqueue(match[1], base);
  for (const match of text.matchAll(/@import\s+(?:url\()?\s*["']([^"']+)["']/gi)) enqueue(match[1], base);
}

function rewriteDocument(text) {
  return text
    .replaceAll("https://www.fido.sk", "")
    .replaceAll("http://www.fido.sk", "")
    .replaceAll("https://fido.sk", "")
    .replaceAll("http://fido.sk", "")
    .replaceAll("//www.fido.sk", "")
    .replaceAll("//fido.sk", "");
}

async function fetchWithTimeout(url, timeoutMs = 30000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "fido-next-mirror/1.0" },
    });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function fileExists(file) {
  try {
    return (await stat(file)).size > 0;
  } catch {
    return false;
  }
}

async function mirrorPage(pathname) {
  const url = new URL(pathname, origin);
  const response = await fetchWithTimeout(url);
  const html = await response.text();
  discoverAssets(html, url);
  const output = rewriteDocument(html);
  const target = localPageFile(pathname);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, output);
  return { pathname, bytes: Buffer.byteLength(output) };
}

async function mirrorAsset(url) {
  const target = localAssetFile(url);
  if (await fileExists(target)) {
    if (/\.css$/i.test(url.pathname)) {
      const existing = await readFile(target, "utf8");
      discoverAssets(existing, url);
      const rewritten = rewriteDocument(existing);
      if (rewritten !== existing) await writeFile(target, rewritten);
    }
    return { skipped: true };
  }

  const response = await fetchWithTimeout(url);
  const contentType = response.headers.get("content-type") || "";
  const bytes = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(target), { recursive: true });

  if (contentType.includes("text/css") || /\.css$/i.test(url.pathname)) {
    const css = bytes.toString("utf8");
    discoverAssets(css, url);
    await writeFile(target, rewriteDocument(css));
  } else {
    await writeFile(target, bytes);
  }
  return { skipped: false };
}

async function mapLimit(items, limit, worker) {
  let cursor = 0;
  const results = [];
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      try {
        results[index] = await worker(items[index]);
      } catch (error) {
        results[index] = { error: error.message, item: String(items[index]) };
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
  return results;
}

console.log(`Mirroring ${routes.length} public routes...`);
const pages = await mapLimit(routes, 6, mirrorPage);
const pageFailures = pages.filter((item) => item?.error);

let assetCursor = 0;
const assetResults = [];
async function assetWorker() {
  while (assetCursor < assetQueue.length) {
    const index = assetCursor++;
    const url = assetQueue[index];
    try {
      assetResults[index] = await mirrorAsset(url);
    } catch (error) {
      assetResults[index] = { error: error.message, item: url.href };
    }
  }
}
await Promise.all(Array.from({ length: 12 }, assetWorker));

const assetFailures = assetResults.filter((item) => item?.error);
await writeFile(
  path.join(mirrorDir, "manifest.json"),
  `${JSON.stringify({ mirroredAt: new Date().toISOString(), routes, pageFailures, assetFailures }, null, 2)}\n`,
);

console.log(`Mirrored ${routes.length - pageFailures.length}/${routes.length} pages and ${assetQueue.length - assetFailures.length}/${assetQueue.length} dependencies.`);
if (pageFailures.length || assetFailures.length) {
  console.log(JSON.stringify({ pageFailures, assetFailures: assetFailures.slice(0, 20) }, null, 2));
}

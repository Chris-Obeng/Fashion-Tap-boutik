#!/usr/bin/env node
/**
 * Pulls the curated placeholder products listed in data/curation.json and writes
 * trimmed snapshots the storefront reads at build time:
 *   - SceneSKU packs  -> data/scenesku.json   (needs SCENESKU_API_KEY)
 *   - DummyJSON items -> data/dummyjson.json  (public, no key)
 * The site never calls these APIs at runtime, so no key reaches the browser.
 *
 *   pnpm sync:products
 *
 * Temporary: replaced by Supabase once the backend lands.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const key = process.env.SCENESKU_API_KEY;
if (!key) {
  console.error("Set SCENESKU_API_KEY (see .env.example).");
  process.exit(1);
}

const curation = JSON.parse(await readFile(path.join(root, "data/curation.json"), "utf8"));

async function getJson(url, headers = {}) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { headers });
      if (res.status === 404) throw new Error(`Not found: ${url}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return await res.json();
    } catch (error) {
      if (attempt === 4 || String(error.message).startsWith("Not found")) throw error;
      await new Promise(r => setTimeout(r, 600 * attempt));
    }
  }
}

const scenesku = {};
const dummyjson = {};
for (const item of curation.products) {
  // Pexels photo sets are plain image ids in curation.json; nothing to fetch.
  if (item.source === "pexels") continue;
  if (item.source === "dummyjson") {
    const data = await getJson(`https://dummyjson.com/products/${encodeURIComponent(item.id)}?select=title,images`);
    dummyjson[item.id] = { title: data.title, images: data.images };
    console.log(`✓ ${item.slug} (dummyjson, ${data.images.length} images)`);
    continue;
  }
  const pack = (await getJson(`https://scenesku.com/api/v1/products/${encodeURIComponent(item.id)}`, { Authorization: `Bearer ${key}` })).data;
  const data = pack.product_data ?? {};
  scenesku[item.id] = {
    title: data.product_title ?? null,
    short: data.short_description ?? null,
    long: data.long_description ?? null,
    bullets: data.bullet_points ?? [],
    images: [...pack.images]
      .sort((a, b) => a.index - b.index)
      .map(img => ({ url: img.image_url, title: img.title ?? "" })),
  };
  console.log(`✓ ${item.slug} (scenesku, ${scenesku[item.id].images.length} images)`);
}

await writeFile(path.join(root, "data/scenesku.json"), JSON.stringify(scenesku, null, 2) + "\n");
await writeFile(path.join(root, "data/dummyjson.json"), JSON.stringify(dummyjson, null, 2) + "\n");
console.log(`Wrote ${Object.keys(scenesku).length} SceneSKU packs and ${Object.keys(dummyjson).length} DummyJSON items.`);

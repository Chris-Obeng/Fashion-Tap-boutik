#!/usr/bin/env node
/**
 * Pulls the curated SceneSKU packs listed in data/curation.json and writes a
 * trimmed snapshot to data/scenesku.json. The storefront reads only the
 * snapshot, so the API key never reaches the browser or the repo.
 *
 *   SCENESKU_API_KEY=... pnpm sync:products
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

async function fetchPack(id) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(`https://scenesku.com/api/v1/products/${encodeURIComponent(id)}`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.status === 404) throw new Error(`Pack ${id} not found or unpublished`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()).data;
    } catch (error) {
      if (attempt === 4 || String(error.message).includes("not found")) throw error;
      await new Promise(r => setTimeout(r, 600 * attempt));
    }
  }
}

const packs = {};
for (const { id, slug } of curation.products) {
  const pack = await fetchPack(id);
  const data = pack.product_data ?? {};
  packs[id] = {
    title: data.product_title ?? null,
    short: data.short_description ?? null,
    long: data.long_description ?? null,
    bullets: data.bullet_points ?? [],
    images: [...pack.images]
      .sort((a, b) => a.index - b.index)
      .map(img => ({ url: img.image_url, title: img.title ?? "" })),
  };
  console.log(`✓ ${slug} (${packs[id].images.length} images)`);
}

await writeFile(path.join(root, "data/scenesku.json"), JSON.stringify(packs, null, 2) + "\n");
console.log(`Wrote ${Object.keys(packs).length} packs to data/scenesku.json`);

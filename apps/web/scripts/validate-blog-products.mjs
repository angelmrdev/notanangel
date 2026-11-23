import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = process.cwd();
const catalog = JSON.parse(readFileSync(resolve(root, 'config/blog-products.json'), 'utf8'));
const ids = Object.keys(catalog.products);
const checked = new Set();
const urlPattern = /^https:\/\/(?:link\.amazon|www\.amazon\.es|amazon\.es)\//;
const localImagePattern = /^\/images\/products\/[a-z0-9-]+\/[a-zA-Z0-9_-]+\.webp$/;

function assertLocalImage(image, id) {
  if (image === null) return;
  if (typeof image !== 'string' || !localImagePattern.test(image)) {
    throw new Error(`Invalid product image path for ${id}: ${String(image)}`);
  }
  if (!existsSync(join(root, 'public', image.slice(1)))) {
    throw new Error(`Missing product image file for ${id}: ${image}`);
  }
}
function assertOptionalString(value, id, key) {
  if (value !== null && (typeof value !== 'string' || !value.trim())) {
    throw new Error(`Invalid ${key} for ${id}`);
  }
}

for (const [id, p] of Object.entries(catalog.products)) {
  if (id !== p.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error(`Invalid product id: ${id}`);
  if (typeof p.brand !== 'string' || !p.brand.trim() || typeof p.name !== 'string' || !p.name.trim()) throw new Error(`Missing product name/brand: ${id}`);
  const hasMin = p.priceMinEUR !== null && p.priceMinEUR !== undefined;
  const hasMax = p.priceMaxEUR !== null && p.priceMaxEUR !== undefined;
  if (hasMin !== hasMax || (hasMin && !(Number.isFinite(p.priceMinEUR) && Number.isFinite(p.priceMaxEUR) && p.priceMinEUR > 0 && p.priceMaxEUR >= p.priceMinEUR))) {
    throw new Error(`Invalid price range: ${id}`);
  }
  if (p.affiliateUrlES !== null && p.affiliateUrlES !== undefined && (typeof p.affiliateUrlES !== 'string' || !urlPattern.test(p.affiliateUrlES))) {
    throw new Error(`Invalid affiliate URL format: ${id}`);
  }
  for (const key of ['software', 'manufacturerUrl', 'asinES']) assertOptionalString(p[key], id, key);
  assertLocalImage(p.imagePath, id);
  if (!Array.isArray(p.galleryImages)) throw new Error(`galleryImages must be an array for ${id}`);
  for (const galleryImage of p.galleryImages) assertLocalImage(galleryImage, id);
  for (const locale of ['es', 'en']) {
    if (!p.editorial?.[locale]) throw new Error(`Missing editorial.${locale} for ${id}`);
    for (const key of ['bestFor', 'quickSpecs']) assertOptionalString(p.editorial[locale][key], id, `editorial.${locale}.${key}`);
  }
}

for (const locale of ['es', 'en']) {
  const dir = resolve(root, 'content/blog', locale);
  let names = [];
  try { names = readdirSync(dir).filter(name => name.endsWith('.mdx')); } catch { continue; }
  for (const name of names) {
    const source = readFileSync(resolve(dir, name), 'utf8');
    for (const match of source.matchAll(/<ProductCard\b([^>]*?)\/>/gs)) {
      const attr = match[1].match(/\bproductId="([^"]+)"/);
      if (!attr) throw new Error(`ProductCard missing a literal productId in ${name}`);
      if (!catalog.products[attr[1]]) throw new Error(`Unknown product ${attr[1]} in ${name}`);
      checked.add(attr[1]);
    }
    for (const match of source.matchAll(/<ProductComparison\b([^>]*?)\/>/gs)) {
      const attr = match[1].match(/\bproductIds="([^"]+)"/);
      if (!attr) throw new Error(`ProductComparison must use productIds="id-1,id-2" in ${name}`);
      const selected = attr[1].split(',').map(x => x.trim());
      if (!selected.length || selected.some(x => !x)) throw new Error(`ProductComparison has empty product ID in ${name}`);
      for (const id of selected) {
        if (!catalog.products[id]) throw new Error(`Unknown product ${id} in ${name}`);
        checked.add(id);
      }
    }
  }
}
// Referenced products may be editorial candidates without approved prices or affiliate links.
// The catalog-wide checks above still reject incomplete or invalid *non-null* price ranges.
// ProductCard and ProductComparison render absent commercial fields without fake offers.
const unpricedReferenced = [...checked].filter(id =>
  catalog.products[id].priceMinEUR === null && catalog.products[id].priceMaxEUR === null
);
console.log(`Product catalog validated: ${ids.length} entries; ${checked.size} referenced IDs; ${ids.filter(id => catalog.products[id].imagePath !== null).length} main images set; ${unpricedReferenced.length} referenced products awaiting price research.`);

import { fileURLToPath } from 'node:url';
import { loadMusicCatalog, publishedMusic } from '../lib/music/catalog.mjs';
const entries = loadMusicCatalog(fileURLToPath(new URL('../content/music/', import.meta.url)));
console.log(`Music validated: ${entries.length} releases, ${publishedMusic(entries).length} public.`);

import {buildManifest} from './manifest.mjs';
import {loadMusicCatalog} from '../../apps/web/lib/music/catalog.mjs';
import {fileURLToPath} from 'node:url';
import {writeFileSync} from 'node:fs';
const root=fileURLToPath(new URL('../../apps/web/content/music/',import.meta.url));
const entries=buildManifest(loadMusicCatalog(root));
writeFileSync(new URL('./manifest.json',import.meta.url),JSON.stringify(entries,null,2)+'\n');
console.log(`Download manifest: ${entries.length} files`);

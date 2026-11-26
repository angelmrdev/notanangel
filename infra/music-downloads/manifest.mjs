import {objectKey} from '../../apps/web/lib/music/downloads.mjs';
import {publishedMusic} from '../../apps/web/lib/music/catalog.mjs';
import {downloadFilename} from '../../apps/web/lib/music/filenames.mjs';
export function buildManifest(releases, now = new Date()) {
  return publishedMusic(releases,now).flatMap(r=>r.downloads.filter(d=>d.enabled && d.rights==='authorized').map(d=>({releaseId:r.id,id:d.id,format:d.format,bytes:d.bytes,key:objectKey(r.category,r.slug,d.id,d.format),filename:downloadFilename(r,d)})));
}

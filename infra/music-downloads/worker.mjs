import {contentDisposition} from '../../apps/web/lib/music/filenames.mjs';
import manifest from './manifest.json' with { type: 'json' };
export function handler(entries) {
  return async (request, env) => {
    const headers = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
    const fail = status => new Response(null,{status,headers});
    if (!['GET','HEAD'].includes(request.method)) return new Response(null,{status:405,headers:{...headers,Allow:'GET, HEAD'}});
    const match = new URL(request.url).pathname.match(/^\/download\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/);
    if (!match) return fail(404);
    const entry = entries.find(e=>e.releaseId===match[1] && e.id===match[2]);
    if (!entry) return fail(404);
    let disposition;
    try { disposition=contentDisposition(entry.filename,entry.format); } catch { return fail(404); }
    const object = request.method==='HEAD' ? await env.MUSIC.head(entry.key) : await env.MUSIC.get(entry.key);
    if (!object || object.size!==entry.bytes) return fail(404);
    return new Response(request.method==='HEAD'?null:object.body,{headers:{...headers,'Content-Type':entry.format==='mp3'?'audio/mpeg':'audio/wav','Content-Length':String(object.size),'Content-Disposition':disposition}});
  };
}
export default {fetch:handler(manifest)};

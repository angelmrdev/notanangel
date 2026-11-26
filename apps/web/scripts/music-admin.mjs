import { checkR2 } from './music-admin/r2.mjs';
import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadMusicCatalog } from '../lib/music/catalog.mjs';
import { emptyRelease, saveRelease } from './music-admin/store.mjs';
const root=fileURLToPath(new URL('../content/music/',import.meta.url));
const host='127.0.0.1',port=4178,origin=`http://${host}:${port}`,token=randomBytes(24).toString('hex');
const html=readFileSync(new URL('./music-admin/index.html',import.meta.url),'utf8');
const server=createServer(async(req,res)=>{
 const send=(status,data,type='application/json')=>{res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'"});res.end(type==='application/json'?JSON.stringify(data):data);};
 try{
 if(req.headers.host!==`${host}:${port}`)return send(403,{error:'Invalid host'});
 const url=new URL(req.url,origin);
 if(req.method==='GET'&&url.pathname==='/')return send(200,html.replace('__TOKEN__',token),'text/html; charset=utf-8');
 if(req.headers['x-admin-token']!==token)return send(403,{error:'Invalid token'});
 if(req.method==='GET'&&url.pathname==='/catalog')return send(200,loadMusicCatalog(root));
 if(req.method==='GET'&&url.pathname==='/new')return send(200,emptyRelease(url.searchParams.get('category')));
 if(req.method==='POST'&&['/validate','/save','/check-r2'].includes(url.pathname)){
 if(req.headers.origin!==origin)return send(403,{error:'Invalid origin'});
 let body='';for await(const chunk of req){body+=chunk;if(body.length>2_000_000)return send(413,{error:'Request too large'});}
 if(url.pathname==='/check-r2')return send(200,await checkR2(JSON.parse(body)));
 return send(200,saveRelease(root,JSON.parse(body),{dryRun:url.pathname==='/validate'}));}
 return send(404,{error:'Not found'});
 }catch(e){return send(400,{error:e.message});}
});server.listen(port,host,()=>console.log(`Music Admin: ${origin} (local only; Ctrl+C to stop)`));

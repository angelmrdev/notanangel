// Shared naming contract. R2 keys and release IDs are deliberately independent.
const forbidden = /[<>:"/\\|?*\u0000-\u001f\u007f-\u009f\u061c\u200e\u200f\u2028-\u202e\u2066-\u2069]/u;
const reserved = /^(?:CON|PRN|AUX|NUL|COM[1-9¹²³]|LPT[1-9¹²³])(?:\s*\.|$)/i;
export function validDownloadStem(value) {
  if (typeof value !== 'string' || !value || value !== value.trim() || value.startsWith('.') || value.endsWith('.') || forbidden.test(value) || reserved.test(value) || /\.(?:mp3|wav)$/i.test(value)) return false;
  try { encodeURIComponent(value); } catch { return false; }
  return new TextEncoder().encode(value).length <= 200;
}
export function downloadFilename(release, download) {
  const stem = release.downloadFilename ?? `${release.slug}-${download.id}`;
  if (!validDownloadStem(stem) || !['mp3','wav'].includes(download.format)) throw new Error('Invalid download filename');
  return `${stem}.${download.format}`;
}
export function contentDisposition(filename, format) {
  if (!['mp3','wav'].includes(format) || typeof filename !== 'string' || !filename.endsWith(`.${format}`) || !validDownloadStem(filename.slice(0,-4))) throw new Error('Invalid download filename');
  const stem = filename.slice(0,-4);
  let ascii = stem.normalize('NFKD').replace(/\p{M}/gu,'').replace(/×/g,'x').replace(/[^a-zA-Z0-9 ._()'-]/g,'-').trim().replace(/^[. ]+|[. ]+$/g,'');
  if (!validDownloadStem(ascii) || !/[a-zA-Z0-9]/.test(ascii)) ascii = 'download';
  const encoded = encodeURIComponent(filename).replace(/['()*]/g,c=>`%${c.charCodeAt(0).toString(16).toUpperCase()}`);
  return `attachment; filename="${ascii}.${format}"; filename*=UTF-8''${encoded}`;
}

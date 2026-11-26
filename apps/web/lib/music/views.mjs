import { categories, publishedMusic } from './catalog.mjs';
export function musicView(entries, category, now = new Date()) {
  const all = publishedMusic(entries, now);
  const groups = categories.map(category => ({category, entries: all.filter(r => r.category === category)})).filter(g => g.entries.length);
  const selected = category ? all.filter(r => r.category === category) : all;
  const featured = category ? undefined : selected.find(r => r.featured) ?? selected[0];
  return {groups, selected, featured};
}
export function hasDownload(entry) { return entry.downloads.some(d => d.enabled && d.rights === 'authorized'); }

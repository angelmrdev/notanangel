export function adPolicy(pathname, hasDownload, {enabled, advertisingAllowed, inpage, vignette, onclick}) {
  const path = pathname.replace(/\/+$/, '');
  const music = /^\/(?:music|es\/musica)(?:\/(?:dj-edits|dj-mixes|dj-sets)(?:\/[^/]+)?)?$/.test(path);
  const detail = /^\/(?:music|es\/musica)\/(?:dj-edits|dj-mixes|dj-sets)\/[^/]+$/.test(path);
  const editorial = /^\/(?:es\/)?blog(?:\/|$)/.test(path) || /^\/learn-to-dj(?:\/|$)/.test(path) || /^\/es\/curso-dj(?:\/|$)/.test(path);
  const eligible = enabled && advertisingAllowed && (music || editorial);
  const pop = eligible && detail && hasDownload && onclick;
  return { inpage: eligible && inpage, vignette: eligible && vignette && !pop, onclick: pop };
}

export function isMetadataRoute(path) { return /^\/(?:tools\/audio-metadata-editor|es\/herramientas\/editor-metadatos-audio)\/?$/.test(path); }
export function crossesMetadataBoundary(from,to) { return isMetadataRoute(from)!==isMetadataRoute(to); }

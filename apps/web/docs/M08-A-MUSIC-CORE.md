# Music Core (M08-A)

Content root: `apps/web/content/music/<category>/<slug>/`. Categories: dj-edits, dj-mixes, dj-sets. Each entry contains release.json, en.mdx and es.mdx; sets also contain tracklist.json (array of tracks). See catalog.d.mts for the contract. MDX bodies contain editorial prose, not duplicated metadata. Dates use UTC YYYY-MM-DD. No public routes yet.

Example draft release.json (fictional, not a catalog entry):

```json
{"id":"example","slug":"example","category":"dj-edits","status":"draft","locales":{"en":{"title":"Example","description":"Example","metaTitle":"Example","metaDescription":"Example","coverAlt":"Example"},"es":{"title":"Ejemplo","description":"Ejemplo","metaTitle":"Ejemplo","metaDescription":"Ejemplo","coverAlt":"Ejemplo"}},"artists":["Example"],"genres":[],"originalTracks":[{"title":"Example","artist":"Example"}],"downloads":[{"id":"mp3","format":"mp3","label":"MP3 320 kbps","rights":"pending","enabled":false}]}
```

Published edits/mixes require at least one authorized enabled download, with size in bytes; sets may omit downloads. Rights status is editorial metadata, not proof of licensing. The download ID is scoped to the release; the future Worker must independently enforce authorization and availability using its private mapping. Do not store credentials or signed URLs in content. Published entries require artwork paths, YouTube ID, publication date and nonempty editorial bodies; published sets require a nonempty tracklist. Asset existence, actual video availability, MDX compilation, and Worker integration are deferred. Future-dated entries are excluded from public queries. Track timestamps are optional and strictly increasing when provided.

Run from repository root: `pnpm --dir apps/web exec node scripts/test-music.mjs` and `pnpm --dir apps/web exec node scripts/validate-music.mjs`. No existing scripts or routes changed in this increment.

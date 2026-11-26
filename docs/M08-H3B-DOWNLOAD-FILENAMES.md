# M08-H3B — Custom download filenames

Each release may define `downloadFilename`, a shared filename stem (without `.mp3` or `.wav`). Music Admin displays the names for the configured formats. If unset, the original `<slug>-<downloadId>.<format>` convention remains. The name is language-independent. Changes do not modify audio bytes, metadata tags, R2 object keys, download URLs, permissions or sizes.

Names are limited to 200 UTF-8 bytes, disallow Windows-reserved names, separators, unsafe punctuation, control characters and audio extensions. The Worker emits both an ASCII `filename` and an RFC 8187 UTF-8 `filename*` in Content-Disposition for GET and HEAD. Browsers may still disambiguate duplicates or adjust local filenames.

## Installation / validation (from monorepo root)

```powershell
pnpm --dir apps/web exec node scripts/set-initial-download-filenames.mjs
pnpm --dir apps/web exec node scripts/set-initial-download-filenames.mjs --apply
pnpm --dir apps/web exec node --test scripts/test-music-filenames.mjs
pnpm --dir apps/web exec node scripts/validate-music.mjs
node infra/music-downloads/generate-manifest.mjs
node infra/music-downloads/test.mjs
pnpm lint
pnpm typecheck
pnpm build --force
```

The initial-name script previews by default and only sets missing names on the six known releases. Close Music Admin while applying the migration; it preserves existing fields and custom names, and writes each JSON file through a temporary file. It does not create or publish releases. Restart Music Admin (`pnpm --dir apps/web exec node scripts/music-admin.mjs`) and open http://127.0.0.1:4178 to edit a name, preview, validate and save. Clearing the optional field restores the original naming convention.

## Worker deployment (later, after R2 verification and authorization)

Regenerate the manifest from the final saved catalogue. Only published, date-eligible, authorized, enabled entries are included. Confirm actual file size and rights before enabling each download. The draft-only catalogue yields zero entries. Do not deploy an empty manifest over a live download catalogue unintentionally.

```powershell
node infra/music-downloads/generate-manifest.mjs
node infra/music-downloads/test.mjs
pnpm dlx wrangler@4.168.0 deploy --config infra/music-downloads/wrangler.toml --dry-run
# When ready and reviewed:
pnpm dlx wrangler@4.168.0 deploy --config infra/music-downloads/wrangler.toml
```

Verify the header against a real authorized download using `curl.exe -I` and the browser. The test suite uses synthetic R2 objects, not the production bucket. No new dependencies.

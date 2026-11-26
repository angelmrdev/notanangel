# M08-H3C — R2 connection and verification

Apply H3B and its filename migration first. Close Music Admin and avoid editing Music while the batch runs. Use the existing authenticated Wrangler session and the repository root. No dependencies, secrets or changes to the bucket configuration are required.

```powershell
pnpm --dir apps/web exec node --test scripts/test-music-r2-batch.mjs
pnpm --dir apps/web exec node scripts/test-music-downloads.mjs
pnpm --dir apps/web run music:r2:verify --apply
pnpm --dir apps/web exec node scripts/validate-music.mjs
node infra/music-downloads/generate-manifest.mjs
node infra/music-downloads/test.mjs
```

Omit `--apply` for a read-only preview. The apply command verifies first, then saves only `downloads[].bytes` in existing draft releases if all checks succeed. It processes files sequentially; each object is downloaded temporarily using the existing pinned Wrangler CLI (`4.168.0`, remote bucket `notanangel`) and deleted after checking. Re-running a preview and apply downloads the files twice. There is no upload, deletion or public delivery of R2 objects. The command prints key, byte size, resolved filename, intended URL and rights/enabled flags. A printed URL is NOT yet a working public download. Published releases are deliberately skipped. Existing enabled downloads with a changed size are rejected for manual review. The command exits nonzero if any check fails or no planned draft downloads exist. Successful checks do not change files if another check fails. Catalog changes are staged before individual atomic renames; the multi-file commit is not transactional in the event of a filesystem failure. Review `git diff -- apps/web/content/music` afterward; rerun if needed. Stop Music Admin before applying.

MP3 checks look for a plausible MPEG Layer III header, after an ID3 tag if present; WAV checks recognize WAVE container signatures. This is not a full decoder, duration/bitrate verification, checksum comparison with a master, or verification of artwork. Unusual valid files may need individual inspection. Temporary storage must be sufficient for the largest file and Wrangler must have remote read access. No live R2 verification was performed when creating this patch.

The expected initial catalog has six draft releases and twelve planned downloads. A successful run should report `12/12 verified` and up to six updated releases. The manifest should remain empty while all releases are drafts. Rights and enabled flags are never changed automatically. Review permissions separately. Current catalog validation requires at least one authorized enabled download for each published edit/mix; a video-only release would require a deliberate model change. Never mark material authorized solely because it exists in R2. Do not deploy the Worker until the publication step. Future public checks must verify HEAD/GET, exact sizes, Unicode Content-Disposition, expected 404 for unauthorized downloads and bucket privacy.

## H3C1 — pnpm launch compatibility

Prefer `pnpm --dir apps/web run music:r2:verify --apply` and `pnpm --dir apps/web run music:admin`. The launcher also supports direct exec where pnpm can be resolved without a shell, including normal npm/corepack installations and standalone pnpm.exe on Windows. For unusual installations, set `NAA_PNPM_EXEC_PATH` to the actual pnpm JavaScript entry point or executable, not a .cmd/.ps1 shim. No catalog or R2 changes are made by this fix.

# M08-I — Public release & deploy

This increment adds a local, explicit publication command for the six initial releases. It does not replace any release JSON, upload any audio, grant rights or deploy a Worker. It preserves recorded R2 sizes, filenames, permissions, existing publication dates and editorial fields. New publication dates use the UTC calendar date of the command. Close Music Admin and dev server before applying. Review and retain a local Git snapshot before release.

## Preflight and publication (PowerShell, repo root)

```powershell
pnpm --dir apps/web exec node --test scripts/test-music-initial-launch.mjs
pnpm --dir apps/web exec node scripts/audit-music-prelaunch.mjs
pnpm --dir apps/web exec node scripts/publish-initial-music.mjs
```

Review the six entries and their permissions. If no documented authorization exists, keep `rights=pending` or `blocked` and `enabled=false`. A public video-only release is supported. An already enabled authorized download becomes public when its release is published and the Worker manifest is deployed; review any such entry first.

```powershell
pnpm --dir apps/web exec node scripts/publish-initial-music.mjs --apply
pnpm --dir apps/web exec node scripts/prepare-music-routes.mjs --apply
pnpm --dir apps/web exec node scripts/prepare-music-routes.mjs --check
pnpm --dir apps/web exec node scripts/validate-music.mjs
node infra/music-downloads/generate-manifest.mjs
node infra/music-downloads/test.mjs
pnpm lint
pnpm typecheck
pnpm build --force
pnpm --dir apps/web exec node scripts/verify-music-release-export.mjs
pnpm --dir apps/web exec node scripts/verify-tools-release-export.mjs
```

Stop on any nonzero exit. Expected for initial six video-only releases: six published entries, 10 route source files (18 exported URLs), zero manifest downloads, no public DJ Sets category. Verify 10 sitemaps (including Music EN/ES). The command is idempotent and does not change already-published dates. It checks recorded sizes, not live R2; H3C already verified them. Staging/rollback is best effort on filesystem failure; use Git to recover. Inspect `git status --short` and `git diff` before deployment.

## Deployment

```powershell
pnpm dlx wrangler@4.168.0 deploy --config infra/music-downloads/wrangler.toml --dry-run
pnpm dlx wrangler@4.168.0 deploy --config infra/music-downloads/wrangler.toml
```

Review manifest and verify Worker deployment before pushing. An empty manifest returns 404 for all download URLs (expected). Do not make R2 public. The Worker will be ready for future authorized files. If deploying a nonempty manifest, check HEAD status, content length, MIME and Content-Disposition against the exact approved file before deploying web links.

Commit the reviewed release JSON, generated routes, manifest, sitemaps, and intended previous increments/scripts (no credentials, local audio or temporary files). Push the configured Hostinger deployment branch. Verify the actual deployed revision in Hostinger. Only after a successful deployment check both Music landings, both category lists and all release detail pages, thumbnails, YouTube playback, mobile nav, alternate language URLs, robots and sitemap index. The metadata editor must still exclude advertising/analytics scripts during local file processing. Verify denied downloads return 404 and no unauthorized links exist. Submit the sitemap index in GSC and optionally the two Music sitemaps; request indexing of the two landings.

For future authorized downloads: record evidence of distribution authorization separately, check real R2 object/size, explicitly enable via local Music Admin, regenerate manifest, rebuild, deploy Worker and website, then verify HTTP downloads. Never infer rights from the presence of an audio file or a YouTube upload.

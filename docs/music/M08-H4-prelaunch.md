# M08-H4 — Music pre-launch

- R2 verification records bytes, not distribution authorization. Never set rights to authorized solely because an object exists. Video-only publication is permitted; pending or blocked downloads remain disabled.
- Run `pnpm --dir apps/web exec node scripts/audit-music-prelaunch.mjs` on the actual local catalog. It checks all six initial entries without writing.
- Publication is a separate step: set status and date explicitly in Music Admin only after verifying the videos and rights; then run `pnpm --dir apps/web exec node scripts/prepare-music-routes.mjs --apply`. It copies templates only for populated public categories. It refuses stale or edited generated routes; reconcile manually when removing a category or changing templates.
- Generate manifest at repo root, test Worker, build, then `pnpm --dir apps/web exec node scripts/verify-music-release-export.mjs`. Deploy only after review. No actual download is authorized by this patch.
- Local route and sitemap checks do not prove YouTube playback, ad behavior or actual HTTP download integrity. Production checks remain M08-J.

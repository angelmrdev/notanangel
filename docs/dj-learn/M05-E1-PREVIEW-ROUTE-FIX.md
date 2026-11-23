# M05-E1 preview route fix

The initial preview route `app/__learn-preview/...` produced 404 because Next.js treats folders prefixed with `_` as private. The application also has **two independent root layouts** (`(en)` and `(es)`) and uses `output: "export"`.

## Patch

Add `apps/web/app/(en)/learn-preview/en/[id]/page.tsx`. `generateStaticParams` enumerates only the two EN pilot IDs. Production renders `notFound()` before accessing draft data. This route is for local development. No publication manifest or sitemap changes.

## Important cleanup

Delete the obsolete `apps/web/app/__learn-preview/` folder after extracting the patch. ZIPs cannot delete existing files; leaving it does not create a public route but may confuse maintenance and can break lint if you did not apply the previous lint fix.

## Install and verify

1. Extract into the monorepo root. M05-E1 plus M05-E2 must already be present so both MDX pilot files exist.
2. Run `pnpm --filter @naa/web lint` and `pnpm --filter @naa/web typecheck`.
3. Stop `next dev`, delete `apps/web/.next` if old routes still appear cached, restart `pnpm --filter @naa/web dev`.
4. Open http://localhost:3000/learn-preview/en/dj-01-006/ and http://localhost:3000/learn-preview/en/dj-02-003/.
5. Run `pnpm --filter @naa/web build` to verify static export. Check generated output contains no draft lesson text; the production guard responds with `notFound()`. The build and browser checks must be performed in your local environment.

**Warning:** The route is not access-controlled; in development it is locally browsable. Do not deploy a dev server to the internet. The production build must be checked before release.

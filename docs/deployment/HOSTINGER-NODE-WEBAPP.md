# M06-C.1 — Hostinger Web App (Node.js + GitHub)

## Architecture

Next.js remains configured with `output: "export"`, `trailingSlash: true`, and unoptimized images. The production artifact is `apps/web/out/`. A small zero-dependency Node HTTP server serves that directory. **Do not use `next start`** or enable SSR for this deployment.

## Hostinger settings to verify in hPanel

The exact fields depend on the current Hostinger Web App interface. Use the GitHub-connected repository, branch selected for deployment, and the **monorepo root** as the working directory where possible.

- Node.js version: supported modern LTS compatible with Next.js 16 (Node 20.9+; prefer Node 22 LTS).
- Package manager: pnpm 10.34.9 (Corepack where available).
- Install command: `corepack enable && pnpm install --frozen-lockfile` (if Corepack is unavailable, configure pnpm 10.34.9 via Hostinger's supported method).
- Build command: `pnpm build` from the repository root.
- Start command: `node apps/web/scripts/serve-static.mjs` from the repository root.
- The app must receive the platform-provided `PORT` environment variable; do not hardcode a port.
- Build output: `apps/web/out/`; do not configure it as `.next`.

**Important:** Some managed Web App flows enforce their own build/start conventions or cannot run monorepo commands. If Hostinger rejects any of the above, inspect the actual hPanel settings and deployment log before modifying architecture. Do not assume these commands are accepted unchanged.

## Local smoke test

From repo root:

```powershell
pnpm install
pnpm --dir apps/web learn:test-release
pnpm build
pnpm typecheck
pnpm lint
node apps/web/scripts/serve-static.mjs
```

In another terminal:

```powershell
curl.exe -I http://localhost:3000/
curl.exe -I http://localhost:3000/es/
curl.exe -I http://localhost:3000/learn-to-dj/
curl.exe -I http://localhost:3000/sitemap.xml
curl.exe -I http://localhost:3000/this-page-does-not-exist/
```

Expect 200 for existing pages and 404 for missing pages. Check a deep route by refreshing it in a browser. The server does not use an SPA fallback and never rewrites missing URLs to the home page.

## Staging and production checklist

1. Keep GitHub repository and Hostinger credentials private; never commit `.env` or tokens.
2. Deploy first to a separate staging hostname, ideally with password/access protection. `robots.txt` alone is not adequate access control.
3. Verify root, `/es/`, Blog, Learn, asset URLs, sitemap index and its six child files, and true 404 responses.
4. Verify HTTPS and canonical host redirection using Hostinger domain controls. Avoid duplicate indexable hosts.
5. Before public launch, review legal/privacy pages, cookies, consent/analytics, social previews, metadata, `hreflang`, and publication statuses.
6. Verify that `__empty__` placeholders are not in sitemaps, navigation, or indexable pages. Prefer removing temporary placeholders once real content exists.
7. Confirm actual MDX rendering and mobile layouts with real editorial content before declaring launch ready.
8. Once staging passes, configure production domain and a documented rollback path (previous successful deployment/commit).

## Deployment updates

Every approved article/module release: commit MDX + assets -> validate -> build -> GitHub push -> Hostinger redeploy -> check sitemap, route, assets and HTTPS. `draft` modules should remain excluded by the publication gate.

## Scope

This patch only adds the static server and operational instructions. It does not change existing Next.js routes, content, sitemaps, or package dependencies. It does not configure Hostinger automatically.

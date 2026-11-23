# M03-C — Legal drafts and static sitemap architecture

## Publishing contract

- `apps/web/config/sitemap-routes.json` is the **published route registry**. Only verified, live, canonical, indexable routes belong in it.
- `pnpm build` first generates static `public/sitemap.xml`, `public/robots.txt`, and per-locale/per-type XML under `public/sitemaps/`.
- Sitemaps are XML **files**, e.g. `/sitemaps/en/general.xml`, not directory endpoints. An index at `/sitemap.xml` lists the files. Empty types are not included in the index.
- The script currently lists only verified Home, About and Contact routes. Blog and Learn to DJ are empty until the route/content engines are ready.
- Later M04/M05 must connect the published MDX manifest to the sitemap generator; **do not rely on manual route registration per article**.
- For locale alternates, the generator currently pairs known general pages only. Extend mapping for article/lesson translations when implementing their registries.
- `robots.txt` permits crawling; robots alone cannot guarantee indexing. Noindex is applied to legal drafts until verified.
- Legal routes are accessible locally but **must not be deployed as definitive legal notices**. Supply verified controller/operator identity, contact details, applicable business identification, provider list, retention/legal bases, and actual cookie/storage audit before removing noindex and adding to sitemaps.
- Before production launch audit privacy, consent, analytics, affiliate links, advertising, and localized legal wording. Don't claim the legal pages are compliant yet.
- `output: export` and `trailingSlash: true` are retained; these files are emitted in `apps/web/out/` during the build.

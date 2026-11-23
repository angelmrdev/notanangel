# M01-C — Public URL locale policy

- English is the default at `/` (no `/en/` URL).
- Spanish is published at `/es/`.
- URLs determine the rendered language; no browser-language or location-based redirects.
- The language switcher stores `naa.preferredLocale` in localStorage for later UX use; it does not override URLs or trigger redirects.
- Canonical and hreflang URLs are set on each homepage.
- Future editorial routes use `/learn-to-dj/` vs `/es/curso-dj/` and `/journal/` vs `/es/blog/`.
- Legacy `/en/` should be redirected to `/` with a 301 at the Hostinger web-server/CDN layer, not in Next.js static export. Configure this before promoting links from `/en/`.
- Separate root layouts set the correct HTML language for each locale.

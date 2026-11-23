# M07-C.2 — GTM / GA4, gated rollout (EN/ES)

## State
- Google Tag Manager: `GTM-NRHRDHQF`
- GA4 measurement ID: `G-7PRY7JRRMP`
- Monetag: intentionally **not activated**.
- No finalized legal texts included. Keep `NEXT_PUBLIC_NAA_GTM_ENABLED` unset or `false` until the legal notices and GTM container have been reviewed.

## GTM setup (Google Tag Manager web UI)
1. Use the existing container `GTM-NRHRDHQF`.
2. Create **one** Google tag targeting `G-7PRY7JRRMP` (do not install gtag.js separately in Next.js).
3. Trigger on page views. Add consent requirement `analytics_storage` granted. Do not configure advertising tags in this container yet.
4. Test with GTM Preview / Tag Assistant and GA4 DebugView before publishing the GTM container.
5. Publish the container only after legal review and acceptance tests.

## Deploy / opt in
- Set `NEXT_PUBLIC_NAA_GTM_ENABLED=true` in the **build environment** and rebuild/redeploy. `NEXT_PUBLIC_*` is compiled into Next.js client output at build time; setting it only at Node start does not enable it.
- Keep it `false` until policies are final and the tag is verified.

## Consent behavior
- GTM script is **not loaded at all** before the user consents to analytics. This is a basic consent-gated implementation (not Google advanced Consent Mode).
- When analytics is granted, the code sets `analytics_storage=granted` and all advertising signals to `denied`, then loads GTM.
- When analytics consent is revoked, the page reloads to stop subsequent tracking from the previously loaded script. Already-sent events cannot be withdrawn.
- The advertising checkbox is persisted for future Monetag integration but **does not activate any advertising scripts or Google advertising consent**.
- Consent preferences are stored in localStorage under `naa-consent-v1`.

## QA in production
1. Clear site data, reload; confirm no requests to `googletagmanager.com/gtm.js` or GA4 collection before consent.
2. Reject optional: confirm no requests and no GA4 Realtime event.
3. Accept analytics only: confirm GTM loads once and GA4 DebugView / Realtime receives one page view.
4. Navigate between EN/ES and posts: verify page_view behavior (avoid duplicates; configure SPA history trigger in GTM if necessary).
5. Revoke analytics: confirm reload, no further requests to GA4.
6. Test mobile, blocked scripts, and browser privacy settings.

## Legal publication blockers
- Full legal identity and fiscal details (where required), professional/postal contact address, and hosting/processor disclosures.
- Actual GA4 cookie names, retention, recipients, international transfers, consent withdrawal instructions, and Monetag disclosures once formats are selected.
- Review bilingual legal copy; current legal routes are noindex drafts. Do not claim these are finalized.

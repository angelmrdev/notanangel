# M03-A.2 — Home navigation and editorial contract

- Two navigation layers: site header/mobile bottom tabs navigate real routes; yellow rail navigates only homepage sections.
- EN `/`, `/blog/`, `/learn-to-dj/`, `/about/`; ES `/es/`, `/es/blog/`, `/es/curso-dj/`, `/es/sobre-mi/`.
- Copy is evergreen and product-facing, not release-timing copy.
- No fabricated articles or publication statistics. Homepage cards are section gateways until the Blog MDX engine supplies real posts.
- Later: replace static Blog gateways with published article cards via content query, and show curated Learn lessons. Preserve section anchors.
- Do not deploy before destination routes exist. Static export cannot serve nonexistent pages.
- Mobile tab active state currently highlights Home; update to pathname-aware state when implementing the remaining routes.

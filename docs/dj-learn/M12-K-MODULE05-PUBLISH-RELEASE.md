# M12-K — Módulo 05 / Music Library — auditoría y activación EN/ES

## Alcance
- Publica `dj-module-05` en el currículo. Convierte las 18 páginas EN/ES del módulo (2 portadas + 18 lecciones = 20 documentos) a `ready`.
- Actualiza los auditores legados para admitir **cinco** módulos publicados. El script con nombre `audit-learn-module05-draft.mjs` pasa a verificar el estado real del módulo; se conserva el nombre por compatibilidad.
- Añade `audit-learn-module05-release.mjs` para validar metadatos, orden, componentes, estilos, correspondencia bilingüe, enlaces y el sitemap de publicación.
- Sin cambios en Blog ni en el contenido de los módulos 01–04. No crea commit ni ejecuta push.

## Secuencia de validación (PowerShell, desde raíz del monorepo)
```powershell
pnpm --dir apps/web exec node scripts/audit-learn-module05-release.mjs
pnpm --dir apps/web exec node scripts/audit-learn-m03-m04-release.mjs
pnpm --dir apps/web exec node scripts/audit-learn-module05-draft.mjs
pnpm --filter @naa/web typecheck
pnpm --filter @naa/web lint
pnpm --filter @naa/web learn:validate
pnpm --dir apps/web exec node scripts/validate-learn-mdx.mjs
pnpm --dir apps/web exec node scripts/audit-learn-prepublish.mjs
pnpm --dir apps/web exec node scripts/audit-learn-seo.mjs
pnpm --filter @naa/web build
```
**Solo si build pasa:**
```powershell
pnpm --dir apps/web exec node scripts/audit-learn-module05-release.mjs --export
pnpm --dir apps/web exec node scripts/verify-learn-release-export.mjs
pnpm --dir apps/web exec node scripts/audit-learn-public-pages.mjs
```

## Salida esperada
- 5 published / 5 registered, 88 MDX `ready`, 44 páginas de contenido EN, 44 ES, 2 índices generales = **90 rutas públicas Learn**.
- 144 inserciones visuales de M05, 0 errores de fuente/SEO/export.
- Comprobar la navegación real, etiquetas hreflang/canonical, disponibilidad de páginas y responsive tras el deploy. Las revisiones de código no sustituyen QA humano/visual ni la ejecución real en Hostinger.

## Nota para push
Este paquete publica M05 en **cuanto se incorpore al despliegue**. No instalarlo antes de un push en el que M05 deba permanecer privado. Al hacer staging revisa el diff y evita mezclar cambios del blog no previstos.

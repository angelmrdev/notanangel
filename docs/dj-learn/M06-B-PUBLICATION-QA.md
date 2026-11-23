# M06-B — Pruebas de publicación bilingüe (Learn to DJ)

## Alcance

El comando `pnpm --dir apps/web learn:test-release` crea un currículo y contenidos MDX **temporales**, fuera del repositorio, y ejecuta el validador real y el generador real de sitemaps. Elimina el directorio temporal incluso si falla una prueba. No altera los Markdown editoriales, los MDX reales, el manifiesto de publicación ni los sitemaps de la web.

## Pruebas automatizadas

1. Un módulo completo con páginas y lecciones `ready` en EN/ES supera el control de publicación.
2. La ausencia de una lección española impide la publicación.
3. Un orden de lección incorrecto impide la publicación.
4. Un slug duplicado en un módulo/idioma impide la publicación.
5. Una lección `draft` o de cuerpo vacío impide la publicación.
6. Los sitemaps contienen las URLs localizadas de módulo/lecciones y los `hreflang` recíprocos.
7. Los módulos en borrador y las rutas internas `__empty__` no aparecen en los sitemaps.
8. Con todos los módulos en borrador, solo aparecen las páginas de entrada del curso.

## Limitaciones y QA manual pendiente

- El script no prueba la compilación React de los componentes MDX, las imágenes ni el HTML resultante en navegador.
- No sustituye `pnpm build`, `pnpm typecheck` y `pnpm lint`.
- Antes de publicar contenido real: revisar accesibilidad de `LearnFigure`, imágenes existentes, responsive, enlaces internos, navegación anterior/siguiente, canonical y `hreflang` en HTML, y ausencia de contenido de prueba en el repositorio.
- El contrato de maquetación sigue siendo `docs/dj-learn/M05-D-MDX-MAQUETACION-GUIA.md`. Los Markdown de `content/dj-learn` siguen siendo únicamente fuentes editoriales.

## Comandos

```powershell
pnpm --dir apps/web learn:test-release
pnpm --dir apps/web learn:validate
pnpm build
pnpm typecheck
pnpm lint
```

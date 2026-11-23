
/**
 * M08-D: Read-only smoke audit of the exported Learn site.
 *
 * Run after build, from apps/web:
 *   node scripts/audit-learn-public-pages.mjs
 *
 * This complements verify-learn-release-export.mjs
 * (canonical/hreflang/sitemaps).
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();

const errors = [];
const warnings = [];

const count = {
  pages: 0,
  links: 0,
  schema: 0,
  headings: 0,
};

const manifestPath = resolve(
  root,
  'config/dj-learn-curriculum.json'
);

if (!existsSync(manifestPath)) {
  console.error(`Missing manifest: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(
  readFileSync(manifestPath, 'utf8')
);

const base = {
  en: '/learn-to-dj/',
  es: '/es/curso-dj/',
};

const expected = new Map();

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readFrontmatter(locale, kind, id) {
  const file = resolve(
    root,
    'content/learn',
    locale,
    kind,
    `${id}.mdx`
  );

  if (!existsSync(file)) {
    fail(`Missing source: ${file}`);
    return {};
  }

  return matter(readFileSync(file, 'utf8')).data;
}

function addRoute(route, identity) {
  if (expected.has(route)) {
    fail(`Duplicate route: ${route}`);
  }

  expected.set(route, identity);
}

for (const locale of ['en', 'es']) {
  addRoute(base[locale], {
    locale,
    type: 'index',
  });
}

// Only published modules belong in the public export.
const publishedModules = manifest.modules.filter(
  (curriculumModule) =>
    curriculumModule.status === 'published'
);

for (const curriculumModule of publishedModules) {
  for (const locale of ['en', 'es']) {
    const moduleRoute =
      `${base[locale]}${curriculumModule.slugs[locale]}/`;

    const moduleData = readFrontmatter(
      locale,
      'modules',
      curriculumModule.id
    );

    if (moduleData.status !== 'ready') {
      fail(
        `Module not ready: ${locale}/${curriculumModule.id}`
      );
    }

    addRoute(moduleRoute, {
      locale,
      type: 'module',
      id: curriculumModule.id,
    });

    for (const id of curriculumModule.lessonIds) {
      const lesson = readFrontmatter(
        locale,
        'lessons',
        id
      );

      if (lesson.status !== 'ready') {
        fail(`Lesson not ready: ${locale}/${id}`);
      }

      if (
        !lesson.slug ||
        typeof lesson.slug !== 'string'
      ) {
        fail(`Missing slug: ${locale}/${id}`);
        continue;
      }

      addRoute(
        `${moduleRoute}${lesson.slug}/`,
        {
          locale,
          type: 'lesson',
          id,
        }
      );
    }
  }
}

function attrs(tag) {
  const result = {};

  for (const match of tag.matchAll(
    /([a-z][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi
  )) {
    result[match[1].toLowerCase()] =
      match[2] ?? match[3] ?? '';
  }

  return result;
}

function normalize(href) {
  if (
    !href ||
    href.startsWith('#') ||
    /^(?:mailto:|tel:|javascript:|data:)/i.test(href)
  ) {
    return null;
  }

  let url;

  try {
    url = new URL(
      href.replaceAll('&amp;', '&'),
      'https://notanangeldj.com'
    );
  } catch {
    return null;
  }

  if (url.hostname !== 'notanangeldj.com') {
    return null;
  }

  const path = url.pathname.replace(/\/+/g, '/');

  if (
    /^\/(?:learn-to-dj|es\/curso-dj)(?:\/|$)/.test(path)
  ) {
    return path.endsWith('/')
      ? path
      : `${path}/`;
  }

  return null;
}

// Audit every expected public page.
for (const [route, identity] of expected) {
  const file = resolve(
    root,
    'out',
    route.slice(1),
    'index.html'
  );

  if (!existsSync(file)) {
    fail(`Missing HTML: ${route}`);
    continue;
  }

  count.pages += 1;

  const html = readFileSync(file, 'utf8');

  if (html.length < 1000) {
    fail(`Suspiciously short HTML: ${route}`);
  }

  if (
    !/<html\b/i.test(html) ||
    !/<body\b/i.test(html)
  ) {
    fail(`Invalid HTML shell: ${route}`);
  }

  const title = html.match(
    /<title\b[^>]*>([\s\S]*?)<\/title>/i
  )?.[1]?.trim();

  if (!title) {
    fail(`Missing HTML title: ${route}`);
  }

  const description = [
    ...html.matchAll(/<meta\b[^>]*>/gi),
  ]
    .map((match) => attrs(match[0]))
    .find(
      (attributes) =>
        attributes.name?.toLowerCase() ===
        'description'
    )?.content;

  if (!description) {
    fail(`Missing meta description: ${route}`);
  }

  const robots = [
    ...html.matchAll(/<meta\b[^>]*>/gi),
  ]
    .map((match) => attrs(match[0]))
    .filter((attributes) =>
      ['robots', 'googlebot'].includes(
        attributes.name?.toLowerCase()
      )
    );

  if (
    robots.some((attributes) =>
      /(?:^|[,\s])noindex(?:[,\s]|$)/i.test(
        attributes.content ?? ''
      )
    )
  ) {
    fail(`Published route contains noindex: ${route}`);
  }

  const h1 = [
    ...html.matchAll(/<h1(?:\s|>)/gi),
  ].length;

  if (h1 < 1) {
    fail(`No H1 in ${route}`);
  }

  if (h1 > 1) {
    warn(`${h1} H1 headings in ${route}`);
  }

  count.headings += h1;

  if (identity.type !== 'index') {
    const schemas = [
      ...html.matchAll(/<script\b[^>]*>/gi),
    ]
      .map((match) => attrs(match[0]))
      .filter(
        (attributes) =>
          attributes.type?.toLowerCase() ===
          'application/ld+json'
      );

    if (!schemas.length) {
      fail(`Missing JSON-LD: ${route}`);
    }

    count.schema += schemas.length;
  }

  if (/\/learn-preview\//.test(html)) {
    warn(
      `Preview route reference appears in: ${route}`
    );
  }

  const links = [
    ...html.matchAll(/<a\b[^>]*>/gi),
  ]
    .map((match) => attrs(match[0]).href)
    .filter(Boolean);

  for (const href of links) {
    const localRoute = normalize(href);

    if (!localRoute) {
      continue;
    }

    count.links += 1;

    if (!expected.has(localRoute)) {
      fail(
        `Broken Learn link from ${route}: ` +
        `${href} (target ${localRoute})`
      );
    }
  }
}

// Verify that each language index links to
// every published module.
for (const locale of ['en', 'es']) {
  const index = base[locale];

  const file = resolve(
    root,
    'out',
    index.slice(1),
    'index.html'
  );

  if (!existsSync(file)) {
    continue;
  }

  const links = [
    ...readFileSync(file, 'utf8').matchAll(
      /<a\b[^>]*>/gi
    ),
  ].map((match) =>
    normalize(attrs(match[0]).href)
  );

  for (const curriculumModule of publishedModules) {
    const route =
      `${base[locale]}` +
      `${curriculumModule.slugs[locale]}/`;

    if (!links.includes(route)) {
      warn(
        `Index ${index} has no direct link to ${route}`
      );
    }
  }
}

// Final report.
console.log(
  `Learn public-page smoke audit: ` +
  `${count.pages}/${expected.size} HTML pages, ` +
  `${count.links} Learn links, ` +
  `${count.schema} schema scripts, ` +
  `${errors.length} errors, ` +
  `${warnings.length} warnings`
);

for (const message of errors) {
  console.error('ERROR', message);
}

for (const message of warnings) {
  console.warn('WARN ', message);
}

if (errors.length) {
  process.exitCode = 1;
}

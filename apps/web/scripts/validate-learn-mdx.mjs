/**
 * Compile EVERY Learn MDX source, including drafts that Next static export skips.
 * Run from apps/web: node scripts/validate-learn-mdx.mjs
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

const contentRoot = path.resolve(process.cwd(), 'content', 'learn');

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile() && entry.name.endsWith('.mdx')) files.push(full);
  }
  return files;
}

const files = (await walk(contentRoot)).sort();
if (!files.length) {
  console.error('No Learn MDX files found at', contentRoot);
  process.exitCode = 1;
} else {
  let failures = 0;
  for (const file of files) {
    const name = path.relative(contentRoot, file).replaceAll(path.sep, '/');
    try {
      const raw = await readFile(file, 'utf8');
      const { content } = matter(raw);
      // Compile syntax without rendering React components. A component can still
      // have a runtime error; this check specifically catches malformed MDX.
      await compileMDX({ source: content, components: {}, options: { mdxOptions: { remarkPlugins: [remarkGfm] } } });
      console.log('OK  ', name);
    } catch (error) {
      failures += 1;
      console.error('FAIL', name);
      console.error(error instanceof Error ? error.message : error);
    }
  }
  console.log(`Learn MDX compilation: ${files.length - failures}/${files.length} passed`);
  if (failures) process.exitCode = 1;
}

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadPublishedLearn } from './learn-publication-catalog.mjs';
const root = process.cwd();
const manifest = JSON.parse(readFileSync(resolve(root, 'config/dj-learn-curriculum.json'), 'utf8'));
try {
  const entries = loadPublishedLearn(root, manifest);
  console.log(`Learn publication validated: ${manifest.modules.length} registered modules; ${entries.length / 2} published bilingual modules.`);
} catch (error) { console.error(`Learn publication validation failed:\n${error.message}`); process.exitCode = 1; }

import { loadBlogCatalog } from './blog-catalog.mjs';
const { terms, posts } = loadBlogCatalog();
console.log(`Validated ${posts.length} MDX blog entries and ${terms.length} localized taxonomy records.`);

import Link from 'next/link';
import Image from 'next/image';
import { blogTerms } from '@/lib/blog/taxonomies';
import { blogUrl } from '@/lib/blog/repository';
import { activeTerms, postCategory } from '@/lib/blog/views';
import type { BlogLocale, BlogPost } from '@/lib/blog/types';
import s from './blog.module.css';

export const words = { en: { blog: 'Blog', all: 'All stories', title: 'WORDS WITH', accent: 'ATTITUDE.', intro: 'DJing, music, technology and creative culture.', empty: 'Stories are being prepared.', related: 'Keep reading', read: 'Read article', page: 'Page' }, es: { blog: 'Blog', all: 'Todos los artículos', title: 'PALABRAS CON', accent: 'ACTITUD.', intro: 'DJing, música, tecnología y cultura creativa.', empty: 'Estamos preparando nuevos artículos.', related: 'Sigue leyendo', read: 'Leer artículo', page: 'Página' } };
export { s };
export function TermTabs({locale}: {locale: BlogLocale}) { const t=words[locale]; return <nav aria-label={locale==='es'?'Categorías y etiquetas':'Categories and tags'} className={s.tabs}><Link className={s.tab} href={blogUrl(locale)}>{t.all}</Link>{activeTerms(locale).map(term=><Link key={`${term.type}-${term.id}`} className={s.tab} href={blogUrl(locale,term.slug)}>{term.name}</Link>)}</nav> }
export function PostCard({post}: {post: BlogPost}) { const term=postCategory(post); return <Link className={s.card} href={blogUrl(post.locale,post.slug)}>{post.cover ? <Image className={s.cover} src={post.cover.src} alt={post.cover.alt} width={post.cover.width ?? 960} height={post.cover.height ?? 600} /> : <div className={s.placeholder} aria-hidden="true">NOT AN ANGEL</div>}<div className={s.cardBody}><div className={s.meta}>{term?.name ?? 'Blog'} · {post.publishedAt}</div><h2 className={s.cardTitle}>{post.title}</h2><p className={s.excerpt}>{post.description}</p></div></Link> }
export function PostGrid({posts, locale}: {posts: BlogPost[],locale: BlogLocale}) { return posts.length ? <div className={s.grid}>{posts.map(post=><PostCard key={post.id} post={post}/>)}</div> : <p className={s.empty}>{words[locale].empty}</p> }
export function Pager({page, total, base}: {locale: BlogLocale,page:number,total:number,base:string}) {if(total<=1)return null;return <nav aria-label="Pagination" className={s.pagination}>{Array.from({length:total},(_,i)=>i+1).map(p=><Link key={p} href={p===1?base:`${base}?page=${p}`} aria-current={p===page?'page':undefined}>{p}</Link>)}</nav>}
export function CategoryLinks({post}: {post:BlogPost}) {return <div className={s.tags}>{blogTerms.filter(t=>t.locale===post.locale && ((t.type==='category' && t.id===post.category)||(t.type==='tag'&&post.tags.includes(t.id)))).map(t=><Link className={s.tab} href={blogUrl(post.locale,t.slug)} key={`${t.type}-${t.id}`}>{t.name}</Link>)}</div>}

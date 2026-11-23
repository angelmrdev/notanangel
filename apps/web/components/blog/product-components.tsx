import data from '@/config/blog-products.json';
import Image from 'next/image';
import s from './product-components.module.css';

type Locale = 'en' | 'es';
type ProductCopy = { bestFor: string | null; quickSpecs: string | null };
type ProductInfo = {
  id: string;
  brand: string;
  name: string;
  priceMinEUR: number | null;
  priceMaxEUR: number | null;
  affiliateUrlES: string | null;
  linkStatus?: string | null;
  software: string | null;
  imagePath: string | null;
  galleryImages: string[];
  editorial: Record<Locale, ProductCopy>;
};

const catalog = data.products as unknown as Record<string, ProductInfo>;
function getProduct(id: string): ProductInfo {
  const product = catalog[id];
  if (!product) throw new Error(`Unknown product identifier: ${id}`);
  return product;
}

const copy = {
  es: {
    disclosureTitle: 'Transparencia editorial',
    disclosure: 'Esta guía puede contener enlaces de afiliado. Si compras a través de ellos, Not an Angel puede recibir una comisión sin coste adicional para ti. Los rangos de precio son orientativos, no ofertas en tiempo real.',
    image: 'IMAGEN EN PREPARACIÓN',
    imageLabel: 'Espacio reservado para fotografía de',
    price: 'Precio orientativo',
    action: 'Consultar en Amazon.es ↗',
    actionLabel: 'Consultar en Amazon España:',
    fine: 'Consulta el precio y disponibilidad actuales en Amazon.es. Enlace de afiliado.',
    comparison: 'Comparativa orientativa de controladoras para principiantes',
    model: 'Modelo', recommendation: 'Recomendación', software: 'Software', approximatePrice: 'Precio aprox.', shop: 'Tienda',
    notice: 'Precios orientativos para producto nuevo en España, consultados en noviembre de 2026. No son ofertas garantizadas ni precios necesariamente vigentes. Comprueba precio, vendedor, versión y disponibilidad antes de comprar.',
    diagram: 'Diagrama editorial en preparación. Este bloque será sustituido por el recurso definitivo.',
  },
  en: {
    disclosureTitle: 'Affiliate disclosure',
    disclosure: 'This guide may contain affiliate links. If you buy through them, Not an Angel may earn a commission at no extra cost to you. Price ranges are estimates, not live offers.',
    image: 'IMAGE COMING SOON',
    imageLabel: 'Reserved space for product image:',
    price: 'Indicative price',
    action: 'Check Amazon.es ↗',
    actionLabel: 'Check on Amazon Spain:',
    fine: 'Check the live price and availability on Amazon.es. Affiliate link to the Spanish marketplace.',
    comparison: 'Indicative comparison of beginner DJ controllers',
    model: 'Model', recommendation: 'Best for', software: 'Software', approximatePrice: 'Approx. price', shop: 'Store',
    notice: 'Indicative prices for new products in Spain, researched in November 2026. These are not live quotes or US/UK local prices. Check the current price, seller, variant and availability before ordering from Amazon.es.',
    diagram: 'Editorial diagram in preparation. This space will be replaced with the final illustration.',
  },
};

function Price({ min, max }: { min: number | null; max: number | null }) {
  if (min === null || max === null) return null;
  return <span>{min}–{max} €</span>;
}
// External shopping links remain hidden until their destination and attribution
// have been manually checked. A supplied URL is NOT the same as a verified link.
function verifiedAffiliateUrl(p: ProductInfo): string | null {
  return p.linkStatus === 'verified' ? p.affiliateUrlES : null;
}
function bestFor(p: ProductInfo, locale: Locale) { return p.editorial[locale].bestFor; }
function specs(p: ProductInfo, locale: Locale) { return p.editorial[locale].quickSpecs; }

/** All image paths are local public/ files. Next.js inserts the src in the exported HTML at build time. */
function ProductImage({ product, compact = false }: { product: ProductInfo; compact?: boolean }) {
  if (!product.imagePath) return null;
  const alt = `${product.brand} ${product.name}`;
  return <Image
    src={product.imagePath}
    alt={alt}
    width={compact ? 80 : 1000}
    height={compact ? 80 : 1000}
    className={compact ? s.thumbnail : s.productPhoto}
    sizes={compact ? '80px' : '(max-width: 650px) 100vw, 38vw'}
  />;
}

export function AffiliateDisclosure({ locale = 'es' }: { locale?: Locale }) {
  const t = copy[locale];
  return <aside className={s.disclosure}><strong>{t.disclosureTitle}</strong><p>{t.disclosure}</p></aside>;
}

export function ProductCard({ productId, variant = 'standard', locale = 'es' }: { productId: string; variant?: 'standard' | 'featured'; locale?: Locale }) {
  const p = getProduct(productId);
  const t = copy[locale];
  const affiliateUrl = verifiedAffiliateUrl(p);
  const benefit = bestFor(p, locale);
  const quick = specs(p, locale);
  return <section aria-label={`${p.brand} ${p.name}`} className={`${s.product} ${variant === 'featured' ? s.featured : ''}`}>
    {p.imagePath
      ? <div className={s.imageReady}><ProductImage product={p} /></div>
      : <div className={s.image} aria-label={`${t.imageLabel} ${p.name}`}><span>NOT AN ANGEL / DJ GEAR</span><strong>{p.name}</strong><small>{t.image}</small></div>}
    <div className={s.info}>
      {benefit && <span className={s.kicker}>{benefit}</span>}
      <h3>{p.brand} {p.name}</h3>
      {quick && <p>{quick}</p>}
      {p.software && <p className={s.software}>Software: {p.software}</p>}
      <div className={s.bottom}>
        {p.priceMinEUR !== null && p.priceMaxEUR !== null && <div><span className={s.priceLabel}>{t.price}</span><strong className={s.price}><Price min={p.priceMinEUR} max={p.priceMaxEUR}/></strong></div>}
        {affiliateUrl && <a href={affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" aria-label={`${t.actionLabel} ${p.name}`}>{t.action}</a>}
      </div>
      {affiliateUrl && <small className={s.fine}>{t.fine}</small>}
    </div>
  </section>;
}

export function ProductComparison({ productIds, locale = 'es' }: { productIds?: string | string[]; locale?: Locale }) {
  const ids = typeof productIds === 'string'
    ? productIds.split(',').map(id => id.trim()).filter(Boolean)
    : Array.isArray(productIds) ? productIds : [];
  if (!ids.length) throw new Error('ProductComparison requires a non-empty productIds list.');
  const products = ids.map(getProduct);
  const t = copy[locale];
  return <div className={s.scroll}><table className={s.comparison}><caption>{t.comparison}</caption>
    <thead><tr><th scope="col">{t.model}</th><th scope="col">{t.recommendation}</th><th scope="col">{t.software}</th><th scope="col">{t.approximatePrice}</th><th scope="col">{t.shop}</th></tr></thead>
    <tbody>{products.map(p => <tr key={p.id}>
      <th scope="row"><div className={s.modelCell}><ProductImage product={p} compact/><span>{p.brand} {p.name}</span></div></th>
      <td>{bestFor(p, locale) ?? '—'}</td><td>{p.software ?? '—'}</td>
      <td>{p.priceMinEUR !== null && p.priceMaxEUR !== null
        ? <Price min={p.priceMinEUR} max={p.priceMaxEUR} />
        : '—'}</td>
      <td>{verifiedAffiliateUrl(p) && <a href={verifiedAffiliateUrl(p)!} target="_blank" rel="sponsored nofollow noopener noreferrer">Amazon.es ↗</a>}</td>
    </tr>)}</tbody>
  </table></div>;
}

export function PriceNotice({ locale = 'es' }: { locale?: Locale }) { return <p className={s.notice}>{copy[locale].notice}</p>; }
export function VisualPlaceholder({ title, description, locale = 'es' }: { title: string; description?: string; locale?: Locale }) {
  return <figure className={s.visual}><span>NOT AN ANGEL / VISUAL GUIDE</span><strong>{title}</strong>{description && <p>{description}</p>}<figcaption>{copy[locale].diagram}</figcaption></figure>;
}

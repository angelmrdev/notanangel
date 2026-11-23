import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import Image from 'next/image';
import s from './blog.module.css';
import { AffiliateDisclosure, ProductCard, ProductComparison, PriceNotice, VisualPlaceholder } from './product-components';

export function InfoCallout({title,children}:{title?:string,children:ReactNode}) {return <aside className={s.note}>{title&&<strong>{title}</strong>}{children}</aside>}
export function EditorialImage({src,alt,caption,width=1200,height=750}:{src:string,alt:string,caption?:string,width?:number,height?:number}) {return <figure><Image src={src} alt={alt} width={width} height={height}/>{caption&&<figcaption>{caption}</figcaption>}</figure>}
export const mdxComponents = { InfoCallout, EditorialImage, AffiliateDisclosure, ProductCard, ProductComparison, PriceNotice, VisualPlaceholder, img: (props:ComponentPropsWithoutRef<'img'>) => {const src=props.src; if(typeof src !== 'string' || !src.trim())return null; return <Image src={src} alt={props.alt??''} width={1200} height={750} style={{height:'auto'}}/>} };

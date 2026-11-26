import { ReleasePage, releaseParams, detailMetadata } from '@/components/music/release-page';
export const dynamicParams = false;
export function generateStaticParams(){return releaseParams('dj-sets');}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){return detailMetadata('es','dj-sets',(await params).slug);}
export default async function Page({params}:{params:Promise<{slug:string}>}){return <ReleasePage locale="es" category="dj-sets" slug={(await params).slug}/>;}

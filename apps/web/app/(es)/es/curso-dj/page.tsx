import type { Metadata } from 'next';
import { LearnIndex } from '@/components/learn/learn-pages';
export const metadata:Metadata={title:"Curso DJ — Aprende a mezclar",description:"Lecciones estructuradas para aprender a mezclar música.",alternates:{canonical:'/es/curso-dj/',languages:{en:'/learn-to-dj/',es:'/es/curso-dj/','x-default':'/learn-to-dj/'}}};
export default function Page(){return <LearnIndex locale="es"/>}

import type { Metadata } from 'next';
import { LearnIndex } from '@/components/learn/learn-pages';
export const metadata:Metadata={title:"Learn to DJ — Free DJ Lessons",description:"Structured DJ lessons and practical music mixing skills.",alternates:{canonical:'/learn-to-dj/',languages:{en:'/learn-to-dj/',es:'/es/curso-dj/','x-default':'/learn-to-dj/'}}};
export default function Page(){return <LearnIndex locale="en"/>}

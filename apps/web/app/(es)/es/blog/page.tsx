import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog/blog-pages';
export const metadata:Metadata = {title: "Blog — Música, DJing y Cultura",description:"Cultura musical, técnicas DJ, ideas creativas y tecnología.",alternates:{canonical:'/es/blog/',languages:{en:'/blog/',es:'/es/blog/'}}};
export default function Page() {return <BlogIndex locale="es"/>}

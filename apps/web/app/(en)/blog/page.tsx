import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog/blog-pages';
export const metadata:Metadata = {title: "Blog — Music, DJing & Culture",description:"Music culture, DJ techniques, creative ideas and technology.",alternates:{canonical:'/blog/',languages:{en:'/blog/',es:'/es/blog/'}}};
export default function Page() {return <BlogIndex locale="en"/>}

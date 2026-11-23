export type LearnLocale = 'en' | 'es';
export type LearnStatus = 'draft' | 'published';
export interface LearnLesson { id: string; locale: LearnLocale; moduleId: string; slug: string; title: string; description: string; status: 'draft' | 'ready'; body: string; sourcePath: string; order: number; }
export interface LearnModule { id: string; order: number; status: LearnStatus; slugs: Record<LearnLocale,string>; lessonIds: string[]; }
export interface LearnModulePage { id: string; locale: LearnLocale; title: string; description: string; status: 'draft' | 'ready'; body: string; sourcePath: string; }
export interface LearnPublishedModule { module: LearnModule; locale: LearnLocale; page: LearnModulePage; lessons: LearnLesson[]; }

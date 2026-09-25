import projects from './gallery.json';
export { projects };
export type Project = (typeof projects)[number];
export const asset = (src: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${src}`;

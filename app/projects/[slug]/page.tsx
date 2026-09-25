import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/portfolio';
import Gallery from '@/components/Gallery';
import { projectContext } from '@/lib/profile';
export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) { const {slug} = await params; const project = projects.find(p => p.slug === slug); return { title: project ? `${project.brand} / ${project.collection}` : 'Project' }; }
export default async function ProjectPage({ params }: { params: Promise<{slug:string}> }) {
 const {slug} = await params; const index = projects.findIndex(p => p.slug === slug); const p = projects[index]; if (!p) notFound(); const next = projects[(index + 1) % projects.length]; const context = projectContext[slug];
 return <main id="main"><section className="project-intro" id="top"><Link className="back-link" href="/#work">← All work</Link><div className="eyebrow">{p.brand} / {p.category}</div><h1>{p.title}</h1>{context && <div className="project-context"><p>{context.description}</p><ul aria-label="Project technologies">{context.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul></div>}<div className="project-summary"><span>{p.collection}</span><span>{String(p.photos.length).padStart(2,'0')} images · Visual archive</span></div></section><Gallery project={p} /><Link className="next-project" href={`/projects/${next.slug}/`}><span className="eyebrow">NEXT COLLECTION / {next.brand}</span><span>{next.title} ↗</span></Link></main>;
}

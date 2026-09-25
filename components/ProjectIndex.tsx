'use client';
import { useState } from 'react';
import Link from 'next/link';
import { asset, type Project } from '@/lib/portfolio';
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const [brand, setBrand] = useState('All work');
  const brands = ['All work', ...new Set(projects.map(p => p.brand))];
  const filtered = projects.filter(p => brand === 'All work' || p.brand === brand);
  return <><div className="filters" aria-label="Filter projects by client">{brands.map(b => <button key={b} aria-pressed={brand === b} onClick={() => setBrand(b)}>{b}<sup>{b === 'All work' ? projects.length : projects.filter(p => p.brand === b).length}</sup></button>)}</div><div className="project-grid" aria-live="polite">{filtered.map((p,i) => <Link className="project-card" key={p.slug} href={`/projects/${p.slug}/`}><div className="project-image"><img src={asset(p.cover.thumb)} alt={`${p.brand} — ${p.collection}`} loading={i < 2 ? 'eager' : 'lazy'} /><span className="image-label">{p.brand} / {p.collection}</span><span className="project-arrow" aria-hidden="true">↗</span></div><div className="project-meta"><span className="eyebrow">{p.brand} <span className="muted">/ {p.category}</span></span><span className="photo-count">{p.photos.length} images</span></div><h3>{p.title}</h3></Link>)}</div></>;
}

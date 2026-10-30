import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = { title: { default: 'Kong Yim — Senior Full-Stack Developer', template: '%s — Kong Yim' }, description: 'UK-based senior full-stack developer with 20+ years of experience. Explore production platforms, payment integrations, AI workflows and interactive systems.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><header className="header"><Link className="wordmark" href="/">KONG YIM<span className="brand-dot">®</span></Link><span className="header-role">Senior full-stack developer<br />Wokingham, UK</span><nav aria-label="Main navigation"><Link href="/#engineering">Work <span>↗</span></Link><Link href="/#experience">Experience <span>↗</span></Link><Link href="/#contact">Contact <span>↗</span></Link></nav></header>{children}<footer><Link className="wordmark" href="/">KONG YIM<span className="brand-dot">↗</span></Link><span>Code. Interaction. Experience.</span><a href="#top">Back to top ↑</a></footer></body></html>;
}

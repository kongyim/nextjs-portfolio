import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { linkedin } from '@/lib/profile';
export const metadata: Metadata = { title: { default: 'Kong Yim — Creative Developer', template: '%s — Kong Yim' }, description: 'A visual portfolio of digital experiences, interactive installations, and retail interfaces by Kong Yim.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><header className="header"><Link className="wordmark" href="/">KONG YIM<span className="brand-dot">®</span></Link><span className="header-role">Creative developer<br />Digital × Physical</span><nav aria-label="Main navigation"><Link href="/#work">Work <span>↗</span></Link><Link href="/#about">About <span>↗</span></Link><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></nav></header>{children}<footer><Link className="wordmark" href="/">KONG YIM<span className="brand-dot">↗</span></Link><span>Code. Interaction. Experience.</span><a href="#top">Back to top ↑</a></footer></body></html>;
}

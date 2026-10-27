import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
const root = path.resolve('public/portfolio');
const groups = new Map();
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(jpe?g|png|webp|avif|gif)$/i.test(entry.name)) {
      const relative = path.relative(root, full).split(path.sep).join('/');
      const group = path.posix.dirname(relative);
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push({ full, relative, name: entry.name });
    }
  }
}
await walk(root);
await mkdir('public/gallery', { recursive: true });
await mkdir('lib', { recursive: true });
const brands = { iwc: 'IWC', lincoln: 'Lincoln', ge: 'GE', swire: 'Swire', galaxy: 'Galaxy', telstra: 'Telstra' };
const titles = { 'iwc/Smart Mirror': 'A closer look at time.', 'lincoln/Dealers': 'The showroom, reimagined.', 'ge/ge aviation': 'Engineering on display.', 'ge/ge ogtc': 'Inside the energy experience.', 'telstra/interactive map': 'A world of connections.', 'telstra/gmn': 'Global Media Network', swire: 'Spaces that respond.', galaxy: 'An invitation to explore.' };
const categories = { iwc: 'Digital experiences', lincoln: 'Retail experiences', ge: 'Interactive installations', swire: 'Interactive installations', galaxy: 'Digital experiences', telstra: 'Digital experiences' };
const preferred = { 'iwc/Smart Mirror': 'Screenshot (33).png', 'lincoln/Dealers': 'Personalization-Studio.JPG' };
const projects = [];
for (const [group, files] of groups) {
  files.sort((a,b) => a.name.localeCompare(b.name, 'en', { numeric: true }));
  const photos = [];
  for (const file of files) {
    const info = await stat(file.full);
    const hash = createHash('sha1').update(file.relative + info.size + info.mtimeMs).digest('hex').slice(0,16);
    const thumb = `gallery/${hash}.webp`;
    const preview = `gallery/${hash}-large.webp`;
    try { await stat(`public/${thumb}`); await stat(`public/${preview}`); }
    catch {
      await sharp(file.full).rotate().resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/${thumb}`);
      await sharp(file.full).rotate().resize({ width: 2200, height: 2200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88 }).toFile(`public/${preview}`);
    }
    photos.push({ name: file.name, src: '/' + preview, thumb: '/' + thumb, original: '/portfolio/' + file.relative.split('/').map(encodeURIComponent).join('/') });
  }
  const [brand, ...parts] = group.split('/');
  const collection = parts.join(' / ') || 'Experience archive';
  projects.push({ slug: group.replace(/[^a-z0-9]+/gi, '-').toLowerCase(), brand: brands[brand] || brand, collection, title: titles[group] || collection, category: categories[brand] || 'Digital experiences', photos, cover: photos.find(p => p.name === preferred[group]) || photos[0] });
}
const order = ['iwc-smart-mirror', 'lincoln-dealers', 'ge-ge-aviation', 'telstra-interactive-map', 'swire', 'galaxy'];
projects.sort((a,b) => (order.indexOf(a.slug) < 0 ? 99 : order.indexOf(a.slug)) - (order.indexOf(b.slug) < 0 ? 99 : order.indexOf(b.slug)) || a.slug.localeCompare(b.slug));
await writeFile('lib/gallery.json', JSON.stringify(projects, null, 2));
console.log(`Indexed ${projects.reduce((sum,p) => sum + p.photos.length,0)} images across ${projects.length} collections.`);

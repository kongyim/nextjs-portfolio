import { cp, mkdir, writeFile, lstat, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'out');
const destinations = ['portfolio', 'profolio'].map(name => path.resolve(root, '../kongyim.github.io', name));
// Merge into the requested directory; never delete unrelated destination files.
async function rejectSymlinks(target) {
  try {
    const info = await lstat(target);
    if (info.isSymbolicLink()) throw new Error(`Refusing to copy through a symlink: ${target}`);
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
for (const destination of destinations) {
await rejectSymlinks(path.dirname(destination));
await rejectSymlinks(destination);
await mkdir(destination, { recursive: true });
// Remove the withdrawn CV and obsolete bundles containing previous contact details.
for (const name of ['Kong_Yim_CV.pdf', '_next']) {
  const retired = path.join(destination, name);
  await rejectSymlinks(retired);
  await rm(retired, { recursive: true, force: true });
}
await cp(source, destination, { recursive: true, force: true, filter: async (src, dest) => {
  await rejectSymlinks(dest);
  return path.basename(src) !== '.DS_Store';
} });
await rejectSymlinks(path.join(destination, '.nojekyll'));
await writeFile(path.join(destination, '.nojekyll'), '');
await rejectSymlinks(path.join(path.dirname(destination), '.nojekyll'));
await writeFile(path.join(path.dirname(destination), '.nojekyll'), '');
console.log(`Exported portfolio to ${destination}`);

}

import { cp, mkdir, writeFile, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'out');
const destination = path.resolve(root, '../kongyim.github.io/profolio');
// Merge into the requested directory; never delete unrelated destination files.
async function rejectSymlinks(target) {
  try {
    const info = await lstat(target);
    if (info.isSymbolicLink()) throw new Error(`Refusing to copy through a symlink: ${target}`);
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
await rejectSymlinks(path.dirname(destination));
await rejectSymlinks(destination);
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true, force: true, filter: async (src, dest) => {
  await rejectSymlinks(dest);
  return path.basename(src) !== '.DS_Store';
} });
await writeFile(path.join(destination, '.nojekyll'), '');
await rejectSymlinks(path.join(path.dirname(destination), '.nojekyll'));
await writeFile(path.join(path.dirname(destination), '.nojekyll'), '');
console.log(`Exported portfolio to ${destination}`);

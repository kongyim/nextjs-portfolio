import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml' };
http.createServer(async (req,res) => {
 try {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith('/portfolio/')) { res.writeHead(404); return res.end(); }
  let file = path.resolve(root, '.' + decodeURIComponent(url.pathname.slice('/portfolio'.length)));
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); return res.end(); }
  if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
  res.setHeader('Content-Type', types[path.extname(file).toLowerCase()] || 'application/octet-stream');
  res.end(await readFile(file));
 } catch { res.writeHead(404); res.end('Not found'); }
}).listen(3100, '127.0.0.1');

# Kong Yim — Creative Developer Portfolio

A responsive Next.js portfolio with client filters, individual project galleries, and a keyboard-accessible fullscreen viewer. Every image in `public/portfolio` is included, grouped by its containing folder and naturally sorted by filename.

## Development

Requires Node.js 20.9+.

```sh
npm install
npm run dev
```

Open http://localhost:3000/portfolio/.

## Export to GitHub Pages

```sh
npm run export
```

This regenerates the image index, creates optimized WebP thumbnails and previews, builds the static site in `out/`, and copies it to `../kongyim.github.io/portfolio/`. The `/portfolio` base path applies to pages and assets. Original photographs remain available through the viewer.

The copy overwrites matching generated files but preserves unrelated destination files. It adds `.nojekyll` to the destination and the GitHub Pages repository root so `_next` assets are served. It does not commit, push, or change GitHub Pages settings. Publish the destination repository using your normal Git workflow. Old exported assets are retained by the non-destructive copy.

The build uses Next.js [static export](https://nextjs.org/docs/app/guides/static-exports); no Node server is required for hosting.

## Update the portfolio

- Add photos under `public/portfolio/<client>/<collection>/`, then restart development or run an export. JPEG, PNG, WebP, AVIF, and GIF are indexed; hidden files are ignored. Animated images have static gallery previews; originals are retained.
- Edit the client labels, project titles, categories, and chosen covers in `scripts/generate-gallery.mjs`.
- Edit the introductory and about text in `app/page.tsx`, and navigation in `app/layout.tsx`.
- Customize the design in `app/globals.css`.
- Add your verified role, technologies, and project outcomes to the project page when available. The current site presents a visual archive without inventing project achievements.

`npm run build` builds without copying. `npm run typecheck` checks TypeScript after the first gallery generation/build.

## Verification

After `npm run build`, run `npm test` for browser checks (install Chromium with `npx playwright install chromium` if needed). `npm run preview` serves the exported site at http://127.0.0.1:3100/portfolio/.

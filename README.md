# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## GitHub Pages deployment

This repository includes a GitHub Actions workflow that builds the site and publishes the generated `dist/` folder to GitHub Pages automatically when you push to `main`.

Notes:
- The CI workflow creates and updates the `gh-pages` branch as part of publishing; you do not need to maintain that branch by hand.
- If you prefer a manual local build, run:

```bash
npm run build
```

Then inspect the `dist/` folder locally or publish it manually if desired. The previously-provided one-shot `deploy` script (which force-pushed `dist/` to `gh-pages`) has been removed to avoid accidental overwrites.

Verify the published site

1. After pushing to `main`, wait a minute for the workflow to run and publish.
2. Visit the Pages URL in your browser, for example:
   `https://X0147.github.io/Capstone.Vantage/`
3. If you see stale assets or errors, try a hard refresh (Cmd+Shift+R) or clear the cache.

Repository Pages settings

The Actions workflow publishes to GitHub Pages; if you want me to confirm or update the Pages settings (Settings → Pages) I can do that — it requires repository admin access.

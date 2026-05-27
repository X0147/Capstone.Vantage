# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploying to GitHub Pages

This repository includes a GitHub Actions workflow that will build the app and deploy the generated `dist/` folder to the `gh-pages` branch when you push to `main`.

Local deploy (one-off)

You can reproduce the deployment steps locally with the convenience npm script added to `package.json`:

```bash
npm run deploy
```

This script runs `npm run build` and then force-pushes the `dist/` folder to the `gh-pages` branch (same steps the CI uses).

Verify the published site

1. Wait a minute after pushing to `main` for GitHub Actions to build and deploy.
2. Visit the Pages URL configured in `package.json` `homepage` (for example):
	`https://X0147.github.io/Capstone.Vantage/`
3. If you see stale assets or errors, try a hard refresh (Cmd+Shift+R) or clear the cache.

Repository Pages settings

Ensure your repository's Pages settings (Settings → Pages) point to the `gh-pages` branch. I can check or update this for you if you want (it requires repository admin access).

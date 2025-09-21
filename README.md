# Tongmeng Xie — Project Portfolio

A minimal, static React + Tailwind site listing selected projects. Deploys to GitHub Pages via Actions.

## Local dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy to GitHub Pages (recommended)
1. Create a new **public** repo on GitHub (e.g., `tongmengxie-portfolio`).
2. Push this project to the repo's `main` branch.
3. GitHub Actions will build and publish automatically to **Pages** (see workflow).  
4. In **Settings → Pages**, set **Source: GitHub Actions** if not already.
5. Your site will be available at `https://<your-username>.github.io/<repo>/`.

> Vite is configured with `base: './'` so assets work on Pages without extra config.

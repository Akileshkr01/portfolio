# Akilesh K R: Portfolio

Next.js (App Router) + Tailwind CSS + Framer Motion + TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Edit content

All content lives in `data/resume.ts`. Search it for `REPLACE_` and fill in:
site URL, Formspree endpoint, Calendly link, GitHub repo URLs, live demo URLs.
Links that still contain `REPLACE_` are hidden automatically.

`public/resume.pdf` is your uploaded resume. Replace it any time with a newer file of the same name.

## Deploy

1. Run `npm run build` to confirm it passes.
2. Push to GitHub.
3. Import the repo at vercel.com (defaults are fine) and click Deploy.
4. Set `site.url` in `data/resume.ts` to your Vercel/custom domain, commit and push.

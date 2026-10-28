# Clear Tax BD — deployment checklist

## GitHub repository
Upload the **contents of this project directory** to `RADiptho/cleartaxbd` on the `main` branch. Keep `package.json`, `package-lock.json`, `index.html`, `src/`, and `public/` at the repository root (not nested in another `cleartaxbd/` directory).

## Cloudflare Pages
Create a Pages project via **Connect to Git** and select `RADiptho/cleartaxbd`.
- Framework preset: Vite
- Production branch: `main`
- Build command: `npm run check`
- Build output directory: `dist`
- Root directory: repository root
- Node.js: 20 or later (the repository `.nvmrc` selects the intended version)

After the first deployment, set `VITE_SITE_URL` to the **actual assigned** `https://<your-project>.pages.dev` URL in Cloudflare Pages build environment variables, then redeploy. This enables canonical and social image absolute URLs. Do not invent a URL before Cloudflare assigns one.

## Pre-publication checks
- Confirm Cloudflare's production build passes, including `npm run test:tax`.
- Independently verify Bangladesh tax-year rates, rebates, surcharge and minimum tax against current official legislation before presenting calculator results as legally accurate.
- Verify Facebook share URL opens the correct official page, including in Facebook's mobile browser.
- Verify the Google Maps search resolves to the correct office; an embedded pin is intentionally not set.
- Test WhatsApp links, consultation form, checklist PDF, bilingual switching, keyboard navigation and mobile layouts on a deployed URL.
- Review privacy policy, terms and customer-facing claims before publishing.

## Maintenance
Once Cloudflare Pages is connected to GitHub, subsequent commits to `main` automatically trigger a new build/deployment. GitHub Actions also runs checks on pushes and pull requests.

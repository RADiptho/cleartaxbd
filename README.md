# Clear Tax BD — Website

Bilingual (English / বাংলা) website for **Clear Tax BD — Your Taxes, Our Expertise**.
Built with React 18 + Vite 5 + Tailwind CSS 3 + Lucide icons. It is a fully static site:
no server, database or paid service is needed. It is deployed free on **Cloudflare Pages**, rebuilt automatically from GitHub on every push to `main`.

---

## 1. Project structure

```
cleartaxbd/
├── .github/workflows/ci.yml   Runs tax tests + build on every push (quality check only)
├── .nvmrc                     Node version (20) — read by Cloudflare Pages and GitHub Actions
├── .env.production            VITE_SITE_URL default (empty; set it in Cloudflare instead)
├── .gitignore, .editorconfig
├── index.html                 Page shell: SEO, Open Graph (Facebook) tags, loading screen
├── package.json, package-lock.json   Dependencies and scripts (npm ci uses the lock file)
├── vite.config.js             Build settings (relative paths, social meta injection)
├── tailwind.config.js, postcss.config.js   Brand colours (navy / sky / gold) and fonts
├── public/                    Copied as-is into the build
│   ├── logo.jpg               ← your ORIGINAL logo (unchanged)
│   ├── logo-160.webp, logo-320.webp   resized copies of the logo for fast loading
│   ├── favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192/512.png
│   ├── og-image.png           1200×630 Facebook/WhatsApp share image
│   ├── _headers               Cloudflare Pages security + caching headers
│   └── site.webmanifest, robots.txt
├── src/
│   ├── config.js              ★ Phone, WhatsApp, email, address, Facebook URL, map embed
│   ├── i18n/content.js        ★ ALL website text, English + Bangla
│   ├── data/checklists.js     ★ Document checklist items
│   ├── data/policies.js       ★ Privacy Policy & Terms (drafts for your review)
│   ├── lib/tax.js             ★ Tax calculator rules (slabs, thresholds, minimum tax…)
│   ├── components/            One file per section (Header, Hero, About, Services, …)
│   └── App.jsx, main.jsx, index.css
└── scripts/
    ├── test-tax.mjs           13 hand-checked calculator test cases (npm run test:tax)
    └── og-image.html          Template used to create og-image.png
```

★ = files you will edit most often. `node_modules/` and `dist/` are not committed — Cloudflare rebuilds them.

## 2. Run it on your computer (optional)

Install **Node.js 20** (nodejs.org) and **Git** (git-scm.com), then in this folder:

```bash
npm install
npm run dev        # live preview at http://localhost:5173
npm run check      # tax tests + production build (same as the CI check)
```

## 3. Deploy: GitHub → Cloudflare Pages (free, automatic)

### Step 1 — Put the project on GitHub (once)
1. On github.com create a new **empty** repository, e.g. `cleartaxbd` (no README, no .gitignore).
2. Unzip this project, open a terminal in the `cleartaxbd` folder and run:
   ```bash
   git init
   git add .
   git commit -m "Clear Tax BD website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/cleartaxbd.git
   git push -u origin main
   ```
   (Without a terminal: on the empty repo page choose **uploading an existing file** and drag in the
   *contents* of the folder, including the hidden `.github`, `.nvmrc` and `.gitignore` files.)

### Step 2 — Connect Cloudflare Pages (once)
1. Free account at dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** tab →
   **Connect to Git** → authorise GitHub → select the `cleartaxbd` repository.
2. Set up builds and deployments:
   | Setting | Value |
   |---|---|
   | Production branch | `main` |
   | Framework preset | `React (Vite)` (or `None`) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave empty)* |
3. **Environment variables** (Production): `NODE_VERSION` = `20`.
4. **Save and Deploy.** After 1–2 minutes the site is live at `https://<project-name>.pages.dev`.

### Step 3 — Set the public address (once, for Facebook previews)
1. Cloudflare → your project → **Settings → Variables and Secrets** (Production) → add
   `VITE_SITE_URL` = `https://<project-name>.pages.dev` (no trailing slash).
2. **Deployments** → latest deployment → **⋯ → Retry deployment**.
   This makes the canonical URL and the Facebook share image absolute, which Facebook requires.
3. Open the **Facebook Sharing Debugger** (developers.facebook.com/tools/debug), paste the site URL,
   click **Scrape Again**, and check the title, description and logo image.
4. Share the link on the Facebook page. Tip: `…/?lang=bn` opens the site directly in Bangla.

### Every update after that
Edit files → commit → push to `main` (or edit directly on github.com and click **Commit changes**).
Cloudflare Pages rebuilds and publishes automatically within a couple of minutes. Pushes to any other branch
create a separate *preview* URL without touching the live site. If a build fails, the previous version stays live;
the build log is under **Deployments** in Cloudflare, and the **Actions** tab on GitHub shows the CI check.

**Free-plan notes:** Cloudflare Pages' free plan includes unlimited bandwidth and 500 builds per month, which is far
more than this site needs. No paid service, API key or server is used anywhere in the project.
A custom domain (e.g. cleartaxbd.com) can be added later under **Custom domains** if you buy one; then update
`VITE_SITE_URL` and redeploy.

The Privacy and Terms pages use `#/privacy` and `#/terms`, so no redirect or SPA routing rules are needed.

## 4. Facebook page
The official page link is set in `src/config.js` (`facebookUrl`) and used by the footer Facebook icon and the
search-engine business data in `index.html` (`sameAs`). If the page link changes, update both places.

## 5. Common edits
| What | Where |
|---|---|
| Facebook page link | `src/config.js` → `facebookUrl` and `index.html` → `sameAs` |
| Phone / WhatsApp / email / address | `src/config.js` |
| Embed Google Map | Confirm your office pin on Google Maps → Share → **Embed a map** → copy only the `src="…"` value into `mapEmbedSrc` in `src/config.js` |
| Any text (EN or BN) | `src/i18n/content.js` |
| Checklist items | `src/data/checklists.js` (`cond: true` = “if applicable”) |
| Privacy Policy / Terms | `src/data/policies.js` (update `POLICY_UPDATED`) |
| Colours / fonts | `tailwind.config.js` |
| Logo | Replace `public/logo.jpg` (and the resized `logo-160.webp`, favicons) with the same file names |
| Share image | Edit `scripts/og-image.html`, take a 1200×630 screenshot, save as `public/og-image.png` |

**Adding photos:** put images in `public/images/` (WebP/JPG, ideally under 200 KB) and reference them as
`<img src="images/office.webp" alt="…" loading="lazy" />`. Use genuine photos of your office/team where possible.

After any edit: commit and push to `main` — Cloudflare redeploys automatically.

## 6. Tax calculator — keeping it accurate
All rules live in `src/lib/tax.js`. Configured years (verified October 2026 against the Finance Ordinance 2025
as summarised by KPMG/PwC Bangladesh and national press):

- **AY 2026-27** (income year 2025-26): thresholds Tk 3,75,000 general · 4,25,000 women/65+ · 5,00,000 disabled & third gender ·
  5,25,000 gazetted war-wounded freedom fighters / wounded July fighters; slabs 10/15/20/25/30% on 3L/4L/5L/20L/rest;
  minimum tax Tk 5,000 everywhere, Tk 1,000 for new taxpayers; employment deduction lower of ⅓ salary or Tk 5,00,000.
- **AY 2025-26** (income year 2024-25): threshold Tk 3,50,000 etc.; slabs 5/10/15/20/25/30%;
  minimum tax Tk 5,000 / 4,000 / 3,000 by location; employment deduction cap Tk 4,50,000.
- Rebate: lowest of 3% of taxable income, 15% of eligible investment, Tk 10,00,000.
- Net-wealth surcharge: 10% (> Tk 4 crore, or >1 car / house > 8,000 sq ft), 20% (> 10 cr), 30% (> 20 cr), 35% (> 50 cr).

**AY 2027-28 is intentionally not configured.** The Finance Act 2026 was reported to raise the general threshold to
Tk 4,00,000 for FY2026-27/27-28; once you have checked the gazetted text (all categories, rebate, minimum tax),
copy the `'2026-27'` block in `tax.js`, rename it `'2027-28'`, update the numbers, add a test case to
`scripts/test-tax.mjs`, and run `npm run test:tax`.

## 7. What needs a backend (not included, by design)
- **Saving appointment requests** — the form prepares a WhatsApp message; nothing is stored.
  A booking database would need a server/database or a service such as a secured form backend.
- **Document uploads** — deliberately not built. This would require a secure backend, authentication, access control,
  encryption and a written retention policy.
- **Facebook Messenger chat widget** — not added; it needs Meta's Page plugin configuration. The footer links to the Facebook page.

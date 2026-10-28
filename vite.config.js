import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * VITE_SITE_URL (set in .env.production or your host's build settings) is your
 * public website address, e.g. https://cleartaxbd.pages.dev
 * It is used for the canonical URL and the absolute Facebook/Open Graph image URL.
 */
function socialMeta(siteUrl) {
  const url = (siteUrl || '').replace(/\/+$/, '');
  return {
    name: 'social-meta',
    transformIndexHtml(html) {
      const img = url ? `${url}/og-image.png` : 'og-image.png';
      let tags = `<meta property="og:image" content="${img}" />\n    <meta name="twitter:image" content="${img}" />`;
      if (url) {
        tags += `\n    <link rel="canonical" href="${url}/" />\n    <meta property="og:url" content="${url}/" />`;
      }
      return html.replace('<!--SOCIAL_META-->', tags);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // Relative base works on GitHub Pages project sites, user sites and Cloudflare Pages alike
    base: './',
    plugins: [react(), socialMeta(env.VITE_SITE_URL)],
    build: { target: 'es2018', cssCodeSplit: true, assetsInlineLimit: 4096 },
  };
});

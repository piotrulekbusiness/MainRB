import { resolveLegacyRedirect } from '#shared/signor/redirects';

/**
 * 301 redirects for old WordPress URLs and misspelled slugs.
 * Runs only where Nitro serves requests (Vercel / Node server). For a fully static
 * deploy, export the same rules to the host's redirect file (see docs/SIGNOR.md).
 */
export default defineEventHandler((event) => {
  const method = event.method;
  if (method !== 'GET' && method !== 'HEAD') return;

  const url = getRequestURL(event);
  if (url.pathname.startsWith('/_nuxt/') || url.pathname.startsWith('/api/') || url.pathname.startsWith('/__')) return;

  const target = resolveLegacyRedirect(url.pathname);
  if (target) return sendRedirect(event, `${encodeURI(target)}${url.search}`, 301);
});

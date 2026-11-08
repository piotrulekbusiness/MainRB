/**
 * 301 redirects from old WordPress URLs to the headless frontend.
 *
 * Applied by server/middleware/signor-redirects.ts in a single hop (no chains):
 *   1. EXACT_REDIRECTS: hand-picked old URL -> new URL.
 *   2. WordPress permalink bases -> WooNuxt routes (/produkt/x -> /product/x).
 *      Nested WP category paths keep only the last segment, which is the slug.
 *   3. Typos fixed inside any path segment (barnsoletka -> bransoletka, ...).
 *
 * The product/category slugs must also be renamed in WordPress (see
 * scripts/wp/fix-typo-slugs.sh), otherwise the corrected URL would 404.
 */

/** Fill in from the WordPress export / Search Console. Keys and values without trailing slash. */
export const EXACT_REDIRECTS: Record<string, string> = {
  // Products published without a title, so WordPress gave them a placeholder slug.
  '/produkt/brak-tytulu': '/product/bransoletka-regulowana-zodiak-panna',
  '/product/brak-tytulu': '/product/bransoletka-regulowana-zodiak-panna',
  '/produkt/brak-tytulu-2': '/product/bransoletka-regulowana-zodiak-lew',
  '/product/brak-tytulu-2': '/product/bransoletka-regulowana-zodiak-lew',
};

/** Misspellings found in current product URLs. Applied to whole path segments, globally. */
export const TYPO_FIXES: Array<[RegExp, string]> = [
  [/barnsoletk/g, 'bransoletk'],
  [/brasnoletk/g, 'bransoletk'],
  [/tumrmalin/g, 'turmalin'],
];

/** WordPress/WooCommerce permalink bases (PL and DE installs) mapped to WooNuxt routes. */
const BASE_MAP: Array<{ from: string; to: string; lastSegmentOnly?: boolean }> = [
  { from: '/produkt/', to: '/product/' },
  { from: '/kategoria-produktu/', to: '/product-category/', lastSegmentOnly: true },
  { from: '/produkt-kategorie/', to: '/product-category/', lastSegmentOnly: true },
  { from: '/product-category/', to: '/product-category/', lastSegmentOnly: true },
  { from: '/sklep/', to: '/products/' },
  { from: '/shop/', to: '/products/' },
];

const stripTrailingSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

/**
 * Returns the new path for a legacy one, or null when no redirect applies.
 * Pure function so it can be unit tested (see scripts/signor-redirects.test.mjs).
 */
export function resolveLegacyRedirect(pathname: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  const original = stripTrailingSlash(decoded);

  if (EXACT_REDIRECTS[original]) return EXACT_REDIRECTS[original];

  let path = original;

  const withSlash = `${path}/`;
  const base = BASE_MAP.find((entry) => withSlash.startsWith(entry.from));
  if (base) {
    let rest = path.slice(base.from.length).split('/').filter(Boolean);
    // Keep WooCommerce pagination (".../page/2") intact.
    const pageIndex = rest.indexOf('page');
    const pager = pageIndex > 0 && /^\d+$/.test(rest[pageIndex + 1] ?? '') ? rest.slice(pageIndex) : [];
    if (pager.length) rest = rest.slice(0, pageIndex);

    if (rest.length === 0) {
      path = stripTrailingSlash(base.to);
    } else {
      const kept = base.lastSegmentOnly ? rest.slice(-1) : rest;
      path = `${base.to}${[...kept, ...pager].join('/')}`;
    }
  }

  path = path
    .split('/')
    .map((segment) => TYPO_FIXES.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), segment))
    .join('/');

  if (path === original) return null;
  return EXACT_REDIRECTS[path] ?? path;
}

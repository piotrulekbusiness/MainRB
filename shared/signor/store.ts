/**
 * Signor Store: market configuration shared by the app and the server.
 *
 * The PL and DE stores are separate WooCommerce installations (signorstore.pl,
 * signorstore.de) with their own prices and catalogues, so each deployment of this
 * frontend serves exactly one market. The market is chosen at build time with the
 * STORE_LOCALE environment variable ("pl" or "de").
 */

export type Market = 'pl' | 'de';

/** Text in both store languages. */
export type Localized<T = string> = Record<Market, T>;

export const MARKETS: Record<
  Market,
  {
    i18nCode: string;
    htmlLang: string;
    origin: string;
    /** WooCommerce category that groups all zodiac bracelets (created in WP, see docs/SIGNOR.md). */
    zodiacCategorySlug: string;
    /** Frontend route prefixes for the SEO landing pages. */
    paths: { zodiac: string; stones: string };
    currency: string;
  }
> = {
  pl: {
    i18nCode: 'pl_PL',
    htmlLang: 'pl',
    origin: 'https://signorstore.pl',
    zodiacCategorySlug: 'znaki-zodiaku',
    paths: { zodiac: '/znaki-zodiaku', stones: '/kamienie' },
    currency: 'PLN',
  },
  de: {
    i18nCode: 'de_DE',
    htmlLang: 'de',
    origin: 'https://signorstore.de',
    zodiacCategorySlug: 'sternzeichen',
    paths: { zodiac: '/sternzeichen', stones: '/steine' },
    currency: 'EUR',
  },
};

export const resolveMarket = (value: unknown): Market => (value === 'de' ? 'de' : 'pl');

export const ORGANIZATION = {
  name: 'Signor Store',
  /** Correct handle. The old site linked to "singor_store", which does not exist. */
  instagram: 'https://www.instagram.com/signor_store/',
  addressLocality: 'Warszawa',
  addressCountry: 'PL',
  tagline: {
    pl: 'Męska biżuteria z kamieni naturalnych i znaków zodiaku, ręcznie robiona w warszawskim warsztacie.',
    de: 'Herrenschmuck aus Natursteinen und mit Sternzeichen, handgefertigt in unserer Werkstatt in Warschau.',
  } satisfies Localized,
};

/** Bracelet sizes offered in the shop (circumference of the wrist). */
export const BRACELET_SIZES = [
  { code: 'S', range: '16–17 cm' },
  { code: 'M', range: '18–19 cm' },
  { code: 'L', range: '20–21 cm' },
] as const;

export const ENGRAVING_MAX_CHARS = 10;

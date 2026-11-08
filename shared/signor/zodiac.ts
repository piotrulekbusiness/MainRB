import type { Localized, Market } from './store';

/**
 * The 12 zodiac signs and the bracelet stone assigned to each in the shop.
 *
 * Taken from the product descriptions in the PL shop (both lines, "BRANSOLETKA
 * ZODIAKI" and "BRANSOLETKA REGULOWANA ZODIAK", 119 zł, previously 139 zł):
 * Aries–tourmaline, Taurus–lapis lazuli, Gemini–tiger's eye, Cancer–opal, Leo–onyx,
 * Virgo–jasper, Libra–citrine, Scorpio–hematite, Sagittarius–amethyst,
 * Capricorn–garnet, Aquarius–turquoise, Pisces–aquamarine.
 *
 * Prices are intentionally NOT stored here: the frontend always shows the live price
 * from WooCommerce.
 */
export interface ZodiacSign {
  id: string;
  symbol: string;
  slug: Localized;
  name: Localized;
  /** Genitive/dative form for headings: "dla Barana" / "für Widder". */
  forSign: Localized;
  /** Inclusive start and end, as [month, day]. Capricorn wraps around the new year. */
  from: [number, number];
  to: [number, number];
  element: 'fire' | 'earth' | 'air' | 'water';
  stoneId: string | null;
  /** Regex sources matched against normalized product name + slug. */
  match: Localized<string[]>;
  /**
   * Optional: exact WooCommerce product slug of this sign's bracelet. When set, it
   * wins over name matching, so set it once the product slugs are cleaned up.
   */
  productSlug?: Partial<Localized>;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    symbol: '♈',
    slug: { pl: 'baran', de: 'widder' },
    name: { pl: 'Baran', de: 'Widder' },
    forSign: { pl: 'dla Barana', de: 'für Widder' },
    from: [3, 21],
    to: [4, 19],
    element: 'fire',
    stoneId: 'turmalin',
    match: { pl: ['\\bbaran'], de: ['\\bwidder'] },
  },
  {
    id: 'taurus',
    symbol: '♉',
    slug: { pl: 'byk', de: 'stier' },
    name: { pl: 'Byk', de: 'Stier' },
    forSign: { pl: 'dla Byka', de: 'für Stier' },
    from: [4, 20],
    to: [5, 20],
    element: 'earth',
    stoneId: 'lapis-lazuli',
    match: { pl: ['\\bbyk'], de: ['\\bstier'] },
  },
  {
    id: 'gemini',
    symbol: '♊',
    slug: { pl: 'bliznieta', de: 'zwillinge' },
    name: { pl: 'Bliźnięta', de: 'Zwillinge' },
    forSign: { pl: 'dla Bliźniąt', de: 'für Zwillinge' },
    from: [5, 21],
    to: [6, 20],
    element: 'air',
    stoneId: 'tygrysie-oko',
    match: { pl: ['\\bblizni'], de: ['\\bzwilling'] },
  },
  {
    id: 'cancer',
    symbol: '♋',
    slug: { pl: 'rak', de: 'krebs' },
    name: { pl: 'Rak', de: 'Krebs' },
    forSign: { pl: 'dla Raka', de: 'für Krebs' },
    from: [6, 21],
    to: [7, 22],
    element: 'water',
    stoneId: 'opal',
    match: { pl: ['\\braka?\\b'], de: ['\\bkrebs'] },
  },
  {
    id: 'leo',
    symbol: '♌',
    slug: { pl: 'lew', de: 'loewe' },
    name: { pl: 'Lew', de: 'Löwe' },
    forSign: { pl: 'dla Lwa', de: 'für Löwe' },
    from: [7, 23],
    to: [8, 22],
    element: 'fire',
    stoneId: 'onyks',
    match: { pl: ['\\blew\\b', '\\blwa\\b'], de: ['\\bloewe', '\\blowe'] },
  },
  {
    id: 'virgo',
    symbol: '♍',
    slug: { pl: 'panna', de: 'jungfrau' },
    name: { pl: 'Panna', de: 'Jungfrau' },
    forSign: { pl: 'dla Panny', de: 'für Jungfrau' },
    from: [8, 23],
    to: [9, 22],
    element: 'earth',
    stoneId: 'jaspis',
    match: { pl: ['\\bpann'], de: ['\\bjungfrau'] },
  },
  {
    id: 'libra',
    symbol: '♎',
    slug: { pl: 'waga', de: 'waage' },
    name: { pl: 'Waga', de: 'Waage' },
    forSign: { pl: 'dla Wagi', de: 'für Waage' },
    from: [9, 23],
    to: [10, 22],
    element: 'air',
    stoneId: 'cytryn',
    match: { pl: ['\\bwag[ia]?\\b'], de: ['\\bwaage'] },
  },
  {
    id: 'scorpio',
    symbol: '♏',
    slug: { pl: 'skorpion', de: 'skorpion' },
    name: { pl: 'Skorpion', de: 'Skorpion' },
    forSign: { pl: 'dla Skorpiona', de: 'für Skorpion' },
    from: [10, 23],
    to: [11, 21],
    element: 'water',
    stoneId: 'hematyt',
    match: { pl: ['\\bskorpion'], de: ['\\bskorpion'] },
  },
  {
    id: 'sagittarius',
    symbol: '♐',
    slug: { pl: 'strzelec', de: 'schuetze' },
    name: { pl: 'Strzelec', de: 'Schütze' },
    forSign: { pl: 'dla Strzelca', de: 'für Schütze' },
    from: [11, 22],
    to: [12, 21],
    element: 'fire',
    stoneId: 'ametyst',
    match: { pl: ['\\bstrzel'], de: ['\\bschutze', '\\bschuetze'] },
  },
  {
    id: 'capricorn',
    symbol: '♑',
    slug: { pl: 'koziorozec', de: 'steinbock' },
    name: { pl: 'Koziorożec', de: 'Steinbock' },
    forSign: { pl: 'dla Koziorożca', de: 'für Steinbock' },
    from: [12, 22],
    to: [1, 19],
    element: 'earth',
    stoneId: 'granat',
    match: { pl: ['\\bkozioro'], de: ['\\bsteinbock'] },
  },
  {
    id: 'aquarius',
    symbol: '♒',
    slug: { pl: 'wodnik', de: 'wassermann' },
    name: { pl: 'Wodnik', de: 'Wassermann' },
    forSign: { pl: 'dla Wodnika', de: 'für Wassermann' },
    from: [1, 20],
    to: [2, 18],
    element: 'air',
    stoneId: 'turkus',
    match: { pl: ['\\bwodni'], de: ['\\bwassermann'] },
  },
  {
    id: 'pisces',
    symbol: '♓',
    slug: { pl: 'ryby', de: 'fische' },
    name: { pl: 'Ryby', de: 'Fische' },
    forSign: { pl: 'dla Ryb', de: 'für Fische' },
    from: [2, 19],
    to: [3, 20],
    element: 'water',
    stoneId: 'akwamaryn',
    match: { pl: ['\\bryb'], de: ['\\bfisch'] },
  },
];

const toOrdinal = ([month, day]: [number, number]) => month * 100 + day;

/** Returns the sign for a calendar date. Month is 1–12. */
export function signForDate(month: number, day: number): ZodiacSign | undefined {
  if (!Number.isInteger(month) || !Number.isInteger(day) || month < 1 || month > 12 || day < 1 || day > 31) return undefined;
  const value = month * 100 + day;
  return ZODIAC_SIGNS.find((sign) => {
    const from = toOrdinal(sign.from);
    const to = toOrdinal(sign.to);
    return from <= to ? value >= from && value <= to : value >= from || value <= to;
  });
}

export const findSignBySlug = (market: Market, slug: string): ZodiacSign | undefined => ZODIAC_SIGNS.find((sign) => sign.slug[market] === slug);

/** Lowercase, strip diacritics (ł is not decomposed by NFD, so it is mapped by hand). */
export const normalizeText = (value: string): string => value.toLowerCase().replace(/ł/g, 'l').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[-_]+/g, ' ');

export function productMatchesSign(market: Market, sign: ZodiacSign, product: { name?: string | null; slug?: string | null }): boolean {
  const exact = sign.productSlug?.[market];
  if (exact) return product.slug === exact;
  const haystack = normalizeText(`${product.name ?? ''} ${product.slug ?? ''}`);
  return sign.match[market].some((source) => new RegExp(source).test(haystack));
}

export function productMatchesStems(stems: string[], product: { name?: string | null; slug?: string | null }): boolean {
  const haystack = normalizeText(`${product.name ?? ''} ${product.slug ?? ''}`);
  return stems.some((stem) => haystack.includes(stem));
}

const pad = (n: number) => String(n).padStart(2, '0');

/** "21.03 – 19.04" */
export const formatSignDates = (sign: ZodiacSign): string => `${pad(sign.from[1])}.${pad(sign.from[0])} – ${pad(sign.to[1])}.${pad(sign.to[0])}`;

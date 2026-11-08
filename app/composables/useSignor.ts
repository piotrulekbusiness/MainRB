import type { Product } from '#types/gql';
import { MARKETS, ORGANIZATION, resolveMarket, type Localized } from '#shared/signor/store';
import { STONES, findStoneById, type Stone } from '#shared/signor/stones';
import { ZODIAC_SIGNS, productMatchesSign, productMatchesStems, type ZodiacSign } from '#shared/signor/zodiac';

/** Market-aware helpers for the Signor Store pages. */
export function useSignor() {
  const config = useRuntimeConfig();
  const market = resolveMarket(config.public.STORE_LOCALE);
  const marketConfig = MARKETS[market];
  const origin = String(config.public.SIGNOR_ORIGIN || marketConfig.origin);

  const t = <T>(value: Localized<T>): T => value[market];
  const absolute = (path: string) => `${origin}${path.startsWith('/') ? path : `/${path}`}`;

  const signPath = (sign: ZodiacSign) => `${marketConfig.paths.zodiac}/${sign.slug[market]}`;
  const stonePath = (stone: Stone) => `${marketConfig.paths.stones}/${stone.slug[market]}`;
  const productPath = (product: Pick<Product, 'slug'>) => `/product/${product.slug}`;

  const stoneForSign = (sign: ZodiacSign) => findStoneById(sign.stoneId);
  const signsForStone = (stone: Stone) => ZODIAC_SIGNS.filter((sign) => sign.stoneId === stone.id);

  const productsForSign = (sign: ZodiacSign, products: Product[]) => {
    const matching = products.filter((product) => productMatchesSign(market, sign, product));
    const inZodiacCategory = (product: Product) =>
      (product.productCategories?.nodes ?? []).some((category: { slug?: string | null } | null) => category?.slug === marketConfig.zodiacCategorySlug);
    // Zodiac-category products first, then any other product named after the sign.
    return [...matching.filter(inZodiacCategory), ...matching.filter((product) => !inZodiacCategory(product))];
  };

  const productsForStone = (stone: Stone, products: Product[]) => products.filter((product) => productMatchesStems(stone.match[market], product));

  /** hreflang alternates for a page that exists in both stores. */
  const alternates = (paths: Localized) => [
    { rel: 'alternate' as const, hreflang: 'pl-PL', href: `${MARKETS.pl.origin}${paths.pl}` },
    { rel: 'alternate' as const, hreflang: 'de-DE', href: `${MARKETS.de.origin}${paths.de}` },
    { rel: 'alternate' as const, hreflang: 'x-default', href: `${MARKETS.pl.origin}${paths.pl}` },
  ];

  const breadcrumbJsonLd = (items: Array<{ name: string; path: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absolute(item.path) })),
  });

  const itemListJsonLd = (name: string, products: Product[]) => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absolute(productPath(product)),
      name: product.name,
    })),
  });

  return {
    market,
    marketConfig,
    origin,
    organization: ORGANIZATION,
    signs: ZODIAC_SIGNS,
    stones: STONES,
    t,
    absolute,
    signPath,
    stonePath,
    productPath,
    stoneForSign,
    signsForStone,
    productsForSign,
    productsForStone,
    alternates,
    breadcrumbJsonLd,
    itemListJsonLd,
  };
}

/** All published products of the store. The catalogue is small, so pages filter client-side of the query. */
export function useSignorCatalog() {
  return useAsyncGql('getProducts', { first: 500 });
}

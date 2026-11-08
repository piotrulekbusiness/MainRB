import { MARKETS, resolveMarket } from './shared/signor/store';

// One deployment per market: STORE_LOCALE=pl (signorstore.pl) or STORE_LOCALE=de (signorstore.de).
const market = resolveMarket(process.env.STORE_LOCALE);
const marketConfig = MARKETS[market];
const catalogIsrTtl = Number.parseInt(process.env.CATALOG_ISR_TTL || '3600', 10) || 3600;

export default defineNuxtConfig({
  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

  // modules/signor.ts is registered automatically (Nuxt scans the modules/ directory).

  app: {
    head: {
      htmlAttrs: { lang: marketConfig.htmlLang },
      link: [{ rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    },
  },

  runtimeConfig: {
    public: {
      STORE_LOCALE: market,
      // Canonical origin of this market's storefront (override with SIGNOR_ORIGIN, e.g. for staging).
      SIGNOR_ORIGIN: (process.env.SIGNOR_ORIGIN || marketConfig.origin).replace(/\/$/, ''),
    },
  },

  // Polish UI strings are added here (i18n/locales/pl-PL.json); German comes from the base layer.
  // The language switcher links to the other store's domain instead of switching in place,
  // because PL and DE are separate WooCommerce stores (prices, currency, catalogue).
  i18n: {
    locales: [{ code: 'pl_PL', file: 'pl-PL.json', name: 'Polski' }],
    langDir: 'locales',
    defaultLocale: marketConfig.i18nCode,
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
  },

  routeRules: {
    [marketConfig.paths.zodiac]: { isr: catalogIsrTtl },
    [`${marketConfig.paths.zodiac}/**`]: { isr: catalogIsrTtl },
    [marketConfig.paths.stones]: { isr: catalogIsrTtl },
    [`${marketConfig.paths.stones}/**`]: { isr: catalogIsrTtl },
  },

  /**
   * Depending on your servers capabilities, you may need to adjust the following settings.
   * It will affect the build time but also increase the reliability of the build process.
   * If you have a server with a lot of memory and CPU, you can remove the following settings.
   * @property {number} concurrency - How many pages to prerender at once
   * @property {number} interval - How long to wait between prerendering pages
   * @property {boolean} failOnError - This stops the build from failing but the page will not be statically generated
   */
  nitro: {
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
    },
  },
});

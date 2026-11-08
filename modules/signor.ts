import { createResolver, defineNuxtModule } from '@nuxt/kit';
import { MARKETS, resolveMarket } from '../shared/signor/store';

/**
 * Registers the market-specific SEO landing pages:
 *   PL: /znaki-zodiaku, /znaki-zodiaku/:sign, /kamienie, /kamienie/:stone
 *   DE: /sternzeichen, /sternzeichen/:sign, /steine, /steine/:stone
 *
 * Done in a module (not in nuxt.config `hooks`) so it adds to, and does not replace,
 * the `pages:extend` hook of the WooNuxt base layer.
 */
export default defineNuxtModule({
  meta: { name: 'signor' },
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const market = resolveMarket(process.env.STORE_LOCALE);
    const { paths } = MARKETS[market];

    nuxt.hook('pages:extend', (pages) => {
      const add = (name: string, path: string, file: string) => pages.push({ name, path, file: resolve(`../app/signor-pages/${file}`) });
      add('signor-zodiac', paths.zodiac, 'ZodiacIndex.vue');
      add('signor-zodiac-sign', `${paths.zodiac}/:sign`, 'ZodiacSign.vue');
      add('signor-stones', paths.stones, 'StonesIndex.vue');
      add('signor-stone', `${paths.stones}/:stone`, 'StonePage.vue');
    });
  },
});

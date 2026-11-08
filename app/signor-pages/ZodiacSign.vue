<script setup lang="ts">
import type { Product } from '#types/gql';
import { findSignBySlug, formatSignDates, ZODIAC_SIGNS } from '#shared/signor/zodiac';
import { BRACELET_SIZES, ENGRAVING_MAX_CHARS, MARKETS } from '#shared/signor/store';

const route = useRoute();
const { market, marketConfig, t, absolute, signPath, stonePath, stoneForSign, productsForSign, breadcrumbJsonLd, itemListJsonLd, alternates } = useSignor();

const sign = findSignBySlug(market, String(route.params.sign));
if (!sign) throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true });

const stone = stoneForSign(sign);
const { data } = await useSignorCatalog();
const products = computed<Product[]>(() => productsForSign(sign, (data.value?.products?.nodes ?? []) as Product[]));

const index = ZODIAC_SIGNS.indexOf(sign);
const prev = ZODIAC_SIGNS[(index + 11) % 12]!;
const next = ZODIAC_SIGNS[(index + 1) % 12]!;

const name = t(sign.name);
const dates = formatSignDates(sign);
const stoneName = stone ? t(stone.name) : '';

const copy = {
  h1: { pl: `Bransoletka ${t(sign.forSign)}`, de: `Armband ${t(sign.forSign)}` },
  metaTitle: {
    pl: stone ? `Bransoletka ${t(sign.forSign)} ${t(stone.fromStone)} – znak zodiaku ${name}` : `Bransoletka ${t(sign.forSign)} – znak zodiaku ${name}`,
    de: stone ? `Sternzeichen-Armband ${name} ${t(stone.fromStone)}` : `Sternzeichen-Armband ${name}`,
  },
  metaDescription: {
    pl: `Męska bransoletka dla znaku ${name} (${dates})${stone ? ` z kamienia naturalnego: ${stoneName.toLowerCase()}` : ''}. Rozmiary S–L, grawer do ${ENGRAVING_MAX_CHARS} znaków, ręcznie robiona w Warszawie.`,
    de: `Herrenarmband für das Sternzeichen ${name} (${dates})${stone ? ` aus Naturstein: ${stoneName}` : ''}. Größen S–L, Gravur bis ${ENGRAVING_MAX_CHARS} Zeichen, handgefertigt in Warschau.`,
  },
  dates: { pl: 'Daty urodzenia', de: 'Geburtsdaten' },
  stone: { pl: 'Kamień', de: 'Stein' },
  stoneSoon: { pl: 'Kamień dla tego znaku uzupełnimy wkrótce.', de: 'Der Stein für dieses Zeichen folgt in Kürze.' },
  sizes: { pl: 'Rozmiary', de: 'Größen' },
  products: { pl: `Bransoletki ${t(sign.forSign)}`, de: `Armbänder ${t(sign.forSign)}` },
  noProducts: { pl: 'Produkty dla tego znaku pojawią się wkrótce.', de: 'Produkte für dieses Sternzeichen folgen in Kürze.' },
  home: { pl: 'Strona główna', de: 'Startseite' },
  zodiac: { pl: 'Znaki zodiaku', de: 'Sternzeichen' },
  other: { pl: 'Pozostałe znaki', de: 'Weitere Sternzeichen' },
  aboutStone: { pl: 'Więcej o kamieniu', de: 'Mehr über den Stein' },
};

const path = signPath(sign);
const crumbs = [
  { name: t(copy.home), path: '/' },
  { name: t(copy.zodiac), path: marketConfig.paths.zodiac },
  { name, path },
];

useSeoMeta({
  title: t(copy.metaTitle),
  description: t(copy.metaDescription),
  ogTitle: t(copy.metaTitle),
  ogDescription: t(copy.metaDescription),
  ogUrl: absolute(path),
  ogImage: () => products.value[0]?.image?.sourceUrl ?? undefined,
});

useHead(() => ({
  link: [
    { rel: 'canonical', href: absolute(path) },
    ...alternates({ pl: `${MARKETS.pl.paths.zodiac}/${sign.slug.pl}`, de: `${MARKETS.de.paths.zodiac}/${sign.slug.de}` }),
  ],
  script: [
    { key: 'ld-breadcrumb', type: 'application/ld+json' as const, innerHTML: JSON.stringify(breadcrumbJsonLd(crumbs)) },
    ...(products.value.length
      ? [{ key: 'ld-itemlist', type: 'application/ld+json' as const, innerHTML: JSON.stringify(itemListJsonLd(t(copy.products), products.value)) }]
      : []),
  ],
}));
</script>

<template>
  <main class="container my-8">
    <nav :aria-label="market === 'pl' ? 'Okruszki' : 'Brotkrümel'" class="text-sm text-gray-500">
      <ol class="flex flex-wrap gap-2">
        <li v-for="(crumb, i) in crumbs" :key="crumb.path">
          <NuxtLink v-if="i < crumbs.length - 1" :to="crumb.path" class="hover:underline">{{ crumb.name }}</NuxtLink>
          <span v-else aria-current="page">{{ crumb.name }}</span>
          <span v-if="i < crumbs.length - 1" aria-hidden="true"> / </span>
        </li>
      </ol>
    </nav>

    <header class="grid gap-6 mt-6 md:grid-cols-[auto_1fr] items-center">
      <span aria-hidden="true" class="text-7xl">{{ sign.symbol }}</span>
      <div>
        <h1 class="text-3xl font-bold md:text-4xl">{{ t(copy.h1) }}</h1>
        <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 mt-4 text-gray-700">
          <dt class="font-medium">{{ t(copy.dates) }}</dt>
          <dd>{{ dates }}</dd>
          <dt class="font-medium">{{ t(copy.stone) }}</dt>
          <dd>
            <NuxtLink v-if="stone" :to="stonePath(stone)" class="underline">{{ stoneName }}</NuxtLink>
            <span v-else>—</span>
          </dd>
          <dt class="font-medium">{{ t(copy.sizes) }}</dt>
          <dd>{{ BRACELET_SIZES.map((s) => `${s.code} ${s.range}`).join(' · ') }}</dd>
        </dl>
      </div>
    </header>

    <section v-if="stone" class="p-6 mt-8 bg-white rounded-xl max-w-3xl">
      <h2 class="text-xl font-semibold">{{ stoneName }}</h2>
      <p class="mt-2 text-gray-700">{{ t(stone.intro) }} {{ t(stone.description) }}</p>
      <NuxtLink :to="stonePath(stone)" class="inline-block mt-3 font-semibold underline">{{ t(copy.aboutStone) }}</NuxtLink>
    </section>
    <p v-else class="mt-8 text-gray-600">{{ t(copy.stoneSoon) }}</p>

    <section class="my-12" aria-labelledby="sign-products">
      <h2 id="sign-products" class="mb-6 text-2xl font-semibold">{{ t(copy.products) }}</h2>
      <div v-if="products.length" class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard v-for="(node, i) in products" :key="node.databaseId" :node="node" :index="i" />
      </div>
      <p v-else class="text-gray-600">{{ t(copy.noProducts) }}</p>
    </section>

    <nav class="flex justify-between gap-4 py-6 border-t border-gray-200" :aria-label="t(copy.other)">
      <NuxtLink :to="signPath(prev)" class="font-medium hover:underline">← {{ prev.symbol }} {{ t(prev.name) }}</NuxtLink>
      <NuxtLink :to="signPath(next)" class="font-medium hover:underline">{{ t(next.name) }} {{ next.symbol }} →</NuxtLink>
    </nav>
  </main>
</template>

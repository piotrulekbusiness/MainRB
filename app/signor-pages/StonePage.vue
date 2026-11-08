<script setup lang="ts">
import type { Product } from '#types/gql';
import { findStoneBySlug } from '#shared/signor/stones';
import { MARKETS } from '#shared/signor/store';

const route = useRoute();
const { market, marketConfig, t, absolute, signPath, stonePath, signsForStone, productsForStone, breadcrumbJsonLd, itemListJsonLd, alternates } = useSignor();

const stone = findStoneBySlug(market, String(route.params.stone));
if (!stone) throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true });

const signs = signsForStone(stone);
const { data } = await useSignorCatalog();
const products = computed<Product[]>(() => productsForStone(stone, (data.value?.products?.nodes ?? []) as Product[]));

const name = t(stone.name);
const copy = {
  h1: { pl: `${name} – bransoletki męskie ${t(stone.fromStone)}`, de: `${name} – Herrenarmbänder ${t(stone.fromStone)}` },
  metaTitle: { pl: `${name}: znaczenie, wygląd i bransoletki męskie`, de: `${name}: Bedeutung, Aussehen und Herrenarmbänder` },
  metaDescription: {
    pl: `${t(stone.intro)} Zobacz męskie bransoletki ${t(stone.fromStone)}, ręcznie robione w Warszawie.`,
    de: `${t(stone.intro)} Entdecke Herrenarmbänder ${t(stone.fromStone)}, handgefertigt in Warschau.`,
  },
  signs: { pl: 'Znak zodiaku', de: 'Sternzeichen' },
  products: { pl: `Biżuteria ${t(stone.fromStone)}`, de: `Schmuck ${t(stone.fromStone)}` },
  noProducts: { pl: 'Produkty z tym kamieniem pojawią się wkrótce.', de: 'Produkte mit diesem Stein folgen in Kürze.' },
  home: { pl: 'Strona główna', de: 'Startseite' },
  stones: { pl: 'Kamienie', de: 'Steine' },
  otherStones: { pl: 'Inne kamienie', de: 'Weitere Steine' },
};

const path = stonePath(stone);
const crumbs = [
  { name: t(copy.home), path: '/' },
  { name: t(copy.stones), path: marketConfig.paths.stones },
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
    ...alternates({ pl: `${MARKETS.pl.paths.stones}/${stone.slug.pl}`, de: `${MARKETS.de.paths.stones}/${stone.slug.de}` }),
  ],
  script: [
    { key: 'ld-breadcrumb', type: 'application/ld+json' as const, innerHTML: JSON.stringify(breadcrumbJsonLd(crumbs)) },
    ...(products.value.length
      ? [{ key: 'ld-itemlist', type: 'application/ld+json' as const, innerHTML: JSON.stringify(itemListJsonLd(t(copy.products), products.value)) }]
      : []),
  ],
}));

const { stones } = useSignor();
const otherStones = stones.filter((s) => s.id !== stone.id);
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

    <header class="mt-6 max-w-3xl">
      <h1 class="text-3xl font-bold md:text-4xl">{{ t(copy.h1) }}</h1>
      <p class="mt-4 text-lg text-gray-700">{{ t(stone.intro) }}</p>
      <p class="mt-3 text-gray-700">{{ t(stone.description) }}</p>
      <p v-if="signs.length" class="mt-4">
        <span class="font-medium">{{ t(copy.signs) }}:</span>
        <template v-for="(sign, i) in signs" :key="sign.id">
          <NuxtLink :to="signPath(sign)" class="underline"
            ><span aria-hidden="true">{{ sign.symbol }}</span> {{ t(sign.name) }}</NuxtLink
          ><span v-if="i < signs.length - 1">, </span>
        </template>
      </p>
    </header>

    <section class="my-12" aria-labelledby="stone-products">
      <h2 id="stone-products" class="mb-6 text-2xl font-semibold">{{ t(copy.products) }}</h2>
      <div v-if="products.length" class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard v-for="(node, i) in products" :key="node.databaseId" :node="node" :index="i" />
      </div>
      <p v-else class="text-gray-600">{{ t(copy.noProducts) }}</p>
    </section>

    <nav class="py-6 border-t border-gray-200" :aria-label="t(copy.otherStones)">
      <h2 class="mb-3 font-semibold">{{ t(copy.otherStones) }}</h2>
      <ul class="flex flex-wrap gap-3">
        <li v-for="other in otherStones" :key="other.id">
          <NuxtLink :to="stonePath(other)" class="inline-block px-4 py-2 bg-white rounded-full hover:shadow">{{ t(other.name) }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

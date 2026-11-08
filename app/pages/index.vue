<script lang="ts" setup>
import type { Product } from '#types/gql';
import { FAQ } from '#shared/signor/faq';
import { BRACELET_SIZES, ENGRAVING_MAX_CHARS } from '#shared/signor/store';

const { market, marketConfig, organization, origin, signs, t, absolute, productsForSign, itemListJsonLd, alternates } = useSignor();
const { data } = await useSignorCatalog();

const products = computed<Product[]>(() => (data.value?.products?.nodes ?? []) as Product[]);
/** One bracelet per sign, in zodiac order. */
const zodiacBracelets = computed(() => signs.map((sign) => productsForSign(sign, products.value)[0]).filter((p): p is Product => Boolean(p)));
const heroProduct = computed(() => zodiacBracelets.value[0] ?? products.value[0]);

const copy = {
  title: {
    pl: 'Męskie bransoletki zodiakalne z kamieni naturalnych',
    de: 'Sternzeichen-Armbänder für Herren aus Natursteinen',
  },
  metaTitle: {
    pl: 'Bransoletki męskie ze znakiem zodiaku i kamieniem naturalnym',
    de: 'Herrenarmbänder mit Sternzeichen und Naturstein',
  },
  metaDescription: {
    pl: 'Męska biżuteria z kamieni naturalnych dobranych do znaku zodiaku. Sprawdź swój znak po dacie urodzenia, wybierz rozmiar i dodaj grawer. Ręcznie robione w Warszawie.',
    de: 'Herrenschmuck aus Natursteinen passend zum Sternzeichen. Finde dein Zeichen über das Geburtsdatum, wähle die Größe und füge eine Gravur hinzu. Handgefertigt in Warschau.',
  },
  cta: { pl: 'Sprawdź swój znak', de: 'Sternzeichen finden' },
  allProducts: { pl: 'Wszystkie produkty', de: 'Alle Produkte' },
  signsTitle: { pl: '12 znaków zodiaku', de: 'Die 12 Sternzeichen' },
  signsAll: { pl: 'Wszystkie znaki', de: 'Alle Sternzeichen' },
  braceletsTitle: { pl: 'Bransoletki zodiakalne', de: 'Sternzeichen-Armbänder' },
  stonesTitle: { pl: 'Przewodnik po kamieniach', de: 'Steine im Überblick' },
  stonesAll: { pl: 'Wszystkie kamienie', de: 'Alle Steine' },
  faqTitle: { pl: 'Najczęstsze pytania', de: 'Häufige Fragen' },
  usp: {
    pl: [
      { title: 'Rozmiary S, M, L', text: BRACELET_SIZES.map((s) => `${s.code}: ${s.range}`).join(' · ') },
      { title: 'Grawer', text: `Imię lub data, do ${ENGRAVING_MAX_CHARS} znaków.` },
      { title: 'Na prezent', text: 'Kartka z życzeniami i rozszerzona gwarancja do wyboru.' },
      { title: 'Warsztat w Warszawie', text: 'Każda bransoletka jest robiona ręcznie.' },
    ],
    de: [
      { title: 'Größen S, M, L', text: BRACELET_SIZES.map((s) => `${s.code}: ${s.range}`).join(' · ') },
      { title: 'Gravur', text: `Name oder Datum, bis zu ${ENGRAVING_MAX_CHARS} Zeichen.` },
      { title: 'Als Geschenk', text: 'Grußkarte und erweiterte Garantie wählbar.' },
      { title: 'Werkstatt in Warschau', text: 'Jedes Armband ist Handarbeit.' },
    ],
  },
};

useSeoMeta({
  title: t(copy.metaTitle),
  description: t(copy.metaDescription),
  ogTitle: t(copy.metaTitle),
  ogDescription: t(copy.metaDescription),
  ogImage: () => heroProduct.value?.image?.sourceUrl ?? undefined,
  ogUrl: absolute('/'),
  twitterCard: 'summary_large_image',
});

useHead(() => ({
  link: [{ rel: 'canonical', href: absolute('/') }, ...alternates({ pl: '/', de: '/' })],
  script: [
    {
      key: 'ld-organization',
      type: 'application/ld+json' as const,
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: organization.name,
        url: origin,
        logo: absolute('/logo.svg'),
        description: t(organization.tagline),
        sameAs: [organization.instagram],
        address: { '@type': 'PostalAddress', addressLocality: organization.addressLocality, addressCountry: organization.addressCountry },
      }),
    },
    {
      key: 'ld-website',
      type: 'application/ld+json' as const,
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: organization.name,
        url: origin,
        inLanguage: marketConfig.htmlLang,
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${origin}/products?search={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      key: 'ld-faq',
      type: 'application/ld+json' as const,
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((item) => ({
          '@type': 'Question',
          name: item.question[market],
          acceptedAnswer: { '@type': 'Answer', text: item.answer[market] },
        })),
      }),
    },
    ...(zodiacBracelets.value.length
      ? [{ key: 'ld-itemlist', type: 'application/ld+json' as const, innerHTML: JSON.stringify(itemListJsonLd(t(copy.braceletsTitle), zodiacBracelets.value)) }]
      : []),
  ],
}));
</script>

<template>
  <main>
    <section class="container grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
      <div>
        <h1 class="text-3xl font-bold md:text-5xl text-balance">{{ t(copy.title) }}</h1>
        <p class="mt-4 text-lg text-gray-700 max-w-prose">{{ t(organization.tagline) }}</p>
        <div class="flex flex-wrap gap-3 mt-8">
          <a href="#znak" class="px-6 py-3 font-bold text-white bg-gray-900 rounded-xl">{{ t(copy.cta) }}</a>
          <NuxtLink to="/products" class="px-6 py-3 font-bold border border-gray-900 rounded-xl">{{ t(copy.allProducts) }}</NuxtLink>
        </div>
      </div>
      <NuxtLink v-if="heroProduct?.image?.sourceUrl" :to="`/product/${heroProduct.slug}`" class="block">
        <NuxtImg
          :src="heroProduct.image.sourceUrl"
          :alt="heroProduct.image.altText || heroProduct.name || ''"
          width="640"
          height="640"
          loading="eager"
          fetchpriority="high"
          sizes="sm:100vw md:50vw lg:640px"
          class="object-cover w-full rounded-2xl aspect-square" />
      </NuxtLink>
    </section>

    <div class="container">
      <ZodiacFinder :products="products" />
    </div>

    <section class="container my-16" aria-labelledby="signs-title">
      <div class="flex items-end justify-between mb-6">
        <h2 id="signs-title" class="text-2xl font-semibold">{{ t(copy.signsTitle) }}</h2>
        <NuxtLink class="text-primary-dark" :to="marketConfig.paths.zodiac">{{ t(copy.signsAll) }}</NuxtLink>
      </div>
      <ZodiacGrid />
    </section>

    <section v-if="zodiacBracelets.length" class="container my-16" aria-labelledby="bracelets-title">
      <h2 id="bracelets-title" class="mb-6 text-2xl font-semibold">{{ t(copy.braceletsTitle) }}</h2>
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
        <ProductCard v-for="(node, i) in zodiacBracelets" :key="node.databaseId" :node="node" :index="i" />
      </div>
    </section>

    <section class="container my-16" aria-labelledby="stones-title">
      <div class="flex items-end justify-between mb-6">
        <h2 id="stones-title" class="text-2xl font-semibold">{{ t(copy.stonesTitle) }}</h2>
        <NuxtLink class="text-primary-dark" :to="marketConfig.paths.stones">{{ t(copy.stonesAll) }}</NuxtLink>
      </div>
      <StoneGuide />
    </section>

    <section class="container grid gap-4 my-16 md:grid-cols-2 lg:grid-cols-4">
      <div v-for="item in t(copy.usp)" :key="item.title" class="p-6 bg-white rounded-xl">
        <h3 class="font-semibold">{{ item.title }}</h3>
        <p class="mt-1 text-sm text-gray-600">{{ item.text }}</p>
      </div>
    </section>

    <section class="container max-w-3xl my-16" aria-labelledby="faq-title">
      <h2 id="faq-title" class="mb-6 text-2xl font-semibold">{{ t(copy.faqTitle) }}</h2>
      <SignorFaq />
    </section>
  </main>
</template>

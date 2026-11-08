<script setup lang="ts">
import { MARKETS } from '#shared/signor/store';

const { marketConfig, t, absolute, breadcrumbJsonLd, alternates } = useSignor();

const copy = {
  h1: { pl: 'Kamienie naturalne w naszej biżuterii', de: 'Natursteine in unserem Schmuck' },
  metaTitle: { pl: 'Kamienie naturalne – przewodnik i bransoletki męskie', de: 'Natursteine – Ratgeber und Herrenarmbänder' },
  metaDescription: {
    pl: 'Onyks, hematyt, tygrysie oko, lapis lazuli i inne kamienie naturalne. Poznaj ich wygląd i symbolikę oraz bransoletki męskie, w których je stosujemy.',
    de: 'Onyx, Hämatit, Tigerauge, Lapislazuli und weitere Natursteine. Lerne Aussehen und Symbolik kennen und entdecke die Herrenarmbänder, in denen wir sie verwenden.',
  },
  lead: {
    pl: 'Używamy wyłącznie kamieni naturalnych. Każdy koralik ma własny rysunek, dlatego dwie bransoletki nigdy nie są identyczne.',
    de: 'Wir verwenden ausschließlich Natursteine. Jede Perle hat ihre eigene Zeichnung, daher gleicht kein Armband dem anderen.',
  },
  home: { pl: 'Strona główna', de: 'Startseite' },
};

const path = marketConfig.paths.stones;
const crumbs = [
  { name: t(copy.home), path: '/' },
  { name: t(copy.h1), path },
];

useSeoMeta({
  title: t(copy.metaTitle),
  description: t(copy.metaDescription),
  ogTitle: t(copy.metaTitle),
  ogDescription: t(copy.metaDescription),
  ogUrl: absolute(path),
});
useHead({
  link: [{ rel: 'canonical', href: absolute(path) }, ...alternates({ pl: MARKETS.pl.paths.stones, de: MARKETS.de.paths.stones })],
  script: [{ key: 'ld-breadcrumb', type: 'application/ld+json' as const, innerHTML: JSON.stringify(breadcrumbJsonLd(crumbs)) }],
});
</script>

<template>
  <main class="container my-8">
    <h1 class="text-3xl font-bold md:text-4xl">{{ t(copy.h1) }}</h1>
    <p class="mt-3 text-gray-700 max-w-prose">{{ t(copy.lead) }}</p>
    <div class="mt-8">
      <StoneGuide />
    </div>
  </main>
</template>

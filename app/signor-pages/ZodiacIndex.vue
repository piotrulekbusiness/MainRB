<script setup lang="ts">
import { MARKETS } from '#shared/signor/store';

const { marketConfig, t, absolute, breadcrumbJsonLd, alternates } = useSignor();

const copy = {
  h1: { pl: 'Bransoletki ze znakami zodiaku', de: 'Armbänder mit Sternzeichen' },
  metaTitle: { pl: 'Znaki zodiaku – męskie bransoletki z kamieni naturalnych', de: 'Sternzeichen – Herrenarmbänder aus Natursteinen' },
  metaDescription: {
    pl: 'Wybierz swój znak zodiaku i poznaj przypisany mu kamień naturalny. Męskie bransoletki zodiakalne ręcznie robione w Warszawie, z grawerem do 10 znaków.',
    de: 'Wähle dein Sternzeichen und entdecke den passenden Naturstein. Sternzeichen-Armbänder für Herren, handgefertigt in Warschau, mit Gravur bis 10 Zeichen.',
  },
  lead: {
    pl: 'Każdemu znakowi przypisaliśmy kamień naturalny. Wybierz znak, aby zobaczyć bransoletki, daty urodzenia i opis kamienia.',
    de: 'Jedem Sternzeichen haben wir einen Naturstein zugeordnet. Wähle dein Zeichen für Armbänder, Geburtsdaten und die Beschreibung des Steins.',
  },
  home: { pl: 'Strona główna', de: 'Startseite' },
};

const path = marketConfig.paths.zodiac;
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
  link: [{ rel: 'canonical', href: absolute(path) }, ...alternates({ pl: MARKETS.pl.paths.zodiac, de: MARKETS.de.paths.zodiac })],
  script: [{ key: 'ld-breadcrumb', type: 'application/ld+json' as const, innerHTML: JSON.stringify(breadcrumbJsonLd(crumbs)) }],
});
</script>

<template>
  <main class="container my-8">
    <h1 class="text-3xl font-bold md:text-4xl">{{ t(copy.h1) }}</h1>
    <p class="mt-3 text-gray-700 max-w-prose">{{ t(copy.lead) }}</p>
    <div class="mt-8">
      <ZodiacGrid heading-level="h2" />
    </div>
  </main>
</template>

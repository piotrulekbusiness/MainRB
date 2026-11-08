<script setup lang="ts">
// Overrides woonuxt_base MainMenu: zodiac and stone landing pages first.
// Shown permanently in the header (see AppHeader override), so no mobile-only links here.
const { marketConfig, t } = useSignor();

const labels = {
  zodiac: { pl: 'Znaki zodiaku', de: 'Sternzeichen' },
  stones: { pl: 'Kamienie', de: 'Steine' },
  all: { pl: 'Sklep', de: 'Shop' },
};
</script>

<template>
  <nav>
    <NuxtLink active-class="text-gray-900 font-semibold" :to="marketConfig.paths.zodiac">{{ t(labels.zodiac) }}</NuxtLink>
    <NuxtLink active-class="text-gray-900 font-semibold" :to="marketConfig.paths.stones">{{ t(labels.stones) }}</NuxtLink>
    <NuxtLink active-class="text-gray-900 font-semibold" to="/products">{{ t(labels.all) }}</NuxtLink>
    <NuxtLink active-class="text-gray-900 font-semibold" to="/categories">{{ $t('shop.category', 2) }}</NuxtLink>
    <NuxtLink active-class="text-gray-900 font-semibold" to="/contact">{{ $t('general.contact') }}</NuxtLink>
  </nav>
</template>

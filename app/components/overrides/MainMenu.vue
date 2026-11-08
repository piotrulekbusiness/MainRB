<script setup lang="ts">
// Overrides woonuxt_base MainMenu: adds the zodiac and stone landing pages.
const { navigateToLogin } = useAuth();
const route = useRoute();
const { marketConfig, t } = useSignor();

const labels = {
  zodiac: { pl: 'Znaki zodiaku', de: 'Sternzeichen' },
  stones: { pl: 'Kamienie', de: 'Steine' },
  all: { pl: 'Sklep', de: 'Shop' },
};
</script>

<template>
  <nav>
    <NuxtLink :to="marketConfig.paths.zodiac">{{ t(labels.zodiac) }}</NuxtLink>
    <NuxtLink :to="marketConfig.paths.stones">{{ t(labels.stones) }}</NuxtLink>
    <NuxtLink to="/products">{{ t(labels.all) }}</NuxtLink>
    <NuxtLink to="/categories">{{ $t('shop.category', 2) }}</NuxtLink>
    <NuxtLink to="/contact">{{ $t('general.contact') }}</NuxtLink>
    <NuxtLink class="lg:hidden" to="/wishlist" :prefetch="false">{{ $t('shop.wishlist') }}</NuxtLink>
    <NuxtLink class="lg:hidden" to="/my-account" :prefetch="false" @click="navigateToLogin(route.fullPath)">{{ $t('account.myAccount') }}</NuxtLink>
  </nav>
</template>

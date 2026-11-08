<script setup lang="ts">
// Overrides woonuxt_base AppFooter: Signor Store links and the correct Instagram handle (signor_store).
const { marketConfig, organization, signs, stones, t, signPath, stonePath } = useSignor();

const labels = {
  zodiac: { pl: 'Znaki zodiaku', de: 'Sternzeichen' },
  stones: { pl: 'Kamienie', de: 'Steine' },
  shop: { pl: 'Sklep', de: 'Shop' },
  workshop: { pl: 'Warsztat w Warszawie', de: 'Werkstatt in Warschau' },
};
</script>

<template>
  <footer class="bg-white order-last">
    <div class="container grid gap-12 my-16 md:grid-cols-2 lg:grid-cols-5">
      <div class="lg:col-span-2">
        <Logo />
        <p class="mt-4 text-sm text-gray-700 max-w-sm">{{ t(organization.tagline) }}</p>
        <p class="mt-2 text-sm text-gray-500">{{ t(labels.workshop) }}</p>
        <a
          :href="organization.instagram"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline"
          aria-label="Instagram @signor_store">
          <Icon name="ion:logo-instagram" size="20" aria-hidden="true" /> @signor_store
        </a>
        <div class="mt-6">
          <LangSwitcher />
        </div>
      </div>

      <nav :aria-label="t(labels.zodiac)">
        <NuxtLink :to="marketConfig.paths.zodiac" class="block mb-2 font-semibold text-gray-900">{{ t(labels.zodiac) }}</NuxtLink>
        <ul class="grid grid-cols-2 gap-x-4 text-sm text-gray-700">
          <li v-for="sign in signs" :key="sign.id">
            <NuxtLink :to="signPath(sign)" class="py-1 block hover:underline">{{ t(sign.name) }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <nav :aria-label="t(labels.stones)">
        <NuxtLink :to="marketConfig.paths.stones" class="block mb-2 font-semibold text-gray-900">{{ t(labels.stones) }}</NuxtLink>
        <ul class="text-sm text-gray-700">
          <li v-for="stone in stones" :key="stone.id">
            <NuxtLink :to="stonePath(stone)" class="py-1 block hover:underline">{{ t(stone.name) }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <nav :aria-label="$t('general.customerService')">
        <div class="mb-2 font-semibold text-gray-900">{{ $t('general.customerService') }}</div>
        <ul class="text-sm text-gray-700">
          <li>
            <NuxtLink to="/products" class="py-1 block hover:underline">{{ t(labels.shop) }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="py-1 block hover:underline">{{ $t('general.contactUs') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/my-account/" class="py-1 block hover:underline">{{ $t('account.myAccount') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/wishlist" class="py-1 block hover:underline">{{ $t('shop.wishlist') }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container py-6 text-xs text-center text-gray-500 border-t border-gray-200">© {{ new Date().getFullYear() }} {{ organization.name }}</div>

    <!-- Hook: Bottom of footer -->
    <HookOutlet name="layout.footer.bottom" as="div" />
  </footer>
</template>

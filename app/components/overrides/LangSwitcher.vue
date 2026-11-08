<script setup lang="ts">
// Overrides woonuxt_base LangSwitcher. PL and DE are separate stores on separate domains,
// so switching language means going to the other store's homepage.
import { MARKETS } from '#shared/signor/store';

const { market } = useSignor();
const items = [
  { code: 'pl' as const, label: 'PL', name: 'Polski', href: `${MARKETS.pl.origin}/` },
  { code: 'de' as const, label: 'DE', name: 'Deutsch', href: `${MARKETS.de.origin}/` },
];
</script>

<template>
  <ul class="flex gap-2 text-sm font-medium" aria-label="Language">
    <li v-for="item in items" :key="item.code">
      <span v-if="item.code === market" class="px-2 py-1 bg-gray-900 text-white rounded" aria-current="true" :title="item.name">{{ item.label }}</span>
      <a v-else :href="item.href" :hreflang="item.code" :title="item.name" class="px-2 py-1 border border-gray-300 rounded hover:border-gray-900">{{
        item.label
      }}</a>
    </li>
  </ul>
</template>

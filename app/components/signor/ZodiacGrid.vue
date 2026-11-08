<script setup lang="ts">
import { formatSignDates } from '#shared/signor/zodiac';

defineProps({
  headingLevel: { type: String as PropType<'h2' | 'h3'>, default: 'h3' },
});

const { signs, t, signPath, stoneForSign } = useSignor();
</script>

<template>
  <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
    <li v-for="sign in signs" :key="sign.id">
      <NuxtLink :to="signPath(sign)" class="flex flex-col h-full gap-1 p-4 transition bg-white rounded-xl hover:shadow-md focus-visible:shadow-md">
        <span aria-hidden="true" class="text-3xl">{{ sign.symbol }}</span>
        <component :is="headingLevel" class="font-semibold">{{ t(sign.name) }}</component>
        <span class="text-xs text-gray-500">{{ formatSignDates(sign) }}</span>
        <span class="mt-auto text-sm text-gray-700">{{ stoneForSign(sign) ? t(stoneForSign(sign)!.name) : '—' }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

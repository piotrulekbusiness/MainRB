<script setup lang="ts">
import type { Product } from '#types/gql';
import { signForDate } from '#shared/signor/zodiac';

const props = defineProps({
  products: { type: Array as PropType<Product[]>, default: () => [] },
});

const { market, t, signPath, stonePath, stoneForSign, productsForSign, productPath } = useSignor();

const copy = {
  title: { pl: 'Znajdź swój znak i kamień', de: 'Finde dein Sternzeichen und deinen Stein' },
  lead: {
    pl: 'Podaj datę urodzenia, a pokażemy Twój znak zodiaku, jego kamień i pasującą bransoletkę.',
    de: 'Gib dein Geburtsdatum ein und wir zeigen dir dein Sternzeichen, seinen Stein und das passende Armband.',
  },
  day: { pl: 'Dzień', de: 'Tag' },
  month: { pl: 'Miesiąc', de: 'Monat' },
  yourSign: { pl: 'Twój znak', de: 'Dein Sternzeichen' },
  stone: { pl: 'Kamień', de: 'Stein' },
  stoneSoon: { pl: 'Kamień dla tego znaku wkrótce', de: 'Stein für dieses Zeichen folgt in Kürze' },
  seeSign: { pl: 'Zobacz bransoletki', de: 'Armbänder ansehen' },
  seeProduct: { pl: 'Zobacz bransoletkę', de: 'Armband ansehen' },
  invalid: { pl: 'Taka data nie istnieje.', de: 'Dieses Datum existiert nicht.' },
};

const monthNames = computed(() =>
  Array.from({ length: 12 }, (_, index) => new Intl.DateTimeFormat(market === 'de' ? 'de-DE' : 'pl-PL', { month: 'long' }).format(new Date(2000, index, 1))),
);

const day = ref<number | ''>('');
const month = ref<number | ''>('');

const daysInMonth = computed(() => (month.value ? new Date(2000, month.value, 0).getDate() : 31));
const isInvalid = computed(() => Boolean(day.value && month.value && day.value > daysInMonth.value));
const sign = computed(() => (day.value && month.value && !isInvalid.value ? signForDate(month.value, day.value) : undefined));
const stone = computed(() => (sign.value ? stoneForSign(sign.value) : undefined));
const product = computed(() => (sign.value ? productsForSign(sign.value, props.products)[0] : undefined));
</script>

<template>
  <section id="znak" class="p-6 bg-white rounded-2xl shadow-sm md:p-10" aria-labelledby="finder-title">
    <h2 id="finder-title" class="text-2xl font-semibold md:text-3xl">{{ t(copy.title) }}</h2>
    <p class="mt-2 text-gray-600 max-w-prose">{{ t(copy.lead) }}</p>

    <form class="flex flex-wrap gap-4 mt-6" @submit.prevent>
      <label class="flex flex-col gap-1 text-sm font-medium">
        {{ t(copy.day) }}
        <select v-model.number="day" class="min-w-24" autocomplete="bday-day">
          <option value="" disabled>–</option>
          <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
        </select>
      </label>
      <label class="flex flex-col gap-1 text-sm font-medium">
        {{ t(copy.month) }}
        <select v-model.number="month" class="min-w-44" autocomplete="bday-month">
          <option value="" disabled>–</option>
          <option v-for="(name, index) in monthNames" :key="name" :value="index + 1">{{ name }}</option>
        </select>
      </label>
    </form>

    <div aria-live="polite" class="mt-6">
      <p v-if="isInvalid" class="text-red-700">{{ t(copy.invalid) }}</p>

      <div v-else-if="sign" class="grid gap-6 p-6 border border-gray-200 rounded-xl md:grid-cols-[1fr_auto] items-center">
        <div>
          <p class="text-sm text-gray-500">{{ t(copy.yourSign) }}</p>
          <p class="text-3xl font-semibold">
            <span aria-hidden="true" class="mr-2">{{ sign.symbol }}</span
            >{{ t(sign.name) }}
          </p>
          <p class="mt-2 text-gray-700">
            <template v-if="stone">
              {{ t(copy.stone) }}:
              <NuxtLink :to="stonePath(stone)" class="font-semibold underline">{{ t(stone.name) }}</NuxtLink>
            </template>
            <template v-else>{{ t(copy.stoneSoon) }}</template>
          </p>
          <div class="flex flex-wrap gap-3 mt-4">
            <NuxtLink v-if="product" :to="productPath(product)" class="px-5 py-2.5 font-semibold text-white bg-gray-900 rounded-xl">
              {{ t(copy.seeProduct) }}
            </NuxtLink>
            <NuxtLink :to="signPath(sign)" class="px-5 py-2.5 font-semibold border border-gray-900 rounded-xl">{{ t(copy.seeSign) }}</NuxtLink>
          </div>
        </div>
        <NuxtLink v-if="product?.image?.sourceUrl" :to="productPath(product)" class="block w-40 md:w-48">
          <NuxtImg
            :src="product.image.productCardSourceUrl || product.image.sourceUrl"
            :alt="product.image.altText || product.name || ''"
            width="192"
            height="216"
            class="object-cover w-full rounded-lg aspect-[8/9]" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

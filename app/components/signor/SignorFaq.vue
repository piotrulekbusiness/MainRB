<script setup lang="ts">
import { FAQ } from '#shared/signor/faq';

const { t } = useSignor();
</script>

<template>
  <div class="divide-y divide-gray-200 bg-white rounded-xl">
    <details v-for="item in FAQ" :key="item.question.pl" class="p-5 group">
      <summary class="flex items-center justify-between gap-4 font-semibold cursor-pointer list-none">
        {{ t(item.question) }}
        <Icon name="ion:chevron-down" class="transition group-open:rotate-180 shrink-0" aria-hidden="true" />
      </summary>
      <p class="mt-3 text-gray-700">{{ t(item.answer) }}</p>
    </details>
  </div>
</template>

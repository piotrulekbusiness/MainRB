<script setup lang="ts">
const { stones, t, stonePath, signsForStone } = useSignor();
</script>

<template>
  <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <li v-for="stone in stones" :key="stone.id">
      <NuxtLink :to="stonePath(stone)" class="flex flex-col h-full gap-2 p-5 transition bg-white rounded-xl hover:shadow-md focus-visible:shadow-md">
        <h3 class="text-lg font-semibold">{{ t(stone.name) }}</h3>
        <p class="text-sm text-gray-600">{{ t(stone.intro) }}</p>
        <p v-if="signsForStone(stone).length" class="mt-auto text-sm text-gray-800">
          <span v-for="sign in signsForStone(stone)" :key="sign.id"
            ><span aria-hidden="true">{{ sign.symbol }}</span> {{ t(sign.name) }}</span
          >
        </p>
      </NuxtLink>
    </li>
  </ul>
</template>

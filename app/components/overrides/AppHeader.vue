<script setup lang="ts">
// Overrides woonuxt_base AppHeader: categories are always visible at the top (no slide-out menu).
// Phones: logo + icons on the first row, categories on a second, horizontally scrollable row.
const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 z-40 bg-white shadow-md shadow-gray-200 border-b border-transparent outline-gray-950/10 outline">
    <div class="container flex flex-wrap items-center gap-x-6 pt-3 lg:py-4 lg:flex-nowrap">
      <!-- Hook: Before header navigation -->
      <HookOutlet name="layout.header.beforeNav" as="div" />

      <Logo class="shrink-0" />
      <MainMenu
        class="order-last lg:order-none flex w-full lg:w-auto gap-6 overflow-x-auto whitespace-nowrap text-sm text-gray-600 py-3 lg:py-0 lg:px-4 [scrollbar-width:none]" />
      <div class="flex justify-end items-center flex-1 ml-auto gap-4 md:gap-6">
        <ProductSearch class="hidden sm:inline-flex max-w-80 w-[60%]" />
        <SearchTrigger />
        <div class="flex gap-4 items-center">
          <SignInLink />
          <CartTrigger />
        </div>
      </div>
    </div>
    <Transition name="scale-y" mode="out-in">
      <div v-if="isShowingSearch" class="container mb-3 -mt-1 sm:hidden">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
  </header>
</template>

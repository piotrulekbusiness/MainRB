<script setup lang="ts">
// Overrides woonuxt_base Cart: a centered popup instead of a right-hand drawer.
import { onKeyStroke } from '@vueuse/core';

const { cart, toggleCart, isCartMutating } = useCart();
onKeyStroke('Escape', () => toggleCart(false));
</script>

<template>
  <div
    class="cart-modal fixed inset-0 z-50 m-auto flex flex-col w-[calc(100%-2rem)] max-w-lg h-fit max-h-[85vh] overflow-x-hidden bg-white rounded-2xl shadow-2xl"
    role="dialog"
    aria-modal="true"
    :aria-label="$t('shop.cart')">
    <Icon
      name="ion:close-outline"
      class="absolute p-1 rounded-lg shadow-lg top-6 left-6 md:left-8 cursor-pointer hover:bg-gray-100 text-gray-700"
      size="34"
      @click="toggleCart(false)" />

    <EmptyCart v-if="cart && !cart.isEmpty" class="rounded-lg shadow-lg p-1.5 hover:bg-red-400 hover:text-white" />

    <div class="mt-8 text-center text-gray-900 font-semibold">
      {{ $t('shop.cart') }}
      <span v-if="cart?.contents?.productCount"> ({{ cart?.contents?.productCount }}) </span>
    </div>

    <ClientOnly>
      <template v-if="cart && !cart.isEmpty">
        <ul class="flex flex-col flex-1 gap-4 p-6 overflow-y-auto md:p-8">
          <CartCard v-for="item in cart.contents?.nodes" :key="item.key" :item />
        </ul>
        <div class="px-6 pb-8 mb-safe md:px-8 space-y-4">
          <!-- Order Summary -->
          <div class="grid gap-1 text-sm font-semibold text-gray-500 tabular-nums">
            <!-- Subtotal -->
            <div class="flex justify-between">
              <span>{{ $t('shop.subtotal') }}</span>
              <span class="text-gray-800" v-html="cart.subtotal"></span>
            </div>
            <!-- Shipping -->
            <div v-if="cart.shippingTotal" class="flex justify-between">
              <span>{{ $t('general.shipping') }}</span>
              <span class="text-gray-800"> {{ Number.parseFloat(cart.shippingTotal) > 0 ? '+' : '' }} <span v-html="cart.shippingTotal"></span> </span>
            </div>
            <!-- Discount -->
            <div v-if="cart.discountTotal && Number.parseFloat(cart.rawDiscountTotal || '0') > 0" class="flex justify-between">
              <span>{{ $t('shop.discount') }}</span>
              <span class="text-primary">- <span v-html="cart.discountTotal"></span></span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4">
            <Button to="/cart" variant="outline" @click="toggleCart()">
              {{ $t('shop.viewCart') }}
            </Button>
            <Button
              :to="isCartMutating ? undefined : '/checkout'"
              class="flex-1"
              variant="primary"
              :disabled="isCartMutating"
              @click="!isCartMutating && toggleCart()">
              {{ $t('shop.checkout') }} <span v-html="cart.total"></span>
            </Button>
          </div>
        </div>
      </template>
      <!-- Empty Cart Message -->
      <EmptyCartMessage v-else-if="cart && cart.isEmpty" />
      <!-- Cart Loading -->
      <div v-else class="flex flex-col items-center justify-center flex-1 mb-20">
        <LoadingIcon />
      </div>
    </ClientOnly>
    <!-- Cart Loading Overlay -->
    <div v-if="cart && isCartMutating" class="absolute inset-0 flex items-center justify-center bg-white/25">
      <LoadingIcon />
    </div>
  </div>
</template>

<style>
/* app.vue wraps the cart in the "slide-from-right" transition; turn it into a fade + scale for the popup. */
.cart-modal.slide-from-right-enter-active,
.cart-modal.slide-from-right-leave-active {
  transition:
    transform 200ms ease-out,
    opacity 200ms ease-out;
}
.cart-modal.slide-from-right-enter-from,
.cart-modal.slide-from-right-leave-to {
  transform: scale(0.96);
  opacity: 0;
}
</style>

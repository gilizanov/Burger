<template>
  <ul class="payment-list">
    <li v-for="(item, index) in paymentTypes" :key="index" class="payment-list__item" :title="item.title">
      <img :src="item.imageUrl" :alt="item.title" />
    </li>
  </ul>
</template>

<script setup lang="ts">
const paymentTypes = [
  {
    title: 'Visa',
    imageUrl: '/icons/payment-logos/visa.svg',
  },
  {
    title: 'Mastercard',
    imageUrl: '/icons/payment-logos/mastercard.svg',
  },
  {
    title: 'Apple Pay',
    imageUrl: '/icons/payment-logos/apple-pay.svg',
  },
  {
    title: 'Google Pay',
    imageUrl: '/icons/payment-logos/google-pay.svg',
  },
  {
    title: 'PayPal',
    imageUrl: '/icons/payment-logos/paypal.svg',
  },
]
</script>

<style lang="scss" scoped>
.payment-list {
  display: flex;
  align-items: center;
  gap: 8px;

  &__item {
    width: 35px;
    height: 24px;
    overflow: hidden;
    border-radius: 4px;
  }
}
</style>

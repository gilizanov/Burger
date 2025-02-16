<template>
  <div class="summary__price-block">
    <div class="summary__price">{{ formatCurrency(totalPrice) }}</div>
    <AppButton
      :disabled="ingredients.length < 3 || (bunTop && !ingredients.includes(bunTop))"
      variant="primary"
      size="md"
      text="Подтвердить"
      @click="openPopup('AppPopup')"
    />
    <p class="summary__price-text">Собери бургер на сумму <span>от 1000 ₽</span> и получи <span>скидку 10%</span>!</p>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { useBurgerStore } from '@/stores/burger'
import { usePopupStore } from '@/stores/popup'
import { formatCurrency } from '@/utils/utils'
import { storeToRefs } from 'pinia'

const { totalPrice, ingredients, bunTop } = storeToRefs(useBurgerStore())
const { openPopup } = usePopupStore()
</script>

<style lang="scss" scoped>
@use '../../assets/styles/mixins' as *;

.summary {
  &__price-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  &__price {
    font: var(--font-800_36);
    color: var(--clr-indigo-500);

    @include mobile {
      text-align: center;
    }
  }

  &__price-text {
    grid-column: span 2;
    font: var(--font-400_14);
    color: var(--clr-dark);

    span {
      font: var(--font-600_14);
      color: var(--clr-red-500);
    }

    @include mobile {
      display: none;
    }
  }
}
</style>

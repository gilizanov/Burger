<template>
  <div class="summary">
    <h2 class="summary__title">Итого:</h2>
    <PriceBlock />
    <SummaryIconsList :icons="summaryIcons" />
  </div>
</template>

<script setup lang="ts">
import { TSummaryIcon } from '@/interfaces'
import { useBurgerStore } from '@/stores/burger'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import PriceBlock from './summary/PriceBlock.vue'
import SummaryIconsList from './summary/SummaryIconsList.vue'

const { totalTime, totalWeight, totalCalories } = storeToRefs(useBurgerStore())

const summaryIcons = computed<TSummaryIcon[]>(() => [
  {
    size: 'md',
    variant: 'purple',
    iconName: 'clock',
    text: totalTime.value + ' мин',
  },
  {
    size: 'md',
    variant: 'yellow',
    iconName: 'weight',
    text: totalWeight.value + ' г',
  },
  {
    size: 'md',
    variant: 'red',
    iconName: 'fire',
    text: totalCalories.value + ' ккал',
  },
])
</script>

<style lang="scss" scoped>
@use '../assets/styles/mixins' as *;

.summary {
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  gap: 24px;

  &__title {
    padding-bottom: 24px;
    font: var(--font-600_36);
    color: var(--clr-dark);
    border-bottom: 2px solid var(--clr-titan-white);

    @include mobile {
      display: none;
    }
  }

  &__price-block {
    @include mobile {
      display: none;
    }
  }
}
</style>

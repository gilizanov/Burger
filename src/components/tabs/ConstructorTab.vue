<template>
  <div class="tab-panel tab-panel--constructor">
    <ConstructorBlock :ketchup-is-added="isAdded" />
    <SummaryBlock />
    <button
      type="button"
      class="ketchup-button"
      :class="{ 'is-hidden': ingredients.length <= 1 }"
      @click="isAdded = !isAdded"
    >
      {{ !isAdded ? 'Добавить' : 'Убрать' }} кетчуп <span>(40 г)</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import ConstructorBlock from '@/components/ConstructorBlock.vue'
import SummaryBlock from '@/components/SummaryBlock.vue'
import { useBurgerStore } from '@/stores/burger'
import { storeToRefs } from 'pinia'

const { ketchupIsAdded: isAdded, ingredients } = storeToRefs(useBurgerStore())
</script>

<style lang="scss" scoped>
@use '../../assets/styles/mixins' as *;

.tab-panel {
  &--constructor {
    @include desktop {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr auto;
      gap: 48px 32px;
    }
  }
}

.ketchup-button {
  grid-column: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  font: var(--font-600_20);
  color: var(--clr-red-500);
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease,
    background-color 0.3s ease;
  border-radius: 16px;
  justify-self: flex-start;

  &.is-hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    @include mobile {
      opacity: 0.5;
      visibility: visible;
    }
  }

  @include hover {
    background-color: var(--clr-red-200);
  }

  span {
    color: var(--clr-dark);
  }

  @include mobile {
    justify-content: center;
    width: 100%;
    margin-top: 24px;
    background-color: var(--clr-red-200);
  }
}
</style>

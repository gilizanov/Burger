<template>
  <div class="constructor">
    <Transition>
      <AppTooltip v-if="totalCalories > 1500 || hasDuplicates" text="Вы уверены? 🤯" />
    </Transition>
    <TransitionGroup name="list" tag="div" class="constructor__container">
      <img
        v-for="(ingredient, index) in ingredients"
        :key="ingredient.code"
        class="constructor__image"
        :src="ingredient.imageUrlGroup || ingredient.imageUrl"
        :alt="ingredient.code"
        :style="{ bottom: `${index * 8}%` }"
      />
    </TransitionGroup>
    <Transition name="fade">
      <img v-if="ketchupIsAdded" class="ketchup" src="/images/ingredients/ketchup.png" alt="Кетчуп" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useBurgerStore } from '@/stores/burger'
import { storeToRefs } from 'pinia'
import AppTooltip from './ui/AppTooltip.vue'

defineProps<{
  ketchupIsAdded: boolean
}>()

const { ingredients, totalCalories, hasDuplicates } = storeToRefs(useBurgerStore())
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active,
.list-enter-active,
.list-leave-active,
.fade-enter-active,
.fade-leave-active,
.constructor__image {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-enter-from {
  bottom: 100% !important;
}

.list-leave-to {
  transform: translateX(50%);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.constructor {
  grid-row: span 2;
  position: relative;
  background-image: url('/images/scene.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  aspect-ratio: 1;

  .tooltip {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__image {
    position: absolute;
    width: 100%;
  }
}

.ketchup {
  position: absolute;
  bottom: -5%;
  right: 0;
}
</style>

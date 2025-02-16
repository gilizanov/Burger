<template>
  <ul ref="listEl" class="ingredients">
    <IngredientsItem v-for="ingredient in ingredientsList" :key="ingredient.code" :ingredient="ingredient" />
  </ul>
</template>

<script setup lang="ts">
import { IIngredient } from '@/interfaces'
import { useAppStore } from '@/stores/app'
import { useBurgerStore } from '@/stores/burger'
import { HScroll } from '@/utils/horizontalScroll'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import IngredientsItem from './IngredientsItem.vue'

const ingredientsList = ref<IIngredient[]>([])
const { buns } = storeToRefs(useBurgerStore())

const getIngredients = async () => {
  try {
    const response = await fetch('/data.json')

    if (!response.ok) {
      throw new Error('Error')
    }

    const data = await response.json()

    for (const item of data) {
      if (item.auto) {
        buns.value.push(item)
        continue
      }

      ingredientsList.value.push(item)
    }
  } catch (error) {
    console.error(error)
  }
}

const listEl = ref<HTMLElement | null>(null)
const hScroll = new HScroll()
const { isMobile } = storeToRefs(useAppStore())

onMounted(async () => {
  await getIngredients()
  if (isMobile.value && listEl.value) {
    hScroll.init({ container: listEl.value })
  } else {
    hScroll.destroy()
  }
})

watch(
  () => isMobile.value,
  () => {
    if (isMobile.value) {
      if (listEl.value) {
        hScroll.init({ container: listEl.value })
      }
    } else {
      hScroll.destroy()
    }
  },
)
</script>

<style lang="scss" scoped>
@use '../../assets/styles/mixins' as *;

.ingredients {
  grid-column: span 2;
  display: flex;
  justify-content: center;
  gap: 24px;

  @include mobile {
    gap: 8px;
    margin-top: 24px;
    padding-bottom: 16px;
    justify-content: flex-start;
    overflow-x: auto;
    overscroll-behavior: none;
  }
}
</style>

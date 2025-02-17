<template>
  <li class="ingredients__item" @click="isMobile && openPopup('IngredientPopup', ingredient)">
    <div class="ingredients__item-image">
      <picture>
        <img :src="ingredient.imageUrl" class="image" :alt="ingredient.code" />
      </picture>
    </div>
    <p class="ingredients__item-name">{{ ingredient.name }}</p>
    <p class="ingredients__item-price">+{{ formatCurrency(ingredient.price) }}</p>
    <div class="ingredients__item-qnt">
      <AppButton
        variant="ghost"
        size="sm"
        icon-name="minus"
        :disabled="qnt === 0"
        @click.stop="(removeIngredient(ingredient), qnt--)"
      />
      <span>{{ qnt }}</span>
      <AppButton variant="ghost" size="sm" icon-name="plus" @click.stop="(addIngredient(ingredient), qnt++)" />
    </div>
  </li>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { IIngredient } from '@/interfaces'
import { useAppStore } from '@/stores/app'
import { useBurgerStore } from '@/stores/burger'
import { usePopupStore } from '@/stores/popup'
import { formatCurrency } from '@/utils/utils'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps<{
  ingredient: IIngredient
}>()

const qnt = computed(() => ingredients.value.filter((item) => item.code === props.ingredient.code).length)

const { isMobile } = storeToRefs(useAppStore())
const { addIngredient, removeIngredient } = useBurgerStore()
const { ingredients } = storeToRefs(useBurgerStore())
const { openPopup } = usePopupStore()
</script>

<style lang="scss" scoped>
.ingredients {
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    max-width: 140px;
    padding: 24px 18px;
    border-radius: 18px;
    border: 1px solid var(--clr-black-squeeze);
    user-select: none;
  }

  &__item-image img {
    object-fit: contain;
    aspect-ratio: 2.575 / 1;
    width: 100%;
  }

  &__item-name {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 40px;
    font: var(--font-600_14);
    color: var(--dark);
  }

  &__item-price {
    font: var(--font-800_16);
    color: var(--clr-indigo-500);
  }

  &__item-qnt {
    display: flex;
    align-items: center;
    gap: 16px;
    font: var(--font-600_20);
  }
}
</style>

import { IIngredient } from '@/interfaces'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useBurgerStore = defineStore('burger', () => {
  const buns = ref<IIngredient[]>([])
  const bunBottom = ref<IIngredient | null>(null)
  const bunTop = ref<IIngredient | null>(null)
  const ingredients = ref<IIngredient[]>([])

  const ketchupIsAdded = ref(false)
  const ketchupPrice = 40

  const totalPrice = computed(() => {
    const sum = ingredients.value.reduce((acc, item) => acc + item.price, 0)
    const addedPrice = ketchupIsAdded.value ? ketchupPrice : 0
    const total = sum + addedPrice

    // 10% скидка
    return total > 1000 ? total * 0.9 : total
  })

  const totalTime = computed(() => ingredients.value.reduce((acc, item) => acc + item.time, 0))
  const totalWeight = computed(() => ingredients.value.reduce((acc, item) => acc + item.g, 0))
  const totalCalories = computed(() => ingredients.value.reduce((acc, item) => acc + item.kcal, 0))

  const addingTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
  const removingTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

  const addIngredient = (ingredient: IIngredient) => {
    if (removingTimeout.value) clearTimeout(removingTimeout.value)

    if (bunTop.value && ingredients.value.includes(bunTop.value)) ingredients.value.pop()

    if (bunTop.value && !ingredients.value.includes(bunTop.value)) {
      if (addingTimeout.value) {
        clearTimeout(addingTimeout.value)
      }

      addingTimeout.value = setTimeout(() => {
        if (bunTop.value) {
          ingredients.value.push(bunTop.value)
        }
      }, 2000)
    }

    ingredients.value.push(ingredient)
  }

  const removeIngredient = (ingredient: IIngredient) => {
    const lastIndex = ingredients.value.lastIndexOf(ingredient)

    if (lastIndex !== -1) {
      ingredients.value.splice(lastIndex, 1)

      if (ingredients.value.length === 1) {
        if (addingTimeout.value) {
          clearTimeout(addingTimeout.value)
        }
      }

      if (ingredients.value.length === 2 && bunTop.value && ingredients.value.includes(bunTop.value)) {
        removingTimeout.value = setTimeout(() => {
          ingredients.value.pop()
        }, 500)
      }
    }
  }

  watch(
    buns,
    () => {
      bunBottom.value = buns.value.find((item) => item.code === 'bun_bottom') || null
      bunTop.value = buns.value.find((item) => item.code === 'bun_top') || null

      if (bunBottom.value) ingredients.value.push(bunBottom.value)
    },
    { deep: true },
  )

  const hasDuplicates = ref(false)
  const checkDuplicates = (items: IIngredient[]) => {
    const counts: Record<string, number> = {}

    for (const item of items) {
      counts[item.code] = (counts[item.code] || 0) + 1
    }

    hasDuplicates.value = Object.values(counts).some((count) => count >= 5)
  }

  watch(
    ingredients,
    () => {
      checkDuplicates(ingredients.value)
    },
    { deep: true },
  )

  return {
    buns,
    bunTop,
    bunBottom,
    ingredients,
    ketchupIsAdded,
    totalPrice,
    totalTime,
    totalWeight,
    totalCalories,
    addIngredient,
    removeIngredient,
    hasDuplicates,
  }
})

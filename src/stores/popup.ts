import { IIngredient } from '@/interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePopupStore = defineStore('popup', () => {
  const popupType = ref('')
  const currentIngredient = ref<IIngredient | null>(null)

  const bodyEl = document.querySelector('body')

  const openPopup = (type: string, ingredient?: IIngredient) => {
    popupType.value = type
    bodyEl?.classList.add('no-scroll')

    if (ingredient) currentIngredient.value = ingredient
  }

  const closePopup = () => {
    popupType.value = ''
    bodyEl?.classList.remove('no-scroll')

    if (currentIngredient.value) currentIngredient.value = null
  }

  return { popupType, openPopup, closePopup, currentIngredient }
})

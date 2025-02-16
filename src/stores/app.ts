import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useTabsStore } from './tabs'

export const useAppStore = defineStore('app', () => {
  const { currentTab } = storeToRefs(useTabsStore())

  const isMobile = ref(false)

  const onResize = () => {
    isMobile.value = window.innerWidth <= 1440
  }

  if (window.innerWidth <= 1440) isMobile.value = true
  window.addEventListener('resize', onResize)

  const menuIsOpen = ref(false)

  watch(
    () => isMobile.value,
    () => {
      if (isMobile.value) {
        currentTab.value = 'MainTab'
        menuIsOpen.value = false
      }
    },
  )

  return { isMobile, menuIsOpen }
})

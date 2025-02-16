import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabsStore = defineStore('tabs', () => {
  const currentTab = ref('MainTab')

  return { currentTab }
})

<template>
  <ul class="tabs">
    <li v-for="(tabsItem, index) in tabsItems" :key="index" class="tabs__item">
      <button
        type="button"
        class="tabs__button"
        :class="{ 'is-active': tabsItem.component === currentTab }"
        @click="onClick(tabsItem.component)"
      >
        {{ tabsItem.name }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useTabsStore } from '@/stores/tabs'
import { storeToRefs } from 'pinia'

defineProps<{
  tabsItems: Record<string, string>[]
}>()

const { currentTab } = storeToRefs(useTabsStore())
const { isMobile, menuIsOpen } = storeToRefs(useAppStore())

const onClick = (component: string) => {
  if (isMobile.value) {
    const tabElement = document.getElementById(component)
    tabElement?.scrollIntoView({ behavior: 'smooth' })

    menuIsOpen.value = false
    currentTab.value = component
  } else {
    currentTab.value = component
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  gap: 60px;

  &__button {
    position: relative;
    padding-top: 14px;
    padding-bottom: 12px;
    font: var(--font-400_16);
    color: var(--clr-dark);
    transition: transform 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: var(--clr-indigo-500);
      width: 0;
      height: 2px;
      transition: width 0.3s ease;
    }

    &.is-active {
      font: var(--font-600_16);

      &::after {
        width: 100%;
      }
    }
  }
}
</style>

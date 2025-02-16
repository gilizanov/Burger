<template>
  <AppHeader />
  <main>
    <div class="container layout">
      <h1 class="main-title">Создай свой бургер</h1>
      <component :is="tabs[currentTab]" v-if="!isMobile"></component>
      <template v-if="isMobile">
        <component :is="tabComponent" v-for="(tabComponent, tabName) in tabs" :id="tabName" :key="tabName" />
      </template>
      <IngredientsList v-show="currentTab === 'ConstructorTab' || isMobile" />
      <PriceBlock />
    </div>
  </main>
  <AppFooter />
  <Transition>
    <component :is="popups[popupType]" :ingredient="currentIngredient"></component>
  </Transition>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppPopup from '@/components/AppPopup.vue'
import IngredientsList from '@/components/ingredients/IngredientsList.vue'
import ConstructorTab from '@/components/tabs/ConstructorTab.vue'
import MainTab from '@/components/tabs/MainTab.vue'
import { storeToRefs } from 'pinia'
import type { Component } from 'vue'
import IngredientPopup from './components/ingredients/IngredientPopup.vue'
import PriceBlock from './components/summary/PriceBlock.vue'
import { useAppStore } from './stores/app'
import { usePopupStore } from './stores/popup'
import { useTabsStore } from './stores/tabs'

const tabs: Record<string, Component> = {
  MainTab,
  ConstructorTab,
}

const popups: Record<string, Component> = {
  AppPopup,
  IngredientPopup,
}

const { currentTab } = storeToRefs(useTabsStore())
const { popupType, currentIngredient } = storeToRefs(usePopupStore())
const { isMobile } = storeToRefs(useAppStore())
</script>

<style lang="scss" scoped>
@use 'assets/styles/mixins' as *;

.layout {
  @include desktop {
    display: grid;
    grid-template-columns: auto 1fr;
    height: 100%;
    column-gap: 120px;

    &:has(.tab-panel--constructor) {
      grid-template-rows: 1fr auto;
      row-gap: 32px;
      align-items: center;
    }
  }

  @include mobile {
    display: flex;
    flex-direction: column;
    padding-top: var(--header-height-mob);
  }

  & > .summary__price-block {
    @include desktop {
      display: none;
    }

    @include mobile {
      grid-template-columns: 1fr;
      margin-top: 48px;
    }
  }
}

.main-title {
  color: var(--clr-dark);

  @include desktop {
    font: var(--font-700_72);
    align-self: center;
    width: min-content;
  }

  @include mobile {
    font: var(--font-600_48);
  }
}
</style>

<template>
  <header class="header">
    <div class="container header__container">
      <button class="header__logo" @click="onClick">
        <picture>
          <img src="/images/logo.png" alt="Лого" />
        </picture>
      </button>
      <AppButton variant="red" size="sm" text="Перезвоните мне" icon-name="phone" :reverse="true" />
      <AppButton
        variant="ghost"
        size="md"
        :icon-name="menuIsOpen ? 'close' : 'menu'"
        @click="menuIsOpen = !menuIsOpen"
      />
      <AppTabs :tabs-items="headerTabs" />
      <div class="header__buttons">
        <AppButton variant="red" size="sm" text="Перезвоните мне" icon-name="phone" :reverse="true" />
        <a href="tel:+7 800 437-87-22" class="header__link">8 800 437-87-22</a>
        <HeaderDropdown />
      </div>
    </div>
  </header>
  <Transition name="menu">
    <div v-show="menuIsOpen && isMobile" class="mobile-menu">
      <a href="tel:+7 800 437-87-22" class="header__link">8 800 437-87-22</a>
      <AppTabs :tabs-items="headerTabs" />
      <HeaderDropdown />
      <p class="mobile-menu__text">Руслан Гилизанов</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useTabsStore } from '@/stores/tabs'
import { storeToRefs } from 'pinia'
import HeaderDropdown from './HeaderDropdown.vue'
import AppButton from './ui/AppButton.vue'
import AppTabs from './ui/AppTabs.vue'

const { currentTab } = storeToRefs(useTabsStore())

const headerTabs = [
  {
    name: 'Главная',
    component: 'MainTab',
  },
  {
    name: 'Конструктор',
    component: 'ConstructorTab',
  },
]

const { isMobile, menuIsOpen } = storeToRefs(useAppStore())

const onClick = () => {
  if (!isMobile.value) {
    currentTab.value = 'MainTab'
  } else {
    const tabElement = document.getElementById('MainTab')
    tabElement?.scrollIntoView({ behavior: 'smooth' })
    currentTab.value = 'MainTab'
  }
}
</script>

<style lang="scss">
@use '../assets/styles/mixins' as *;

.header {
  padding: 32px 0;
  background-color: var(--clr-white);

  @include mobile {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 16px 0;
    z-index: 10;
  }

  &__container {
    @include mobile {
      justify-content: space-between;
      padding: 0 20px;
    }

    @include desktop {
      gap: 80px;
    }

    & > .button {
      @include desktop {
        display: none;
      }
    }

    & > .tabs {
      flex-grow: 1;

      @include mobile {
        display: none;
      }
    }
  }

  &__logo {
    display: block;
    width: 80px;
    height: 80px;

    @include mobile {
      width: 48px;
      height: 48px;
    }
  }

  &__container,
  &__buttons {
    display: flex;
    align-items: center;
  }

  &__buttons {
    gap: 60px;

    @include mobile {
      display: none;
    }
  }

  &__link {
    font: var(--font-600_16);
    color: var(--clr-dark);
    transition: transform 0.3s ease;

    @include hover {
      text-decoration: underline;
      transform: scale(0.98);
    }
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}

.mobile-menu {
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: var(--clr-white);
  z-index: 5;

  & > .tabs {
    margin: auto 0;
    flex-direction: column;
    gap: 24px;
  }

  .header__dropdown {
    top: auto;
    right: auto;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);

    &.is-open {
      top: auto;
      bottom: calc(100% + 24px);
    }

    &::after {
      top: auto;
      right: auto;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }
  }

  &__text {
    margin-top: 16px;
    font: var(--font-600_16);
    color: var(--clr-dark);
  }
}
</style>

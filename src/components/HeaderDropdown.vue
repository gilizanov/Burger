<template>
  <div class="header__dropdown-container">
    <button type="button" class="header__dropdown-toggler" @click="dropdownIsOpen = !dropdownIsOpen">
      <img src="/icons/avatar.png" alt="Аватар" />
    </button>
    <div class="header__dropdown" :class="{ 'is-open': dropdownIsOpen }">
      <p class="header__dropdown-name">Руслан Гилизанов</p>
      <ul class="header__dropdown-list">
        <li v-for="(item, index) in dropdownButtons" :key="index" class="header__dropdown-item">
          <button type="button" class="header__dropdown-button" @click="item.action">{{ item.text }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dropdownIsOpen = ref(false)

const dropdownButtons = [
  {
    text: 'Профиль',
    // eslint-disable-next-line no-console
    action: () => console.log('В макете не было'),
  },
  {
    text: 'Настройки',
    // eslint-disable-next-line no-console
    action: () => console.log('В макете не было'),
  },
  {
    text: 'Выход',
    // eslint-disable-next-line no-console
    action: () => console.log('В макете не было'),
  },
]
</script>

<style lang="scss" scoped>
@use '../assets/styles/mixins' as *;

.header {
  &__dropdown-container {
    position: relative;
  }

  &__dropdown-toggler {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    background-color: var(--clr-black-squeeze);
    border-radius: 50%;
    transition: background-color 0.3s ease;

    @include hover {
      background-color: var(--clr-gray-200);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    padding: 16px;
    box-shadow: 0px 6px 80px 0px rgba(0, 0, 0, 0.15);
    background-color: var(--clr-white);
    border-radius: 16px;
    width: 200px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1;

    &.is-open {
      opacity: 1;
      visibility: visible;
      top: calc(100% + 24px);
    }

    &::after {
      content: '';
      top: -8px;
      right: 21px;
      width: 16px;
      height: 16px;
      position: absolute;
      background-color: var(--clr-white);
      transform: rotate(45deg);
    }
  }

  &__dropdown-name {
    padding-bottom: 16px;
    font: var(--font-600_16);
    color: var(--clr-dark);
    border-bottom: 1px solid var(--clr-gray-200);
  }

  &__dropdown-list {
    margin-top: 8px;
  }

  &__dropdown-item:last-child {
    .header__dropdown-button {
      color: var(--clr-red-500);

      @include hover {
        background-color: var(--clr-red-200);
      }
    }
  }

  &__dropdown-button {
    width: 100%;
    padding: 8px;
    font: var(--font-400_14);
    text-align: left;
    color: var(--clr-dark);
    border-radius: 8px;

    @include hover {
      font: var(--font-600_14);
      background-color: var(--clr-titan-white);
    }
  }
}
</style>

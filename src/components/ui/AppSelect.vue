<template>
  <div class="select" :class="[{ 'is-open': isOpen }, { selected: modelValue }]">
    <button type="button" class="select__toggler" @click="isOpen = !isOpen">
      <span class="select__title">{{ title }}</span>
      <span class="select__value">{{ modelValue }}</span>
      <SvgIcon code="arrow-down" />
    </button>
    <div class="select__options">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="select__option"
        :class="{ disabled: isOptionDisabled(option) }"
        @click="((isOpen = false), (modelValue = option))"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from './SvgIcon.vue'

defineProps<{
  title: string
  options: string[]
  isOptionDisabled: (option: string) => boolean
}>()

const modelValue = defineModel<string>({ required: true })

const isOpen = ref(false)
</script>

<style lang="scss" scoped>
@use '../../assets/styles/mixins' as *;

.select {
  position: relative;

  &.selected {
    .select__title {
      top: 0;
      transform: none;
      font: var(--font-400_12);
    }
  }

  &.is-open {
    .select__toggler {
      border-color: var(--clr-indigo-500);

      svg {
        transform: rotate(180deg);
        fill: var(--clr-indigo-500);
      }
    }

    .select__options {
      opacity: 1;
      visibility: visible;
    }
  }

  &__toggler {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px;
    width: 100%;
    height: 100%;
    font: var(--font-600_14);
    color: var(--clr-dark);
    background-color: var(--clr-white);
    border: 1px solid var(--clr-titan-white);
    border-radius: 16px;
    transition: border-color 0.15s ease;

    svg {
      width: 12px;
      height: 10px;
      fill: var(--clr-muted);
      transition:
        fill 0.15s ease,
        transform 0.15s ease;
    }
  }

  &__title {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    white-space: nowrap;
    font: var(--font-400_16);
    color: var(--clr-muted);
    transition: all 0.15s ease;
  }

  &__options {
    position: absolute;
    top: calc(100% + 16px);
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    max-height: 200px;
    overflow-y: auto;
    background-color: var(--clr-white);
    border-radius: 16px;
    box-shadow: 0 20px 80px 10px rgba(0, 0, 0, 0.4);
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.15s ease,
      visibility 0.15s ease;
    scrollbar-width: none;
    z-index: 1;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__option {
    padding: 8px;
    font: var(--font-600_14);
    color: var(--clr-dark);
    cursor: pointer;
    border-radius: 8px;

    @include hover {
      font: var(--font-600_14);
      background-color: var(--clr-titan-white);
    }

    &.disabled {
      background-color: var(--clr-gray-100);
      color: var(--clr-muted);
      pointer-events: none;
      cursor: auto;
    }
  }
}
</style>

<template>
  <button
    type="button"
    class="button"
    :class="{ [`button--${variant}`]: variant, [`button--${size}`]: size, 'button--reverse': reverse }"
  >
    <span v-if="text">{{ text }}</span>
    <SvgIcon v-if="iconName" :code="iconName" />
  </button>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

defineProps<{
  variant: 'primary' | 'ghost' | 'red'
  size: 'md' | 'sm' | 'xs'
  text?: string
  iconName?: string
  reverse?: boolean
}>()
</script>

<style lang="scss" scoped>
@use '../../assets/styles/mixins' as *;

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 999px;
  font: var(--font-600_16);
  transition: all 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
    transition: fill 0.3s ease;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  &--reverse {
    flex-direction: row-reverse;
  }

  &--md {
    padding: 16px;
  }

  &--sm {
    padding: 6px;

    &:has(span) {
      padding: 6px 12px;
    }
  }

  &--xs {
    font: var(--font-600_14);
    padding: 2px;

    &:has(span) {
      padding: 4px 8px;
    }
  }

  &--primary {
    background-color: var(--clr-indigo-500);
    color: var(--clr-titan-white);

    @include hover {
      background-color: var(--clr-indigo-600);
    }
  }

  &--ghost {
    background-color: var(--clr-titan-white);
    color: var(--clr-indigo-500);

    @include hover {
      background-color: var(--clr-indigo-500);
      color: var(--clr-titan-white);
    }
  }

  &--primary,
  &--ghost {
    &:disabled {
      background-color: var(--clr-titan-white);
      color: var(--clr-muted);

      svg {
        fill: var(--clr-muted);
      }
    }
  }

  &--red {
    background-color: var(--clr-red-200);
    color: var(--clr-red-500);

    @include hover {
      background-color: var(--clr-red-500);
      color: var(--clr-titan-white);
    }

    &:disabled {
      background-color: var(--clr-red-200);
      color: var(--clr-red-500);
    }
  }
}
</style>

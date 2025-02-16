<template>
  <label class="label">
    <input
      v-model.trim="modelValue"
      v-maska
      :data-maska="type === 'tel' ? '+7 (###) ###-##-##' : null"
      :type="type"
      class="input"
      :class="{ error: !isValid(modelValue) && modelValue.length, filled: modelValue }"
    />
    <span class="input-title">{{ title }}</span>
    <SvgIcon v-if="iconName" :code="iconName" class="input-icon" />
  </label>
</template>

<script setup lang="ts">
import { validateEmail, validatePhoneNumber } from '@/utils/utils'
import { vMaska } from 'maska/vue'
import SvgIcon from './SvgIcon.vue'

const props = defineProps<{
  type: 'text' | 'tel' | 'email'
  title: string
  iconName?: string
}>()

const modelValue = defineModel<string>({ required: true })

const isValid = (value: string): boolean => {
  switch (props.type) {
    case 'tel':
      return validatePhoneNumber(value)
    case 'email':
      return validateEmail(value)
    case 'text':
      return value.length >= 2
  }
}
</script>

<style lang="scss" scoped>
.label {
  position: relative;

  &:has(.input-icon) {
    .input {
      padding-left: calc(16px + 20px + 8px);
    }

    .input-title {
      left: calc(16px + 20px + 8px);
    }
  }
}

.input {
  width: 100%;
  padding: 16px;
  font: var(--font-600_14);
  color: var(--clr-dark);
  outline: none;
  border: 1px solid var(--clr-titan-white);
  border-radius: 16px;
  transition: border-color 0.15s ease;

  &.filled {
    & ~ .input-title {
      top: 0;
      transform: none;
      font: var(--font-400_12);
    }

    & ~ .input-icon {
      fill: var(--clr-indigo-500);
    }
  }

  &:focus {
    border-color: var(--clr-indigo-500);

    & ~ .input-title {
      top: 0;
      transform: none;
      font: var(--font-400_12);
    }

    & ~ .input-icon {
      fill: var(--clr-indigo-500);
    }
  }

  &:not(:focus) {
    &.error {
      border-color: var(--clr-red-300);

      & ~ .input-title {
        color: var(--clr-red-500);
      }

      & ~ .input-icon {
        fill: var(--clr-red-500);
      }
    }
  }

  &:disabled {
    background-color: var(--clr-gray-100);
    color: var(--clr-muted);
    pointer-events: none;
    cursor: default;

    & ~ .input-icon {
      fill: var(--clr-muted);
    }
  }
}

.input-title {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font: var(--font-400_16);
  color: var(--clr-muted);
  transition: all 0.15s ease;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  fill: var(--clr-muted);
  transition: fill 0.15s ease;
}
</style>

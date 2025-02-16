<template>
  <div
    class="summary__icon"
    :class="{ [`summary__icon--${icon.variant}`]: icon.variant, [`summary__icon--${icon.size}`]: icon.size }"
  >
    <span>
      <SvgIcon :code="icon.iconName" />
    </span>
    <p v-if="icon.text" class="summary__icon-text">
      {{ icon.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { TSummaryIcon } from '@/interfaces'

defineProps<{
  icon: TSummaryIcon
}>()
</script>

<style lang="scss" scoped>
@use '../../assets/styles/mixins' as *;

.summary {
  &__icon {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    svg {
      width: 16px;
      height: 16px;
      fill: var(--clr-white);
    }

    &--md {
      @include desktop {
        span {
          width: 48px;
          height: 48px;
        }

        svg {
          width: 24px;
          height: 24px;
        }

        .summary__icon-text {
          font: var(--font-600_16);
        }
      }
    }

    &--sm {
      span {
        width: 32px;
        height: 32px;
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }

    &--xs {
      span {
        width: 24px;
        height: 24px;
      }

      svg {
        width: 12px;
        height: 12px;
      }
    }

    &--purple span {
      background-color: #b956f5;
    }

    &--yellow span {
      background-color: #f58f56;
    }

    &--red span {
      background-color: var(--clr-red-500);
    }
  }

  &__icon-text {
    white-space: nowrap;
    font: var(--font-600_14);
    color: var(--clr-dark);
  }
}
</style>

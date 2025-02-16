<template>
  <div class="summary__icons">
    <SummaryIcon v-for="(icon, index) in icons" :key="index" :icon="icon" />
  </div>
</template>

<script setup lang="ts">
import { TSummaryIcon } from '@/interfaces'
import SummaryIcon from './SummaryIcon.vue'

defineProps<{
  icons: TSummaryIcon[]
}>()
</script>

<style lang="scss" scoped>
@use '../../assets/styles/mixins' as *;

.summary__icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  background-color: var(--clr-titan-white);
  border-radius: 32px;
  padding: 16px;

  @include mobile {
    gap: 16px;
    margin-top: 24px;
  }
}
</style>

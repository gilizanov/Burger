<template>
  <div class="tooltip">{{ text }}</div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  padding: 16px;
  font: var(--font-600_20);
  color: var(--clr-dark);
  background-color: var(--clr-white);
  box-shadow:
    0 0px 2px 0 rgba(0, 0, 0, 0.01),
    0 0px 5px 0 rgba(0, 0, 0, 0.02),
    0 1px 10px 0 rgba(0, 0, 0, 0.02),
    0 1px 18px 0 rgba(0, 0, 0, 0.02),
    0 3px 33px 0 rgba(0, 0, 0, 0.03),
    0 6px 80px 0 rgba(0, 0, 0, 0.04);
  border-radius: 16px;

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 20px;
    height: 20px;
    background-color: var(--clr-white);
  }
}
</style>

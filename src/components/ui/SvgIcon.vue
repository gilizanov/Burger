<template>
  <svg>
    <use :href="`/sprite.svg#${code}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  code: string
}>()
</script>

<style scoped></style>

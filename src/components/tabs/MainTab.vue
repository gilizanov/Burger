<template>
  <div class="tab-panel">
    <SceneBlock />
  </div>
</template>

<script setup lang="ts">
import SceneBlock from '@/components/SceneBlock.vue'
</script>

<style lang="scss" scoped>
@use '../../assets/styles/mixins' as *;

.tab-panel {
  @include mobile {
    aspect-ratio: 1;
    margin-bottom: 120px;
  }
}
</style>

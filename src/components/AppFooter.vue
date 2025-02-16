<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__info">
        <p class="footer__info-text">2025. Burger App</p>
        <div class="footer__links">
          <a href="#" class="footer__link">Политика конфиденциальности</a>
          <a href="#" class="footer__link">Правила и условия</a>
        </div>
      </div>
      <PaymentTypes />
    </div>
  </footer>
</template>

<script setup lang="ts">
import PaymentTypes from './ui/PaymentTypes.vue'
</script>

<style lang="scss" scoped>
@use '../assets/styles/mixins' as *;

.footer {
  padding-bottom: 32px;

  @include mobile {
    padding-top: 32px;
  }

  &__container,
  &__info,
  &__links {
    display: flex;
    align-items: center;
  }

  &__container {
    justify-content: space-between;

    @include mobile {
      justify-content: unset;
      flex-direction: column;
      gap: 32px;
    }
  }

  &__info {
    gap: 16px;

    @include mobile {
      flex-direction: column;
    }
  }

  &__links {
    gap: 4px;
  }

  &__info-text,
  &__link {
    font: var(--font-400_12);
  }

  &__info-text {
    color: var(--clr-muted);
  }

  &__link {
    color: var(--clr-indigo-500);

    &:not(:last-child) {
      position: relative;
      padding-right: 5px;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1px;
        height: 12px;
        background-color: var(--clr-muted);
      }
    }
  }
}
</style>

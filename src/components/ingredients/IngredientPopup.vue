<template>
  <div class="shade" @click.self="closePopup">
    <div ref="popup" class="popup" :class="{ ['is-open']: isOpen, ['sliding']: isSliding }">
      <button ref="popupCloser" type="button" class="popup__closer" @click="closePopup"></button>
      <div class="popup__image">
        <picture>
          <img loading="lazy" :src="ingredient.imageUrl" class="image" :alt="ingredient.name" />
        </picture>
      </div>
      <p class="popup__text">{{ ingredient.name }}</p>
      <SummaryIconsList :icons="summaryIcons" />
      <AppButton
        variant="primary"
        size="md"
        text="Добавить"
        class="popup__button"
        @click="(addIngredient(ingredient), closePopup())"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SummaryIconsList from '@/components/summary/SummaryIconsList.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { IIngredient, TSummaryIcon } from '@/interfaces'
import { useBurgerStore } from '@/stores/burger'
import { usePopupStore } from '@/stores/popup'
import { Swiper } from '@/utils/swiper'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  ingredient: IIngredient
}>()

const summaryIcons: TSummaryIcon[] = [
  {
    size: 'xs',
    variant: 'red',
    iconName: 'fire',
    text: props.ingredient.kcal + ' ккал',
  },
  {
    size: 'xs',
    variant: 'purple',
    iconName: 'clock',
    text: props.ingredient.time + ' мин',
  },
  {
    size: 'xs',
    variant: 'yellow',
    iconName: 'weight',
    text: props.ingredient.g + ' г',
  },
]

const { closePopup } = usePopupStore()
const { addIngredient } = useBurgerStore()

const isOpen = ref(false)
const isSliding = ref(false)
const swiper = new Swiper()
const popup = ref<HTMLElement | null>(null)
const popupCloser = ref<HTMLElement | null>(null)

onMounted(() => {
  isSliding.value = true
  setTimeout(() => (isOpen.value = true), 150)
  setTimeout(() => (isSliding.value = false), 300)

  swiper.init({
    button: popupCloser.value,
    container: popup.value,
    percent: 30,

    onEnd: (isClose: boolean) => {
      if (isClose) {
        isSliding.value = true
        popup.value?.removeAttribute('style')
        isOpen.value = false
        setTimeout(() => closePopup(), 300)
      } else {
        isSliding.value = true
        popup.value?.removeAttribute('style')
        setTimeout(() => (isSliding.value = false), 300)
      }
    },
    onMove: (shift: number) => {
      if (popup.value) {
        popup.value.style.transform = `translateY(${shift}px)`
      }
    },
  })
})

onUnmounted(() => {
  isOpen.value = false
  isSliding.value = false
  swiper.destroy()
})
</script>

<style lang="scss" scoped>
.shade {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  background-color: rgba(white, 0.5);
  backdrop-filter: blur(2px);
}

.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto auto 0;
  transform: translateY(100%);
  max-width: 380px;
  width: 100%;
  padding: 48px 24px 32px;
  background-color: var(--clr-white);
  box-shadow: 0 -20px 50px 0 rgba(0, 0, 0, 0.1);
  border-radius: 40px 40px 0 0;

  &.sliding {
    transition: all 0.3s ease;
  }

  &.is-open {
    transform: translateY(0);
  }

  &__closer {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 5px;
    background-color: var(--clr-titan-white);
    border-radius: 99px;

    &::after {
      content: '';
      position: absolute;
      width: 380px;
      height: 80px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__image {
    padding: 0 64px;
    margin-bottom: 24px;
  }

  &__text {
    font: var(--font-600_20);
    text-align: center;
    color: var(--clr-dark);
  }

  .summary__icons {
    width: 100%;
  }

  &__button {
    margin-top: 24px;
    width: 100%;
  }
}
</style>

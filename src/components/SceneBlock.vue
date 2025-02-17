<template>
  <div class="scene">
    <div class="burger" :data-animation="animation">
      <img
        v-for="element in elements"
        :key="element.id"
        :src="element.imageUrl"
        :class="element.className"
        :alt="element.alt"
        :style="element.delay ? { animationDelay: `${element.delay}ms` } : null"
      />
    </div>
    <button type="button" class="scene__button" @click="onClick">Создай<br />свой<br />бургер</button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useTabsStore } from '@/stores/tabs'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const { currentTab } = storeToRefs(useTabsStore())
const { isMobile } = storeToRefs(useAppStore())

const animation = ref('')

onMounted(() => {
  animation.value = 'start'
  setTimeout(() => (animation.value = 'finish'), 1500)
})

const elements = [
  {
    id: 1,
    imageUrl: '/images/scene/bun_bottom.png',
    className: 'burger-piece burger-piece--bun-bottom',
    alt: 'Булочка',
  },
  {
    id: 2,
    imageUrl: '/images/scene/mayo_bottom.png',
    className: 'burger-piece burger-piece--mayo-bottom',
    alt: 'Соус',
  },
  {
    id: 3,
    imageUrl: '/images/scene/salad.png',
    className: 'burger-piece burger-piece--salad-bottom',
    alt: 'Салат',
  },
  {
    id: 4,
    imageUrl: '/images/scene/cheese.png',
    className: 'burger-piece burger-piece--cheese',
    alt: 'Сыр',
  },
  {
    id: 5,
    imageUrl: '/images/scene/onion.png',
    className: 'burger-piece burger-piece--onion-1',
    alt: 'Лук',
  },
  {
    id: 6,
    imageUrl: '/images/scene/onion.png',
    className: 'burger-piece burger-piece--onion-2',
    alt: 'Лук',
  },
  {
    id: 7,
    imageUrl: '/images/scene/onion.png',
    className: 'burger-piece burger-piece--onion-3',
    alt: 'Лук',
  },
  {
    id: 8,
    imageUrl: '/images/scene/onion.png',
    className: 'burger-piece burger-piece--onion-4',
    alt: 'Лук',
  },
  {
    id: 9,
    imageUrl: '/images/scene/onion.png',
    className: 'burger-piece burger-piece--onion-5',
    alt: 'Лук',
  },
  {
    id: 10,
    imageUrl: '/images/scene/onion.png',
    className: 'burger-piece burger-piece--onion-6',
    alt: 'Лук',
  },
  {
    id: 11,
    imageUrl: '/images/scene/cutlet.png',
    className: 'burger-piece burger-piece--cutlet',
    alt: 'Котлета',
  },
  {
    id: 12,
    imageUrl: '/images/scene/tomato.png',
    className: 'burger-piece burger-piece--tomato-1',
    alt: 'Помидор',
  },
  {
    id: 13,
    imageUrl: '/images/scene/tomato.png',
    className: 'burger-piece burger-piece--tomato-2',
    alt: 'Помидор',
  },
  {
    id: 14,
    imageUrl: '/images/scene/tomato.png',
    className: 'burger-piece burger-piece--tomato-3',
    alt: 'Помидор',
  },
  {
    id: 15,
    imageUrl: '/images/scene/tomato.png',
    className: 'burger-piece burger-piece--tomato-4',
    alt: 'Помидор',
  },
  {
    id: 16,
    imageUrl: '/images/scene/cucumber.png',
    className: 'burger-piece burger-piece--cucumber-1',
    alt: 'Огурец',
  },
  {
    id: 17,
    imageUrl: '/images/scene/cucumber.png',
    className: 'burger-piece burger-piece--cucumber-2',
    alt: 'Огурец',
  },
  {
    id: 18,
    imageUrl: '/images/scene/cucumber.png',
    className: 'burger-piece burger-piece--cucumber-3',
    alt: 'Огурец',
  },
  {
    id: 19,
    imageUrl: '/images/scene/cucumber.png',
    className: 'burger-piece burger-piece--cucumber-4',
    alt: 'Огурец',
  },
  {
    id: 20,
    imageUrl: '/images/scene/salad.png',
    className: 'burger-piece burger-piece--salad-top',
    alt: 'Салат',
  },
  {
    id: 21,
    imageUrl: '/images/scene/mayo_top.png',
    className: 'burger-piece burger-piece--mayo-top',
    alt: 'Соус',
  },
  {
    id: 22,
    imageUrl: '/images/scene/bun_top.png',
    className: 'burger-piece burger-piece--bun-top',
    alt: 'Булочка',
  },
  {
    id: 23,
    imageUrl: '/images/emj/emj_smile.png',
    className: 'burger-emj burger-emj--smile',
    alt: 'Emoji',
    delay: 400,
  },
  {
    id: 24,
    imageUrl: '/images/emj/emj_explosion.png',
    className: 'burger-emj burger-emj--explosion',
    alt: 'Emoji',
    delay: 500,
  },
  {
    id: 25,
    imageUrl: '/images/emj/emj_party.png',
    className: 'burger-emj burger-emj--party',
    alt: 'Emoji',
    delay: 600,
  },
  {
    id: 26,
    imageUrl: '/images/emj/emj_th-up.png',
    className: 'burger-emj burger-emj--th-up',
    alt: 'Emoji',
    delay: 700,
  },
]

const onClick = () => {
  if (!isMobile.value) {
    currentTab.value = 'ConstructorTab'
  } else {
    const tabElement = document.getElementById('ConstructorTab')
    tabElement?.scrollIntoView({ behavior: 'smooth' })
    currentTab.value = 'ConstructorTab'
  }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/mixins' as *;
@use 'sass:math';
@function rem($px) {
  @return math.div($px, 16) + rem;
}

.scene {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/images/scene-full.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  &__button {
    position: absolute;
    left: 0;
    bottom: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 160px;
    font: var(--font-800_24);
    color: var(--clr-white);
    background-color: var(--clr-indigo-500);
    border-radius: 50%;
    animation: button 0.3s forwards;
    animation-delay: 2500ms;
    opacity: 0;
    visibility: hidden;

    @include mobile {
      width: 100px;
      height: 100px;
      font: var(--font-600_14);
    }
  }
}

.burger {
  position: absolute;
  top: 50%;
  width: 50%;
  margin-inline: auto;
  transform: translateY(-50%);
  aspect-ratio: 2 / 1;

  @include mobile {
    width: 75%;
  }

  .burger-piece {
    position: absolute;
    bottom: rem(30);

    &--cheese,
    &--salad-bottom,
    &--mayo-bottom,
    &--mayo-top,
    &--cutlet,
    &--onion-whole,
    &--salad-top {
      transform: scale(0.7);
    }

    &--mayo-top,
    &--mayo-bottom {
      width: 100%;
    }
  }

  .burger-emj {
    position: absolute;
    transform: scale(0.1);
    opacity: 0;
  }
}

.burger[data-animation='start'] {
  animation:
    bounce 1s ease,
    shake 0.5s ease 1s;

  .burger-piece {
    top: 80%;

    &--bun-bottom,
    &--bun-top {
      right: -5%;
    }

    &--mayo-bottom {
      top: 78%;
    }

    &--salad-bottom {
      top: 65.8%;
    }

    &--cheese {
      top: 71.5%;
    }

    &--onion-1,
    &--onion-2,
    &--onion-3,
    &--onion-4,
    &--onion-5,
    &--onion-6 {
      top: 66%;
      left: 16%;
      width: 30%;
    }

    &--onion-1 {
      left: 16%;
    }

    &--onion-2 {
      left: 33%;
    }

    &--onion-3 {
      right: 16.5%;
    }

    &--cutlet {
      top: 31%;
    }

    &--tomato-1,
    &--tomato-2,
    &--tomato-3,
    &--tomato-4 {
      top: 34%;
      width: 40%;
    }

    &--tomato-1,
    &--tomato-3 {
      left: 14%;
    }

    &--tomato-2,
    &--tomato-4 {
      right: 14%;
    }

    &--cucumber-1,
    &--cucumber-2,
    &--cucumber-3,
    &--cucumber-4 {
      top: 31%;
      width: 33%;
    }

    &--cucumber-1 {
      left: 14%;
    }

    &--cucumber-2,
    &--cucumber-3 {
      left: 34%;
    }

    &--cucumber-4 {
      right: 14%;
    }

    &--salad-top {
      top: 11%;
    }

    &--mayo-top {
      top: 11%;
    }

    &--bun-top {
      top: -54%;
    }
  }
}

.burger[data-animation='finish'] {
  transform: translateY(0) translateX(-5%);

  .burger-piece {
    top: 80%;
    transition: all 0.3s ease-out;

    &--bun-bottom {
      right: -20%;
      transform: rotate(-15deg);
    }

    &--mayo-bottom {
      top: 74%;
      right: -13%;
      transform: scale(0.7) rotate(-15deg);
    }

    &--salad-bottom {
      top: 48.8%;
      right: -8%;
      transform: scale(1);
    }

    &--cheese {
      top: 49.5%;
      right: -13%;
      transform: scale(0.7) rotate(-15deg);
    }

    &--onion-1 {
      top: 11%;
      left: -9%;
      transform: scale(0.6) rotate(15deg);
    }

    &--onion-2 {
      top: 5%;
      left: 35%;
      transform: scale(0.7) rotate(-15deg);
    }

    &--onion-3 {
      top: -4%;
      right: 6.5%;
      transform: scale(0.7) rotate(22deg);
    }

    &--onion-4 {
      top: -27%;
      right: 32%;
      transform: scale(0.25) rotate(-22deg);
    }

    &--onion-5 {
      top: -30%;
      left: 50%;
      transform: scale(0.2) rotate(22deg);
    }

    &--onion-6 {
      top: -50%;
      left: 75%;
      transform: scale(0.5) rotate(22deg);
    }

    &--cutlet {
      top: -25%;
      left: 10%;
      z-index: -1;
      transform: scale(0.75) rotate(-10deg);
    }

    &--tomato-1 {
      top: -30%;
      left: -30%;
      transform: scale(0.2) rotate(45deg);
    }

    &--tomato-2 {
      top: -32%;
      left: 32%;
      transform: scale(0.55) rotate(5deg);
    }

    &--tomato-3 {
      top: -45%;
      left: 10%;
      transform: scale(0.4) rotate(-15deg);
    }

    &--tomato-4 {
      top: -50%;
      left: 55%;
      transform: scale(0.4) rotate(15deg);
    }

    &--cucumber-1 {
      top: -57%;
      left: 7%;
      transform: scale(0.4) rotate(15deg);
    }

    &--cucumber-2 {
      top: -50%;
      left: 35%;
      transform: scale(0.5) rotate(-10deg);
    }

    &--cucumber-3 {
      top: -55%;
      left: 58%;
      transform: scale(0.4) rotate(35deg);
    }

    &--cucumber-4 {
      top: -74%;
      left: 31%;
      transform: scale(0.5) rotate(22deg);
    }

    &--salad-top {
      top: -95%;
      left: 0;
      transform: rotate(22deg);
    }

    &--mayo-top {
      top: -85%;
      left: 2%;
      transform: scale(0.7) rotate(22deg);
    }

    &--bun-top {
      top: -145%;
      left: 15%;
      transform: rotate(25deg);
    }
  }

  .burger-emj {
    --animation-delay: 300ms;
    animation: emj-show 0.5s ease var(--animation-delay) forwards;

    &--smile {
      top: -55%;
      left: -10%;
      transform: scale(0.3) rotate(-35deg);
    }

    &--explosion {
      top: -45%;
      left: 75%;
      transform: scale(0.5);
    }

    &--party {
      top: -2%;
      left: 95%;
      transform: scale(0.3) rotate(20deg);
    }

    &--th-up {
      top: 65%;
      left: -4%;
      transform: scale(0.5) rotate(10deg);
    }
  }
}

@keyframes bounce {
  0% {
    top: 0;
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  50%,
  80%,
  100% {
    top: 50%;
  }

  60% {
    top: 47%;
  }

  70% {
    top: 49%;
  }
}

@keyframes shake {
  0% {
    transform: rotateZ(0) translateY(-50%) translateX(0);
  }
  9% {
    transform: rotateZ(3deg) translateY(-50%) translateX(20px);
  }
  18% {
    transform: rotateZ(-2deg) translateY(-50%) translateX(-18px);
  }
  27% {
    transform: rotateZ(1deg) translateY(-50%) translateX(16px);
  }
  36% {
    transform: rotateZ(-3deg) translateY(-50%) translateX(-14px);
  }
  45% {
    transform: rotateZ(2deg) translateY(-50%) translateX(12px);
  }
  54% {
    transform: rotateZ(-1deg) translateY(-50%) translateX(-10px);
  }
  63% {
    transform: rotateZ(3deg) translateY(-50%) translateX(8px);
  }
  72% {
    transform: rotateZ(-2deg) translateY(-50%) translateX(-6px);
  }
  81% {
    transform: rotateZ(1deg) translateY(-50%) translateX(4px);
  }
  90% {
    transform: rotateZ(-1deg) translateY(-50%) translateX(-2px);
  }
  100% {
    transform: rotateZ(0deg) translateY(-50%) translateX(0);
  }
}

@keyframes emj-show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes button {
  0% {
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
  }

  70% {
    transform: scale(1.25);
  }

  100% {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
}
</style>

<template>
  <div class="shade" @click.self="closePopup">
    <div class="modal">
      <div class="modal__header">
        <p class="modal__title">
          <SvgIcon code="checkout" />
          Подтверждение
        </p>
        <button class="modal__close" @click="closePopup">
          <SvgIcon code="close" />
        </button>
      </div>
      <div class="modal__content">
        <form class="modal__form" @submit.prevent>
          <AppInput v-model="userName" type="text" title="Имя и фамилия" icon-name="emotion-happy" />
          <AppInput v-model="phoneNumber" type="tel" title="Номер телефона" icon-name="phone" />
          <AppInput v-model="address" type="text" title="Адрес доставки" icon-name="route" />
          <AppInput v-model="email" type="email" title="Ваш email" icon-name="email" />
          <AppSelect
            v-model="deliveryTime"
            :options="options"
            :is-option-disabled="isOptionDisabled"
            title="Выберите время доставки"
          />
        </form>
      </div>
      <div class="modal__footer">
        <AppButton variant="ghost" size="md" text="Отмена" @click="closePopup" />
        <AppButton
          variant="primary"
          size="md"
          text="Подтвердить"
          :disabled="isButtonDisabled"
          @click="(closePopup(), createOrder())"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBurgerStore } from '@/stores/burger'
import { usePopupStore } from '@/stores/popup'
import { formatPhoneNumber, validateEmail, validatePhoneNumber } from '@/utils/utils'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import AppButton from './ui/AppButton.vue'
import AppInput from './ui/AppInput.vue'
import AppSelect from './ui/AppSelect.vue'
import SvgIcon from './ui/SvgIcon.vue'

const { closePopup } = usePopupStore()

const userName = ref('')
const phoneNumber = ref('')
const address = ref('')
const email = ref('')
const deliveryTime = ref('')

const options: string[] = []
for (let hour = 10; hour <= 20; hour++) {
  options.push(`${hour}:00`)
  if (hour !== 20) options.push(`${hour}:30`)
}

const currentTime = computed(() => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + 30)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
})

const isOptionDisabled = (option: string) => {
  return option <= currentTime.value
}

const isButtonDisabled = computed(() => {
  return (
    userName.value.length < 2 ||
    !validatePhoneNumber(phoneNumber.value) ||
    address.value.length < 2 ||
    !validateEmail(email.value) ||
    !deliveryTime.value
  )
})

const { ingredients, ketchupIsAdded } = storeToRefs(useBurgerStore())

const createOrder = () => {
  const order = {
    userName: userName.value,
    phoneNumber: formatPhoneNumber(phoneNumber.value),
    address: address.value,
    email: email.value,
    deliveryTime: deliveryTime.value,
    ingredients: ingredients.value,
    ketchupIsAdded: ketchupIsAdded.value,
  }
  console.log(order)

  userName.value = ''
  phoneNumber.value = ''
  address.value = ''
  email.value = ''
  deliveryTime.value = ''
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/mixins' as *;

.shade {
  position: fixed;
  inset: 0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(#5243c2, 0.9);
  backdrop-filter: blur(2px);
  z-index: 10;
}

.modal {
  max-width: 608px;
  width: 100%;
  background-color: var(--clr-white);
  border-radius: 16px;

  &__header,
  &__title,
  &__footer {
    display: flex;
    align-items: center;
  }

  &__header,
  &__content,
  &__footer {
    padding: 16px;
  }

  &__header {
    justify-content: space-between;
    border-bottom: 1px solid var(--clr-titan-white);

    svg {
      width: 24px;
      height: 24px;
      fill: var(--clr-dark);
    }
  }

  &__title {
    gap: 8px;
    font: var(--font-600_20);
    color: var(--clr-dark);
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    @include hover {
      background-color: var(--clr-titan-white);
    }
  }

  &__form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    .select {
      grid-column: span 2;
    }

    @include mobile {
      grid-template-columns: 1fr;

      .select {
        grid-column: span 1;
      }
    }
  }

  &__footer {
    gap: 16px;

    @include desktop {
      justify-content: flex-end;
    }

    @include mobile {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>

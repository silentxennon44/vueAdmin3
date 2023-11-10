<script setup lang="ts">
import type { Form } from 'ant-design-vue'

import 'ant-design-vue/lib/message/style/index.css'
import { message } from 'ant-design-vue'

import { LoginStateEnum, useLoginState } from '../useLogin'
import { CountdownInput } from '~/components/Countdown'
import { StrengthMeter } from '~/components/StrengthMeter'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface FormState {
  username: string
  password: string
  confirmPassword: string
  mobile: string
  sms: string
}

const { handleBackLogin, getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

const formRef = ref<InstanceType<typeof Form>>()
const loading = ref(false)

const formData = reactive<FormState>({
  username: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: ''
})

const handleRegister = async () => {
  message.warning(t('entry.registerNotAvailable'))
}
  const handleInput = (event: { target: { value: string } }) => {
    // Use a regular expression to remove non-numeric characters
    formData.mobile = event.target.value.replace(/[^0-9+]/g, '')
  }
</script>

<template>
  <a-form
    v-if="getShow"
    ref="formRef"
    :model="formData"
    @keypress.enter="handleRegister"
  >
    <a-form-item
      class="enter-x"
      name="username"
    >
      <a-input v-model:value="formData.username" :placeholder="t('entry.username')" size="large" />
    </a-form-item>

    <a-form-item
      class="enter-x"
      name="mobile"
    >
      <a-input v-model:value="formData.mobile" :maxlength="20" @input="handleInput" :placeholder="t('entry.phoneNumber')" size="large" />
    </a-form-item>

    <a-form-item class="enter-x">
      <CountdownInput v-model:value="formData.sms" size="large" :placeholder="t('entry.verificationCode')" />
    </a-form-item>

    <a-form-item
      class="enter-x"
      name="password"
    >
      <StrengthMeter v-model:value="formData.password" size="large" :placeholder="t('entry.password')"/>
    </a-form-item>

    <a-form-item
      class="enter-x"
      name="confirmPassword"
    >
      <a-input-password v-model:value="formData.confirmPassword" size="large" :placeholder="t('entry.confirmPassword')" />
    </a-form-item>

    <a-form-item class="enter-x">
      <a-button size="large" type="primary" block :loading="loading" @click="handleRegister">
        {{ t('entry.register') }}
      </a-button>
    </a-form-item>

    <a-form-item class="enter-x">
      <a-button size="large" block @click="handleBackLogin">
         {{ t('common.return') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

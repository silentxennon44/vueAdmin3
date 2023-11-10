<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'

import 'ant-design-vue/lib/message/style/index.css'
import { message } from 'ant-design-vue'

import { LoginStateEnum, useLoginState } from '../useLogin'
import { CountdownInput } from '~/components/Countdown'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface FormState {
  mobile: string
  sms: string
}

const { handleBackLogin, getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

const formRef = ref<FormInstance>()
const loading = ref(false)

const formData = reactive<FormState>({
  mobile: '',
  sms: ''
})

const handleReset = async () => {
  message.warning(t('entry.mobilePhoneLoginNotAvailable'))
}
</script>

<template>
  <a-form
    v-if="getShow"
    ref="formRef"
    :model="formData"
    @keypress.enter="handleReset"
  >
    <a-form-item
      class="enter-x"
      name="mobile"
    >
      <a-input v-model:value="formData.mobile" :placeholder="t('entry.phoneNumber')" size="large" />
    </a-form-item>

    <a-form-item class="enter-x">
      <CountdownInput v-model:value="formData.sms" :placeholder="t('entry.verificationCode')" size="large" />
    </a-form-item>

    <a-form-item class="enter-x">
      <a-button size="large" type="primary" block :loading="loading" @click="handleReset">
        {{ t('entry.login') }}
      </a-button>
    </a-form-item>

    <a-form-item class="enter-x">
      <a-button size="large" block @click="handleBackLogin">
        {{ t('common.return') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'

import { LoginStateEnum, useLoginState } from '../useLogin'
import { useUserStore } from '~/stores/modules/user'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface FormState {
  username: string
  password: string
}

const { setLoginState, getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

const formRules = {
  username: [{ required: true, message: t('entry.usernameRequired'), trigger: 'blur' }],
  password: [{ required: true, message: t('entry.passwordRequired'), trigger: 'blur' }],
}

const formRef = ref<FormInstance>()
const loading = ref(false)
const remember = ref(true)

const formData = reactive<FormState>({
  username: '',
  password: '',
})

const user = useUserStore()
const handleLogin = async () => {
  const form = unref(formRef)
  if (!form) return
  const data = (await form.validate()) as FormState
  user.loginAction(data)
}

watch(getShow, (isShown) => {
  if (!isShown) {
    Object.keys(formData).forEach((item) => (formData[item] = ''))
  }
})
</script>

<template>
  <a-form v-show="getShow" ref="formRef" :model="formData" :rules="formRules" @keypress.enter="handleLogin">
    <a-form-item class="enter-x" name="username">
      <a-input
        v-model:value="formData.username"
        :placeholder="t('entry.username')"
        size="large"
        autocomplete="off"
        autofill="off"
      />
    </a-form-item>

    <a-form-item class="enter-x" name="password">
      <a-input-password
        v-model:value="formData.password"
        :placeholder="t('entry.password')"
        size="large"
        autocomplete="off"
        autofill="off"
      />
    </a-form-item>

    <a-row class="enter-x">
      <a-col :span="12">
        <a-form-item class="enter-x">
          <a-checkbox v-model:checked="remember" size="small">
            {{ t('entry.remember') }}
          </a-checkbox>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item class="enter-x">
      <a-button size="large" type="primary" block :loading="loading" @click="handleLogin">
        {{ t('entry.login') }}
      </a-button>
    </a-form-item>

    <a-row class="enter-x" justify="space-around">
      <a-col :span="24">
        <a-button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('entry.register') }}
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

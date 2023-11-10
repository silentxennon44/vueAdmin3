<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'

import {
  AlipayCircleFilled,
  GithubFilled,
  GoogleCircleFilled,
  TwitterCircleFilled,
  WechatFilled
} from '@ant-design/icons-vue'

import { LoginStateEnum, useLoginState } from '../useLogin'
import { useUserStore } from '~/stores/modules/user'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface FormState {
  username: string
  password: string,
  authenticator?: string
}

const { setLoginState, getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)


const formRules = {
  username: [
    { required: true, message: t('entry.usernameRequired'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('entry.passwordRequired'), trigger: 'blur' }
  ],
}

const formRef = ref<FormInstance>()
const loading = ref(false)
const remember = ref(true)

const formData = reactive<FormState>({
  username: '',
  password: '',
  authenticator:''
})

const user = useUserStore()
const handleLogin = async () => {
  const form = unref(formRef)
  if (!form)
    return
  const data = await form.validate() as FormState
  user.loginAction(data)
}
</script>

<template>
  <a-form
    v-show="getShow"
    ref="formRef"
    :model="formData"
    :rules="formRules"
    @keypress.enter="handleLogin"
  >
    <a-form-item
      class="enter-x"
      name="username"
    >
      <a-input
        v-model:value="formData.username"
        :placeholder= "t('entry.username')"
        size="large"
      />
    </a-form-item>

    <a-form-item
      class="enter-x"
      name="password"
    >
      <a-input-password
        v-model:value="formData.password"
        :placeholder= "t('entry.password')"
        size="large"
      />
    </a-form-item>

    <a-form-item
      class="enter-x"
      name="authenticator"
    >
      <a-input
        v-model:value="formData.authenticator"
        :placeholder= "t('entry.otp')"
        size="large"
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
      <a-col :span="12">
        <a-form-item :style="{ 'text-align': 'right' }" class="enter-x">
          <a-button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('entry.forgot') }}
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item class="enter-x">
      <a-button size="large" type="primary" block :loading="loading" @click="handleLogin">
        {{ t('entry.login')}}
      </a-button>
    </a-form-item>

    <!-- <a-row class="enter-x" justify="space-around">
      <a-col :span="7">
        <a-button block @click="setLoginState(LoginStateEnum.MOBILE)">
         {{ t('entry.usePhone')}}
        </a-button>
      </a-col>
      <a-col :span="7">
        <a-button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('entry.useCode')}}
        </a-button>
      </a-col>
      <a-col :span="7">
        <a-button block @click="setLoginState(LoginStateEnum.REGISTER)">
         {{ t('entry.register')}}
        </a-button>
      </a-col>
    </a-row> -->

    <!-- <a-divider class="enter-x">
      {{ t('entry.useOtherLoginMethods')}}
    </a-divider> -->

    <!-- <div class="flex justify-evenly enter-x sign-in-way">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div> -->
  </a-form>
</template>

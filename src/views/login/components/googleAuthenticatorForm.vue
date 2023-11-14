<template>
  <template v-if="getShow">
    <div style="display: flex; flex-direction: column; justify-content: center;" id="authenticator">
      <a-form v-if="getShow" ref="formRef" :model="formData" @keypress.enter="handleAuthenticate">
        <a-form-item class="enter-x" :class="styles.antFormItem">
          <span>{{ t('common.enter') }} {{ t('entry.googleOTP') }}</span>
        </a-form-item>

        <a-form-item class="enter-x">
          <a-input v-model:value="formData.otp" :placeholder="t('entry.googleOTP')" size="large" autocomplete="off"
            autofill="off" />
        </a-form-item>

        <a-form-item class="enter-x">
          <a-button size="large" block @click="handleBackLogin">
            {{ t('common.return') }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
</template>

<script setup lang="ts">
import { LoginStateEnum, useLoginState } from '../useLogin'
import { useI18n } from 'vue-i18n'
import type { FormInstance } from 'ant-design-vue'
import { useUserStore } from '~/stores/modules/user'
const { handleBackLogin, getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.ATHENTICATOR)
const { t } = useI18n()

interface FormState {
  otp: string
}
const formRef = ref<FormInstance>()

const formData = reactive<FormState>({
  otp: '',
})
const user = useUserStore()

const handleAuthenticate = async () => {
  const form = unref(formRef)
  if (!form)
    return
  const data = await form.validate() as FormState
  user.authenticateAction(data)
}

watch(getShow, (isShown) => {
  if (!isShown) {
    Object.keys(formData).forEach(item => formData[item] = '')
  }
})
</script>

<style scoped module="styles" lang="scss">
:deep(.antFormItem) {
  [class='ant-form-item-control-input-content'] {
    display: flex;
    justify-content: center;
  }

  .qrCode {
    height: 350px;
  }
}
</style>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'
// import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import 'ant-design-vue/lib/message/style/index.css'
import 'ant-design-vue/lib/modal/style/index.css'

import { LoginStateEnum, useLoginState } from '../useLogin'
import { StrengthMeter } from '~/components/StrengthMeter'
// import { createVNode } from 'vue'
import { generateQRcode, postSupabaseData } from '~/supabase/login'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface FormState {
  username: string
  password: string
  confirmPassword: string
  google_secret: string
}

const { handleBackLogin, getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

const formRef = ref<FormInstance>()
const loading = ref(false)
// const ok = ref(false)

const formData = reactive<FormState>({
  username: '',
  password: '',
  confirmPassword: '',
  google_secret: '',
})

const handleRegister = async () => {
  // message.warning(t('entry.registerNotAvailable'))
  const form = unref(formRef)
  if (!form) return
  const data = (await form.validate()) as FormState
  if (!data.username || !data.password || !data.confirmPassword) return message.error('Please Complete all Fields!')
  if (data.password !== data.confirmPassword) return message.error('Passwords are not the same!')
  console.log(1)
  await handleGenerateQR()
  postSupabaseData('users', formData).then(({ error }) => {
    if (error) return message.error(t('entry.registerFailed'))
    message.success(t('entry.registerSuccess'))
    handleBackLogin()
  })

  // Modal.confirm({
  //   title: t('entry.continueRegister'),
  //   icon: createVNode(ExclamationCircleOutlined),
  //   content: t('entry.registerContinueModalContent'),
  //   okText: t('common.confirm'),
  //   cancelText: t('common.return'),
  //   onOk() {
  //     ok.value = true
  //     postSupabaseData('users', formData).then(({ error }) => {
  //       if (error) return message.error(t('entry.registerFailed'))
  //       message.success(t('entry.registerSuccess'))
  //       handleBackLogin()
  //     })
  //   },
  // })
}

const formRule = {
  username: [{ required: true, message: t('entry.usernameRequired'), trigger: 'blur' }],
  password: [{ required: true, message: t('entry.passwordRequired'), trigger: 'blur' }],
  confirmPassword: [{ required: true, message: t('entry.confirmPasswordRequired'), trigger: 'blur' }],
}

const isQrBtnAbled = ref(false)
// const qrCode = ref('')
// const imgLoading = ref(false)

const handleGenerateQR = async () => {
  if (!formData.username) return message.error(t('entry.qrUsername'))
  isQrBtnAbled.value = true
  // imgLoading.value = true

  const code = await generateQRcode(formData.username)
  // qrCode.value = code.imgLink
  // imgLoading.value = false
  // message.info(t('common.imagePreview'), 2)
  formData.google_secret = code.secret
}
watch(getShow, (isShown) => {
  if (!isShown) {
    Object.keys(formData).forEach((item) => (formData[item] = ''))
  }
  isQrBtnAbled.value = false
  // qrCode.value = ''
})

const handleUsernameChange = () => {
  isQrBtnAbled.value = false
}
</script>

<template>
  <a-form v-if="getShow" ref="formRef" :model="formData" @keypress.enter="handleRegister" :rules="formRule">
    <a-form-item class="enter-x" name="username">
      <a-input
        v-model:value="formData.username"
        :placeholder="t('entry.username')"
        size="large"
        autocomplete="off"
        autofill="off"
        @change="handleUsernameChange"
      />
    </a-form-item>

    <a-form-item class="enter-x" name="password">
      <StrengthMeter
        v-model:value="formData.password"
        size="large"
        :placeholder="t('entry.password')"
        autocomplete="off"
        autofill="off"
      />
    </a-form-item>

    <a-form-item class="enter-x" name="confirmPassword">
      <a-input-password
        v-model:value="formData.confirmPassword"
        size="large"
        :placeholder="t('entry.confirmPassword')"
        autocomplete="off"
        autofill="off"
        id="confirmPassword"
      />
    </a-form-item>

    <!-- <a-row class="enter-x" justify="space-between">
      <a-col :span="12" style="display: flex; justify-content: center; align-items: center">
        <a-form-item class="enter-x">
          <a-button
            style="white-space: normal; height: auto"
            :disabled="isQrBtnAbled"
            @click="handleGenerateQR"
            block
            >{{ t('entry.generateQR') }}</a-button
          >
        </a-form-item>
      </a-col>
      <a-col :span="12" style="display: flex; justify-content: flex-end; align-items: center">
        <a-form-item class="enter-x rowQr">
          <a-image
            :v-if="!qrCode"
            :width="200"
            :height="200"
            :src="qrCode"
            :class="{ loading: imgLoading }"
            fallback="data:image/png;base64,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"
            :preview="{}"
          />
        </a-form-item>
      </a-col>
    </a-row> -->

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

<style lang="less">
.rowQr {
  > .ant-col.ant-form-item-control {
    > .ant-form-item-control-input {
      > .ant-form-item-control-input-content {
        > .ant-image {
          display: flex;
          justify-content: center;
          align-items: center;

          > .ant-image-img {
            width: 200px;
            height: 200px;

            &.loading {
              width: 50px;
              height: 50px;
              content: url(./../../../assets/images/spinner.gif);
            }
          }
        }
      }
    }
  }
}

.ant-image-preview-operations-operation:not(:not(:nth-child(n + 4))) {
  display: none;
}
</style>

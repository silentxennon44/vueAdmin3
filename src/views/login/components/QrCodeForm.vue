<script lang="ts" setup>
import { LoginStateEnum, useLoginState } from '../useLogin'

import qrCodeUrl from '~/assets/images/qrcode.png'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// import { Qrcode } from '~/components/Qrcode'

const { handleBackLogin, getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE)
</script>

<template>
  <template v-if="getShow">
    <div style="display: flex; flex-direction: column; justify-content: center;">
      <!-- <Qrcode
        :value="qrCodeUrl"
        class="enter-x flex justify-center"
        :width="400"
      /> -->

      <img class="enter-x" :src="qrCodeUrl" alt="">

      <a-divider class="enter-x">
       {{ t('entry.qrLogin') }}
      </a-divider>

      <a-button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('common.return') }}
      </a-button>
    </div>
  </template>
</template>

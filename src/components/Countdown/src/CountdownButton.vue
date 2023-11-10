<script setup lang="ts">
import type { PropType } from 'vue'

import { useCountdown } from './useCountdown'
import { isFunction } from '~/utils/is'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  count: { type: Number, default: 60 },
  beforeStartFunc: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null
  }
})

const loading = ref(false)

const { currentCount, isStart, start } = useCountdown(props.count)

const getButtonText = computed(() => !unref(isStart) ? t('entry.getVerification'): t('entry.resendAfter', { time: unref(currentCount)}))

async function handleStart() {
  const { beforeStartFunc } = props
  if (beforeStartFunc && isFunction(beforeStartFunc)) {
    loading.value = true
    try {
      const canStart = await beforeStartFunc()
      canStart && start()
    }
    finally {
      loading.value = false
    }
  }
  else {
    start()
  }
}
</script>

<template>
  <a-button :disabled="isStart" :loading="loading" @click="handleStart">
    {{ getButtonText }}
  </a-button>
</template>

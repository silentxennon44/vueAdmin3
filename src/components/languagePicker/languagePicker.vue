<template>
  <div :class="styles.langPicker">
    <a-dropdown placement="bottomRight">
      <a-button>Language: {{ language.toUpperCase() }}</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="(_, language, index) in translations" :key="language">
            {{ language }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { translations } from '~/i18n'
const language = ref('en')
</script>

<style lang="scss" scoped module="styles">
.langPicker {}
</style>

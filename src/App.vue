<template>
  <router-view />
  <div :class="styles.langPicker" @click.prevent="handleClick">
    Language: {{ language }}
  </div>
  <div :class="styles.langList" v-if="isLangListShown">
    <span @click="languageSelect(lang)" :class="styles.language" v-for="(_, lang, index) in translations" :key="language">
      {{ localeList[lang] }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { translations, localeList } from '~/i18n'
import { useI18n } from 'vue-i18n';
import localCache from '~/utils/cache'

const currentLang = computed(() => locale.value) as unknown as keyof typeof translations
const { locale } = useI18n();
const language = ref(localeList[currentLang.value])
const isLangListShown = ref(false)

const handleClick = () => {
  isLangListShown.value = !isLangListShown.value
}

const languageSelect = (lang: keyof typeof translations) => {
  isLangListShown.value = false
  locale.value = lang
  language.value = localeList[lang]
  localCache.setCache("language", locale.value)
}
</script>

<style lang="scss" module="styles" scoped>
.langPicker {
  position: fixed;
  z-index: 7;
  cursor: pointer;
  bottom: 10px;
  right: 10px;
  padding: 2.5px;
  width: 125px;
  text-align: center;
  background-color: #fff;
  border: 1px solid grey;
}

.langList {
  border: 1px solid grey;
  width: 125px;
  position: fixed;
  z-index: 7;
  display: flex;
  flex-direction: column;
  padding: 2.5px;
  bottom: 10px;
  right: 10px;
  gap: 5px;
  background-color: #fff;
  overflow-y: auto;

  .language {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid transparent;
    transition: .1s border ease;

    &:hover {
      border: 1px solid rgb(47, 147, 214);
    }
  }
}
</style>

<template>
  <a-config-provider :locale="antdLaguage">
    <router-view />
    <div ref="languagePicker" v-if="!isLangListShown" :class="styles.langPicker" @click.prevent="handleClick">
      Language: {{ language }}
    </div>
    <div ref="languageList" :class="styles.langList" v-if="isLangListShown">
      <span @click="languageSelect(lang)" :class="styles.language" v-for="(_, lang, index) in translations"
        :key="language">
        {{ localeList[lang] }}
      </span>
    </div>
  </a-config-provider>
</template>

<script setup lang="ts">
import { translations, localeList, antdlang } from '~/i18n'
import { useI18n } from 'vue-i18n';
import localCache from '~/utils/cache'
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import en_US from 'ant-design-vue/es/locale/en_US'

const currentLang = computed(() => locale.value) as unknown as keyof typeof translations
const { locale } = useI18n();
const language = ref(localeList[currentLang.value])
const isLangListShown = ref(false)
const languageList = ref<HTMLDivElement>()
const languagePicker = ref<HTMLDivElement>()
const antdLaguage = ref(en_US)

const handleClick = () => {
  isLangListShown.value = !isLangListShown.value
}

const languageSelect = (lang: keyof typeof translations) => {
  isLangListShown.value = false
  locale.value = lang
  language.value = localeList[lang]
  localCache.setCache("language", locale.value)
}

watch(currentLang, (item) => {
  const languages = { en_US, zh_CN }
  antdLaguage.value = languages[item]
})

// const handleOutsideClick = (e: MouseEvent) => {
//   console.log(e.target === languageList.value, e.target === languagePicker.value)
// }

// onMounted(() => {
//   window.addEventListener("click", handleOutsideClick)
// })

// onUnmounted(() => {
//   window.removeEventListener("click", handleOutsideClick)
// })
</script>

<style lang="scss" module="styles" scoped>
.langPicker {
  position: fixed;
  z-index: 9;
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
  z-index: 10;
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
    transition: .3s border ease;
    cursor: pointer;

    &:hover {
      border: 1px solid rgb(47, 147, 214);
    }
  }
}
</style>

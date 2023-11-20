<!-- This script for defining icon sources and type could be put in external ts file -->
<script lang="ts">
/** define all the icons that we want to make available here */
const iconSources = {
  signin: () => import('@fortawesome/fontawesome-free/svgs/solid/sign-in-alt.svg'),
  signout: () => import('@fortawesome/fontawesome-free/svgs/solid/sign-out-alt.svg'),
  plus: () => import('@fortawesome/fontawesome-free/svgs/solid/plus.svg'),
}
export type IconSources = keyof typeof iconSources
</script>

<script setup lang="ts">
import { PropType, ref, toRefs, watch } from 'vue'
import fallbackSrc from '../assets/fallback.svg'
const props = defineProps({
  // using PropType<IconSources> here to restrict input to our defined icons only
  // will also provide intellisense if you use Volar extension in VS Code
  icon: { type: String as PropType<IconSources>, required: true },
  width: { type: Number, required: false, default: 25 },
  height: { type: Number, required: false, default: 25 },
})
const { icon, width, height } = toRefs(props)
const iconSrc = ref<string>()
// use watch to reload icon source if prop 'icon' changes
watch(icon, async (newIcon) => (iconSrc.value = (await iconSources[newIcon]()).default), {
  // set immediate flag for initial load
  immediate: true,
})
</script>

<template>
  <transition>
    <img v-if="iconSrc" :src="iconSrc" :width="width" :height="height" />
    <img v-else :src="fallbackSrc" :width="width" :height="height" />
  </transition>
</template>

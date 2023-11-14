import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import setupIcons from './icons'
import setupAutoImport from './auto-import'
import setupVueComponents from './vue-components'
import setupMockServer from './mock'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default function setupVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    Unocss(),
    VueI18nPlugin({
      runtimeOnly: false, // <--- add this
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**') // provide a path to the folder where you'll store translation data
    }),
    nodePolyfills({
      include: ['crypto', 'stream']
    })
  ]

  // unplugin-auto-import
  vitePlugins.push(setupAutoImport())

  // unplugin-vue-components
  vitePlugins.push(setupVueComponents())

  // unplugin-icons
  vitePlugins.push(setupIcons())

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(setupMockServer(isBuild))

  return vitePlugins
}

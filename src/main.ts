import { createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import '~/styles/index.less'
import 'uno.css';
import '~/styles/antdCustom.scss'
import '@unocss/reset/eric-meyer.css'


import { setupStore } from '~/stores'
import { setupRouter } from '~/router'
import { setupGlobDirectives } from '~/directives'
import { setupMutationObserver } from '~/utils/useMutationObserver'
import i18n from "./i18n"

function setupApp() {
  const app = createApp(App)

  // Configure store
  setupStore(app)

  // Configure router
  setupRouter(app)

  // setupi18n
  app.use(i18n)

  // Configure directives
  setupGlobDirectives(app)
  app.mount('#app')

  // setup mutation observer
  setupMutationObserver()
}

setupApp()

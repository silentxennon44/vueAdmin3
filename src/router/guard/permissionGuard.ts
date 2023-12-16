import type { Router } from 'vue-router'
import localCache from '~/utils/cache'
import { EnumCache, EnumPath } from '~/enums'

export function createPermissionGuard(router: Router) {
  router.beforeEach((to: any, from) => {
    const title = to.name[0].toUpperCase() + to.name.slice(1) || 'Scratch Card App Backend'
    document.title = title
    if (to.path !== EnumPath.LOGIN) {
      const token = localCache.getCache(EnumCache.TOKEN_KEY)
      if (!token) {
        return EnumPath.LOGIN
      }
    }
  })
}

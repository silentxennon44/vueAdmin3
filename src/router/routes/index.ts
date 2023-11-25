import type { RouteModuleList } from './typings'

export * from './basic'

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

const routeModuleList: RouteModuleList = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
export const asyncRoutes = routeModuleList

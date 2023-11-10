import { defineStore } from 'pinia'
import { router } from '~/router'
import { EnumCache, EnumPath } from '~/enums'
import localCache from '~/utils/cache'
import { getMenuList, getUserInfo, loginRequest } from '~/api/user'
import { isArray } from '~/utils/is'
import { mapMenuToRoutes } from '~/utils/map-menu'

import type { EnumRole } from '~/enums'
import type { UserInfo } from '#/store'
import { LoginStateEnum, useLoginState } from '~/views/login/useLogin'

const { setLoginState, getLoginState } = useLoginState()

interface UserState {
  token?: string
  userInfo: Nullable<UserInfo>
  roleList: EnumRole[]
  menuList: any[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    roleList: [],
    menuList: []
  }),

  getters: {
    getToken(): string {
      return this.token || localCache.getCache(EnumCache.TOKEN_KEY)
    },

    getUserInfo(): UserInfo {
      return this.userInfo || localCache.getCache(EnumCache.USER_INFO_KEY) || {}
    },

    getRoleList(): EnumRole[] {
      return this.roleList.length > 0 ? this.roleList : localCache.getCache(EnumCache.ROLES_KEY)
    },

    getMenuList(): any[] {
      return this.menuList
    }
  },

  actions: {
    setToken(token: string | undefined): void {
      this.token = token || ''
      localCache.setCache(EnumCache.TOKEN_KEY, this.token)
    },

    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo
      localCache.setCache(EnumCache.USER_INFO_KEY, userInfo)
    },

    setRoleList(roleList: EnumRole[]) {
      this.roleList = roleList
      localCache.setCache(EnumCache.ROLES_KEY, roleList)
    },

    setMenuList(menuList: any[]) {
      this.menuList = menuList

      // map menu to routes
      const routes = mapMenuToRoutes(menuList)
      routes.forEach((route) => {
        router.addRoute(route)
      })
    },

    async loginAction(account: { username: string; password: string }) {
      try {
        const result = await loginRequest(account)
        const { token } = result

        // save token
        this.setToken(token)
        this.afterLoginAction()
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async authenticateAction(account: { username: string; password: string, code:string }) {
      console.log(account)
    },

    async afterLoginAction() {
      if (!this.getToken)
        return null

      // get user info
      await this.getUserInfoAction()

      // get menu list
      // await this.getMenuListAction()
      const userInfo = await getUserInfo()

      if (userInfo.is_new && Boolean(userInfo.is_new)) {
        setLoginState(LoginStateEnum.ATHENTICATOR)
      } else {
        router.push(EnumPath.HOME)
      }
    },

    logout() {
      this.setToken(undefined)
      this.setUserInfo(null)
      localCache.removeCache(EnumCache.USER_INFO_KEY)
      localCache.removeCache(EnumCache.TOKEN_KEY)
      localCache.removeCache(EnumCache.ROLES_KEY)
      router.push(EnumPath.LOGIN)
    },

    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken)
        return null

      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map(item => item.value) as EnumRole[]
        this.setRoleList(roleList)
      }
      else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },

    async getMenuListAction(): Promise<any> {
      if (!this.getToken)
        return null

      const menuList = await getMenuList()

      this.setMenuList(menuList)
    }
  }
})

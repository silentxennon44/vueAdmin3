import { defineStore } from 'pinia'
import { router } from '~/router'
import { EnumCache, EnumPath } from '~/enums'
import localCache from '~/utils/cache'
import { getMenuList, getUserInfo, loginRequest } from '~/api/user'
import { isArray } from '~/utils/is'
import { mapMenuToRoutes } from '~/utils/map-menu'
import { message } from 'ant-design-vue'

import type { EnumRole } from '~/enums'
import type { UserInfo } from '#/store'
import { LoginStateEnum, useLoginState } from '~/views/login/useLogin'
import { authenticator } from 'otplib'
import {
    postSupabaseData,
    supaCheckIfAccountExist,
    checkIfValidGoogleAuthenticatorCode,
    getSecret,
} from '~/supabase/login'
import { toRaw } from 'vue'

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
        menuList: [],
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
        },
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
            const data = await supaCheckIfAccountExist(account.username, account.password)
            if (!data || !!!data.length) return message.error('Invalid Username or Password', 2)

            this.setUserInfo(data[0])
            setLoginState(LoginStateEnum.ATHENTICATOR)

            // const isValid = authenticator.check(token, secret);

            // if (!account.otp) {
            //   const data = await supaCheckIfAccountExist(account.username, account.password)
            //   if (data && data.length)
            //     return message.error('OTP is required for registered users!', 2)

            //   const newUsersData = await postSupabaseData('users', account);

            //   if (newUsersData.error) return message.error(newUsersData.message)

            //   message.success(newUsersData.message)
            //   console.log(newUsersData)

            //   setLoginState(LoginStateEnum.ATHENTICATOR)

            // } else {
            //   // const user = await supaCheckIfAccountExist(account.username, account.password)
            //   // if (user && user.length && user[0].password !== account.password)
            //   //   return message.error('Incorrect Password!', 2)
            //   try {
            //     // const result = await loginRequest(account)
            //     const result = await supaLoginRequest('users', account)

            //     if (result && result.length === 0)
            //       return message.error('Incorrect Username or Password!', 2)

            //     if (checkIfValidGoogleAuthenticatorCode(result[0].google_secret, account.otp)) {
            //       this.setToken('token')
            //       this.afterLoginAction()
            //     }
            //     // if (result?.token) {
            //     //     const { token } = result

            //     //     // save token
            //     //     this.setToken(token)
            //     //     this.afterLoginAction()
            //     // } else {
            //     // }
            //   }
            //   catch (error) {
            //     return Promise.reject(error)
            //   }
            // }
        },

        async authenticateAction(data: { otp: string }) {
            const { google_secret } = toRaw(this.userInfo) ?? localCache.getCache(EnumCache.USER_INFO_KEY)
            // const { google_secret } = localCache.getCache(EnumCache.USER_INFO_KEY)[0]
            const isValid = authenticator.check(data.otp, google_secret)
            if (!isValid) return message.error('Invalid Code')
            message.info('Login Success. Welcome!')
            const genRanHex = (size: number) =>
                [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
            // localCache.setCache(EnumCache.TOKEN_KEY, genRanHex(15))
            this.setToken(genRanHex(15))
            this.afterLoginAction()
            setLoginState(LoginStateEnum.LOGIN)
        },

        async afterLoginAction() {
            // if (!this.getToken)
            //   return null

            // get user info
            // await this.getUserInfoAction()

            // get menu list
            // await this.getMenuListAction()
            // const userInfo = await getUserInfo()
            router.push(EnumPath.HOME)

            // if (userInfo.is_new && Boolean(userInfo.is_new)) {
            //   setLoginState(LoginStateEnum.ATHENTICATOR)
            // } else {
            //   router.push(EnumPath.HOME)
            // }
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
            if (!this.getToken) return null

            const userInfo = await getUserInfo()
            const { roles = [] } = userInfo
            if (isArray(roles)) {
                const roleList = roles.map((item) => item.value) as EnumRole[]
                this.setRoleList(roleList)
            } else {
                userInfo.roles = []
                this.setRoleList([])
            }
            this.setUserInfo(userInfo)
            return userInfo
        },

        async getMenuListAction(): Promise<any> {
            if (!this.getToken) return null

            const menuList = await getMenuList()

            this.setMenuList(menuList)
        },
    },
})

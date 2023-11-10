import request from '../index'

import type { Account, LoginInfo } from './types'

enum API {
  Login = '/login',
  UserInfo = '/userinfo',
  MenuList = '/menu/list'
}

export function loginRequest(account: Account) {
  return request.post<LoginInfo>({
    url: import.meta.env.VITE_API + API.Login,
    data: account,
    headers: {
      Action: 'manage_user'
    }
  })
}

export function getUserInfo() {
  return request.post({ url: import.meta.env.VITE_API + API.UserInfo, headers: { Action: 'manage_user'}, data: { username: 'admine', password: 'adminb'}})
  // return request.get({ url: import.meta.env.VITE_API + API.UserInfo, headers: { Action: 'manage_user'} })
}

export function getMenuList() {
  return request.get({ url: import.meta.env.VITE_API + API.MenuList })
}

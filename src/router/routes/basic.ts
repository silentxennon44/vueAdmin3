import type { RouteRecordRaw } from 'vue-router'
import { EnumPath } from '~/enums'
import { BlankLayout, DefaultLayout } from '~/layouts'

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: EnumPath.USERS,
  },
  {
    path: '/login',
    name: 'login',
    component: BlankLayout,
    redirect: '/login',
    children: [
      {
        path: '',
        name: 'login-page',
        component: () => import('~/views/login/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: BlankLayout,
    children: [
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found-page',
        component: () => import('~/views/page/not-found/index.vue'),
      },
    ],
  },
  // {
  //   path: '/users/allTransaction',
  //   name: 'All Transactions',
  //   component: DefaultLayout,
  //   children: [
  //     {
  //       path: '/',
  //       name: 'All Transactions',
  //       component: () => import('~/views/users/components/allTransactions/allTransactions.vue'),
  //     },
  //   ],
  // },
  // {
  //   path: '/users/allWallet',
  //   name: 'All Wallet',
  //   component: DefaultLayout,
  //   children: [
  //     {
  //       path: '/',
  //       name: 'All Wallet',
  //       component: () => import('~/views/users/components/allWallet/allWallet.vue'),
  //     },
  //   ],
  // },
]

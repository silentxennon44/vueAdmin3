import type { RouteRecordRaw } from 'vue-router'
import { TeamOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/users',
  name: 'users',
  component: DefaultLayout,
  redirect: '/users/info',
  meta: {
    icon: TeamOutlined,
    title: 'Users Management',
    sort: 1,
  },
  children: [
    {
      path: 'info',
      name: 'Users',
      component: () => import('~/views/users/usersManagement.vue'),
      meta: {
        title: 'Users Info',
        sort: 1,
      },
    },
    // {
    //   path: 'wallet',
    //   name: 'wallet',
    //   component: () => import('~/views/users/usersManagement.vue'),
    //   meta: {
    //     title: 'Wallets Info',
    //     sort: 1,
    //   },
    //   children: [
    //     {
    //       path: 'list',
    //       name: 'Wallet Info',
    //       component: () => import('~/views/users/usersManagement.vue'),
    //       meta: {
    //         title: 'Wallet Info',
    //         sort: 1,
    //       },
    //     },
    //     {
    //       path: 'transaction/history',
    //       name: 'Wallet Transaction History',
    //       component: () => import('~/views/users/usersManagement.vue'),
    //       meta: {
    //         title: 'Wallet Transaction History',
    //         sort: 1,
    //       },
    //     },
    //   ],
    // },
    {
      path: 'levels',
      name: 'Users Level',
      component: () => import('~/views/users/usersManagement.vue'),
      meta: {
        title: 'Users Levels',
        sort: 2,
      },
    },
  ],
}

export default route

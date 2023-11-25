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
    {
      path: 'allTransaction',
      name: 'All Transactions',
      component: () => import('~/views/users/components/allTransactions/allTransactions.vue'),
      meta: {
        title: 'All Transactions',
        sort: 2,
      },
    },
    {
      path: 'allWallet',
      name: 'All Wallet',
      component: () => import('~/views/users/components/allWallet/allWallet.vue'),
      meta: {
        title: 'All Wallet',
        sort: 3,
      },
    },
    {
      path: 'levels',
      name: 'Users Level',
      component: () => import('~/views/users/usersManagement.vue'),
      meta: {
        title: 'Users Levels',
        sort: 4,
      },
    },
  ],
}

export default route

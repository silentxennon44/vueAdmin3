import type { RouteRecordRaw } from 'vue-router'
import { TransactionOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/transactions',
  name: 'transactions',
  component: DefaultLayout,
  redirect: '/transactions',
  meta: {
    icon: TransactionOutlined,
    single: true,
    title: 'Transactions',
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'Transactions-table-page',
      component: () => import('~/views/transactions/index.vue'),
    },
  ],
}

export default route

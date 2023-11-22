import type { RouteRecordRaw } from 'vue-router'
import { FundOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/reports',
  name: 'reports',
  component: DefaultLayout,
  redirect: '/reports',
  meta: {
    icon: FundOutlined,
    single: true,
    title: 'Reports Management',
    sort: 3,
  },
  children: [
    {
      path: '',
      name: 'Reports-table-page',
      component: () => import('~/views/reports/reportsManagement.vue'),
    },
  ],
}

export default route

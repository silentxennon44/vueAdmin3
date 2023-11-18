import type { RouteRecordRaw } from 'vue-router'
import { MoneyCollectOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/betting',
  name: 'betting',
  component: DefaultLayout,
  redirect: '/betting',
  meta: {
    icon: MoneyCollectOutlined,
    single: true,
    title: 'Betting',
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'Betting-table-page',
      component: () => import('~/views/betting/index.vue'),
    },
  ],
}

export default route

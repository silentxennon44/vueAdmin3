import type { RouteRecordRaw } from 'vue-router'
import { CreditCardOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/credits',
  name: 'credits',
  component: DefaultLayout,
  redirect: '/credits',
  meta: {
    icon: CreditCardOutlined,
    single: true,
    title: 'Credits',
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'Credits-table-page',
      component: () => import('~/views/credits/index.vue'),
    },
  ],
}

export default route

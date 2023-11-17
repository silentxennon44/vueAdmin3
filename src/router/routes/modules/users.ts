import type { RouteRecordRaw } from 'vue-router'
import { UserOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/users',
  name: 'users',
  component: DefaultLayout,
  redirect: '/users',
  meta: {
    icon: UserOutlined,
    single: true,
    title: t('pageTitle.user'),
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'users-table-page',
      component: () => import('~/views/user/index.vue'),
    },
  ],
}

export default route

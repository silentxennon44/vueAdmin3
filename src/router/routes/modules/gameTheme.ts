import type { RouteRecordRaw } from 'vue-router'
import { GlobalOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/gameTheme',
  name: 'gameTheme',
  component: DefaultLayout,
  redirect: '/gameTheme',
  meta: {
    icon: GlobalOutlined,
    single: true,
    title: 'Game Theme',
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'GameTheme-table-page',
      component: () => import('~/views/gameTheme/index.vue'),
    },
  ],
}

export default route

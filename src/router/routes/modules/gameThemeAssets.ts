import type { RouteRecordRaw } from 'vue-router'
import { SlackOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/gameThemeAssets',
  name: 'gameThemeAssets',
  component: DefaultLayout,
  redirect: '/gameThemeAssets',
  meta: {
    icon: SlackOutlined,
    single: true,
    title: 'Game Theme Assets',
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'GameThemeAssets-table-page',
      component: () => import('~/views/gameThemeAssets/index.vue'),
    },
  ],
}

export default route

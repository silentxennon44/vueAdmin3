import type { RouteRecordRaw } from 'vue-router'
import { DingdingOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/game',
  name: 'game',
  component: DefaultLayout,
  redirect: '/game',
  meta: {
    icon: DingdingOutlined,
    single: true,
    title: 'Game',
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'Game-table-page',
      component: () => import('~/views/game/index.vue'),
    },
  ],
}

export default route

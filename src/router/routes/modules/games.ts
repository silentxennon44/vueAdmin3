import type { RouteRecordRaw } from 'vue-router'
import { AppstoreOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/games',
  name: 'games',
  component: DefaultLayout,
  redirect: '/games',
  meta: {
    icon: AppstoreOutlined,
    single: true,
    title: 'Games Management',
    sort: 2,
  },
  children: [
    {
      path: '',
      name: 'Games-table-page',
      component: () => import('~/views/games/gameManagement.vue'),
    },
  ],
}

export default route

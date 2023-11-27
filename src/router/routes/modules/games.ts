import type { RouteRecordRaw } from 'vue-router'
import { AppstoreOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/games',
  name: 'games',
  component: DefaultLayout,
  redirect: '/games/allGames',
  meta: {
    icon: AppstoreOutlined,
    title: 'Games Management',
    sort: 2,
  },
  children: [
    {
      path: 'allGames',
      name: 'Games-table-page',
      component: () => import('~/views/games/gameManagement.vue'),
      meta: {
        // icon: AppstoreOutlined,
        title: 'Games-table-page',
        sort: 1,
      },
    },
    {
      path: 'management',
      name: 'management',
      redirect: '/management/gameThemes',
      meta: {
        // icon: AppstoreOutlined,
        title: 'Game Management',
        sort: 1,
      },
      children: [
        {
          path: 'gameThemes',
          name: 'Game Theme Management',
          component: () => import('~/views/games/assets&themes/themes.vue'),
          meta: {
            title: 'Game Theme Management',
            sort: 1,
          },
        },
        {
          path: 'gameAssets',
          name: 'Game Assets Management',
          component: () => import('~/views/games/assets&themes/assets.vue'),
          meta: {
            title: 'Game Assets Management',
            sort: 1,
          },
        },
      ],
    },
  ],
}

export default route

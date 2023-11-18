import type { RouteRecordRaw } from 'vue-router'
import { SettingOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/about',
  name: 'about',
  component: DefaultLayout,
  redirect: '/about',
  meta: {
    icon: SettingOutlined,
    single: true,
    title: t('pageTitle.about'),
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'about-page',
      component: () => import('~/views/about/index.vue'),
    },
  ],
}

export default route

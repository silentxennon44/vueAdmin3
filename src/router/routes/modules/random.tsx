import type { RouteRecordRaw } from 'vue-router'
import { DeploymentUnitOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/random',
  name: 'random',
  component: DefaultLayout,
  redirect: '/random',
  meta: {
    icon: DeploymentUnitOutlined,
    single: true,
    title: 'Random Management',
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'Random-table-page',
      component: () => import('~/views/walaComponent.vue'),
    },
  ],
}

export default route

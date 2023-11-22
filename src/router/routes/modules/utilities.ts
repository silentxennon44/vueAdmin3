import type { RouteRecordRaw } from 'vue-router'
import { DeploymentUnitOutlined } from '@ant-design/icons-vue'
import { DefaultLayout } from '~/layouts'
import i18n from '~/i18n'
const { t } = i18n.global

const route: RouteRecordRaw = {
  path: '/utilities',
  name: 'utilities',
  component: DefaultLayout,
  redirect: '/utilities',
  meta: {
    icon: DeploymentUnitOutlined,
    single: true,
    title: 'Utilities Management',
    sort: 4,
  },
  children: [
    {
      path: '',
      name: 'Utilitites-table-page',
      component: () => import('~/views/utilities/utilsManagement.vue'),
    },
  ],
}

export default route

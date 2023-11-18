<template>
  <page-wrapper :title="t('pageTitle.user')" content="Table of all user in teh database ">
    <a-table :columns="columns" :dataSource="dataSource" :loading="loading" />
  </page-wrapper>
</template>

<script setup lang="ts">
import { PageWrapper } from '~/components/Page'
import { useI18n } from 'vue-i18n'
import { getAllUsers } from '~/supabase/login'
import type { ColumnsType } from 'ant-design-vue/lib/table'
const { t } = useI18n()

const columns: ColumnsType = [
  {
    title: 'User ID',
    dataIndex: 'user_id',
    align: 'center',
    key: 'user_id',
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
    align: 'center',
    key: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    align: 'center',
    key: 'last_name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    align: 'center',
    key: 'age',
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    align: 'center',
    key: 'email',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    align: 'center',
    key: 'country',
  },
  {
    title: 'Postal Code',
    dataIndex: 'postal_code',
    align: 'center',
    key: 'postal_code',
  },
  {
    title: 'Favourite Color',
    dataIndex: 'favorite_color',
    align: 'center',
    key: 'favorite_color',
  },
  {
    title: 'Registration Number',
    dataIndex: 'registration_number',
    align: 'center',
    key: 'registration_number',
  },
  {
    title: 'Last Login',
    dataIndex: 'last_login',
    align: 'center',
    key: 'last_login',
  },
]

const dataSource = ref<[] | object>([])
const loading = ref<boolean>(true)
// const currentRange = ref<{ from: number; to: number }>({ to: 0, from: 9 })

const getData = async (count = 10, from = 0) => {
  loading.value = false
  const data = (await getAllUsers('mock_users', count, from)) as Array<unknown>
  dataSource.value = data
  loading.value = false
}

onMounted(() => {
  getData()
})
</script>

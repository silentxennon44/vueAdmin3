<template>
  <page-wrapper :title="'All Transactions'" content="Table of all user in the database ">
    <a-table rowKey="id" :columns="columns" :dataSource="dataSource" :loading="loading" />
  </page-wrapper>
</template>

<script setup lang="ts">
import { PageWrapper } from '~/components/Page'
import { getDataFromTable, getColumns, getSpecificData } from '~/supabase/login'
import { ColumnsType } from 'ant-design-vue/es/table'

const dataSource = ref<[] | object>([])
const columns = ref<ColumnsType>([])
const loading = ref<boolean>(true)

const getData = async (count = Number.MAX_SAFE_INTEGER, from = 0) => {
  loading.value = true
  const data = (await getDataFromTable('transaction', count, from)) as Array<object>
  dataSource.value = data
  loading.value = false
}

const generateColumns = async () => {
  getColumns('transaction').then((columnNames) => {
    columns.value = [...columnNames].map((column) => {
      return {
        title: column
          .replace(/_/g, ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        dataIndex: column,
        align: 'center',
        key: column,
        resizable: true,
        width: 100,
        minWidth: 100,
      }
    })
  })
}

onMounted(() => {
  generateColumns()
  getData()
})
</script>

<style scoped lang="less"></style>

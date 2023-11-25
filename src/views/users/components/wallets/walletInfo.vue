<template>
  <a-table rowKey="id" :columns="columns.filter((item) => !item.hidden)" :dataSource="dataSource" :loading="loading" />
</template>

<script setup lang="ts">
import { getDataFromTable, getColumns, getSpecificData } from '~/supabase/login'
import { ColumnsType } from 'ant-design-vue/es/table'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {
        id: 0,
        name: '',
        username: '',
        password: '',
        user_level: '',
        status: '',
        is_new: '',
        google_secret: '',
      }
    },
  },
})
const dataSource = ref<[] | object>([])
const columns = ref<ColumnsType>([])
const loading = ref<boolean>(true)

const getData = async (count = Number.MAX_SAFE_INTEGER, from = 0) => {
  loading.value = true
  const data = (await getDataFromTable('transaction', count, from)) as Array<object>
  dataSource.value = data.filter((data) => data.user_id === props.data.id)
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

watch(
  () => props.data,
  (newValue) => {
    generateColumns()
    getData()
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="less"></style>

<template>
  <page-wrapper :title="t('pageTitle.user')" content="Table of all user in the database ">
    <a-table :columns="columns" :dataSource="dataSource" :loading="loading" />
    <!-- <a-table :columns="columns" :dataSource="dataSource" :loading="loading" :scroll="{ y: tableHeight }" /> -->
  </page-wrapper>
</template>

<script setup lang="ts">
import { PageWrapper } from '~/components/Page'
import { useI18n } from 'vue-i18n'
import { getDataFromTable, getColumns } from '~/supabase/login'
import type { ColumnsType } from 'ant-design-vue/lib/table'
import { message } from 'ant-design-vue'
// import { useWindowSize } from 'vue-window-size'

// const { height } = useWindowSize()
const { t } = useI18n()

const dataSource = ref<[] | object>([])
const columns = ref<ColumnsType>([])
const loading = ref<boolean>(true)

// const tableHeight = height.value - 107 - 56 - 64 - 70 - 90

// console.log(tableHeight)

const getData = async (count = Number.MAX_SAFE_INTEGER, from = 0) => {
  loading.value = true
  const data = (await getDataFromTable('users', count, from)) as Array<unknown>
  dataSource.value = data
  loading.value = false
}

const generateColumns = async () => {
  const columnNames = await getColumns('users')
  columns.value = columnNames.map((column) => {
    return {
      title: column
        .replace(/_/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      dataIndex: column,
      align: 'center',
      key: column,
    }
  })
}

onMounted(() => {
  generateColumns()
  getData()
  message.info('This is a normal message')
})
</script>
<style lang="less">
.ant-pagination-prev,
.ant-pagination-next {
  .ant-pagination-item-link {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
}

.ant-pagination-jump-next,
.ant-pagination-jump-prev {
  .ant-pagination-item-container {
    .anticon-double-right,
    .anticon-double-left {
      svg {
        margin-bottom: 8px;
      }
    }
  }
}
</style>

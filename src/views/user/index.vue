<template>
  <page-wrapper :title="t('pageTitle.user')" content="Table of all user in teh database ">
    <a-table :columns="columns" :dataSource="dataSource" :loading="loading" />
  </page-wrapper>
</template>

<script setup lang="ts">
import { PageWrapper } from '~/components/Page'
import { useI18n } from 'vue-i18n'
import { getDataFromTable, getColumns } from '~/supabase/login'
import type { ColumnsType } from 'ant-design-vue/lib/table'
const { t } = useI18n()

const dataSource = ref<[] | object>([])
const columns = ref<ColumnsType>([])
const loading = ref<boolean>(true)

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

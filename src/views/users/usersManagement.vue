<template>
  <page-wrapper :title="t('pageTitle.user')" content="Table of all user in the database ">
    <a-card size="small" title="Operations" style="margin-bottom: 16px">
      <!-- <template #extra><a href="#">more</a></template> -->
      <div class="operations">
        <a-input-group compact>
          <a-select v-model:value="searchStringObj.column">
            <a-select-option v-for="column of columns" :key="column.key" :value="column.dataIndex">{{
              column.title
            }}</a-select-option>
          </a-select>
          <a-input v-model:value="searchStringObj.value" style="width: 300px" placeholder="Search here" />
          <a-button type="primary" @click="handleSearchStr">Search</a-button>
        </a-input-group>
        <a-input-group compact>
          <a-range-picker v-model:value="serchDateRange" :format="dateFormat" />
          <a-button type="primary" @click="handleSearchDate">Search Range</a-button>
        </a-input-group>
      </div>
    </a-card>
    <a-table :columns="columns" :dataSource="dataSource" :loading="loading" @resizeColumn="handleResizeColumn">
      <template #bodyCell="{ record, column }">
        <div v-if="column.dataIndex.includes('options')" class="options">
          <a-button size="small" type="primary" @click="handleUpdate(record)">Update</a-button>
          <a-button size="small" type="primary" danger @click="handleDelete(record)">Delete</a-button>
          <a-button size="small" type="default" @click="handleViewWallet(record)">View Wallet</a-button>
          <a-button size="small" type="default" @click="handleViewTransactions(record)">View Transactions</a-button>
        </div>
      </template>
    </a-table>
    <a-modal v-model:visible="modalVissible" title="Basic Modal" @ok="handleOk">
      <p v-for="key in Object.keys(currentRecord)" :key="key">{{ key }}: {{ currentRecord[key] }}"</p>
    </a-modal>
  </page-wrapper>
</template>

<script setup lang="ts">
import { PageWrapper } from '~/components/Page'
import { useI18n } from 'vue-i18n'
import { getDataFromTable, getColumns } from '~/supabase/login'
import type { ColumnsType } from 'ant-design-vue/lib/table'
import { toRaw } from 'vue'
import dayjs, { Dayjs } from 'dayjs'

const { t } = useI18n()

const dataSource = ref<[] | object>([])
const columns = ref<ColumnsType>([])
const loading = ref<boolean>(true)

const modalVissible = ref<boolean>(false)
const currentRecord = ref<object>({})
const searchStringObj = ref<{ column: string; value: string }>({ column: 'id', value: '' })
const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY']
const serchDateRange = ref<[Dayjs, Dayjs]>([dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)])

const handleSearchStr = () => {
  console.log(toRaw(searchStringObj.value))
}

const handleSearchDate = () => {
  console.log(toRaw(serchDateRange.value))
}

const handleResizeColumn = (w, col) => {
  col.width = w
}
const getData = async (count = Number.MAX_SAFE_INTEGER, from = 0) => {
  loading.value = true
  const data = (await getDataFromTable('users', count, from)) as Array<object>
  dataSource.value = data.map((item: object) => ({
    ...item,
    // @ts-expect-error: data is comming from be
    is_new: item.is_new.toString(),
  }))
  loading.value = false
}

const generateColumns = async () => {
  // const columnNames = await getColumns('users')
  // columns.value = [...columnNames, 'options'].map((column) => {
  //   return {
  //     title: column
  //       ?.replace(/_/g, ' ')
  //       ?.split(' ')
  //       ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
  //       ?.join(' '),
  //     dataIndex: column,
  //     align: 'center',
  //     key: column,
  //     resizable: true,
  //     width: 100,
  //     minWidth: 100,
  //     // ellipsis: true,
  //   }
  // })
  getColumns('users').then((columnNames) => {
    columns.value = [...columnNames, 'options'].map((column) => {
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
        // ellipsis: true,
      }
    })
  })
}

const handleOk = (...params) => {
  console.log(params)
  modalVissible.value = false
}

const handleUpdate = (record: any) => {
  currentRecord.value = toRaw(record)
  modalVissible.value = true
}

const handleDelete = (record: any) => {
  currentRecord.value = toRaw(record)
  modalVissible.value = true
}

const handleViewWallet = (record: any) => {
  currentRecord.value = toRaw(record)
  modalVissible.value = true
}

const handleViewTransactions = (record: any) => {
  currentRecord.value = toRaw(record)
  modalVissible.value = true
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

.ant-table-tbody > tr > td {
  vertical-align: middle;
}

.options,
.operations {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 10px;
}

.operations {
  justify-content: flex-start;
  .ant-input-group {
    width: unset;

    .ant-picker-range {
      .ant-picker-range-separator {
        .ant-picker-separator {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .ant-select {
      .ant-select-selector {
        width: 125px;
      }
    }
  }
}
</style>

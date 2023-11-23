<template>
  <page-wrapper :title="t('pageTitle.user')" content="Table of all user in the database ">
    <a-card size="small" title="Operations" style="margin-bottom: 16px">
      <!-- <template #extra><a href="#">more</a></template> -->
      <div class="operations">
        <a-input-group compact class="searchByCellValue">
          <a-select v-model:value="searchStringObj.column">
            <a-select-option
              v-for="column of columns.filter((item) => item.key !== 'options')"
              :key="column.key"
              :value="column.key"
              >{{ column.title }}</a-select-option
            >
          </a-select>
          <a-input v-model:value="searchStringObj.value" style="width: 200px" placeholder="Search here" />
          <a-button type="primary" @click="handleSearchStr">Search</a-button>
        </a-input-group>
        <a-input-group compact>
          <a-range-picker v-model:value="serchDateRange" :format="dateFormat" :disabled-date="disabledDate" />
          <a-button type="primary" @click="handleSearchDate">Search Range</a-button>
        </a-input-group>
      </div>
    </a-card>
    <a-table
      rowKey="id"
      :columns="columns.filter((item) => !item.hidden)"
      :dataSource="dataSource"
      :loading="loading"
      @resizeColumn="handleResizeColumn"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ record, column }">
        <div v-if="column.dataIndex.includes('options')" class="options">
          <a-button size="small" type="primary" @click="handleUpdate(record)">Update</a-button>
          <a-button size="small" type="primary" danger @click="handleDelete(record)">Delete</a-button>
          <a-button size="small" type="default" @click="handleViewWallet(record)">View Wallet</a-button>
          <a-button size="small" type="default" @click="handleViewTransactions(record)">View Transactions</a-button>
        </div>
      </template>
    </a-table>
    <a-modal v-model:visible="UpdateVissible" title="Update User Info" @ok="handleOk">
      <p v-for="key in Object.keys(currentRecord)" :key="key">{{ key }}: {{ currentRecord[key] }}"</p>
    </a-modal>
    <a-modal v-model:visible="WallletInfoVissible" title="Wallet Info" @ok="handleOk">
      <p v-for="key in Object.keys(currentRecord)" :key="key">{{ key }}: {{ currentRecord[key] }}"</p>
    </a-modal>
    <a-modal v-model:visible="HistoryVissible" title="Wallet Transaction History" @ok="handleOk">
      <p v-for="key in Object.keys(currentRecord)" :key="key">{{ key }}: {{ currentRecord[key] }}"</p>
    </a-modal>
  </page-wrapper>
</template>

<script setup lang="ts">
import { PageWrapper } from '~/components/Page'
import { useI18n } from 'vue-i18n'
import { getDataFromTable, getColumns } from '~/supabase/login'
import type { ColumnsType } from 'ant-design-vue/lib/table'
import { createVNode, toRaw } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { Modal, Table, message } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const dataSource = ref<[] | object>([])
const columns = ref<ColumnsType>([])
const loading = ref<boolean>(true)

const UpdateVissible = ref<boolean>(false)
const showOptions = ref<boolean>(false)
const WallletInfoVissible = ref<boolean>(false)
const HistoryVissible = ref<boolean>(false)
const currentRecord = ref<object>({})
const searchStringObj = ref<{ column: string; value: string }>({ column: 'id', value: '' })
const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY']
const serchDateRange = ref<[Dayjs, Dayjs]>([dayjs('2023/11/23', dateFormat), dayjs('2023/11/23', dateFormat)])
const selectedRowKeys = ref<any[]>([])

const handleSearchStr = () => {
  loading.value = true
  console.log(toRaw(searchStringObj.value))
  setTimeout(() => {
    loading.value = false
  }, 1500)
}
const onSelectChange = (changableRowKeys: string[]) => {
  // console.log('selectedRowKeys changed: ', changableRowKeys)
  selectedRowKeys.value = changableRowKeys
}
const disabledDate = (current: Dayjs) => {
  // Can not select days before today and today
  // return current && current < dayjs().endOf('day').subtract(1, 'day')
}

const onSelectAll = (selected: any, selectedRows: any, changeRows: any) => {
  if (selected) {
    console.log(selected)
    return message.info('asdasdasd')
  }
}

const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onChange: onSelectChange,
    hideDefaultSelections: true,
    onSelectAll: onSelectAll,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys: { filter: (arg0: (_key: any, index: any) => boolean) => never[] }) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changableRowKeys.filter((_key: any, index: number) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          })
          selectedRowKeys.value = newSelectedRowKeys
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys: { filter: (arg0: (_key: any, index: any) => boolean) => never[] }) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changableRowKeys.filter((_key: any, index: number) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          })
          selectedRowKeys.value = newSelectedRowKeys
        },
      },
    ],
  }
})

const handleSearchDate = () => {
  loading.value = false
  console.log(toRaw(serchDateRange.value))
  setTimeout(() => {
    loading.value = false
  }, 1500)
}

const handleResizeColumn = (w: any, col: { width: any }) => {
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
        hidden: column === 'options' ? showOptions : false,
        // ellipsis: true,
      }
    })
  })
}

const handleOk = (index: number) => {
  // const modals = []
  console.log(index)
  // modalVissible.value = false
}

const handleUpdate = (record: any) => {
  currentRecord.value = toRaw(record)
  UpdateVissible.value = true
}

const handleDelete = (record: any) => {
  currentRecord.value = toRaw(record)
  Modal.confirm({
    title: 'Delete Record',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Are you sure you want to delete this user?',
    okText: t('common.confirm'),
    cancelText: t('common.return'),
    onOk() {
      // setLoginState(LoginStateEnum.ATHENTICATOR)
      // router.push(EnumPath.USERS)
    },
  })
}

const handleViewWallet = (record: any) => {
  currentRecord.value = toRaw(record)
  WallletInfoVissible.value = true
}

const handleViewTransactions = (record: any) => {
  currentRecord.value = toRaw(record)
  HistoryVissible.value = true
}

onMounted(() => {
  generateColumns()
  getData()
  console.log('Before message')
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
      .ant-picker-input {
        width: 80px;
      }

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
        width: 115px;
      }
    }
  }
}
</style>

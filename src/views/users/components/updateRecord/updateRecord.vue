<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item label="Id" name="id" :rules="[{ required: true, message: 'Please input your ID!' }]">
      <a-input v-model:value="formState.id" disabled />
    </a-form-item>
    <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Please input your Name!' }]">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item
      label="Password"
      name="passsword"
      type="password"
      :rules="[{ required: true, message: 'Please input your Password!' }]"
    >
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <a-form-item
      label="User Level"
      name="user_level"
      :rules="[{ required: true, message: 'Please input your User Level!' }]"
    >
      <a-select v-model:value="formState.user_level" placeholder="User Level">
        <a-select-option value="admin">Admin</a-select-option>
        <a-select-option value="user">User</a-select-option>
        <a-select-option value="guest">Guest</a-select-option>
      </a-select>
      <!-- <a-input v-model:value="formState.user_level" /> -->
    </a-form-item>
    <a-form-item label="Status" name="status" :rules="[{ required: true, message: 'Please input your Status!' }]">
      <!-- <a-input v-model:value="formState.status" /> -->
      <a-select v-model:value="formState.status" placeholder="Status">
        <a-select-option value="active">Active</a-select-option>
        <a-select-option value="inactive">Inactive</a-select-option>
        <a-select-option value="suspended">Suspended</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Is New" name="is_new" :rules="[{ required: true, message: 'Please input your Is New!' }]">
      <!-- <a-input v-model:value="formState.is_new" /> -->
      <a-select v-model:value="formState.is_new" placeholder="Status">
        <a-select-option value="true">true</a-select-option>
        <a-select-option value="false">false</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="Google Secret"
      name="google_secret"
      typee="password"
      :rules="[{ required: true, message: 'Please input your Google Secret!' }]"
    >
      <a-input v-model:value="formState.google_secret" />
    </a-form-item>
    <!-- <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button type="primary" html-type="submit">Return</a-button>
    </a-form-item> -->
  </a-form>
</template>

<script setup lang="ts">
const props = defineProps({
  record: {
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
  submit: {
    type: Boolean,
    default() {
      return true
    },
  },
})

interface FormState {
  id: number
  name: string
  username: string
  password: string
  user_level: string
  status: string
  is_new: string
  google_secret: string
}

const formState = reactive<FormState>({
  id: computed(() => props.record.id) as unknown as number,
  name: computed(() => props.record.name) as unknown as string,
  username: computed(() => props.record.username) as unknown as string,
  password: computed(() => props.record.password) as unknown as string,
  user_level: computed(() => props.record.user_level) as unknown as string,
  status: computed(() => props.record.status) as unknown as string,
  is_new: computed(() => props.record.is_new) as unknown as string,
  google_secret: computed(() => props.record.google_secret) as unknown as string,
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
watch(
  () => props.submit,
  (newValue) => {
    if (newValue) {
      console.log('asdasdasdasd', formState)
    }
  }
)
</script>

<style scoped lang="less"></style>

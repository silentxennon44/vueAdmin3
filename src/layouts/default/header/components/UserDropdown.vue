<template>
  <a-dropdown>
    <div>
      <a-avatar :src="user.getUserInfo.avatar" />
      <span class="ml-10px text-base text-black">{{ user.getUserInfo.username }}</span>
    </div>

    <template #overlay>
      <a-menu>
        <a-menu-item key="logout" @click="handleLogout">
          <span class="flex items-center">
            <poweroff-outlined class="mr-1" />
            <span>{{ t('common.signOut') }}</span>
          </span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { PoweroffOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '~/stores'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const user = useUserStore()

const handleLogout = () => {
  user.logout()
  message.success('用户退出成功', 2)
}
</script>

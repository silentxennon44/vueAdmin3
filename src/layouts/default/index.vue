<template>
  <a-layout>
    <layout-features />
    <layout-header />
    <a-layout>
      <layout-sidebar />
      <a-layout :class="getLayoutClass">
        <layout-content />
        <layout-footer />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LayoutFeatures from './features/index.vue'
import LayoutHeader from './header/index.vue'
import LayoutSidebar from './sidebar/index.vue'
import LayoutContent from './content/index.vue'
import LayoutFooter from './footer/index.vue'

import { useCollapsed } from './useCollapsed'
import { message } from 'ant-design-vue'

const { getCollapsed } = useCollapsed()

const getLayoutClass = computed(() => {
  return {
    'default-layout-main': true,
    'default-layout-main--collapsed': getCollapsed.value,
  }
})

message.config({
  top: '25px',
  duration: 2,
  maxCount: 5,
  rtl: true,
  prefixCls: 'ant-message',
})
</script>

<style scoped lang="less">
.default-layout-main {
  @apply transition-all duration-200;

  padding-top: var(--header-height);
  padding-left: var(--sidebar-width);

  &--collapsed {
    padding-left: var(--sidebar-collapsed-width);
  }
}
</style>

<style lang="scss">
div:has(> .ant-message) {
  position: absolute;
  width: 100%;
  // height: 100vh;
  top: 0;
  // user-select: none;
  .ant-message {
    position: absolute;
    z-index: 999999999;
    // transform: translate(50%, 0);
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;

    box-sizing: border-box;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
    position: fixed;
    top: 8px;
    z-index: 1010;
    pointer-events: none;

    .ant-message-notice {
      padding: 8px;
      text-align: center;

      .ant-message-notice-content {
        display: inline-block;
        padding: 10px 16px;
        background: #fff;
        border-radius: 2px;
        box-shadow:
          0 3px 6px -4px rgba(0, 0, 0, 0.12),
          0 6px 16px 0 rgba(0, 0, 0, 0.08),
          0 9px 28px 8px rgba(0, 0, 0, 0.05);
        pointer-events: all;

        .ant-message-custom-content {
          .ant-message-error,
          .ant-message-warn,
          .ant-message-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          &.ant-message-info {
            .anticon {
              color: #1890ff;
            }
          }

          &.ant-message-warn {
            .anticon {
              color: #faad14;
            }
          }

          &.ant-message-error {
            .anticon {
              color: #f5222d;
            }
          }
        }
      }
    }

    .anticon {
      position: relative;
      bottom: 2px;
      margin-right: 8px;
      font-size: 16px;

      svg {
        display: inline-block;
      }
    }
  }
}
</style>

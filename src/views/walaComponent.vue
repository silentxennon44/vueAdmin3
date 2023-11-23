<template>
  <div>
    <button type="button" @click="handleClick">aslkdlaskdjalskjasd</button>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'

const handleClick = () => {
  message.config({
    top: '25px',
    duration: 2,
    maxCount: 3,
    rtl: true,
    prefixCls: 'my-message',
  })

  message.info('thisis message', 5000)
}
</script>

<style lang="scss">
// .my-message {
//   position: absolute;
//   position: absolute;
//   z-index: 999999999;
// }

div:has(> .my-message) {
  position: absolute;
  width: 100%;
  // height: 100vh;
  top: 0;
  user-select: none;
  .my-message {
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

    .my-message-notice {
      padding: 8px;
      text-align: center;

      .my-message-notice-content {
        display: inline-block;
        padding: 10px 16px;
        background: #fff;
        border-radius: 2px;
        box-shadow:
          0 3px 6px -4px rgba(0, 0, 0, 0.12),
          0 6px 16px 0 rgba(0, 0, 0, 0.08),
          0 9px 28px 8px rgba(0, 0, 0, 0.05);
        pointer-events: all;

        .my-message-custom-content {
          .my-message-error,
          .my-message-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          &.my-message-info {
            .anticon {
              color: #1890ff;
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

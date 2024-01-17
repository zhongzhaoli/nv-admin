<template>
  <div class="cardComponent" :class="{ small: size === 'small' }">
    <div class="headerBox" v-if="title || $slots.action">
      <div class="title">{{ title || '' }}</div>
      <slot name="action" />
    </div>
    <div class="bodyBox">
      <slot name="default" />
    </div>
    <div class="footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup lang="ts">
interface CardProps {
  title?: string;
  size?: 'small' | 'default';
}

defineProps<CardProps>();
</script>
<style lang="scss" scoped>
.cardComponent {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid var(--normal-border-color);
  overflow: hidden;

  & > .headerBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
    padding: 0 24px;
    border-bottom: 1px solid var(--normal-border-color);
    & > .title {
      font-size: 16px;
      font-weight: bold;
    }
  }
  & > .bodyBox {
    margin-block-start: -1px;
    margin-inline-start: -1px;
  }
  & > .footer {
    border-top: 1px solid #f6f6f6;
  }
  &.small {
    & > .headerBox {
      min-height: 40px;
      padding: 0 14px;
      & > .title {
        font-size: 14px;
      }
    }
  }
}
</style>

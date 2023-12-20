<template>
  <div class="cardComponent">
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
}

defineProps<CardProps>();
</script>
<style lang="scss" scoped>
$border-color: #f0f0f0;

.cardComponent {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid $border-color;
  overflow: hidden;
  & > .headerBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
    padding: 0 24px;
    border-bottom: 1px $border-color solid;
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
}
</style>

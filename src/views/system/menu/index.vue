<template>
  <div>
    Menu
    <customCom />
    <a-input type="text" />
  </div>
</template>
<script setup lang="ts">
import { defineComponent, h } from 'vue';

defineOptions({
  name: 'SystemMenu'
});

const customCom = defineComponent({
  name: 'zcxczxzz',
  setup() {
    return () => h('input');
  }
});
</script>
<style scoped></style>

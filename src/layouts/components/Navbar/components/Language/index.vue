<template>
  <el-dropdown trigger="hover">
    <div class="navbarFunItem">
      <i class="ri-translate" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item> 中文 </el-dropdown-item>
        <el-dropdown-item> English </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>

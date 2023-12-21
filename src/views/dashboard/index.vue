<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :span="6">
        <Card size="small" title="访问数">
          <template #action>
            <el-tag type="success">日</el-tag>
          </template>
        </Card>
      </el-col>
      <el-col :span="6">
        <Card size="small" title="订单量">
          <template #action>
            <el-tag type="warning">周</el-tag>
          </template>
        </Card>
      </el-col>
      <el-col :span="6">
        <Card size="small" title="订单数">
          <template #action>
            <el-tag>月</el-tag>
          </template>
        </Card>
      </el-col>
      <el-col :span="6">
        <Card size="small" title="用户量">
          <template #action>
            <el-tag type="danger">总</el-tag>
          </template>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import Card from '@/components/Card/index.vue';
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>

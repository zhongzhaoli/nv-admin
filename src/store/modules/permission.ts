import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePermissionStore = defineStore('permission', () => {
  // 角色
  const roles = ref<string[]>([]);
  // 权限
  const acls = ref<string[]>([]);
  return { roles, acls };
});

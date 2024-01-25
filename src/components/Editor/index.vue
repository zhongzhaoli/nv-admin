<template>
  <div class="editComponent">
    <Toolbar
      class="toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="simple"
    />
    <Editor
      style="height: 380px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue';
import { IToolbarConfig } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

interface ComponentProps {
  value?: string;
}
const props = defineProps<ComponentProps>();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref<string>();
watch(
  () => props.value,
  (val) => {
    if (val) valueHtml.value = val;
  },
  { immediate: true }
);

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['insertVideo', 'fullScreen']
};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const getHtml = () => {
  return editorRef.value.getHtml();
};

const getText = () => {
  return editorRef.value.getText();
};

const setHtml = (val: string) => {
  editorRef.value.setHtml(val);
};

defineExpose({ getHtml, getText, setHtml });
</script>
<style lang="scss" scoped>
.editComponent {
  border: 1px #dcdfe6 solid;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
}
.toolbar {
  border-bottom: 1px #dcdfe6 solid;
}
:deep(.w-e-text-placeholder) {
  top: 15px;
  line-height: 1.5;
}
</style>

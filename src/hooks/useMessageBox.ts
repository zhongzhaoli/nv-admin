import { ElMessageBox } from 'element-plus';

export function useMessageBox(title: string, message: string, fn?: Function) {
  ElMessageBox.confirm(message, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        if (fn) {
          instance.confirmButtonLoading = true;
          await fn();
          done();
        } else {
          done();
        }
      } else {
        done();
      }
    }
  }).catch(() => {});
}

import { ElMessageBox } from 'element-plus';
import { useI18n } from '@/hooks/useI18n';
const { t } = useI18n();

export function useMessageBox(message: string, fn?: Function) {
  ElMessageBox.confirm(message, t('msg.messageBox.warning'), {
    confirmButtonText: t('msg.messageBox.confirm'),
    cancelButtonText: t('msg.messageBox.cancel'),
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

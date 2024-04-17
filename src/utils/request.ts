import { baseURL, requestTimeout, contentType } from '@/config/request';
import { useUserStore } from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';

function createService() {
  const instance = axios.create({
    baseURL,
    timeout: requestTimeout,
    headers: {
      'Content-Type': contentType
    }
  });
  // 请求拦截器
  const requestHandle = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const userStore = useUserStore();
    if (userStore.token)
      config.headers.Authorization = `Bearer ${userStore.token}`;
    return config;
  };
  instance.interceptors.request.use(requestHandle, (error) =>
    Promise.reject(error)
  );

  // 响应拦截器
  const responseHandle = (response: AxiosResponse) => {
    const userStore = useUserStore();
    // apiData 是 api 返回的数据
    const apiData = response.data;
    // 二进制数据则直接返回
    const responseType = response.request?.responseType;
    if (responseType === 'blob' || responseType === 'arraybuffer')
      return apiData;
    const code = apiData.code;
    switch (code) {
      case 0:
        // 0 表示 成功
        return apiData;
      case 401:
        // 401 表示 授权失败
        userStore.logout();
        return location.reload();
      default:
        // 其他情况
        ElMessage.error(apiData.message);
        return Promise.reject(apiData);
    }
  };
  instance.interceptors.response.use(
    (response) => responseHandle(response),
    (error) => {
      // 网络错误码
      const status = error.response.status;
      switch (status) {
        case 404:
          ElMessage.error('接口不存在');
          break;
        default:
          console.log(error);
      }
      return Promise.reject(error);
    }
  );
  return instance;
}

function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    return service(config);
  };
}

const service = createService();

export const request = createRequest(service);

import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/user/userInfo',
    method: 'get',
    rawResponse: () => {}
  }
] as MockMethod[];

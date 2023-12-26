import { MockMethod } from 'vite-plugin-mock';
import { pathPrefix } from './utils';

// modules
import User from './modules/user';
import login from './modules/login';
// 统一前缀
const prefix = '/mock/api';

const apis = pathPrefix(prefix, [...User, ...login]) as MockMethod[];

export default apis;

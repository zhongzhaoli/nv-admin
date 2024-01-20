import { MockMethod } from 'vite-plugin-mock';
import { pathPrefix } from './utils';

// modules
import User from './modules/user';
import Login from './modules/login';
import Routes from './modules/routes';
import Users from './modules/users/index';
import Common from './modules/common';
import Role from './modules/role/index';
// 统一前缀
const prefix = '/mock/api';

const apis = pathPrefix(prefix, [
  ...User,
  ...Login,
  ...Routes,
  ...Users,
  ...Common,
  ...Role
]) as MockMethod[];

export default apis;

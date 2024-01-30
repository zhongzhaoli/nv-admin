import { ROUTE_TYPE } from '@/constants/route';
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /** 面包屑和侧边栏菜单的标题 */
    title?: string;
    /** 是否不在左侧栏中显示 */
    hidden?: boolean;
    /**
     * 当一个路由下面的 children 声明的路由大于 1 个时，自动会变成嵌套的模式，
     * 只有一个时，会将那个子路由当做根路由显示在侧边栏，
     * 若想不管路由下面的 children 声明的个数都显示你的根路由，
     * 可以设置 alwaysShow: true，这样就会忽略之前定义的规则，一直显示根路由
     */
    alwaysShow?: boolean;
    /** keepAlive缓存 */
    keepAlive?: boolean;
    /** 是否固定在TagsView */
    affix?: boolean;
    /** 路由类型 */
    type?: ROUTE_TYPE;
    /** 排序 */
    sort?: number;
    /** 是否在TagsView显示 */
    showTagsView?: boolean;
  }
}

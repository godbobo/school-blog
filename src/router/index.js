import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import browserRouter from './modules/browser'

/**
 * 本项目侧边栏和路由是绑定在一起的，所以你只有在 @/router/index.js 下面配置对应的路由，侧边栏就能动态的生成了。大大减轻了手动
 * 重复编辑侧边栏的工作量。当然这样就需要在配置路由的时候遵循一些约定的规则。
 */

/**
 * 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
* 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
* 若你想不管路由下面的 children 声明的个数都显示你的根路由
* 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
* roles: ['admin', 'editor'] 设置该路由进入的权限，支持多个权限叠加
* 设置该路由在侧边栏和面包屑中展示的名字
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    设置该路由的图标
    icon: 'svg-name'             the icon show in the sidebar
* noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
* 如果设置为false，则不会在breadcrumb面包屑中显示
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  // 注册页面
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // 404页面
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页，重定向到 dashboard
  {
    path: '/',
    component: Layout,
    redirect: '/browser',
    name: 'Dashboard',
    hidden: true
    // children: [{
    //   path: 'essay',
    //   component: () => import('@/views/browser/essay/lst')
    // }]
  },

  // 用户浏览界面
  browserRouter,

  {
    path: '/mine',
    component: Layout,
    redirect: '/mine/product',
    name: 'Mine',
    meta: { title: '我的', icon: 'mine' },
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/mine/product'),
        meta: { title: '作品', icon: 'product' }
      },
      {
        path: 'like',
        name: 'Like',
        component: () => import('@/views/mine/like'),
        meta: { title: '收藏', icon: 'like' }
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('@/views/mine/tags'),
        meta: { title: '标签', icon: 'tag' }
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/mine/message'),
        meta: { title: '消息', icon: 'message' }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/mine/profile'),
        meta: { title: '资料', icon: 'profile' }
      }
    ]
  },

  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('@/views/settings'),
        meta: { title: '设置', icon: 'setting' }
      }
    ]
  },

  {
    path: '/create',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Creating',
        component: () => import('@/views/create'),
        meta: { title: '创建', icon: 'add' }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/user',
    meta: { title: '管理', icon: 'tree' },
    name: 'Admin',
    children: [
      {
        path: 'system',
        name: 'ManageSystem',
        component: () => import('@/views/admin/system'),
        meta: { title: '系统管理', icon: 'system' }
      },
      {
        path: 'user',
        name: 'ManageUser',
        component: () => import('@/views/admin/user'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'essay',
        name: 'ManageEssay',
        component: () => import('@/views/admin/essay'),
        meta: { title: '文章管理', icon: 'essay' }
      },
      {
        path: 'topic',
        name: 'ManageTopic',
        component: () => import('@/views/admin/topic'),
        meta: { title: '话题管理', icon: 'topic' }
      }
    ]
  },

  // 如果最后什么路由都没有匹配到，就重定向到 404 界面
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

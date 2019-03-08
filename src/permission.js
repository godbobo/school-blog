import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => { // 路由守卫，验证用户权限
  NProgress.start() // 开始进度条动画
  if (getToken()) { // 如果获取到 Token（本地保存的），
    if (to.path === '/login') { // 且目标页面为登录页面，
      next({ path: '/' }) // 就跳转到主页面
      NProgress.done() // 如果当前页面就是主页面则不会触发后置路由钩子，在这里手动结束进度条动画
    } else {
      if (store.getters.role === -1) { // 如果 store 中用户角色不存在就获取用户信息，
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next() // 没有发生错误就放行
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => { // 捕获到错误之后清除本地存储的 Token，跳转到首页并向用户发送提示信息
            Message.error(err || '验证 失败，请重新登录')
            next({ path: '/' })
          })
        })
      } else {
        next() // 放行该路由
      }
    }
  } else { // 如果获取不到 Token，
    if (whiteList.indexOf(to.path) !== -1) { // 但是目标地址在白名单中，则放行
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // 结束进度条动画
    }
  }
})

// 在导航结束之后
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

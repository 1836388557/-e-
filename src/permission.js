import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 加载bar
import 'nprogress/nprogress.css' // 加载 bar样式
import { getToken } from '@/utils/auth' // 得到token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 加载设置

const whiteList = ['/login'] // 白名单

router.beforeEach(async(to, from, next) => {
  // 开始项目bar
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果登录，跳到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          // await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // 移除token，进去登录页重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token

    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单，直接进
      console.log('白名单')
      next()
    } else {
      // 不进入其他页面，只能进去登录页.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 加载完成 bar
  NProgress.done()
})

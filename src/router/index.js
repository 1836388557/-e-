import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 布局 */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/uploadSwiper',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'uploadSwiper',
        component: () => import('@/views/uploadSwiper/index'),
        meta: { title: '轮播', icon: 'guide' }
      }
    ]
  },
  {
    path: '/school',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'school',
        component: () => import('@/views/school/index'),
        meta: { title: '学校', icon: 'el-icon-school' }
      }
    ]
  },
  {
    path: '/goodSort',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'goodSort',
        component: () => import('@/views/goodSort/index'),
        meta: { title: '商品分类', icon: 'el-icon-box' }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'notice',
        component: () => import('@/views/notice/index'),
        meta: { title: '通告', icon: 'el-icon-document' }
      }
    ]
  },
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/good',
    name: 'audit',
    meta: { title: '审核', icon: 'search' },
    children: [
      {
        path: 'good',
        name: 'good',
        component: () => import('@/views/audit/good/index'),
        meta: { title: '商品', icon: 'el-icon-goods' }
      },
      {
        path: 'need',
        name: 'need',
        component: () => import('@/views/audit/need/index'),
        meta: { title: '需求', icon: 'el-icon-sell' }
      },
      {
        path: 'pool',
        name: 'pool',
        component: () => import('@/views/audit/pool/index'),
        meta: { title: '拼车', icon: 'el-icon-bicycle' }
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/audit/activity/index'),
        meta: { title: '活动', icon: 'el-icon-s-flag' }
      },
      {
        path: 'job',
        name: 'job',
        component: () => import('@/views/audit/job/index'),
        meta: { title: '兼职', icon: 'el-icon-office-building' }
      },
      {
        path: 'identity',
        name: 'identity',
        component: () => import('@/views/audit/identity/index'),
        meta: { title: '认证', icon: 'el-icon-office-building' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'admin',
        component: () => import('@/views/admin/index'),
        meta: { title: '管理员', icon: 'el-icon-s-custom' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户', icon: 'el-icon-user-solid' }
      }
    ]
  },

  // 404 一定要放在最后!!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // 需要服务器
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router

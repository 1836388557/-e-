import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
        meta: { title: '上传轮播', icon: 'guide' }
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
        path: 'lost',
        name: 'lost',
        component: () => import('@/views/audit/lost/index'),
        meta: { title: '遗失', icon: 'el-icon-heavy-rain' }
      },
      {
        path: 'find',
        name: 'find',
        component: () => import('@/views/audit/find/index'),
        meta: { title: '招领', icon: 'el-icon-sunrise' }
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

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '表单', icon: 'form' }
  //     }
  //   ]
  // },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: '',
        meta: { title: '额外链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('./Login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    meta: { title: '首页' },
    children: [{
      path: 'dashboard',
      component: () => import('./Dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/BBS',
    name: 'BBS',
    component: Layout,
    meta: { title: '论坛', icon: 'example' },
    redirect: '/BBS/posts',
    children: [
      {
        path: 'posts',
        name: 'BBSPosts',
        component: () => import('./BBS/Posts/index'),
        meta: { title: '烦恼', icon: 'table' }
      },
      {
        path: 'posts/:id/comments',
        name: 'BBSComments',
        component: () => import('./BBS/Comments/index'),
        meta: { title: '评论' },
        hidden: true
      },
      {
        path: 'comments/:id/replies',
        name: 'BBSReplies',
        component: () => import('./BBS/Replies/index'),
        meta: { title: '回复' },
        hidden: true
      },
      {
        path: 'report',
        name: 'BBSReport',
        component: () => import('./BBS/Report/index'),
        meta: { title: '举报', icon: 'eye' }
      },
      {
        path: 'stat',
        name: 'BBSStat',
        component: () => import('./BBS/Stat/index'),
        meta: { title: '统计', icon: 'form' },
        redirect: '/BBS/stat/ages',
        children: [
          {
            path: 'ages',
            name: 'BBSStatAges',
            component: () => import('./BBS/Stat/Ages'),
            meta: { title: '年龄统计' }
          },
          {
            path: 'sex',
            name: 'BBSStatSex',
            component: () => import('./BBS/Stat/Sex'),
            meta: { title: '性别统计' }
          },
          {
            path: 'provinces',
            name: 'BBSStatProvinces',
            component: () => import('./BBS/Stat/Provinces'),
            meta: { title: '省份统计' }
          }
        ]
      }
    ]
  },
  {
    path: '/teasings',
    name: 'teasings',
    component: Layout,
    meta: { title: '吐槽', icon: 'nested' },
    redirect: '/teasings/resources',
    children: [
      {
        path: 'resources',
        name: 'resources',
        component: () => import('./Teasings/index'),
        meta: { title: '吐槽' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '基础-登录页',
    component: () => import('@/views/basic/login.vue')
  },
  {
    path: '/login_error',
    name: '登录失败',
    component: () => import('@/views/basic/loginError.vue')
  },
  {
    path: '/basic/main',
    name: '基础-首页',
    component: () => import('@/views/basic/main.vue'),
    meta: {
      closed: true
    }
  },
  {
    path: '/basic/personal',
    name: '基础-个人信息',
    component: () => import('@/views/basic/menu.vue')
  },
  {
    path: '/customer/index',
    name: '用户详情页面',
    component: () => import('@/views/customer/index.vue')
  },
  {
    path: '/hk_config/qrCode',
    name: '渠道二维码',
    component: () => import('@/views/hk_config/qrCode.vue')
  },
  {
    path: '/hk_config/gimmick',
    name: '话术分组',
    component: () => import('@/views/hk_config/gimmick.vue')
  },
  {
    path: '/hk_config/quickReply',
    name: '话术详情',
    component: () => import('@/views/hk_config/quickReply.vue')
  }
]

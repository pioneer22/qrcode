/* 静态页面路由 */
const staticRouter = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/AppLogin')
  }, {
    path: '/',
    menu: true,
    name: 'layout',
    component: () => import('@/views/layout/TheLayout'),
    children: [
      {
        path: '/index',
        name: 'index',
        title: 'menu.index',
        icon: 'el-icon-s-home',
        component: () => import('@/views/pages/PageHome')
      }, {
        path: '/qrcode',
        name: 'qrcode',
        title: 'menu.qrcode',
        icon: 'el-icon-user-solid',
        component: () => import('@/views/layout/TheLayoutEmpty'),
        children: [
          {
            path: '/qrcode/addCode',
            name: 'pageQrcodeAdd',
            title: 'menu.addCode',
            component: () => import('@/views/pages/qrcode/PageQrcodeAdd')
          }, {
            path: '/qrcode/manageCode',
            name: 'pageQrcodeManage',
            title: 'menu.manageCode',
            component: () => import('@/views/pages/qrcode/PageQrcodeManage')
          }
        ]
      }, {
        path: '/user',
        name: 'user',
        title: 'menu.settings',
        icon: 'el-icon-setting',
        component: () => import('@/views/layout/TheLayoutEmpty'),
        children: [
          {
            path: '/user/password',
            name: 'userPassword',
            title: 'menu.modifyPass',
            component: () => import('@/views/pages/user/PageUserPassword')
          }
        ]
      }, {
        path: '/manager',
        name: 'manager',
        title: 'menu.manager',
        icon: 'el-icon-s-custom',
        component: () => import('@/views/pages/PageManager')
      }, {
        path: '/about',
        name: 'about',
        title: 'menu.about',
        icon: 'el-icon-star-off',
        component: () => import('@/views/pages/PageAbout')
      }
    ]
  }
]

export default staticRouter

/* 静态页面路由 */
const staticRouter = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: () => require('@/views/login/AppLogin')
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
        icon: 'el-icon-picture',
        component: () => import('@/views/pages/PageHome')
      }, {
        path: '/qrcode',
        name: 'qrcode',
        title: 'menu.qrcode',
        icon: 'el-icon-s-home',
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
      }, /* {
        path: '/forms',
        name: 'forms',
        title: 'menu.form',
        icon: 'el-icon-tickets',
        component: () => import('@/views/layout/TheLayoutEmpty'),
        children: [
          {
            path: '/forms/base',
            name: 'formsBase',
            title: 'menu.formBase',
            component: () => import('@/views/pages/forms/PageFormsBase')
          }, {
            path: '/forms/edit',
            name: 'formsEdit',
            title: 'menu.richText',
            component: () => import('@/views/pages/forms/PageFormsEdit')
          }
        ]
      }, {
        path: '/charts',
        name: 'charts',
        title: 'menu.chart',
        icon: 'el-icon-picture',
        component: () => import('@/views/pages/PageCharts')
      }, */ {
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
  }, {
    path: '/error/403',
    name: 'error403',
    component: () => import('@/views/error/AppError403')
  }, {
    path: '/error/500',
    name: 'error500',
    component: () => import('@/views/error/AppError500')
  }, {
    path: '*',
    name: 'error404',
    component: () => import('@/views/error/AppError404')
  }
]

export default staticRouter

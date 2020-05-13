import { request } from '../utils/request'
import staticRouter from '@/router/staticRouter'

// 登录
export const requestLogin = params => {
  return request('/api/user/login', params).then(data => {
    // localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
}

export const requestRegister = params => {
  return request('/api/user/register', params)
}

export const requestUserInfo = params => {
  return request('/api/user/info', params).then(res => {
    // 过滤菜单
    const filterUserMenu = function (menus, accessMenu) {
      menus.forEach(function (m) {
        if (m.noMenu) {
          return
        }
        if (m.children) {
          let subMenu = []
          filterUserMenu(m.children, subMenu)
          if (subMenu.length > 0) {
            let _aMenu = Object.assign({}, m)
            _aMenu.children = subMenu
            accessMenu.push(_aMenu)
          }
        } else {
          res.permissions.some(p => p.name === m.name) && accessMenu.push(m)
        }
      })
    }

    let accessMenu = []
    let menus = []
    staticRouter.forEach(r => {
      menus = r.menu ? menus.concat(r.children) : menus
    })

    // 判断是否是管理员
    if (res.name !== 'admin') {
      console.log("user.name:", 6)
      let index = menus.indexOf('管理员管理')
      menus.splice(index, 1)
    }

    filterUserMenu(menus, accessMenu)
    res.accessMenu = accessMenu
    return res
  })
}

export const requestLogout = params => {
  return request('/api/user/logout', params)
}

export const requestChangePassword = params => {
  return request('/api/user/changePassword', params)
}

export const requestUserQuery = params => {
  return request('/api/user/query', params)
}

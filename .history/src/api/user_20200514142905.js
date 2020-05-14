import { request } from '../utils/request'
import ajax from '../utils/ajax'
import staticRouter from '@/router/staticRouter'

// 登录
/* export const requestLogin = params => {
  return request('/api/user/login', params).then(data => {
    // localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
} */

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

    filterUserMenu(menus, accessMenu)
    res.accessMenu = accessMenu
    return res
  })
}




// 登录，参数为用户名，密码
export const requestLogin = params => ajax('/api/user/login', params, 'POST')

// 新增用户 ，参数为 用户名，密码
export const insertUser = params => ajax('/api/user/insertUser', params, 'POST')

// 删除用户 ，参数为用户id
export const deleteUser = params => ajax('/api/user/deleteUser', params, 'POST')

// 编辑用户信息，参数为用户id, 用户名，用户密码
export const editUser = params => ajax('/api/user/editUser', params, 'POST')



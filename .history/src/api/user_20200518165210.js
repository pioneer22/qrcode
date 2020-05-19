import ajax from '../utils/ajax'
// import staticRouter from '@/router/staticRouter'
import global from '@/utils/globalVal'

// 登录
/* export const requestLogin = params => {
  return request(global.url + '/qrcode/index/login', params).then(res => {
    // localStorage.setItem('user-token', JSON.stringify(data.token))
    return res
  })
} */


// 登录，参数为用户名，密码
export const requestLogin = params => ajax(global.url + '/qrcode/index/login', params, 'POST')

// 新增用户 ，参数为 用户名，密码
export const insertUser = params => ajax(global.url + '/api/user/insertUser', params, 'POST')

// 删除用户 ，参数为用户id
export const deleteUser = params => ajax(global.url + '/api/user/deleteUser', params, 'POST')

// 编辑用户信息，参数为用户id, 用户名，用户密码
export const editUser = params => ajax(global.url + '/api/user/editUser', params, 'POST')

// 修改密码, 传用户id， 用户原密码 ，用户新密码
export const changePassword = params => ajax(global.url + '/api/user/changePassword', params, 'POST')

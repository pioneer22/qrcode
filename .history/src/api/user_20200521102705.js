import ajax from '../utils/ajax'

// 登录，参数为用户名，密码
export const requestLogin = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/login', params, 'POST')

// 新增用户 ，参数为 用户名，密码
export const insertUser = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/add_admin', params, 'POST')

// 删除用户 ，参数为用户id
export const deleteUser = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/edit_admin', params, 'POST')

// 编辑用户信息，参数为用户id, 用户名，用户密码
export const editUser = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/edit_admin', params, 'POST')

// 修改密码, 传用户id， 用户原密码 ，用户新密码
export const updatePassword = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/modify_pwd', params, 'POST')

// 获取用户列表
export const requestUser = () => ajax(process.env.VUE_APP_URL + '/qrcode/index/modify_pwd', {}, 'POST')


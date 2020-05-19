import ajax from '../utils/ajax'

// 获取个人活码, 参数为用户id
export const requestQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/qrcode_lists', params)

// 编辑活码，修改活码标题，参数为活码id,活码标题
export const changeTitle = params => ajax(process.env.VUE_APP_URL + '/qrcode/editTitle', params, 'POST')

// 删除活码，删除当前活码，参数为活码id
export const deleteQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/deleteCode', params, 'POST')

// 获取活码子码，参数为活码id
export const requestChildQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/getChildQrcode', params)

// 编辑子码，参数为 活码id ,子码id ,子码标题,子码排序, 子码img
export const editChildQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/editChildQrcode', params, 'POST')

// 删除子码，参数为活码id , 子码id
export const deleteChildQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/deleteChildQrcode', params, 'POST')

// 上传二维码
export const uploadQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/create_qrcode', params, 'POST')


import ajax from '../utils/ajax'

// 获取个人活码, 参数为用户id
export const requestQrcode = params => ajax('/api/qrcode/getQrcode', params)

// 获取活码子码，参数为活码id
export const requestChildQrcode = params => ajax('/api/qrcode/getChildQrcode', params)

// 编辑活码，修改活码标题，参数为活码id,活码标题
export const changeTitle = params => ajax('/api/qrcode/editTitle', params, 'POST')

// 删除活码，删除当前活码，参数为活码id
export const deleteQrcode = params => ajax('/api/qrcode/deleteCode', params, 'POST')

// 编辑子码，参数为 活码id ,子码id ,子码标题,子码排序, 子码img
export const editChildQrcode = params => ajax('/api/qrcode/editChildQrcode', params, 'POST')

// 删除子码，参数为活码id , 子码id
export const deleteChildQrcode = params => ajax('/api/qrcode/deleteChildQrcode', params, 'POST')
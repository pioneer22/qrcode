import { request } from '../utils/request'
import ajax from '../utils/ajax'

// 获取个人活码, 参数为用户id
export const requestQrcode = params => ajax('/api/qrcode/getQrcode', params)

// 获取活码子码，参数为活码id
export const requestChildQrcode = params => ajax('/api/qrcode/getChildQrcode', params)

// 编辑活码，修改活码标题，参数为活码id,活码标题
export const changeTitle = params => ajax('/api/qrcode/editTitle', params, 'POST')
import { request } from '../utils/request'

// 修改活码标题
export const changeTitle = params => {
  return request('/api/qrcode/editTitle', params)
}
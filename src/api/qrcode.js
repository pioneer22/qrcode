import { request } from '../utils/request'

export const changeTitle = params => {
  return request('/api/qrcode/editTitle', params)
}
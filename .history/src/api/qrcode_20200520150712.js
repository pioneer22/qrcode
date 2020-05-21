import ajax from '../utils/ajax'
import axios from 'axios'

axios.defaults.withCredentials = true // 引入axios

/* let instance = axios.create({
  withCredentials: true
}) */

// 上传二维码
// export const uploadQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/create_qrcode', params, 'POST')

// 生成活码
export const uploadQrcode = (formDate) => {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(process.env.VUE_APP_URL + '/qrcode/index/create_qrcode', formDate, config)
  /* return new Promise(function (resolve, reject) {
    axios.post(process.env.VUE_APP_URL + '/qrcode/index/create_qrcode', formDate, config).then(res => {
      // 成功回调resolve()
      resolve(res)
    }).catch(error => {
      // 失败回调reject()
      reject(error)
    })
  }) */
}

// 获取个人活码, 参数为用户id
export const requestQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/qrcode_lists', params)

// 获取活码子码，参数为活码id
export const requestChildQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/subcode_lists', params)

// 删除活码，删除当前活码，参数为活码id
export const deleteQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/del_qrcode', params, 'POST')

// 删除子码，参数为活码id , 子码id
export const deleteChildQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/index/del_subcode', params, 'POST')




// 编辑活码，修改活码标题，参数为活码id,活码标题
export const changeTitle = params => ajax(process.env.VUE_APP_URL + '/qrcode/editTitle', params, 'POST')

// 编辑子码，参数为 活码id ,子码id ,子码标题,子码排序, 子码img
export const editChildQrcode = params => ajax(process.env.VUE_APP_URL + '/qrcode/editChildQrcode', params, 'POST')





import _axios from "../utils/service";

const link = (url: string, method: string = 'GET', data: object = {}, params: object = {}) => {
  return new Promise((resolve, reject) => {
    _axios.request({
      url,
      method,
      data,
      params
    }).then((res: unknown) => {
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}

export default link
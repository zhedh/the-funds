import http from './http'

class Other {
  /**
   * 获取公告列表
   **/
  static getNotices() {
    return http.get('/other/noticelist')
  }
}

export default Other

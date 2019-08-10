import http from './http'

class OtherApi {
  /**
   * 获取公告列表
   **/
  static getNotices() {
    return http.get('/other/noticelist')
  }
}

export default OtherApi

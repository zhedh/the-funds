import axios from 'axios'
import http from './http'
import config from './config'

class Other {
  /**
   * 获取公告列表
   **/
  static getNotices() {
    return http.get('/other/noticelist')
  }
}

export default Other

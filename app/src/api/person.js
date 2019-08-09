import http from "./http";

class PersonApi {
  /**
   * 获取个人详细信息
   *
   * appType string app客户端种类，0为ios，1为安卓，用于获取最新客户端下载地址
   **/
  static getUserInfo(options = {}) {
    return http.post('/user/myinfo', options)
  }
}

export default PersonApi

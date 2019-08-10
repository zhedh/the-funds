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

  /**
   * 我的特价额度
   **/
  static getSpecial(options = {}) {
    return http.post('/user/myspecial', options)
  }

  /**
   * 我的特价额度
   *
   * @required productId string 商品ID
   * status string 0锁定，1可用，2提现锁定，3已失效
   * day string today|yestoday
   **/
  static getSpecialDetail(options = {}) {
    return http.post('/user/myspeciallist', options)
  }

  /**
   * 我的钱包地址
   *
   * @required type string 钱包地址类型(USDT、ZBX)
   **/
  static getWalletAddress(options = {}) {
    return http.post('/user/mywallet', options)
  }

  /**
   * 提交认证资料
   *
   * @required country string 国家
   * @required cardType string 证件类型
   * @required firstName string 名字（选中中国时为全名）
   * @required lastName string 姓式（选中中国时可以不提交）
   * @required cardId string 证件号码
   **/
  static getWalletAddress(options = {}) {
    return http.post('/user/mywallet', options)
  }

  /**
   * 上传认证图片
   *
   * @required image file 图片文件
   * @required type string 1为正面，2为背面，3为手持证件照
   **/
  static uploadPhoto(options = {}) {
    return http.post('/user/uploadphoto', options)
  }

  /**
   * 我的认证资料
   **/
  static getAuthInfo(options = {}) {
    return http.post('/user/authenticationinfo', options)
  }

  /**
   * 提交认证审核
   **/
  static submitAuthentication(options = {}) {
    return http.post('/user/authenticationsubmit', options)
  }
}

export default PersonApi

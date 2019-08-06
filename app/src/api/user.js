import http from '../utils/http'

class UserApi {
  static login(options) {
    return http.post('/user/login', options)
  }

  // 注册
  static register(options) {
    return http.post('/user/reg', options)
  }

  static getCaptchapng() {
    return http.get('/captchapng/png')
  }

  // 发送邮箱验证码
  static sendMailCode(options) {
    return http.post('/user/sendmailcode', options)
  }

  // @required imgcode string 图形验证码
  // @required prefix string 国家码
  // @required phone string 图形验证码
  // type string 图形验证码 （reg|findpassword）

  // 发送手机验证码
  static sendSmsCode(options) {
    return http.post('/user/sendmailcode', options)
  }
}

export default UserApi

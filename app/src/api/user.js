import http from './http'
import config from './config'

class User {
  /**
   * 获取图形验证码
   **/
  static getCaptchaPng() {
    return Promise.resolve(config.baseURL + '/captchapng/png')
  }

  /**
   * 发送邮箱验证码
   *
   * @required imgcode string 图形验证码
   * @required email string 邮箱
   * type string 图形验证码 （reg|findpassword|setpaypassword|withdraw）
   **/
  static sendMailCode(options) {
    options.noLogin = true
    return http.post('/user/sendmailcode', options)
  }

  /**
   * 发送手机验证码
   *
   * @required imgcode string 图形验证码
   * @required prefix string 国家码
   * @required phone string 图形验证码
   * type string 图形验证码 （reg|findpassword）
   **/
  static sendSmsCode(options) {
    options.noLogin = true
    return http.post('/user/sendsmscode', options)
  }

  /**
   * 用户注册
   *
   * phonePrefix string 手机号前缀
   * @required userName string 用户名
   * @required code string 邮箱验证码
   * @required password string 密码
   * @required passwordConfirm string 密码
   * recommend_code string 推荐码
   **/
  static register(options) {
    options.noLogin = true
    return http.post('/user/reg', options)
  }

  /**
   * 用户登录
   *
   * @required userName string 手机号或邮箱地址
   * @required password string 密码
   * phonePrefix string 手机号前缀（当输入账号为手机时）
   **/
  static login(options) {
    options.noLogin = true
    return http.post('/user/reg', options)
  }

  /**
   * 绑定手机号
   *
   * @required userName string 手机号或邮箱地址
   * @required password string 密码
   * phonePrefix string 手机号前缀（当输入账号为手机时）
   **/
  // static login(options) {
  //   options.noLogin = true;
  //   return http.post('/user/reg', options)
  // }
}

export default User

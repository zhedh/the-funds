import http from '../utils/http';

class User {
  static getCaptchapng() {
    return http.get('/captchapng/png')
  }

  static sendMailCode(options) {
    return http.post('/user/sendmailcode', options)
  }

  // @required imgcode string 图形验证码
  // @required prefix string 国家码
  // @required phone string 图形验证码
  // type string 图形验证码 （reg|findpassword）
  static sendSmsCode(options){
    return http.post('/user/sendmailcode', options)
  }
}

export default User;

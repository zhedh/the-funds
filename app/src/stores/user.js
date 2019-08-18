import {observable, action, computed} from 'mobx'
import Cookies from "js-cookie";
import UserApi from "../api/user";

class UserStore {
  @observable token;
  @observable openid;
  @observable payPassword;

  @computed
  get isOnline() {
    return !!(this.token && this.openid)
  }

  @computed
  get hasPayPassword() {
    return Number(this.payPassword) === 1
  }

  @action
  setUserStatus() {
    this.token = Cookies.get('TOKEN')
    this.openid = Cookies.get('OPENID')
    this.payPassword = Cookies.get('PAY_PASSWORD')
  }

  @action
  setUserCookie(data) {
    Cookies.set('OPENID', data.openId)
    Cookies.set('TOKEN', data.token)
    Cookies.set('PAY_PASSWORD', data.payPassword)
    this.setUserStatus()
  }

  @action
  register(options) {
    return UserApi.register(options).then(res => {
      if (res.status === 1) {
        this.setUserCookie(res.data)
      }
      return res
    })
  }

  @action
  login(options) {
    return UserApi.login(options).then(res => {
      if (res.status === 1) {
        this.setUserCookie(res.data)
      }
      return res
    })
  }

  @action
  logout() {
    Cookies.remove('TOKEN')
    Cookies.remove('OPENID')
    Cookies.remove('PAY_PASSWORD')
    this.token = null
    this.openid = null
    this.payPassword = null
  }

  @action
  changePayPasswordStatus(status) {
    Cookies.set('PAY_PASSWORD', status)
    this.payPassword = Cookies.get('PAY_PASSWORD')
  }

  @action
  getPayToken() {
    return UserApi.getPayToken({payPassword: this.payPassword})
  }
}

export default UserStore

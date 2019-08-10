import {observable, action, computed} from 'mobx'
import Cookies from "js-cookie";

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
  logout() {
    Cookies.remove('TOKEN')
    Cookies.remove('OPENID')
    Cookies.remove('PAY_PASSWORD')
    this.token = null
    this.openid = null
    this.payPassword = null
  }
}

export default UserStore

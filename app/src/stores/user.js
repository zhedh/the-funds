import {observable, action} from 'mobx'
import Cookies from "js-cookie";

class UserStore {
  @observable isLogin = false;

  @action
  setLoginStatus() {
    const token = Cookies.get('TOKEN')
    console.log('token:', token)
    this.isLogin = !!token
  }
}

export default UserStore

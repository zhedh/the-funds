import {observable, action, computed} from 'mobx'
import {COUNTRIES_LIST} from "../utils/constants";

class AuthStore {
  @observable authInfo = {
    country: COUNTRIES_LIST[0],
    cardType: '身份证',
    firstName: '',
    lastName: '',
    cardId: ''
  }

  @action
  changeInfoItem(value,key) {
    this.authInfo[key] = value
  }
}

export default AuthStore

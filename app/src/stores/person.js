import {observable, action, computed} from 'mobx'
import PersonApi from "../api/person";

class PersonStore {
  @observable name = 'kevin';
  @observable userInfo = {};

  @computed
  get userName() {
    return this.userInfo.email || this.userInfo.phoneNo
  }

  @action
  getUserInfo() {
    return PersonApi.getUserInfo().then(res => {
      if (res.status === 1) this.userInfo = res.data
    })
  }

}

export default PersonStore

import {observable, action} from 'mobx'
import PersonApi from "../api/person";

class PersonStore {
  @observable name = 'kevin';
  @observable userInfo = {};

  @action
  getUserInfo() {
    PersonApi.getUserInfo().then(res => {
      if (res.status === 1) this.userInfo = res.data
    })
  }

}

export default PersonStore

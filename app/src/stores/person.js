import {observable, action, computed} from 'mobx'
import PersonApi from "../api/person";

class PersonStore {
  @observable name = 'kevin';
  @observable userInfo = {};
  @observable specials = [];

  @computed
  get userName() {
    return this.userInfo.email || this.userInfo.phoneNo
  }

  @computed
  get allUsableSpecial() {
    if (!this.specials.length) {
      return 0
    }
    return this.specials.reduce((pre, cur) => {
      const {usable} = cur.data
      return pre + usable
    }, 0)
  }

  @action
  getUserInfo() {
    return PersonApi.getUserInfo().then(res => {
      if (res.status === 1) this.userInfo = res.data
    })
  }

  @action
  getSpecial() {
    PersonApi.getSpecial().then(res => {
      this.specials = res.data
    })
  }

}

export default PersonStore

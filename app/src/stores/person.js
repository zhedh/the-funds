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
  get isAuth() {
    return this.userInfo.authentication === 2
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
      return res
    })
  }

  @action
  getSpecial() {
    return PersonApi.getSpecial().then(res => {
      if (res.status === 1) this.specials = res.data
    })
  }

  @action
  getSpecialRecords(options){
    return PersonApi.getSpecialRecords(options).then(res => {
      if (res.status === 1) this.specials = res.data
    })
  }
}

export default PersonStore

import {observable, action} from 'mobx'
import {COUNTRIES_LIST} from "../utils/constants";
import PersonApi from "../api/person";

class AuthStore {
  @observable authInfo = {
    country: COUNTRIES_LIST[0],
    cardType: '身份证',
    firstName: '张',
    lastName: '宁',
    cardId: '370205621219253'
  }

  @observable photo = {
    cardFront: '',
    cardBack: '',
    cardHold: ''
  }

  @action
  changeInfoItem(value, key) {
    this.authInfo[key] = value
  }

  @action
  changePhotoItem(e, key) {
    if (!e.target.files) return
    // return
    PersonApi.uploadPhoto({
      image: e.target.files[0],
      type: this.getPhotoType(key)
    }).then(res => {
      console.log(res)
    })
    // this.photo[key] = value
  }

  @action
  submitAuthentication() {
    return PersonApi.submitAuthentication(this.authInfo)
  }

  @action
  getPhotoType(name) {
    return name === 'cardFront' ? '1' : name === 'cardBack' ? '2' : '3'
  }
}

export default AuthStore

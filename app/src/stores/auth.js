import { observable, action } from 'mobx'
import { COUNTRIES_LIST } from '../utils/constants'
import PersonApi from '../api/person'
import { Toast } from 'antd-mobile'

class AuthStore {
  @observable authInfo = {
    country: COUNTRIES_LIST[0],
    cardType: '', // 身份证
    firstName: '', // 张
    lastName: '', // 宁
    cardId: '' // 370205621219253
  }

  @observable photo = {
    cardFront: '',
    cardBack: '',
    cardHold: ''
  }

  @action
  setStorage() {
    try {
      console.log('this.authInfo', this.authInfo)

      const authInfo = JSON.stringify(this.authInfo)
      localStorage.setItem('AUTH_INFO', authInfo)
    } catch (e) {
      console.log(e)
    }
  }

  @action
  getStorage() {
    try {
      const authInfo = localStorage.getItem('AUTH_INFO')
      this.authInfo = JSON.parse(authInfo)
    } catch (e) {
      console.log(e)
    }
  }

  @action
  changeInfoItem(value, key) {
    this.authInfo[key] = value
    this.setStorage()
    this.getStorage()
  }

  @action
  changePhotoItem(e, key) {
    if (!e.target.files) return
    const image = e.target.files[0]
    const type = this.getPhotoType(key)
    PersonApi.uploadPhoto({
      image,
      type
    }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
      }
      Toast.info('上传成功')
      this.getPhotoItem(image, key)
    })
  }

  @action
  submitAuthentication() {
    return PersonApi.submitAuthentication(this.authInfo)
  }

  @action
  submitAuthAudit() {
    return PersonApi.submitAuthAudit({})
  }

  @action
  getPhotoType(name) {
    return name === 'cardFront' ? '1' : name === 'cardBack' ? '2' : '3'
  }

  @action
  getPhotoItem(image, key) {
    const _this = this
    try {
      const reads = new FileReader()
      reads.readAsDataURL(image)
      reads.onload = function() {
        _this.photo[key] = this.result
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default AuthStore

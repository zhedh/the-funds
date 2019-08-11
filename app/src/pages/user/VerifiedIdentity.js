import React, {Component, Fragment} from 'react'
import {Button, Toast} from 'antd-mobile'
import Header from '../../components/common/Header'
import './VerifiedIdentity.scss'
import {COUNTRIES_LIST, TOAST_DURATION} from '../../utils/constants'
import {inject, observer} from "mobx-react"

const typeList = [
  {
    name: '身份证',
    icon: require('../../assets/images/idcard.svg'),
    active: require('../../assets/images/idcard-active.svg')
  },
  {
    name: '护照',
    icon: require('../../assets/images/passport.svg'),
    active: require('../../assets/images/passport-active.svg')
  },
  {
    name: '驾照',
    icon: require('../../assets/images/driving.svg'),
    active: require('../../assets/images/driving-active.svg')
  }
]

@inject('authStore')
@observer
class VerifiedIdentity extends Component {
  state = {
    isChina: true,
    activeType: null,
    userName: '',
    idCard: '',
    firstName: '',
    lastName: '',
    cardNumber: ''
  }

  componentDidMount() {
    const {authStore, match} = this.props
    const {country} = match.params
    if (country) {
      this.setState({isChina: country === COUNTRIES_LIST[0]})
      authStore.changeInfoItem(country, 'country')
    }
    console.log(authStore.authInfo)
  }

  canSubmit = () => {
    const {authStore} = this.props
    const {country, cardType, firstName, lastName, cardId} = authStore.authInfo
    const {isChina} = this.state
    return isChina ? (firstName && cardId)
      : (country && cardType && firstName && lastName && cardId)
  }

  onSubmit = () => {
    const {cardNumber} = this.state
    const {history} = this.props
    if (cardNumber.length < 7) {
      Toast.info('请输入7-18位证件号码', TOAST_DURATION)
      return
    }
    // 提交数据至后台并 上传照片
    history.push('/verified-upload')
  }

  render() {
    const {authStore} = this.props
    const {country, cardType, firstName, lastName, cardId} = authStore.authInfo
    const {isChina} = this.state

    return (
      <div id="verified-identity">
        <Header/>
        <div className="identity-top">
          <img src={require('../../assets/images/identity.png')} alt=""/>
          <h2>填写信息</h2>
          <p>确认所填信息与证件一致</p>
        </div>
        <div className="identity-bottom">
          {isChina ? (
            <div className="identity-bottom__input input-center">
              <input
                type="text"
                maxLength={70}
                placeholder="您的姓名"
                value={firstName}
                onChange={(e) => authStore.changeInfoItem(e.target.value, 'firstName')}
              />
              <input
                type="text"
                placeholder="身份证号"
                value={cardId}
                onChange={(e) => authStore.changeInfoItem(e.target.value, 'cardId')}
              />
            </div>
          ) : (
            <Fragment>
              <label>您可以选择一下验证方式</label>
              <ul className="identity-bottom__type">
                {typeList.map(type => (
                  <li
                    key={type.name}
                    className={cardType === type.name ? 'active' : ''}
                    onClick={() => authStore.changeInfoItem(type.name, 'cardType')}>
                    <img
                      src={cardType === type.name ? type.active : type.icon}
                      alt=""
                    />
                    <br/>
                    <small>{type.name}</small>
                  </li>
                ))}
              </ul>
              <div className="identity-bottom__input">
                <input
                  type="text"
                  maxLength={70}
                  placeholder="姓"
                  value={firstName}
                  onChange={(e) => authStore.changeInfoItem(e.target.value, 'firstName')}
                />
                <input
                  type="text"
                  maxLength={70}
                  placeholder="名"
                  value={lastName}
                  onChange={(e) => authStore.changeInfoItem(e.target.value, 'lastName')}
                />
                <input
                  type="text"
                  maxLength={18}
                  placeholder="证件号"
                  value={cardId}
                  onChange={(e) => authStore.changeInfoItem(e.target.value, 'cardId')}
                />
              </div>
            </Fragment>
          )}
        </div>
        <Button
          activeClassName="btn-common__active"
          className={`btn-common btn-common__bottom ${
            !this.canSubmit() ? 'btn-common__disabled' : ''
            }`}
          disabled={!this.canSubmit()}
          onClick={this.onSubmit}
        >
          下一步
        </Button>
      </div>
    )
  }
}

export default VerifiedIdentity

import React, { Component, Fragment } from 'react'
import { Button } from 'antd-mobile'
import Header from '../../components/common/Header'
import './VerifiedIdentity.scss'
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
class VerifiedIdentity extends Component {
  state = {
    activeType: null,

    userName: '',
    idCard: '',

    firstName: '',
    lastName: '',
    cardNumber: ''
  }
  render() {
    const {
      activeType,
      userName,
      idCard,
      firstName,
      lastName,
      cardNumber
    } = this.state
    const currType = window.location.pathname.split('/')[2]
    const isDisabled =
      currType !== 'china'
        ? firstName === '' || lastName === '' || cardNumber === ''
        : idCard === '' || userName === ''
    return (
      <div id="verified-identity">
        <Header />

        <div className="identity-top">
          <img src={require('../../assets/images/identity.png')} alt="" />
          <h2>填写信息</h2>
          <p>确认所填信息与证件一致</p>
        </div>
        <div className="identity-bottom">
          {currType === 'china' ? (
            <div className="identity-bottom__input input-center">
              <input type="text" placeholder="您的姓名" value={userName} />
              <input type="text" placeholder="身份证号" value={idCard} />
            </div>
          ) : (
            <Fragment>
              <p>您可以选择一下验证方式</p>
              <ul className="identity-bottom__type">
                {typeList.map(type => (
                  <li
                    key={type.name}
                    className={activeType === type.name ? 'active' : ''}
                    onClick={() => {
                      this.setState({ activeType: type.name })
                    }}
                  >
                    <img
                      src={activeType === type.name ? type.active : type.icon}
                      alt=""
                    />
                    <br />
                    <small>{type.name}</small>
                  </li>
                ))}
              </ul>
              <div className="identity-bottom__input">
                <input type="text" placeholder="姓" value={firstName} />
                <input type="text" placeholder="名" value={lastName} />
                <input type="text" placeholder="证件号" value={cardNumber} />
              </div>
            </Fragment>
          )}
        </div>
        <Button
          activeClassName="btn-common__active"
          className={`btn-common btn-common__bottom ${
            isDisabled ? 'btn-common__disabled' : ''
          }`}
          disabled={isDisabled}
          onClick={this.onSubmit}
        >
          下一步
        </Button>
      </div>
    )
  }
}
export default VerifiedIdentity

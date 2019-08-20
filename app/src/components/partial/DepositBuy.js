import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './DepositBuy.scss'
import { Button, Toast } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import Header from '../common/Header'
import openPwdImg from '../../assets/images/open-pwd.png'
import closePwdImg from '../../assets/images/close-pwd.png'

@inject('productStore')
@inject('userStore')
@inject('personStore')
@observer
class DepositBuy extends Component {
  state = {
    showConfirm: false,
    payPassword: '',
    pwdType: 'password'
  }

  onInputChange = (e, key) => {
    const { value } = e.target
    this.setState({ [key]: value })
  }

  onSetType = currentType => {
    this.setState({ pwdType: currentType === 'text' ? 'password' : 'text' })
  }

  onDeposit = gearNum => {
    if (gearNum) this.setState({ showConfirm: true })
  }

  onSubmit = () => {
    const { history, userStore, productStore } = this.props
    const { payPassword } = this.state
    userStore
      .getPayToken({ payPassword })
      .then(res => {
        if (res.status !== 1) {
          Toast.info(res.msg)
          return
        }
        return res.data.token
      })
      .then(payToken => {
        if (!payToken) return
        productStore.createOrder(payToken).then(res => {
          if (res.status !== 1) {
            Toast.info(res.msg)
            return
          }
          history.push('/deposit/result')
        })
      })
  }

  render() {
    const { show, productStore, userStore, personStore } = this.props
    const { showConfirm, payPassword, pwdType } = this.state
    const { productDetail, gears, gearNum } = productStore
    const hasGears = gears && gears.length > 0
    const userBalance =
      productDetail.userBalance && Number(productDetail.userBalance).toFixed(2)

    return (
      <div className={`deposit-buy ${show ? 'show' : ''}`}>
        {/*<div className="current-info show">*/}
        {/*<h2 className="tab-first_h2">ZBX/USDT当前价格: 0.5898</h2>*/}
        {/*<p className="tab-first_p">最新兑价（数据来源：影力所）</p>*/}
        {/*</div>*/}
        <ul className="gears">
          {hasGears &&
            gears.map(gear => (
              <li
                key={gear.num}
                className={gearNum === gear.num ? 'active' : ''}
                onClick={() => productStore.changeGearNum(gear.num)}
              >
                <div className="box">
                  <div className="price">
                    {gear.num}
                    <small>{productDetail.productName}</small>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <div className="fee">
          <p>
            <span>定存送ZBX特价额度</span>
            <span>{gearNum ? (gearNum / 10).toFixed(0) : 0}</span>
          </p>
          <small>手续费费率：{productDetail.serviceCharge}%</small>
        </div>
        {!personStore.isAuth && !userStore.hasPayPassword && (
          <aside>
            {!personStore.isAuth && (
              <p>
                *您暂未通过实名认证，无法定存{' '}
                <Link to="/verified-country">去认证</Link>
              </p>
            )}
            {!userStore.hasPayPassword && (
              <p>
                *您暂未设置交易密码，无法定存{' '}
                <Link to="/password/pay">去设置</Link>
              </p>
            )}
          </aside>
        )}
        <Button
          className={`btn ${!gearNum ? 'btn-disabled' : ''}`}
          activeClassName="btn-common__active"
          onClick={() => this.onDeposit(gearNum)}
        >
          定投
        </Button>

        {/*定投弹窗*/}
        <div className={`confirm-wrapper ${showConfirm ? 'show' : ''}`}>
          <div className="content-box">
            <Header
              isShadow
              title="确认支付"
              icon={require('../../assets/images/close.png')}
              onHandle={() => this.setState({ showConfirm: false })}
            />
            <div className="content">
              <p className="deposit-price">
                <span>定存投资（ZBX）</span>
                <span>{gearNum}</span>
              </p>
              <p className="service-charge">
                <span>手续费{productDetail.serviceCharge}%</span>
                <span>
                  {(gearNum * productDetail.serviceCharge * 0.01).toFixed(2)}
                </span>
              </p>
              <p>
                <span>可用</span>
                <span>{userBalance}</span>
              </p>
              <div className="input-box">
                <input
                  type={pwdType}
                  placeholder="支付密码"
                  value={payPassword}
                  onChange={e => this.onInputChange(e, 'payPassword')}
                />
                <img
                  src={pwdType === 'text' ? openPwdImg : closePwdImg}
                  alt="eyes"
                  onClick={() => this.onSetType(pwdType)}
                />
              </div>
            </div>
            <Button
              activeClassName="btn-common__active"
              className="primary-button"
              onClick={this.onSubmit}
            >
              确认定存
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default DepositBuy

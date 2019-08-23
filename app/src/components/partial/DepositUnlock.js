import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd-mobile'
import Header from '../common/Header'
import { inject, observer } from 'mobx-react'
import { PRECISION } from '../../utils/constants'
import openPwdImg from '../../assets/images/open-pwd.png'
import closePwdImg from '../../assets/images/close-pwd.png'
import './DepositUnlock.scss'

@inject('productStore')
@inject('userStore')
@inject('personStore')
@observer
class DepositUnlock extends Component {
  state = { showConfirm: false, payPassword: '', pwdType: 'password' }

  onDeposit = gearNum => {
    if (gearNum) this.setState({ showConfirm: true })
  }
  render() {
    const { showConfirm, payPassword, pwdType } = this.state
    const { show, productStore } = this.props
    const {
      productDetail,
      unLockAmount,
      totalAmount,
      onAmountChange
    } = productStore
    const { serviceCharge } = productDetail
    // {Number(totalAmount * (1 + serviceCharge)).toFixed(
    console.log(totalAmount, serviceCharge)
    return (
      <div className={`deposit-unlock ${show ? 'show' : ''}`}>
        <section className="content-detail">
          <h1>{productDetail.userSpecial}</h1>
          <span>可解锁{productDetail.productName}特价额度</span>
          <br />
          <Link to="/home/bargain">查看详情</Link>
        </section>
        <section className="content-charge">
          <p>
            XC/USDT特价:
            {productDetail.specialOffer
              ? Number(productDetail.specialOffer).toFixed(
                  PRECISION.SPECIAL_OFFER
                )
              : '--'}
          </p>
          <label>
            <input
              type="text"
              placeholder="输入解锁数量"
              value={unLockAmount}
              onChange={e => onAmountChange(e)}
            />
            <span
              className="all"
              onClick={() => {
                this.setState({ unLockAmount: productDetail.userSpecial })
              }}
            >
              全部
            </span>
          </label>
          <label>
            <small>
              USDT 余额：
              {Number(productDetail.userBalance).toFixed(PRECISION.OFFER)}
            </small>
            <small>手续费费率：{productDetail.serviceCharge}%</small>
          </label>
          <h3>
            <span>交易额（USDT）</span>
            <span>
              {totalAmount === '--'
                ? '--'
                : Number(totalAmount).toFixed(PRECISION.OFFER)}
            </span>
          </h3>
        </section>
        <Button
          className="btn"
          activeClassName="btn-common__active"
          disabled={!unLockAmount}
          onClick={this.onDeposit}
        >
          解锁
        </Button>

        {/* 弹窗 */}
        <div className={`ensure-pay__wrapper ${showConfirm ? 'show' : ''}`}>
          <div className="ensure-pay__content">
            <Header
              isShadow
              title="确认支付"
              icon={require('../../assets/images/close.png')}
              onHandle={() => this.setState({ showConfirm: false })}
            />

            <div className="pay-content">
              <p>
                <span>
                  支付总额（USDT） <br />
                  <small>交易额</small>
                  <br />
                  <small>手续费0.3%</small>
                </span>
                <span>
                  {Number(totalAmount * (1 + serviceCharge)).toFixed(
                    PRECISION.OFFER
                  )}
                  <br />
                  <small>{Number(totalAmount).toFixed(PRECISION.OFFER)}</small>
                  <br />
                  <small>
                    {Number(totalAmount * serviceCharge).toFixed(
                      PRECISION.OFFER
                    )}
                  </small>
                </span>
              </p>
              <p>
                <span>可用</span>
                <span>
                  {Number(productDetail.userBalance).toFixed(PRECISION.OFFER)}
                </span>
              </p>

              <small className="tips">*扣款时依照最新的兑价为准</small>
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
              className="btn-common modal-btn"
              onClick={this.onClose}
            >
              确认买入
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default DepositUnlock

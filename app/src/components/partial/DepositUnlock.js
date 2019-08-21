import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import './DepositUnlock.scss'

@inject('productStore')
@inject('userStore')
@inject('personStore')
@observer
class DepositUnlock extends Component {
  state = { totalAmount: null }
  render() {
    const { show, productStore, userStore, personStore, onDeposit } = this.props
    const { productDetail } = productStore
    const { specials } = personStore
    const { totalAmount, unLockAmount } = this.state

    return (
      <div className={`deposit-unlock ${show ? 'show' : ''}`}>
        <section className="content-detail">
          <h1>126.24</h1>
          <span>可解锁{productDetail.productName}特价额度</span>
          <br />
          <Link to="/home/bargain">查看详情</Link>
        </section>
        <section className="content-charge">
          <p>XC/USDT特价: 0.1248</p>
          <label>
            <input
              type="text"
              placeholder="输入解锁数量"
              value={unLockAmount}
              onChange={e =>
                this.setState({ unLockAmount: e.target && e.target.value })
              }
            />
            <span className="all" onClick={() => {}}>
              全部
            </span>
          </label>
          <label>
            <small>USDT 余额：12000</small>
            <small>手续费费率：0.03%</small>
          </label>
          <h3>
            <span>交易额（USDT）</span>
            <span>{unLockAmount * 4}</span>
          </h3>
        </section>
        <Button
          className="btn"
          activeClassName="btn-common__active"
          onClick={onDeposit}
        >
          解锁
        </Button>
      </div>
    )
  }
}

export default DepositUnlock

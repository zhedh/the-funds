import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import './DepositUnlock.scss'

@inject('productStore')
@inject('userStore')
@inject('personStore')
@observer
class DepositUnlock extends Component {
  render() {
    const { show, productStore, userStore, personStore, onDeposit } = this.props
    const { productDetail } = productStore
    const { specials } = personStore
    console.log(specials)

    return (
      <div className={`deposit-unlock ${show ? 'show' : ''}`}>
        <section className="content-detail">
          <h1>126.24</h1>
          <span>可解锁{productDetail.productName}特价额度</span>
          <br />
          <a href="#123">查看详情</a>
        </section>
        <section className="content-charge">
          <p>XC/USDT特价: 0.1248</p>
          <label>
            <input type="text" placeholder="输入解锁数量" />
            <span className="all">全部</span>
          </label>
          <label>
            <small>USDT 余额：12000</small>
            <small>手续费费率：0.03%</small>
          </label>
          <h3>
            <span>交易额（USDT）</span>
            <span>--</span>
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

import React, {Component} from 'react'
// import { Link } from 'react-router-dom'
import './UnlockLimit.scss'

class UnlockLimit extends Component {
  render() {
    return (
      <div className="unlock-limit">
        <section className="content-detail">
          <h1>126.24</h1>
          <span>可解锁XC特价额度</span>
          <br/>
          <a href="#123">查看详情</a>
        </section>

        <section className="content-charge">
          <p>XC/USDT特价: 0.1248</p>
          <label>
            <input type="text" placeholder="输入解锁数量"/>
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
      </div>
    )
  }
}

export default UnlockLimit

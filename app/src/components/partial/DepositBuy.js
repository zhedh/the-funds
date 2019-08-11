import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './DepositBuy.scss'

const cardList = [
  {
    price: '100',
    usdt: '121'
  },
  {
    price: '100',
    usdt: '121'
  },
  {
    price: '100',
    usdt: '121'
  },
  {
    price: '100',
    usdt: '121'
  }
]

class DepositBuy extends Component {
  render() {
    const { selectCardIndex, onSelectCard } = this.props

    return (
      <div className="deposit-buy">
        <section className="content-middle">
          <h2 className="tab-first_h2">ZBX/USDT当前价格: 0.5898</h2>
          <p className="tab-first_p">最新兑价（数据来源：影力所）</p>
        </section>

        <section className="content-bottom">
          <ul>
            {cardList.map((i, key) => (
              <li
                key={key.toString()}
                className={selectCardIndex === key ? 'active' : ''}
                onClick={() => onSelectCard(key)}
              >
                {i.price}
                <small>xc</small>
                <br />
                <span>售价 {i.usdt} USDT</span>
              </li>
            ))}
          </ul>

          <div className="fee">
            <p>
              <span>定存送ZBX特价额度</span>
              <span>10</span>
            </p>
            <small>手续费费率：0.03%</small>
          </div>
        </section>

        <section className="content-auth">
          <p>
            *您暂未通过实名认证，无法定存 <Link to="/">去认证</Link>
          </p>
          <p>
            *您暂未设置交易密码，无法定存 <Link to="/">去设置</Link>
          </p>
        </section>
      </div>
    )
  }
}

export default DepositBuy

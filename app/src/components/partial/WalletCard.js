import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import rechargeImg from '../../assets/images/recharge.svg'
import withdrawImg from '../../assets/images/withdraw.svg'
import arrowRightImg from '../../assets/images/arrow-right-white.png'
import './WalletCard.scss'

class WalletCard extends Component {
  toPage = link => {
    if (link) {
      const { history } = this.props
      history.push(link)
    }
  }

  render() {
    const { card } = this.props
    return (
      <div
        className="wallet-card"
        style={{ backgroundImage: `url(${card.bgImg})` }}
        onClick={() => this.toPage(card.link)}
      >
        <h1>
          <small>总资产（{card.cardName}）</small>
          <span>1240.24</span>
        </h1>
        <ul>
          {card.withdrawUrl && (
            <li onClick={() => this.toPage(card.withdrawUrl)}>
              <img src={withdrawImg} alt="" />
              提现
            </li>
          )}
          {card.rechargeUrl && (
            <li onClick={() => this.toPage(card.rechargeUrl)}>
              <img src={rechargeImg} alt="" />
              充值
            </li>
          )}
        </ul>
        {card.link && (
          <img className="arrow-right" src={arrowRightImg} alt="" />
        )}
        {card.updateTime && (
          <span className="update-time">最近更新时间：{card.updateTime}</span>
        )}
      </div>
    )
  }
}

export default withRouter(WalletCard)

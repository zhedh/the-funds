import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import Header from "../../components/common/Header"
import walletZbsImg from "../../assets/images/wallet-zbs.png"
import WalletCard from "../../components/partial/WalletCard"

import './WalletCoin.scss'

const COIN_CARD = {
  bgImg: walletZbsImg,
  name: 'XC',
  asset: '',
  rechargeUrl: '1',
  withdrawUrl: '1',
}

@inject('walletStore')
@observer
class WalletCoin extends Component {
  state = {
    coinCard: COIN_CARD
  }

  componentDidMount() {
    const {walletStore, match} = this.props
    const {id} = match.params
    walletStore.getCurrentWallet(Number(id)).then(res => {
      const coinCard = {
        ...COIN_CARD,
        name: res.productName,
        productId: res.productId,
        asset: res.data && res.data.amount
      }
      this.setState({coinCard})
    })
  }


  render() {
    const {coinCard} = this.state

    return (
      <div id="wallet-zbx">
        <Header title={coinCard.name} isFixed isShadow/>
        <div className="card">
          <WalletCard card={coinCard}/>
        </div>
        <ul className="records">
          <li>
            <main>
              <small>2019.07.17 15:00</small>
              +120.00
              <span>定存数量 100</span>
            </main>
            <aside>
              定存返还
              <span>定存价格（USDT） 0.5</span>
              <span>返还日价格（USDT） 0.4</span>
            </aside>
          </li>
          <li>
            <main>
              <small>2019.07.17 15:00</small>
              +8.20
            </main>
            <aside className="orange">
              解锁额度
            </aside>
          </li>
          <li>
            <main>
              <small>2019.07.17 15:00</small>
              -5.27
              <span>定存数量 100</span>
            </main>
            <aside className="blue-green">
              提现
              <span>实际到账 4.12</span>
              <span>手续费 1.00</span>
            </aside>
          </li>
        </ul>
      </div>
    );
  }
}

export default WalletCoin;

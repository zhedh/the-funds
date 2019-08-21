import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import dayjs from "dayjs"
import Header from "../../components/common/Header"
import walletUsdtImg from "../../assets/images/wallet-usdt.png"
import WalletCard from "../../components/partial/WalletCard"

import './WalletUsdt.scss'

const USDT_CARD = {
  bgImg: walletUsdtImg,
  name: 'USDT',
  asset: '',
  rechargeUrl: '1',
  withdrawUrl: '1',
}

@inject('personStore')
@inject('walletStore')
@observer
class WalletUsdt extends Component {
  state = {
    usdtCard: USDT_CARD
  }

  componentDidMount() {
    const {personStore, walletStore} = this.props
    personStore.getUserInfo().then(() => {
      const {userInfo} = personStore
      const usdtCard = {
        ...USDT_CARD,
        asset: userInfo.balance,
      }
      this.setState({usdtCard})
    })
    walletStore.getUsdtStream()
  }

  render() {
    const {walletStore} = this.props
    const {usdtCard} = this.state
    const {usdtStream} = walletStore

    return (
      <div id="wallet-usdt">
        <Header title="USDT" isFixed isShadow/>
        <div className="card">
          <WalletCard card={usdtCard}/>
        </div>
        <ul className="records">
          {usdtStream.map(item =>
            <li key={item.id}>
              <main>
                {item.remark}
                <small>{dayjs(item.addTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</small>
              </main>
              <aside>{item.amount}</aside>
            </li>)}
        </ul>
      </div>
    )
  }
}

export default WalletUsdt;

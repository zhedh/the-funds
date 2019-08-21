import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/common/Header';
import WalletCard from '../../components/partial/WalletCard';
import walletToLoginImg from '../../assets/images/wallet-to-login.png';
import walletZbsImg from '../../assets/images/wallet-zbs.png';
import walletUsdtImg from '../../assets/images/wallet-usdt.png';

import './Index.scss';
import {inject, observer} from "mobx-react";

const USDT_CARD = {
  bgImg: walletUsdtImg,
  name: 'USDT',
  asset: '',
  rechargeUrl: '',
  withdrawUrl: '',
  updateTime: +new Date(),
  link: '/wallet/card/'
}

const WALLET_CARD = {
  bgImg: walletZbsImg,
  name: 'XC',
  asset: '',
  rechargeUrl: '',
  withdrawUrl: '',
  updateTime: +new Date(),
  link: '/wallet/card/'
}

class CardList extends Component {

  render() {
    const {cards} = this.props;
    return <ul className="cards-warp">
      {cards.map(card =>
        <li key={card.name}>
          <WalletCard card={card}/>
        </li>
      )}
    </ul>
  }
}

function ToLogin() {
  return (
    <div className="login-warp">
      <main>
        <img src={walletToLoginImg} alt="去登录"/>
        <p>您未登录，不能进行操作</p>
      </main>
      <aside>
        <Link to="/login">去登录</Link>
      </aside>
    </div>
  );
}

@inject('userStore')
@inject('personStore')
@inject('walletStore')
@observer
class Index extends Component {
  state = {
    cards: []
  }

  componentDidMount() {
    this.getProductCards().then()
  }

  getProductCards = async () => {
    const {personStore, walletStore} = this.props
    await personStore.getUserInfo()
    await walletStore.getWallets()
    const {userInfo} = personStore
    const {wallets} = walletStore
    const cards = []
    cards.push({
      ...USDT_CARD,
      asset: userInfo.warehouse,
      updateTime: userInfo.lastloginTime * 1000
    })
    const walletCards = wallets.map(wallet => {
      console.log(wallet)
      return {
        ...WALLET_CARD,
        name: wallet.productName,
        asset: wallet.data.amount,
        link: '/wallet/card/' + wallet.productName
      }
    })
    cards.push(...walletCards)
    this.setState({cards})
  }

  render() {
    const {userStore} = this.props
    const {cards} = this.state

    return (
      <div id="wallet">
        <Header title="钱包" isFixed isShadow/>
        {userStore.isOnline ? <CardList cards={cards}/> : <ToLogin/>}
      </div>
    );
  }
}

export default Index;

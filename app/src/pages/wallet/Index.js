import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/common/Header';
import WalletCard from '../../components/partial/WalletCard';
import walletToLoginImg from '../../assets/images/wallet-to-login.png';
import walletZbsImg from '../../assets/images/wallet-zbs.png';
import walletUsdtImg from '../../assets/images/wallet-usdt.png';

import './Index.scss';

const CARDS = [
  {
    bgImg: walletUsdtImg,
    cardName: 'USDT',
    value: '1240.24',
    rechargeUrl: '/home',
    withdrawUrl: '/home',
    updateTime: '2019.07.18 15:23:22',
    link: '/wallet/usdt'
  }, {
    bgImg: walletZbsImg,
    cardName: 'ZBS',
    value: '27240.60',
    rechargeUrl: '/home',
    withdrawUrl: '/home',
    updateTime: '2019.07.18 15:23:22',
    link: '/wallet/zbs'
  },
];

class CardList extends Component {
  render() {
    const {cards} = this.props;
    return <ul className="cards-warp">
      {cards.map(card =>
        <li key={card.cardName}>
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
        <img src={walletToLoginImg} alt="去登陆"/>
        <p>您未登录，不能进行操作</p>
      </main>
      <aside>
        <Link to="/login">去登陆</Link>
      </aside>
    </div>
  );
}

class Index extends Component {
  render() {
    const isLogin = true;

    return (
      <div id="wallet">
        <Header title="钱包" isFixed isShadow/>
        {isLogin ? <CardList cards={CARDS}/> : <ToLogin/>}
      </div>
    );
  }
}

export default Index;

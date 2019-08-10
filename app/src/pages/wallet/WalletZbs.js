import React, {Component} from 'react';
import Header from "../../components/common/Header";
import walletZbsImg from "../../assets/images/wallet-zbs.png";
import WalletCard from "../../components/partial/WalletCard";

import './WalletZbs.scss'

const CARD = {
  bgImg: walletZbsImg,
  cardName: 'USDT',
  value: '1240.24',
  withdrawUrl: '/home',
};


class WalletZbs extends Component {
  render() {
    return (
      <div id="wallet-usdt">
        <Header title="XC" isFixed isShadow/>
        <div className="card">
          <WalletCard card={CARD}/>
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

export default WalletZbs;

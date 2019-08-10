import React, {Component} from 'react';
import Header from "../../components/common/Header";
import walletUsdtImg from "../../assets/images/wallet-usdt.png";
import WalletCard from "../../components/partial/WalletCard";

import './WalletUsdt.scss'

const CARD = {
  bgImg: walletUsdtImg,
  cardName: 'USDT',
  value: '1240.24',
  rechargeUrl: '/home',
  withdrawUrl: '/home',
  // updateTime: '2019.07.18 15:23:22 '
};

const LIST = [
  {
    id: 1,
    label: '定存 100XC',
    value: '132.00',
    type: 0,
    time: '2018-08-29 13:42:39'
  }, {
    id: 2,
    label: '充值',
    value: '1000.00',
    type: 1,
    time: '2018-08-29 13:42:39'
  }, {
    id: 3,
    label: '提现',
    value: '132.00',
    type: 0,
    time: '2018-08-29 13:42:39'
  }, {
    id: 4,
    label: '定存 100XC 手续费',
    value: '3.00',
    type: 0,
    time: '2018-08-29 13:42:39'
  },
];

class WalletUsdt extends Component {
  render() {
    const records = LIST;
    return (
      <div id="wallet-usdt">
        <Header title="USDT" isFixed isShadow/>
        <div className="card">
          <WalletCard card={CARD}/>
        </div>
        <ul className="records">
          {records.map(record =>
            <li key={record.id}>
              <main>
                {record.label}
                <small>{record.time}</small>
              </main>
              <aside>{(record.type === 1 ? '+' : '-') + record.value}</aside>
            </li>)}
        </ul>
      </div>
    );
  }
}

export default WalletUsdt;

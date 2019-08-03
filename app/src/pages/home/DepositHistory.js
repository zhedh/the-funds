import React, {Component} from 'react';
import Header from "../../components/common/Header";
import './DepositHistory.scss'

const HISTORIES = [
  {
    time: '2019.07.09 15:00',
    status: '已返还',
    order: '201907091234',
    depositZbx: '100.00',
    payUsdt: '58.89',
    fee: '0.15',
    exchangePrince: '0.45',
    returnZbx: '123.19'
  }, {
    time: '2019.07.09 15:00',
    status: '已返还',
    order: '201907091234',
    depositZbx: '100.00',
    payUsdt: '58.89',
    fee: '0.15',
    exchangePrince: '0.45',
    returnZbx: '123.19'
  },
];

class DepositHistory extends Component {
  state = {
    depositHistories: HISTORIES,
  };

  render() {
    const {depositHistories} = this.state;

    return (
      <div id="deposit-history">
        <Header title="规则说明" isFixed isShadow/>
        <ul>
          {depositHistories.map(history =>
            <li>
              <aside>
                <span>{history.time}</span>
                <small>{history.status}</small>
              </aside>
              <p>
                <label>订单号</label>
                <span>{history.value}</span>
              </p>
              <p>
                <label>定存ZBX</label>
                <span>{history.depositZbx}</span>
              </p>
              <p>
                <label>支付USDT</label>
                <span>{history.payUsdt}</span>
              </p>
              <p>
                <label>含手续费</label>
                <span>{history.fee}</span>
              </p>
              <p>
                <label>返还日兑价ZBX/USDT</label>
                <span>{history.exchangePrince}</span>
              </p>
              <p>
                <label>到期返还ZBX</label>
                <span>{history.returnZbx}</span>
              </p>
            </li>)
          }
        </ul>
      </div>
    );
  }
}


export default DepositHistory;

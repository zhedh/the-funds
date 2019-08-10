import React, {Component} from 'react';
import Header from "../../components/common/Header";
import './Rule.scss'

class Rule extends Component {
  render() {
    return (
      <div id="rule">
        <Header title="规则说明" isFixed isShadow/>
        <p>一.规则说明</p>
        <p>XC将通过交易解锁计划进行可持续发展。</p>
        <p>XC仅在INEX交易所开放交易，初始账户的INC可以选择映射为XC，INP的可映射总量为3亿，映射后为锁仓状态，可以通过交易或推荐好友交易逐步释放锁仓INP，具体如下：</p>
        <p>（1）交易解锁</p>
        <p>用户可自行通过交易（买或卖）解锁锁仓额度中的INP，开放交易对INP/USDT；</p>
        <p>每一次交易，可以解锁交易额的千分之一；</p>
        <p>每个用户每天可以免手续费参与交易解锁10次，10次后才开始收取手续费。</p>
      </div>
    );
  }
}


export default Rule;

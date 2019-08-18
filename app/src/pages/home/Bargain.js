import React, {Component} from 'react'
import {inject, observer} from "mobx-react"

import arrowLeft from '../../assets/images/arrow-left.png'
import {BARGAIN} from '../../assets/static'
import './Bargain.scss'

const BARGAINS = [
  {
    label: '定存奖',
    value: 10
  }, {
    label: '代数奖',
    value: 15
  }, {
    label: '管理奖',
    value: 10
  }, {
    label: '团队奖',
    value: 0
  }, {
    label: '运营奖',
    value: 0
  },
];

@inject('personStore')
@observer
class Bargain extends Component {
  state = {
    bargains: BARGAINS
  };

  componentDidMount(){
    const {personStore} = this.props
    personStore.getSpecial()
  }

  render() {
    const {history,personStore} = this.props
    const {bargains} = this.state;
    const {specials} = personStore
    console.log(specials)

    return (
      <div id="bargain">
        <header>
          <img
            src={arrowLeft}
            alt="返回"
            onClick={() => history.push('/home')}
          />
          <span>特价奖励详情</span>
          <aside onClick={() => history.push('/home/bargain/record')}>
            查看明细
          </aside>
        </header>
        <section className="section-banner">
          <div className="banner">
            <span>{BARGAIN.BANNER_LABEL} 129.09</span>
            <small>上次结算时间: 2019.09.08 15:00:00</small>
            <button>解锁</button>
          </div>
          <p>* 解锁后的特价XC将直接充值到您的账户</p>
        </section>
        <section className="section-main">
          <h2>当日奖励额度</h2>
          <ul>
            {bargains.map(bargain =>
              <li key={bargain.label}>
                <label>{bargain.label}</label>
                <span>{bargain.value}</span>
              </li>)
            }
          </ul>
        </section>
        <section className="section-aside">
          当日得到的奖励额度，有效期至次日结算时间，如次日结算时还未使用，则奖励额度失效，请尽快使用。
        </section>
      </div>
    );
  }
}

export default Bargain;

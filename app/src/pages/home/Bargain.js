import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import arrowLeft from '../../assets/images/arrow-left.png'
import {BARGAIN} from '../../assets/static'
import './Bargain.scss'

@inject('personStore')
@inject('productStore')
@observer
class Bargain extends Component {
  componentDidMount() {
    const {personStore, productStore} = this.props
    personStore.getSpecial()
    personStore.getLastClearTime()

    // productId 默认取基金第一个
    productStore.getProducts().then(productId => {
      personStore.getSpecialAwards({productId})
    })
  }

  render() {
    const {history, personStore} = this.props
    const {allUsableSpecial, lastClearTime, specialAwards} = personStore

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
            <span>{BARGAIN.BANNER_LABEL} {allUsableSpecial}</span>
            <small>上次结算时间: {lastClearTime}</small>
            <button onClick={() => history.push('/deposit?type=unLock')}>
              解锁
            </button>
          </div>
          <p>* 解锁后的特价XC将直接充值到您的账户</p>
        </section>
        <section className="section-main">
          <h2>当日奖励额度</h2>
          <ul>
            {specialAwards.map(award =>
              <li key={award.remark}>
                <label>{award.remark}</label>
                <span>{award.amount}</span>
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

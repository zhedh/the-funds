import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'
import './DepositResult.scss'

@inject('personStore')
@observer
class DepositResult extends Component {
  render() {
    const { history } = this.props
    return (
      <div id="verified-result">
        <img
          className="result-img"
          alt="结果图片"
          src={require('../../assets/images/vertified-success.png')}
        />
        <div className="result-content">
          <h2>支付成功！</h2>
          <p>
            当日得到的奖励额度，有效期至次日结算时间，如次日
            结算时还未使用，则奖励额度失效，请尽快使用。
          </p>
          <Button
            activeClassName="active"
            className="primary-button"
            onClick={() => history.push('/home')}
          >
            完成
          </Button>
          <Button
            activeClassName="active"
            className="primary-button hollow"
            onClick={() => history.push('/deposit')}
          >
            解锁XC
          </Button>
        </div>
      </div>
    )
  }
}

export default DepositResult

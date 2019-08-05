import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import Header from '../../components/common/Header'
import './VerifiedResult.scss'

class VerifiedResult extends Component {
  state = {
    resultStatus: 'fail' // null
  }
  render() {
    const { history } = this.props
    const { resultStatus } = this.state
    return (
      <div id="verified-result">
        <Header />
        <img
          className="result-img"
          alt=""
          src={require(resultStatus === 'waiting'
            ? '../../assets/images/wait.png'
            : resultStatus === 'success'
            ? '../../assets/images/vertified-success.png'
            : '../../assets/images/vertified-fail.png')}
        />

        {resultStatus === 'waiting' && (
          <div className="result-content">
            <div className="submit-success">提交成功，等待审核…</div>
            <div className="submit-small">认证结果将会显示在个人中心</div>
          </div>
        )}
        {resultStatus === 'success' && (
          <div className="result-content">
            <div className="verified-success">认证通过</div>
          </div>
        )}
        {resultStatus === 'fail' && (
          <div className="result-content">
            <div className="verified-fail">认证失败！</div>
            <div className="fail-reason">失败原因：xxxx</div>
            <br />
            <Button
              activeClassName="btn-common__active"
              className={`btn-common btn-common__bottom`}
              onClick={() => {
                history.push('/verified-country')
              }}
            >
              重新验证
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default VerifiedResult

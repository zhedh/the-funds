import React, { Component } from 'react'
import { COUNT_DOWN } from '../../utils/constants'
import { initNECaptcha } from '../../utils/common'

import './VeritifiedCode.scss'
import Captcha from "../common/Captcha";

class VeritifiedCode extends Component {
  state = { isGetSms: true, count: COUNT_DOWN, isNECaptchaLocked: false }
  codeCountDown = () => {
    let count = this.state.count

    this.timer = setInterval(() => {
      if (count <= 0) {
        this.setState({ isGetSms: true, count: COUNT_DOWN })
        clearInterval(this.timer)
        return
      } else {
        this.setState({ isGetSms: false, count: count-- })
      }
    }, 1000)
  }

  getSmsCode = () => {
    const { sendSmsCode } = this.props
    // 先图形验证，再发送验证码
    this.setState({ isNECaptchaLocked: true }, () => {
      initNECaptcha({
        element: '#btn-code',
        onReady: instance => {
          this.setState({ isNECaptchaLocked: false })
        },
        onVerify: async data => {
          // 倒计时开始， 发送验证码
          await this.codeCountDown()
          sendSmsCode(data.validate)
        },
        onError: () => {
          this.setState({ isNECaptchaLocked: false })
        }
      })
    })
  }

  render() {
    const { isGetSms, count } = this.state
    const {
      title,
      number,
      smsCode,
      onNumberChange,
      onSmsCodeChange
    } = this.props

    return (
      <div className="veritified">
        <h2>{title}</h2>
        <div className="main-content">
          <label>
            <input
              className="input-main"
              type="text"
              placeholder="邮箱/手机号"
              value={number}
              onChange={onNumberChange}
            />
          </label>
          {/*<Captcha*/}
            {/*value={captcha}*/}
            {/*onChange={(e) => this.onInputChange(e, 'captcha')}*/}
          {/*/>*/}
          <label>
            <input
              className="input-main"
              type="text"
              maxLength={6}
              placeholder="验证码"
              value={smsCode}
              onChange={onSmsCodeChange}
            />
            <span
              id="btn-code"
              className={`sms-code  ${!isGetSms ? `event-none` : ''}`}
              onClick={this.getSmsCode}
            >
              {isGetSms ? '获取验证码' : <span>{`${count}s`}</span>}
            </span>
          </label>
        </div>
      </div>
    )
  }
}
export default VeritifiedCode

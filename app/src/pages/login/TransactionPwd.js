import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
import { REG, TOAST_DURATION } from '../../utils/constants'
import Header from '../../components/common/Header'
import VeritifiedCode from '../../components/partial/VeritifiedCode'
import VeritifiedPwd from '../../components/partial/VeritifiedPwd'
import './ForgetPwd.scss'
class TransactionPwd extends Component {
  state = {
    number: '',
    smsCode: '',
    password: '',
    repassword: '',
    pageType: null
  }

  componentDidMount() {
    const {
      history: { location }
    } = this.props
    const { state } = location
    if (state && state.type) {
      this.setState({ pageType: state.type })
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onNumberChange = e => {
    const {
      target: { value }
    } = e
    this.setState({ number: value })
  }

  onSmsCodeChange = e => {
    const {
      target: { value }
    } = e
    this.setState({ smsCode: value })
  }

  onPasswordChange = e => {
    const {
      target: { value }
    } = e
    this.setState({ password: value })
  }

  onRepasswordChange = e => {
    const {
      target: { value }
    } = e
    this.setState({ repassword: value })
  }

  sendSmsCode = () => {
    // 调发送接口
  }

  onSubmit = () => {
    const { history } = this.props
    const { number, smsCode, password, repassword } = this.state
    const step = window.location.pathname.split('/')[2]
    if (step === '1') {
      if (!REG.EMAIL.test(number) && !REG.MOBILE.test(number)) {
        Toast.info('账号输入错误', TOAST_DURATION)
        return
      }

      if (!REG.SMSCODE.test(smsCode)) {
        Toast.info('验证码输入错误', TOAST_DURATION)
        return
      }

      history.replace(`/transaction-password/2`)
      return
    }

    if (step === '2') {
      if (!REG.PASSWORD.test(password)) {
        Toast.info('密码最少8位，字母加数字', TOAST_DURATION)
        return
      }
      if (password !== repassword) {
        Toast.info('两次密码不一致', TOAST_DURATION)
        return
      }

      Toast.info('交易密码设置成功', TOAST_DURATION, () => {
        history.goBack()
      })
    }
  }

  onBack = () => {
    const { history } = this.props
    const { location } = history
    const step = location && location.pathname.split('/')[2]

    if (step === '2') {
      history.push({ pathname: '/transaction-password/1' })
    } else {
      history.push('/account')
    }
  }

  render() {
    const { number, smsCode, password, repassword, pageType } = this.state
    const {
      history: { location }
    } = this.props
    const step = location && location.pathname.split('/')[2]
    let isDisabled
    if (step === '1') {
      isDisabled = number === '' || smsCode === ''
    } else {
      isDisabled = password === '' || repassword === ''
    }

    return (
      <div id="transaction-pwd">
        <Header onHandle={this.onBack} />
        {step === '1' && (
          <VeritifiedCode
            title={pageType === 'set' ? '设置交易密码' : '重置交易密码'}
            number={number}
            smsCode={smsCode}
            sendSmsCode={this.sendSmsCode}
            onNumberChange={this.onNumberChange}
            onSmsCodeChange={this.onSmsCodeChange}
          />
        )}
        {step === '2' && (
          <VeritifiedPwd
            title="重置交易密码"
            password={password}
            repassword={repassword}
            onPasswordChange={this.onPasswordChange}
            onRepasswordChange={this.onRepasswordChange}
          />
        )}
        <Button
          activeClassName="btn-common__active"
          className={`btn-common ${isDisabled ? 'btn-common__disabled' : ''}`}
          disabled={isDisabled}
          onClick={this.onSubmit}
        >
          下一步
        </Button>
      </div>
    )
  }
}

export default TransactionPwd

import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
import { REG, TOAST_DURATION, COUNT_DOWN } from '../../utils/constants'
import Header from '../../components/common/Header'
import { UserApi } from '../../api'
import VeritifiedCode from '../../components/partial/VerifiedCode'
import VeritifiedPwd from '../../components/partial/VeritifiedPwd'
import './ForgetPwd.scss'
class ForgetPwd extends Component {
  state = {
    number: '',
    smsCode: '',
    imgcode: null,
    password: '',
    repassword: '',
    pageType: null,
    count: COUNT_DOWN,
    isGetSms: true
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

  getSmsCode = async () => {
    const { imgcode, number } = this.state
    // 1，图形验证码接口
    // 2.倒计时开始
    await this.codeCountDown()

    // 调发送接口
    if (REG.MOBILE.test(number)) {
      // 调手机验证码发送接口
      UserApi.sendSmsCode({
        imgcode,
        phone: number,
        type: 'findpassword',
        prefix: '86'
      }).then(res => {
        if (res.status === 1) {
          Toast.success('验证码发送成功', TOAST_DURATION)
        }
      })
    } else if (REG.EMAIL.test(number)) {
      // 调邮箱验证码发送接口
      UserApi.sendMailCode({ imgcode, email: number, type: 'findpassword' }).then(
        res => {
          if (res.status === 1) {
            Toast.success('验证码发送成功', TOAST_DURATION)
          }
        }
      )
    }
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

      // 调校验验证码 接口，成功回调以下
      UserApi.checkCode({
        user_name: number,
        code: smsCode,
        type: 'findpassword'
      }).then(res => {
        if (res.status === 1) {
          history.replace(`/forget-password/2`)
        } else {
          Toast.info(res && res.msg, TOAST_DURATION)
        }
      })
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
      // 调找回登录密码接口，成功回调 以下
      UserApi.findPassword({
        password,
        password_confirm: repassword,
        user_name: number,
        code: smsCode
      }).then(res => {
        if (res.status === 1) {
          Toast.info('密码已重置，请重新登录', TOAST_DURATION, () => {
            history.push(`/login`)
          })
        } else {
          Toast.info(res && res.msg, TOAST_DURATION)
        }
      })
    }
  }

  onBack = () => {
    const { history } = this.props
    const { location } = history
    const { pageType } = this.state
    const step = location && location.pathname.split('/')[2]

    if (step === '2') {
      history.push({ pathname: '/forget-password/1' })
    } else {
      history.push(pageType === 'reset' ? '/account' : '/login')
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
      <div id="forget-pwd">
        <Header onHandle={this.onBack} />
        <div className="main-content">
          {step === '1' && (
            <VeritifiedCode
              title={pageType === 'reset' ? '重置登录密码' : '找回密码'}
              number={number}
              smsCode={smsCode}
              sendSmsCode={this.getSmsCode}
              onNumberChange={this.onNumberChange}
              onSmsCodeChange={this.onSmsCodeChange}
            />
          )}
          {step === '2' && (
            <VeritifiedPwd
              title="重置密码"
              password={password}
              repassword={repassword}
              onPasswordChange={this.onPasswordChange}
              onRepasswordChange={this.onRepasswordChange}
            />
          )}
        </div>
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

export default ForgetPwd

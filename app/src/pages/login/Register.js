import React, { Component, Fragment } from 'react'
import { Button, Toast } from 'antd-mobile'
import { User } from '../../api'
import { REG, TOAST_DURATION, COUNT_DOWN } from '../../utils/constants'
import Header from '../../components/common/Header'
import './Register.scss'
class Register extends Component {
  state = {
    number: '',
    smsCode: '',
    imgCode: null,
    password: '',
    repassword: '',
    inviteCode: '',
    type: 'password',
    repwdType: 'password',
    count: COUNT_DOWN,
    isGetSms: true,
    veritifiedImg: null
  }

  onNumberChange = e => {
    const {
      target: { value }
    } = e
    this.setState({ number: value })
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

  onSmsCodeChange = e => {
    const {
      target: { value }
    } = e
    if (this.state.veritifiedImg !== null) {
      this.setState({ imgCode: value })
    } else {
      this.setState({ smsCode: value })
    }
  }

  onInviteCodeChange = e => {
    const {
      target: { value }
    } = e
    this.setState({ inviteCode: value })
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

  // 获取图形验证码
  getCaptchapng = () => {
    User.getCaptchapng().then(res => {
      console.log(res)
      //   this.setState({ veritifiedImg: res.config.url })
    })
  }

  getSmsCode = async () => {
    const { imgcode, number } = this.state
    await this.getCaptchapng()
    await this.codeCountDown()

    if (REG.MOBILE.test(number)) {
      // 调手机验证码发送接口
      User.sendSmsCode({
        imgcode,
        phone: number,
        type: 'reg',
        prefix: '86'
      }).then(res => {
        if (res.status === 1) {
          Toast.success('验证码发送成功', TOAST_DURATION)
        }
      })
    } else if (REG.EMAIL.test(number)) {
      // 调邮箱验证码发送接口
      User.sendMailCode({ imgcode, email: number, type: 'reg' }).then(res => {
        if (res.status === 1) {
          Toast.success('验证码发送成功', TOAST_DURATION)
        }
      })
    }
  }

  onSetType = type => {
    this.setState({ type })
  }

  register = () => {
    const { history } = this.props
    const { number, smsCode, password, repassword, inviteCode } = this.state

    User.register({
      user_name: number,
      code: smsCode,
      password,
      password_confirm: repassword,
      recommend_code: inviteCode
    }).then(res => {
      if (res.status === 1) {
        history.push('/')
      } else {
        Toast.info(res && res.msg, TOAST_DURATION)
      }
    })
  }
  onSubmit = () => {
    const { history } = this.props
    const { number, password, repassword } = this.state
    const step = window.location.pathname.split('/')[2]
    if (step === '1') {
      if (!REG.EMAIL.test(number) && !REG.MOBILE.test(number)) {
        Toast.info('账号输入错误', TOAST_DURATION)
        return
      }

      if (!REG.PASSWORD.test(password)) {
        Toast.info('密码输入错误', TOAST_DURATION)
        return
      }

      if (!REG.PASSWORD.test(password)) {
        Toast.info('密码最少8位，字母加数字', TOAST_DURATION)
        return
      }

      if (password !== repassword) {
        Toast.info('两次密码不一致', TOAST_DURATION)
        return
      }

      // 注册接口
      this.register()
    }

    if (step === '2') {
      history.push('/login')
    }
  }
  render() {
    const {
      number,
      smsCode,
      imgCode,
      password,
      repassword,
      inviteCode,
      type,
      repwdType,
      count,
      isGetSms,
      veritifiedImg
    } = this.state

    const step = window.location.pathname.split('/')[2]
    const isDisabled =
      step === '1' &&
      (number === '' ||
        smsCode === '' ||
        password === '' ||
        repassword === '' ||
        inviteCode === '')
    return (
      <div>
        <div id="register">
          <Header />
          <div className="main-content">
            {step === '1' && (
              <Fragment>
                <h2>注册</h2>
                <label>
                  <input
                    className="input-main"
                    type="text"
                    placeholder="邮箱/手机号"
                    value={number}
                    onChange={this.onNumberChange}
                  />
                </label>
                <label>
                  <input
                    className="input-main"
                    type="text"
                    maxLength={4}
                    placeholder="验证码"
                    value={veritifiedImg ? imgCode : smsCode}
                    onChange={this.onSmsCodeChange}
                  />
                  <img
                    key={veritifiedImg}
                    className="sms-img"
                    src={this.state.veritifiedImg}
                    alt=""
                    onClick={() => this.getCaptchapng()}
                  />
                  <span
                    className={`sms-code  ${!isGetSms ? `event-none` : ''}`}
                    onClick={this.getSmsCode}
                  >
                    {isGetSms ? '获取验证码' : <span>{`${count}s`}</span>}
                  </span>
                </label>
                <label>
                  <input
                    className="input-main"
                    type={type}
                    placeholder="密码"
                    value={password}
                    onChange={this.onPasswordChange}
                  />
                  {type === 'text' && (
                    <img
                      src={require('../../assets/images/open-pwd.png')}
                      alt=""
                      onClick={() => this.onSetType('password')}
                    />
                  )}
                  {type === 'password' && (
                    <img
                      src={require('../../assets/images/close-pwd.png')}
                      alt=""
                      onClick={() => this.onSetType('text')}
                    />
                  )}
                </label>
                <label>
                  <input
                    className="input-main"
                    type={repwdType}
                    placeholder="再次输入密码"
                    value={repassword}
                    onChange={this.onRepasswordChange}
                  />
                  {repwdType === 'text' && (
                    <img
                      src={require('../../assets/images/open-pwd.png')}
                      alt=""
                      onClick={() => this.setState({ repwdType: 'password' })}
                    />
                  )}
                  {repwdType === 'password' && (
                    <img
                      src={require('../../assets/images/close-pwd.png')}
                      alt=""
                      onClick={() => this.setState({ repwdType: 'text' })}
                    />
                  )}
                </label>
                <label>
                  <input
                    className="input-main"
                    type="text"
                    placeholder="邀请码"
                    value={inviteCode}
                    onChange={this.onInviteCodeChange}
                  />
                </label>
              </Fragment>
            )}
            {step === '2' && (
              <Fragment>
                <h2>注册成功！</h2>
                <div className="register-success">
                  <img
                    className=""
                    src={require('../../assets/images/register-success.png')}
                    alt=""
                  />
                  <p className="text">恭喜您，注册成功 !</p>
                </div>
              </Fragment>
            )}
          </div>
          <Button
            activeClassName="btn-common__active"
            className={`btn-common btn-common__bottom ${
              isDisabled ? 'btn-common__disabled' : ''
            }`}
            disabled={isDisabled}
            onClick={this.onSubmit}
          >
            {step === '1' ? '立即注册' : '立即开启'}
          </Button>
        </div>
      </div>
    )
  }
}

export default Register

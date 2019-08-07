import React, {Component} from 'react'
import {Button, Toast} from 'antd-mobile'
import {User} from '../../api'
import {REG, TOAST_DURATION, COUNT_DOWN} from '../../utils/constants'
import Header from '../../components/common/Header'
import './Register.scss'
import CaptchaPng from "../../components/common/CaptchaPng";

class RegisterSuccess {
  render() {
    return (
      <div>
        <h2>注册成功！</h2>
        <div className="register-success">
          <img
            className=""
            src={require('../../assets/images/register-success.png')}
            alt=""
          />
          <p className="text">恭喜您，注册成功 !</p>
        </div>
      </div>
    );
  }
}

class Register extends Component {
  state = {
    account: '',
    code: '',
    imgCode: null,
    password: '',
    passwordConfirm: '',
    recommendCode: '',
    showCaptchaPng: false,
    type: 'password',
    repwdType: 'password',
    count: COUNT_DOWN,
    isGetSms: true,
    veritifiedImg: null
  };

  canSubmit = () => {
    const {account, code, password, passwordConfirm} = this.state;
    return !!(account && code && password && passwordConfirm);
  };

  onInputChange = (e, key) => {
    const {target: {value}} = e;
    this.setState({[key]: value});
    console.log(value);
  };

  onPasswordChange = e => {
    const {target: {value}} = e;
    this.setState({password: value})
  }

  onpasswordConfirmChange = e => {
    const {
      target: {value}
    } = e
    this.setState({passwordConfirm: value})
  }

  onSmsCodeChange = e => {
    const {
      target: {value}
    } = e
    if (this.state.veritifiedImg !== null) {
      this.setState({imgCode: value})
    } else {
      this.setState({smsCode: value})
    }
  }

  onRecommendCodeChange = e => {
    const {
      target: {value}
    } = e
    this.setState({recommendCode: value})
  }

  codeCountDown = () => {
    let count = this.state.count

    this.timer = setInterval(() => {
      if (count <= 0) {
        this.setState({isGetSms: true, count: COUNT_DOWN})
        clearInterval(this.timer)
        return
      } else {
        this.setState({isGetSms: false, count: count--})
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

  getCode = async () => {
    const {account} = this.state;
    if (!REG.EMAIL.test(account) && !REG.MOBILE.test(account)) {
      Toast.info('请填写正确的邮箱或手机号', TOAST_DURATION)
      return
    }

    this.setState({showCaptchaPng: true});
    await this.codeCountDown()
  }

  onSetType = type => {
    this.setState({type})
  }

  register = () => {
    const {history} = this.props
    const {number, smsCode, password, passwordConfirm, recommendCode} = this.state

    User.register({
      user_name: number,
      code: smsCode,
      password,
      password_confirm: passwordConfirm,
      recommend_code: recommendCode
    }).then(res => {
      if (res.status === 1) {
        history.push('/')
      } else {
        Toast.info(res && res.msg, TOAST_DURATION)
      }
    })
  }
  onSubmit = () => {
    const {history} = this.props
    const {number, password, passwordConfirm} = this.state
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

      if (password !== passwordConfirm) {
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
      account,
      code,
      password,
      passwordConfirm,
      recommendCode,
      showCaptchaPng,
      type,
      repwdType,
      count,
      isGetSms,
      veritifiedImg
    } = this.state

    return (
      <div id="register">
        <Header/>
        <div className="main-content">
          <h2>注册</h2>
          <label>
            <input
              className="input-main"
              type="text"
              placeholder="邮箱/手机号"
              value={account}
              onChange={(e) => this.onInputChange(e, 'account')}
            />
          </label>
          <label>
            <input
              className="input-main"
              type="text"
              maxLength={4}
              placeholder="验证码"
              value={code}
              onChange={(e) => this.onInputChange(e, 'code')}
            />
            <span
              className={`sms-code  ${!isGetSms ? `event-none` : ''}`}
              onClick={this.getCode}
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
              value={passwordConfirm}
              onChange={this.onpasswordConfirmChange}
            />
            {repwdType === 'text' && (
              <img
                src={require('../../assets/images/open-pwd.png')}
                alt=""
                onClick={() => this.setState({repwdType: 'password'})}
              />
            )}
            {repwdType === 'password' && (
              <img
                src={require('../../assets/images/close-pwd.png')}
                alt=""
                onClick={() => this.setState({repwdType: 'text'})}
              />
            )}
          </label>
          <label>
            <input
              className="input-main"
              type="text"
              placeholder="邀请码"
              value={recommendCode}
              onChange={this.onRecommendCodeChange}
            />
          </label>

        </div>
        <Button
          activeClassName="btn-common__active"
          className={`btn-common btn-common__bottom ${
            this.canSubmit() ? '' : 'btn-common__disabled'
            }`}
          disabled={this.canSubmit()}
          onClick={this.onSubmit}
        >
          立即注册
        </Button>
        <CaptchaPng show={showCaptchaPng} account={account} type="reg"/>
      </div>
    )
  }
}

//reg|findpassword|setpaypassword|withdraw

export default Register

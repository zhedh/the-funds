import React, {Component} from 'react'
import {Button, Toast} from 'antd-mobile'
import {User} from '../../api'
import {REG, TOAST_DURATION, COUNT_DOWN} from '../../utils/constants'
import Header from '../../components/common/Header'
import Captcha from '../../components/common/Captcha';
import openPwdImg from '../../assets/images/open-pwd.png'
import closePwdImg from '../../assets/images/close-pwd.png'
import './Register.scss'

function RegisterHeader(props) {
  return <div>
    <Header/>
    <h2>{props.title}</h2>
  </div>
}

class RegisterSuccess extends Component {
  onConfirm = () => {
    const {history} = this.props;
    history.push('/');
  };

  render() {
    return (
      <div className="register-success">
        <RegisterHeader title="注册成功！"/>
        <main>
          <img
            src={require('../../assets/images/register-success.png')}
            alt=""
          />
          <p className="text">恭喜您，注册成功 !</p>
        </main>
        <Button
          activeClassName="btn-common__active"
          className={`btn-common btn-common__bottom `}
          onClick={this.onConfirm}
        >
          立即开启
        </Button>
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
    pwType: 'password',
    pwConfirmType: 'password',
    captcha: '',
    count: COUNT_DOWN,
    isGetSms: true,
    showSuccess: false
  };

  canSubmit = () => {
    const {account, code, password, passwordConfirm} = this.state;
    return !!(account && code && password && passwordConfirm);
  };

  onInputChange = (e, key) => {
    const {target: {value}} = e;
    this.setState({[key]: value});
  };

  codeCountDown = () => {
    let count = this.state.count

    this.timer = setInterval(() => {
      if (count <= 0) {
        this.setState({isGetSms: true, count: COUNT_DOWN})
        clearInterval(this.timer)
        return;
      } else {
        this.setState({isGetSms: false, count: count--})
      }
    }, 1000)
  };

  sendSmsCode = () => {
    const {account, captcha} = this.state;
    User.sendSmsCode({
      imgcode: captcha,
      prefix: '86',
      phone: account,
      type: 'reg'
    }).then(res => {
      if (res.status === -1) {
        Toast.info(res.msg);
        return;
      }
      this.codeCountDown();
    });
  };

  sendMailCode = () => {
    const {account, captcha} = this.state;
    User.sendMailCode({
      imgcode: captcha,
      email: account,
      type: 'reg'
    }).then(res => {
      if (res.status === -1) {
        Toast.info(res.msg);
        return;
      }
      this.codeCountDown();
    });
  };

  getCode = async () => {
    const {account, captcha} = this.state;
    if (!REG.EMAIL.test(account) && !REG.MOBILE.test(account)) {
      Toast.info('请填写正确的邮箱或者手机号', TOAST_DURATION)
      return
    }

    if (!captcha || captcha.length !== 4) {
      Toast.info('请输入4位验证码', TOAST_DURATION);
      return;
    }

    REG.MOBILE.test(account) ?
      this.sendSmsCode() : this.sendMailCode();
  };

  onSetType = (currentType, key) => {
    const type = currentType === 'password' ? 'text' : 'password';
    this.setState({[key]: type});
  };

  register = () => {
    const {history} = this.props;
    const {account, code, password, passwordConfirm, recommendCode} = this.state

    User.register({
      userName: account,
      code,
      password,
      passwordConfirm,
      recommendCode
    }).then(res => {
      if (res.status === 1) {
        history.push('/')
      } else {
        Toast.info(res && res.msg, TOAST_DURATION)
      }
    })
  };

  onSubmit = () => {
    const {number, password, passwordConfirm} = this.state;
    if (!REG.EMAIL.test(number) && !REG.MOBILE.test(number)) {
      Toast.info('账号输入错误', TOAST_DURATION);
      return
    }

    if (!REG.PASSWORD.test(password)) {
      Toast.info('密码输入错误', TOAST_DURATION);
      return
    }

    if (!REG.PASSWORD.test(password)) {
      Toast.info('密码最少8位，字母加数字', TOAST_DURATION);
      return
    }

    if (password !== passwordConfirm) {
      Toast.info('两次密码不一致', TOAST_DURATION);
      return
    }

    this.register();
  };

  render() {
    const {
      account,
      code,
      password,
      passwordConfirm,
      recommendCode,
      pwType,
      pwConfirmType,
      captcha,
      count,
      isGetSms,
      showSuccess
    } = this.state;

    return (
      <div id="register">
        <RegisterHeader title="注册"/>
        <div className="main-content">
          <label>
            <input
              className="input-main"
              type="text"
              placeholder="邮箱/手机号"
              value={account}
              onChange={(e) => this.onInputChange(e, 'account')}
            />
          </label>
          <Captcha
            value={captcha}
            onChange={(e) => this.onInputChange(e, 'captcha')}
          />
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
              onClick={this.getCode}>
                    {isGetSms ? '获取验证码' : <span>{`${count}s`}</span>}
            </span>
          </label>
          <label>
            <input
              className="input-main"
              type={pwType}
              placeholder="密码"
              value={password}
              onChange={(e) => this.onInputChange(e, 'password')}
            />
            <img
              src={pwType === 'text' ? openPwdImg : closePwdImg}
              alt="睁眼闭眼"
              onClick={() => this.onSetType(pwType, 'pwType')}
            />
          </label>
          <label>
            <input
              className="input-main"
              type={passwordConfirm}
              placeholder="再次输入密码"
              value={passwordConfirm}
              onChange={(e) => this.onInputChange(e, 'passwordConfirm')}
            />
            <img
              src={pwConfirmType === 'text' ? openPwdImg : closePwdImg}
              alt="睁眼闭眼"
              onClick={() => this.onSetType(pwConfirmType, 'pwConfirmType')}
            />
          </label>
          <label>
            <input
              className="input-main"
              type="text"
              placeholder="邀请码"
              value={recommendCode}
              onChange={(e) => this.onInputChange(e, 'recommendCode')}
            />
          </label>
        </div>
        <Button
          activeClassName="btn-common__active"
          className={`btn-common btn-common__bottom ${
            this.canSubmit() ? '' : 'btn-common__disabled'
            }`}
          disabled={!this.canSubmit()}
          onClick={this.onSubmit}
        >
          立即注册
        </Button>
        {showSuccess && <RegisterSuccess history={this.props.history}/>}
      </div>
    )
  }
}

export default Register

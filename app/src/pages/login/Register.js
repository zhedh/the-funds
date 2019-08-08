import React, {Component} from 'react'
import {Button, Toast} from 'antd-mobile'
import Cookies from "js-cookie";
import {UserApi} from '../../api'
import {REG, TOAST_DURATION, COUNT_DOWN} from '../../utils/constants'
import AccountHeader from "../../components/partial/AccountHeader";
import Captcha from '../../components/common/Captcha';
import openPwdImg from '../../assets/images/open-pwd.png'
import closePwdImg from '../../assets/images/close-pwd.png'
import './Register.scss'

class RegisterSuccess extends Component {
  onConfirm = () => {
    const {history} = this.props;
    history.push('/');
  };

  render() {
    return (
      <div className="register-success">
        <AccountHeader title="注册成功！"/>
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
    captchaKey: +new Date(),
    count: COUNT_DOWN,
    isGetSms: true,
    showSuccess: false
  };

  canSubmit = () => {
    const {account, code, password, passwordConfirm} = this.state;
    return !!(account && code && password && passwordConfirm);
  };

  onChangeCaptcha = (key) => {
    this.setState({captchaKey: key})
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
      } else {
        this.setState({isGetSms: false, count: count--})
      }
    }, 1000)
  };

  sendSmsCode = () => {
    const {account, captcha, captchaKey} = this.state;
    UserApi.sendSmsCode({
      imgcode: captcha,
      prefix: '86',
      phone: account,
      type: 'reg'
    }, {
      key: captchaKey,
    }).then(res => {
      if (res.status === -1) {
        Toast.info(res.msg);
        return;
      }
      this.codeCountDown();
    });
  };

  sendMailCode = () => {
    const {account, captcha, captchaKey} = this.state;
    UserApi.sendMailCode({
      imgcode: captcha,
      email: account,
      type: 'reg'
    }, {
      key: captchaKey,
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
    const {account, code, password, passwordConfirm, recommendCode} = this.state

    UserApi.register({
      phonePrefix: REG.MOBILE.test(account) ? '86' : null,
      userName: account,
      code,
      password,
      passwordConfirm,
      recommendCode
    }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg, TOAST_DURATION)
        return
      }
      Cookies.set('OPENID', res.data.openId);
      Cookies.set('TOKEN', res.data.token)
      Toast.success('注册成功', TOAST_DURATION, () => this.setState({showSuccess: true}))
    })
  };

  onSubmit = () => {
    const {account, password, passwordConfirm} = this.state;
    if (!REG.EMAIL.test(account) && !REG.MOBILE.test(account)) {
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
        <AccountHeader title="注册"/>
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
          <label>
            <Captcha
              value={captcha}
              onChange={(e) => this.onInputChange(e, 'captcha')}
              onChangeCaptcha={this.onChangeCaptcha}
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
              className="eye-img"
              src={pwType === 'text' ? openPwdImg : closePwdImg}
              alt="睁眼闭眼"
              onClick={() => this.onSetType(pwType, 'pwType')}
            />
          </label>
          <label>
            <input
              className="input-main"
              type={pwConfirmType}
              placeholder="再次输入密码"
              value={passwordConfirm}
              onChange={(e) => this.onInputChange(e, 'passwordConfirm')}
            />
            <img
              className="eye-img"
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

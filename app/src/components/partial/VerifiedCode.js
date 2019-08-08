import React, {Component} from 'react'
import {COUNT_DOWN, REG, TOAST_DURATION} from '../../utils/constants'
import Captcha from "../common/Captcha";
import AccountHeader from "./AccountHeader";
import UserApi from "../../api/user";
import {Toast} from "antd-mobile";
import './VerifiedCode.scss'
import Button from "antd-mobile/es/button";


class VerifiedCode extends Component {
  state = {
    isGetSms: true,
    count: COUNT_DOWN,
    captcha: '',
    captchaKey: +new Date()
  }

  onInputChange = (e, key) => {
    const {value} = e.target
    this.setState({[key]: value})
  }

  onChangeCaptcha = (key) => {
    this.setState({captchaKey: key})
  };

  codeCountDown = () => {
    let count = this.state.count

    this.timer = setInterval(() => {
      if (count <= 0) {
        this.setState({isGetSms: true, count: COUNT_DOWN})
        clearInterval(this.timer)
        return
      }
      this.setState({isGetSms: false, count: count--})
    }, 1000)
  }

  sendSmsCode = () => {
    const {userName} = this.props
    const {captcha, captchaKey} = this.state;
    UserApi.sendSmsCode({
      imgcode: captcha,
      prefix: '86',
      phone: userName,
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
    const {userName} = this.props
    const {captcha, captchaKey} = this.state;
    UserApi.sendMailCode({
      imgcode: captcha,
      email: userName,
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

  getCode = () => {
    const {userName} = this.props
    const {captcha} = this.state;
    if (!REG.EMAIL.test(userName) && !REG.MOBILE.test(userName)) {
      Toast.info('请填写正确的邮箱或者手机号', TOAST_DURATION)
      return
    }

    if (!captcha || captcha.length !== 4) {
      Toast.info('请输入4位验证码', TOAST_DURATION);
      return;
    }

    REG.MOBILE.test(userName) ?
      this.sendSmsCode() : this.sendMailCode();
  };

  onSubmit = () => {
    this.props.onStepChange(2)
  }

  render() {
    const {isGetSms, count, captcha, captchaKey} = this.state
    const {
      typeOption,
      userName,
      code,
      onInputChange,
      onNext,
    } = this.props

    const canSubmit = userName !== '' && code !== ''

    return (
      <div className="verified-code">
        <AccountHeader title={typeOption.title}/>
        <div className="main-content">
          <label>
            <input
              className="input-main"
              type="text"
              placeholder="邮箱/手机号"
              value={userName}
              onChange={(e) => onInputChange(e, 'userName')}
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
              onChange={(e) => onInputChange(e, 'code')}
            />
            <span
              id="btn-code"
              className={`sms-code  ${!isGetSms ? `event-none` : ''}`}
              onClick={this.getCode}
            >
              {isGetSms ? '获取验证码' : <span>{`${count}s`}</span>}
            </span>
          </label>
        </div>
        <Button
          activeClassName="btn-common__active"
          className={`btn-common ${!canSubmit ? 'btn-common__disabled' : ''}`}
          disabled={!canSubmit}
          onClick={onNext}>
          下一步
        </Button>
      </div>
    )
  }
}

export default VerifiedCode

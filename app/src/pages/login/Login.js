import React, {Component} from 'react'
import {Button, Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {UserApi} from '../../api'
import {REG, TOAST_DURATION} from '../../utils/constants'
import {compatibleFixedButton} from "../../utils/common";
import AccountHeader from "../../components/partial/AccountHeader";
import openPwdImg from '../../assets/images/open-pwd.png'
import closePwdImg from '../../assets/images/close-pwd.png'
import './Login.scss'


class Login extends Component {
  state = {
    number: '',
    password: '',
    type: 'password',
    showBtn: true
  }

  componentDidMount() {
    compatibleFixedButton((isShow) => {
      this.setState({showBtn: isShow})
    })
  }

  onInputChange = (e, key) => {
    const {value} = e.target
    this.setState({[key]: value})
  }

  onSetType = currentType => {
    this.setState({type: currentType === 'text' ? 'password' : 'text'})
  }

  onSubmit = () => {
    const {history} = this.props
    const {number, password} = this.state

    const isPhone = REG.MOBILE.test(number);

    if (!REG.EMAIL.test(number) && !isPhone) {
      Toast.info('账号输入错误', TOAST_DURATION)
      return
    }

    if (!REG.PASSWORD.test(password)) {
      Toast.info('密码输入错误', TOAST_DURATION)
      return
    }

    // 登录接口，成功后前往首页
    UserApi.login({
      phonePrefix: isPhone ? '86' : null,
      userName: number,
      password
    }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg, TOAST_DURATION)
        return
      }
      Cookies.set('OPENID', res.data.openId);
      Cookies.set('TOKEN', res.data.token)
      Cookies.set('PAY_PASSWORD', res.data.payPassword)
      // 暂时进入邀请好友页
      // Toast.success('登录成功', TOAST_DURATION, () => history.push('/'))
      Toast.success('登录成功', TOAST_DURATION, () => history.push('/home/inviter-friend'))
    })
  }

  render() {
    const {number, password, type, showBtn} = this.state
    const canSubmit = number === '' || password === ''
    return (
      <div id="login">
        <AccountHeader title="登录"/>
        <div className="login-content">
          <label>
            <input
              className="input-main"
              type="text"
              placeholder="邮箱/手机号"
              value={number}
              onChange={(e) => this.onInputChange(e, 'number')}
            />
          </label>
          <label>
            <input
              className="input-main"
              type={type}
              placeholder="密码"
              value={password}
              onChange={(e) => this.onInputChange(e, 'password')}
            />
            <img
              src={type === 'text' ? openPwdImg : closePwdImg}
              alt=""
              onClick={() => this.onSetType(type)}
            />
          </label>
          <p>
            <Link to="/password/find">忘记密码？</Link>
            <Link to="/register">注册</Link>
          </p>
        </div>
        {showBtn && <Button
          activeClassName="btn-common__active"
          className={`btn-common btn-common__bottom ${
            canSubmit ? 'btn-common__disabled' : ''
            }`}
          disabled={canSubmit}
          onClick={this.onSubmit}>
          确认
        </Button>}
      </div>
    )
  }
}

export default Login

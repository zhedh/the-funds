import React, {Component} from 'react'
import {Button, Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {UserApi} from '../../api'
import {REG, TOAST_DURATION} from '../../utils/constants'
import Header from '../../components/common/Header'
import './Login.scss'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    number: '',
    password: '',
    type: 'password'
  };

  onNumberChange = e => {
    const {
      target: {value}
    } = e
    this.setState({number: value})
  }

  onPasswordChange = e => {
    const {
      target: {value}
    } = e
    this.setState({password: value})
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

    // 登陆接口，成功后前往首页
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
      Toast.success('登陆成功', TOAST_DURATION, () => history.push('/'))
    })
  }

  onSetType = type => {
    this.setState({type})
  }

  render() {
    const {number, password, type} = this.state
    const isDisabled = number === '' || password === ''
    return (
      <div id="login">
        <Header/>
        <div className="login-content">
          <h2>登录</h2>
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
          <p>
            <Link to="/forget-password/1">忘记密码？</Link>
            <Link to="/register/1">注册</Link>
          </p>
        </div>
        <Button
          activeClassName="btn-common__active"
          className={`btn-common btn-common__bottom ${
            isDisabled ? 'btn-common__disabled' : ''
            }`}
          disabled={isDisabled}
          onClick={this.onSubmit}
        >
          确认
        </Button>
      </div>
    )
  }
}

export default Login

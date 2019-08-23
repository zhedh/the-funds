import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import {Button, Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {REG, TOAST_DURATION} from '../../utils/constants'
import {compatibleFixedButton} from "../../utils/common"
import AccountHeader from "../../components/partial/AccountHeader"
import openPwdImg from '../../assets/images/open-pwd.png'
import closePwdImg from '../../assets/images/close-pwd.png'
import './Login.scss'

@inject('userStore')
@observer
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

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  onInputChange = (e, key) => {
    const {value} = e.target
    this.setState({[key]: value})
  }

  onSetType = currentType => {
    this.setState({type: currentType === 'text' ? 'password' : 'text'})
  }

  onSubmit = () => {
    const {history, userStore} = this.props
    const {number, password} = this.state

    const isPhone = REG.MOBILE.test(number);

    if (!REG.EMAIL.test(number) && !isPhone) {
      Toast.info('账号输入错误', TOAST_DURATION)
      return
    }

    if (!REG.PASSWORD.test(password)) {
      Toast.info('密码最少8位，字母加数字', TOAST_DURATION)
      return
    }

    // 登录接口，成功后前往首页
    userStore.login({
      phonePrefix: isPhone ? '86' : null,
      userName: number,
      password
    }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg, TOAST_DURATION)
        return
      }

      // 暂时进入邀请好友页
      Toast.success('登录成功', TOAST_DURATION)
      // this.timer = setTimeout(() => history.push('/home/inviter-friend'), TOAST_DURATION * 1000)
      this.timer = setTimeout(() => history.push('/home'), TOAST_DURATION * 1000)
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

import React, {Component} from 'react'
import {Toast} from 'antd-mobile'
import {REG, PASSWORD_TYPES, TOAST_DURATION} from '../../utils/constants'
import {UserApi} from '../../api'
import VerifiedCode from '../../components/partial/VerifiedCode'
import VerifiedPwd from '../../components/partial/VeritifiedPwd'
import './Password.scss'


class Password extends Component {
  state = {
    type: 'find', // find | reset
    step: 1,
    userName: '',
    code: '',
    password: '',
    passwordConfirm: '',
  }

  componentDidMount() {
    const {match} = this.props
    const type = match.params
    this.setState({type})
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onInputChange = (e, key) => {
    const {value} = e.target
    this.setState({[key]: value})
  }

  onNext = () => {
    const {userName, code} = this.state
    const isPhone = REG.MOBILE.test(userName)
    if (!REG.EMAIL.test(userName) && !isPhone) {
      Toast.info('账号输入错误', TOAST_DURATION)
      return
    }

    if (!REG.SMSCODE.test(code)) {
      Toast.info('验证码输入错误', TOAST_DURATION)
      return
    }

    // 调校验验证码 接口，成功回调以下
    UserApi.checkCode({
      phonePrefix: isPhone ? '86' : null,
      userName,
      code,
      type: 'findpassword'
    }).then(res => {
      if (res.status === 1) {
        this.setState({step: 2})
        return
      }
      Toast.info(res && res.msg, TOAST_DURATION)
    })
  }


  onSubmit = () => {
    const {userName, code, password, passwordConfirm} = this.state

    if (!REG.PASSWORD.test(password)) {
      Toast.info('密码最少8位，字母加数字', TOAST_DURATION)
      return
    }
    if (password !== passwordConfirm) {
      Toast.info('两次密码不一致', TOAST_DURATION)
      return
    }
    // 调找回登录密码接口，成功回调 以下
    UserApi.findPassword({
      userName,
      code,
      password,
      passwordConfirm,
    }).then(res => {
      if (res.status === 1) {
        const {history} = this.props
        Toast.info('密码已重置，请重新登录', TOAST_DURATION, () =>
          history.push(`/login`)
        )
        return
      }
      Toast.info(res && res.msg, TOAST_DURATION)
    })
  }

  onBack = () => {
    const {history} = this.props
    const {location} = history
    const {pageType} = this.state
    const step = location && location.pathname.split('/')[2]

    if (step === '2') {
      history.push({pathname: '/forget-password/1'})
    } else {
      history.push(pageType === 'reset' ? '/account' : '/login')
    }
  }

  render() {
    const {step, type, userName, code, password, passwordConfirm} = this.state
    const typeOption = PASSWORD_TYPES.find(item => item.type === type) || {}

    return (
      <div id="password">
        {step === 1 && <VerifiedCode
          typeOption={typeOption}
          userName={userName}
          code={code}
          onInputChange={this.onInputChange}
          onNext={this.onNext}
        />}
        {step === 2 && <VerifiedPwd
          password={password}
          passwordConfirm={passwordConfirm}
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />}
      </div>
    )
  }
}

export default Password

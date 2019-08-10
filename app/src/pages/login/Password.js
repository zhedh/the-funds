import React, {Component} from 'react'
import {Toast} from 'antd-mobile'
import {REG, PASSWORD_TYPES, TOAST_DURATION} from '../../utils/constants'
import {UserApi} from '../../api'
import VerifiedCode from '../../components/partial/VerifiedCode'
import VerifiedPwd from '../../components/partial/VeritifiedPwd'
import './Password.scss'
import {inject, observer} from "mobx-react";

@inject('userStore')
@inject('personStore')
@observer
class Password extends Component {
  state = {
    typeOption: {},
    step: 1,
    userName: '',
    code: '',
    password: '',
    passwordConfirm: '',
  }

  componentDidMount() {
    const {match, history, userStore, personStore} = this.props
    const {type} = match.params
    const typeOption = PASSWORD_TYPES.find(item => item.type === type)
    if (!typeOption) {
      history.push('/404')
    }
    if (userStore.isOnline) {
      personStore.getUserInfo().then(() => {
        const userName = personStore.userName
        this.setState({typeOption, userName})
      })
      return
    }
    this.setState({typeOption})
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onBack = () => {
    const {history} = this.props
    const {typeOption} = this.state
    history.push(typeOption.type !== 'find' ? '/account' : '/login')
  }

  onInputChange = (e, key) => {
    const {value} = e.target
    this.setState({[key]: value})
  }

  onStepChange = step => this.setState({step})

  onNext = () => {
    const {userName, code, typeOption} = this.state
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
      type: typeOption.codeType
    }).then(res => {
      if (res.status === 1) {
        this.onStepChange(2)
        return
      }
      Toast.info(res && res.msg, TOAST_DURATION)
    })
  }

  onSubmit = () => {
    const {history} = this.props
    const {typeOption, userName, code, password, passwordConfirm} = this.state

    if (!REG.PASSWORD.test(password)) {
      Toast.info('密码最少8位，字母加数字', TOAST_DURATION)
      return
    }
    if (password !== passwordConfirm) {
      Toast.info('两次密码不一致', TOAST_DURATION)
      return
    }

    const isPhone = REG.MOBILE.test(userName)

    // 找回登录密码
    if (typeOption.type === 'find') {
      return UserApi.findPassword({
        phonePrefix: isPhone ? '86' : null,
        userName,
        code,
        password,
        passwordConfirm,
      }).then(res => this.updateLoginPasswordSuccess(res, '密码已重置，请重新登录'))
    }

    // 重置登录密码
    if (typeOption.type === 'reset') {
      return UserApi.editPassword({
        password,
        passwordConfirm,
        verifyToken: ''
      }).then(res => this.updateLoginPasswordSuccess(res, '更改成功，请重新登录'))
    }

  }

  updateLoginPasswordSuccess(res, msg) {
    if (res.status !== 1) {
      Toast.info(res && res.msg, TOAST_DURATION)
      return
    }
    const {userStore} = this.props
    userStore.logout()
    Toast.info(msg, TOAST_DURATION, () => history.push(`/login`))
  }

  // 找回密码
  findPassword = () => {

  }


  render() {
    const {step, typeOption, userName, code, password, passwordConfirm} = this.state

    return (
      <div id="password">
        {step === 1 && <VerifiedCode
          typeOption={typeOption}
          userName={userName}
          code={code}
          onInputChange={this.onInputChange}
          onNext={this.onNext}
          onBack={this.onBack}
        />}
        {step === 2 && <VerifiedPwd
          password={password}
          passwordConfirm={passwordConfirm}
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
          onStepChange={this.onStepChange}
        />}
      </div>
    )
  }
}

export default Password

import React, { Component } from 'react'
import { COUNT_DOWN } from '../../utils/constants'
import './VeritifiedPwd.scss'

class VeritifiedPwd extends Component {
  state = {
    isGetSms: true,
    count: COUNT_DOWN,
    repwdType: 'password',
    pwdType: 'password'
  }
  render() {
    const {
      password,
      repassword,
      onPasswordChange,
      onRepasswordChange
    } = this.props
    const { repwdType, pwdType } = this.state
    return (
      <div className="veritified">
        <h2>
          重置密码
          <br />
          <small>8-20位字符，不可以是纯数字。</small>
        </h2>
        <div className="main-content">
          <label>
            <input
              className="input-main"
              type={pwdType}
              placeholder="密码"
              value={password}
              onChange={onPasswordChange}
            />
            {pwdType === 'text' && (
              <img
                src={require('../../assets/images/open-pwd.png')}
                alt=""
                onClick={() => this.setState({ pwdType: 'password' })}
              />
            )}
            {pwdType === 'password' && (
              <img
                src={require('../../assets/images/close-pwd.png')}
                alt=""
                onClick={() => this.setState({ pwdType: 'text' })}
              />
            )}
          </label>
          <label>
            <input
              className="input-main"
              type={repwdType}
              placeholder="再次输入密码"
              value={repassword}
              onChange={onRepasswordChange}
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
        </div>
      </div>
    )
  }
}
export default VeritifiedPwd

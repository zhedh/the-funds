import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/common/Header'
import './AccountSafe.scss'

class AccountSafe extends Component {
  state = {
    hadTransactionPwd: true // 是否已设置交易密码
  }
  render() {
    const { hadTransactionPwd } = this.state
    return (
      <div id="account-safe">
        <Header title="安全中心" isShadow={true} />
        <Link
          to={{
            pathname: '/forget-password/1',
            state: {
              type: '重置登录密码'
            }
          }}
        >
          <p>重置登录密码</p>
          <img
            className="arrow"
            src={require('../../assets/images/arrow-right.png')}
            alt=""
          />
        </Link>
        <Link
          to={{
            pathname: '/forget-password/1',
            state: {
              title: hadTransactionPwd ? '重置交易密码' : '设置交易密码'
            }
          }}
        >
          <p>{hadTransactionPwd ? '重置交易密码' : '设置交易密码'}</p>
          <img
            className="arrow"
            src={require('../../assets/images/arrow-right.png')}
            alt=""
          />
        </Link>
      </div>
    )
  }
}

export default AccountSafe

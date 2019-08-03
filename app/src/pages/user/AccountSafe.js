import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/common/Header'
import './AccountSafe.scss'

class AccountSafe extends Component {
  render() {
    return (
      <div id="account-safe">
        <Header title="安全中心" isShadow={true} />
        <Link to="/forget-password/1">
          <p>重置登录密码</p>
          <img
            className="arrow"
            src={require('../../assets/images/arrow-right.png')}
            alt=""
          />
        </Link>
        <Link to="/forget-password/1">
          <p>设置交易密码</p>
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

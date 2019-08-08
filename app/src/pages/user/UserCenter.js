import React, { Component, PureComponent } from 'react'
import { Modal } from 'antd-mobile'
import { User } from '../../api'
import { FaRegQuestionCircle } from 'react-icons/fa'
import Header from '../../components/common/Header'
import './UserCenter.scss'

class ListItem extends PureComponent {
  render() {
    const { icon, name, url, onHandle } = this.props
    return (
      <div
        className="list-item"
        onClick={() => {
          if (onHandle) {
            onHandle()
          } else {
            window.location.href = url
          }
        }}
      >
        <img className="icon" src={icon} alt="" />
        <span>{name}</span>
        <img
          className="arrow"
          src={require('../../assets/images/arrow-right.png')}
          alt=""
        />
      </div>
    )
  }
}

class UserCenter extends Component {
  state = { isLogin: true, userInfo: {} }
  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo = () => {
    User.getUserInfo().then(res => {
      console.log(res)
    })
  }

  logout = () => {
    const { history } = this.props
    // 调取退出登录接口
    Modal.alert('是否退出登录？', '', [
      {
        text: '取消',
        onPress: () => {},
        style: 'default'
      },
      {
        text: '确认',
        onPress: () => history.push('/')
      }
    ])
  }
  render() {
    const { history } = this.props
    const {
      isLogin,
      userInfo: { isF, authentication }
    } = this.state
    console.log(User.isOnline())
    return (
      <div id="user-center">
        <Header title="个人中心" isShadow={true} bgWhite />
        <section className={`list-content list-first`}>
          {User.isOnline() ? (
            <div className="list-item">
              <img
                className="header-logo"
                src={require('../../assets/images/user-header.png')}
                alt=""
              />
              <ul>
                <li>ZBX@qq.com</li>
                <li>{authentication ? '已实名认证' : '未实名认证'}</li>
              </ul>
              {!authentication && (
                <button
                  className="certification"
                  onClick={() => {
                    history.push('/verified-country')
                  }}
                >
                  实名认证
                </button>
              )}
            </div>
          ) : (
            <h1>
              您好，请登录
              <img
                src={require('../../assets/images/arrow-left.png')}
                alt="返回"
              />
            </h1>
          )}
          <div className="list-tip">
            {isF ? (
              <span className="active">F用户生效中，2019.07.10失效</span>
            ) : (
              <span> 非F用户，暂不可享推广奖励</span>
            )}
            &nbsp;
            <FaRegQuestionCircle />
          </div>
        </section>
        <section className={`list-content list-second`}>
          <ListItem
            icon={require('../../assets/images/notice.svg')}
            name="公告列表"
            url="/notices"
          />
          <ListItem
            icon={require('../../assets/images/account.svg')}
            name="账户安全"
            url={isLogin ? '/account' : '/login'}
          />
        </section>
        {User.isOnline() && (
          <section className={`list-content list-second`}>
            <ListItem
              icon={require('../../assets/images/logout.svg')}
              name="退出登录"
              url="/login"
              onHandle={this.logout}
            />
          </section>
        )}
      </div>
    )
  }
}

export default UserCenter

import React, {Component, PureComponent} from 'react'
import {Modal} from 'antd-mobile'
import {FaRegQuestionCircle} from 'react-icons/fa'
import Header from '../../components/common/Header'
import './UserCenter.scss'
import {inject, observer} from 'mobx-react'

class ListItem extends PureComponent {
  render() {
    const {icon, name, url, onHandle} = this.props
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
        <img className="icon" src={icon} alt=""/>
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

@inject('userStore')
@inject('personStore')
@observer
class UserCenter extends Component {
  state = {isOnline: true, showFModal: false}

  componentDidMount() {
    const {personStore, userStore} = this.props
    this.createIframe()

    if (userStore.isOnline) {
      personStore.getUserInfo()
    }
  }

  componentWillUnmount() {
    this.destroyIframe('ze-snippet')
    // let iframe = document.querySelector('iframe')
    // iframe.style.display = 'none'
  }

  createIframe = () => {
    let script = document.createElement('script')

    script.type = 'text/javascript'
    // script.async = true
    script.defer = true
    script.id = 'ze-snippet'
    script.src =
      'https://static.zdassets.com/ekr/snippet.js?key=46514fb7-9da7-4496-b5c3-d942215d5215'
    document.body.appendChild(script)
  }

  destroyIframe = () => {
    let script = document.querySelector('#ze-snippet')
    let iframe = document.querySelector('iframe')

    if (script) script.remove()
    if (!iframe) return
    //把iframe指向空白页面，这样可以释放大部分内存。
    iframe.src = 'about:blank'

    try {
      iframe.contentWindow.document.write('')
      iframe.contentWindow.document.clear()
    } catch (e) {
    }

    //把iframe从页面移除
    iframe.parentNode.removeChild(iframe)
  }

  onBack = () => {
    const {history} = this.props
    this.destroyIframe()
    history.push('/home')
  }

  logout = () => {
    const {history, userStore} = this.props
    // 调取退出登录接口
    Modal.alert('是否退出登录？', '', [
      {
        text: '取消',
        style: 'default'
      },
      {
        text: '确认',
        onPress: () => {
          userStore.logout()
          history.push('/')
        }
      }
    ])
  }

  toContact = () => {
    // 联系客服
  }

  getAuthLabel = (status) => {
    switch (status) {
      case 0:
        return '未实名认证'
      case 1:
        return '等待审核'
      case 2:
        return '已实名认证'
      case 3:
        return '认证失败'
      default:
        return ''
    }
  }

  render() {
    const {history, userStore, personStore} = this.props
    const {userInfo} = personStore
    const {showFModal} = this.state
    const hideAuthButton = userInfo.authentication === 1 || userInfo.authentication === 2

    return (
      <div id="user-center">
        <Header
          title="个人中心"
          isShadow={true}
          bgWhite
          onHandle={this.onBack}
        />
        <section className={`list-content list-first`}>
          {userStore.isOnline ? (
            <div className="list-item">
              <img
                className="header-logo"
                src={require('../../assets/images/user-header.png')}
                alt=""
              />
              <ul>
                <li>{userInfo.email || userInfo.phoneNo}</li>
                <li>{this.getAuthLabel(userInfo.authentication)}</li>
              </ul>
              {!hideAuthButton && (
                <button
                  className="certification"
                  onClick={() => history.push('/verified-country')}
                >
                  实名认证
                </button>
              )}
            </div>
          ) : (
            <h1 onClick={() => history.push('/login')}>
              您好，请登录
              <img
                src={require('../../assets/images/arrow-left.png')}
                alt="返回"
              />
            </h1>
          )}
          <div className="list-tip">
            {userInfo.isF ? (
              <span className="active">F用户生效中，2019.07.10失效</span>
            ) : (
              <span> 非F用户，暂不可享推广奖励</span>
            )}
            &nbsp;
            <FaRegQuestionCircle
              onClick={() => this.setState({showFModal: true})}
            />
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
            url={userStore.isOnline ? '/account' : '/login'}
          />
          {/*<ListItem*/}
          {/*icon={require('../../assets/images/account.svg')}*/}
          {/*name="联系客服"*/}
          {/*// url={'/user-center'}*/}
          {/*onHandle={this.toContact}*/}
          {/*/>*/}
        </section>
        {userStore.isOnline && (
          <section className={`list-content list-second`}>
            <ListItem
              icon={require('../../assets/images/logout.svg')}
              name="退出登录"
              url="/login"
              onHandle={this.logout}
            />
          </section>
        )}
        <Modal
          visible={showFModal}
          className="f-modal"
          closable
          maskClosable
          transparent
          title="F用户说明"
          onClose={() => this.setState({showFModal: false})}
        >
          <div
            style={{
              fontSize: '1.5rem',
              textAlign: 'justify',
              padding: '10px'
            }}>
            当您定存买入成功后,将获得F用户的标示,F用户标示代表着您能够享受定投奖、代数奖、团队奖等相关奖励,F用户标示有效期为48小时。
          </div>
        </Modal>
      </div>
    )
  }
}

export default UserCenter

// 联系客服图片和链接没有通

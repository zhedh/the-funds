import React, {Component} from 'react';
import QRCode from 'qrcode.react'
// import {Link} from 'react-router-dom'
import {inject, observer} from "mobx-react";
import {Toast} from "antd-mobile";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {MdContentCopy} from 'react-icons/md';
import Header from '../../components/common/Header'
import {TOAST_DURATION} from "../../utils/constants";
import './InviterFriend.scss'

@inject('personStore')
@inject('userStore')
@observer
class InviterFriend extends Component {
  state = {
    codeUrl: ''
  }

  componentDidMount() {
    const {personStore, userStore, history} = this.props
    if (!userStore.isOnline) {
      Toast.info('请先登录', TOAST_DURATION, () => history.push('/login'))
      return
    }
    personStore.getUserInfo()
    this.saveImg()
  }

  saveImg = () => {
    const canvas = document.querySelector('.qr-code__box canvas')
    const codeUrl = canvas.toDataURL('image/png');
    this.setState({codeUrl})
  };

  render() {
    const {codeUrl} = this.state
    const {history, personStore} = this.props;
    const {userInfo} = personStore
    const {origin} = window.location
    const inviterUrl = origin + '/register?recommendCode=' + userInfo.recommendCode
    return (
      <div id="inviter-friend">
        <Header
          hideIcon
          title="邀请好友"
          isShadow={true}
          isFixed={true}
          bgWhite
          onHandle={() => {
            history.push('/home');
          }}
        />
        <section className="section-text">
          {userInfo.recommendCode}
          <br/>
          <CopyToClipboard
            text={userInfo.recommendCode}
            onCopy={() => Toast.info('复制成功')}>
            <span>复制邀请码</span>
          </CopyToClipboard>
        </section>
        <section className="section-qr">
          <div className="qr-code__box">
            <QRCode
              className="qr-code"
              value={inviterUrl}
            />
            <br/>
            <img src={codeUrl} alt=""/>
            <br/>
            <span>点击或长按二维码保存图片</span>
          </div>
          <p>
            {inviterUrl}
            <CopyToClipboard
              text={inviterUrl}
              onCopy={() => Toast.info('复制成功')}>
              <MdContentCopy className="icon"/>
            </CopyToClipboard>
          </p>
        </section>
        <section className="section-link">
          <a>注册成功</a>
          {/*<Link to="/home/generalize">查看推广</Link>*/}
        </section>
      </div>
    );
  }
}

export default InviterFriend;
